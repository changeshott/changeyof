import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("twitter_oauth_state")?.value;
  const storedVerifier = cookieStore.get("twitter_oauth_verifier")?.value;

  if (!state || !code || !storedState || !storedVerifier) {
    return NextResponse.json({ error: "Invalid OAuth callback state or missing parameters." }, { status: 400 });
  }

  if (state !== storedState) {
    return NextResponse.json({ error: "State mismatch. Potential CSRF." }, { status: 403 });
  }

  const clientId = process.env.TWITTER_CLIENT_ID;
  const clientSecret = process.env.TWITTER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing Twitter Developer keys" }, { status: 500 });
  }

  const origin = request.nextUrl.origin;
  const callbackUrl = `${origin}/api/integrations/twitter/callback`;

  try {
    const client = new TwitterApi({ clientId, clientSecret });
    
    // Exchange the code for an access token
    const { client: loggedClient, accessToken, refreshToken, expiresIn } = await client.loginWithOAuth2({
      code,
      codeVerifier: storedVerifier,
      redirectUri: callbackUrl,
    });

    // Fetch user profile to get username
    const { data: userObject } = await loggedClient.v2.me();
    const xUsername = userObject.username;

    // Get user id
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Save tokens to user_integrations database
    const { error: dbError } = await supabase
      .from("user_integrations")
      .insert({
        user_id: user.id,
        provider: 'twitter',
        access_token: accessToken || null,
        refresh_token: refreshToken || null,
        account_username: xUsername || null
      });

    if (dbError) {
      console.error("Database update error:", dbError);
      return NextResponse.json({ error: "Failed to save X configuration", details: dbError }, { status: 500 });
    }

    // Clean up cookies
    cookieStore.delete("twitter_oauth_state");
    cookieStore.delete("twitter_oauth_verifier");

    // Redirect back to global settings
    return NextResponse.redirect(`${origin}/dashboard/settings`);
  } catch (error: any) {
    console.error("Twitter Callback Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
