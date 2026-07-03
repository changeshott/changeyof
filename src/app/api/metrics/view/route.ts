import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { releaseId } = await request.json();

    if (!releaseId) {
      return NextResponse.json({ error: "Missing releaseId" }, { status: 400 });
    }

    const supabase = await createClient();

    // The Supabase query should use RPC to safely increment, 
    // or since this is a low-traffic app we can just select and update.
    // However, the best way without RPC in Supabase is to try inserting, and if it exists, update it.
    // Let's check if a metric record exists for this release.
    const { data: existingMetric } = await supabase
      .from("metrics")
      .select("id, views_count")
      .eq("release_id", releaseId)
      .single();

    if (existingMetric) {
      await supabase
        .from("metrics")
        .update({ views_count: (existingMetric.views_count || 0) + 1 })
        .eq("id", existingMetric.id);
    } else {
      await supabase
        .from("metrics")
        .insert({
          release_id: releaseId,
          views_count: 1
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in view tracking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
