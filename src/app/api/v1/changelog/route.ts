import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get("projectId");
    const apiKey = url.searchParams.get("apiKey");

    if (!projectId && !apiKey) {
      return NextResponse.json({ error: "Missing projectId or apiKey" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let finalProjectId = projectId;

    if (apiKey) {
      const { data: settings } = await supabase
        .from("project_settings")
        .select("project_id")
        .eq("public_api_key", apiKey)
        .single();
      
      if (!settings) {
        return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
      }
      finalProjectId = settings.project_id;
    }

    const { data: releases, error } = await supabase
      .from("release_notes")
      .select("id, title, content, type, published_at, version, tags, slug, meta_title, meta_description")
      .eq("project_id", finalProjectId)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch changelog" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: releases }, { status: 200 });
  } catch (error) {
    console.error("Public API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
