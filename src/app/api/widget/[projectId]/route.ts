import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// We use the service role key or public anon key here because it's a public API.
// Since RLS is active, if we use anon key, we must ensure public can read.
// Wait, the `release_notes` table has RLS:
// USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))
// This means anonymous users CANNOT read release notes!
// To fix this for the public widget, we need to bypass RLS or add a policy for public read access.
// Since we are building an API, we can use the service_role key to bypass RLS, OR we can add a public read policy.
// It is safer to use the service_role key on the server to fetch the data.

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    // Initialize Supabase client with SERVICE_ROLE to bypass RLS for public read
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    // Fallback to anon key if service key is missing (though it might fail if RLS blocks it)
    const supabase = createClient(supabaseUrl, supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

    // Fetch published release notes for this project
    const { data: releases, error } = await supabase
      .from("release_notes")
      .select("*")
      .eq("project_id", projectId)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(20); // Limit to 20 recent notes

    if (error) {
      console.error("API Error fetching releases:", error);
      return NextResponse.json({ error: "Failed to fetch release notes" }, { status: 500 });
    }

    // Configure CORS headers so any website can fetch this API
    const response = NextResponse.json({ releases });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (err) {
    console.error("Unexpected error in API:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
