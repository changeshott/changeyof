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
    let { releaseId, sentiment, comment } = body;

    if (!releaseId) {
      return NextResponse.json({ error: "Release ID is required" }, { status: 400 });
    }

    // --- MOCK AI SENTIMENT ANALYSIS ---
    // In the future, this is where we call OpenAI/Gemini to analyze the `comment`.
    if (comment && !sentiment) {
      const lowerComment = comment.toLowerCase();
      if (lowerComment.includes("love") || lowerComment.includes("great") || lowerComment.includes("good") || lowerComment.includes("awesome") || lowerComment.includes("thanks")) {
        sentiment = "positive";
      } else if (lowerComment.includes("hate") || lowerComment.includes("bad") || lowerComment.includes("sucks") || lowerComment.includes("terrible") || lowerComment.includes("bug")) {
        sentiment = "negative";
      } else {
        sentiment = "neutral";
      }
    }
    
    // Default fallback if still no sentiment
    if (!sentiment) {
      sentiment = "neutral";
    }

    // Initialize Supabase client with SERVICE_ROLE to bypass RLS for inserting anonymous feedback
    // Alternatively, our RLS says "Anyone can insert feedback", so anon key works too.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("feedbacks")
      .insert({
        release_id: releaseId,
        sentiment,
        comment: comment ? comment.slice(0, 1000) : null, // Limit comment length
      })
      .select()
      .single();

    if (error) {
      console.error("API Error inserting feedback:", error);
      return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
    }

    const response = NextResponse.json({ success: true, data });
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
