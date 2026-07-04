import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {


  const clientId = process.env.TWITTER_CLIENT_ID;
  const clientSecret = process.env.TWITTER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ 
      error: "X (Twitter) Developer credentials not configured in environment." 
    }, { status: 500 });
  }

  // Use the origin of the request for the callback URL dynamically
  const origin = request.nextUrl.origin;
  const callbackUrl = `${origin}/api/integrations/twitter/callback`;

  try {
    const client = new TwitterApi({ clientId, clientSecret });
    
    // Request read and write permissions (tweet.read, tweet.write, users.read)
    // offline.access gives us a refresh token
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      callbackUrl,
      { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
    );

    // Store state and codeVerifier in cookies to verify in callback
    const cookieStore = await cookies();
    cookieStore.set("twitter_oauth_state", state, { httpOnly: true, maxAge: 600, path: '/' });
    cookieStore.set("twitter_oauth_verifier", codeVerifier, { httpOnly: true, maxAge: 600, path: '/' });

    return NextResponse.redirect(url);
  } catch (error: unknown) {
    console.error("Twitter Auth Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
