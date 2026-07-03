import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { releaseId, userIdExt } = body;

    if (!releaseId || !userIdExt) {
      return NextResponse.json({ error: "Release ID and User ID are required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Upsert to handle unique constraint (release_id, user_id_ext)
    const { error } = await supabase
      .from("release_views")
      .upsert({
        release_id: releaseId,
        user_id_ext: userIdExt,
        viewed_at: new Date().toISOString()
      }, { onConflict: "release_id, user_id_ext" });

    if (error) {
      console.error("API Error inserting view:", error);
      return NextResponse.json({ error: "Failed to record view" }, { status: 500 });
    }

    const response = NextResponse.json({ success: true });
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (err) {
    console.error("Unexpected error in API:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
