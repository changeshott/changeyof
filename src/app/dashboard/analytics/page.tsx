import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BarChart3, ThumbsUp, ThumbsDown, MessageSquare, Quote } from "lucide-react";

import AnimatedHeader from "@/components/AnimatedHeader";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch feedbacks for projects owned by the user
  const { data: feedbacks, error } = await supabase
    .from("feedbacks")
    .select(`
      id, sentiment, comment, created_at,
      release_notes (
        title,
        projects ( name )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching feedbacks:", error);
  }

  const validFeedbacks = feedbacks || [];
  
  const positive = validFeedbacks.filter((f) => f.sentiment === "positive").length;
  const neutral = validFeedbacks.filter((f) => f.sentiment === "neutral").length;
  const negative = validFeedbacks.filter((f) => f.sentiment === "negative").length;
  const total = validFeedbacks.length;

  return (
    <main className="max-w-6xl mx-auto">
      <AnimatedHeader 
        title="Feedback Analytics"
        description="AI-powered sentiment analysis from your widget."
      />

      {total === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No feedback yet</h3>
          <p className="text-slate-400">Install the widget and publish some release notes to start collecting feedback.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <ThumbsUp className="w-8 h-8 text-emerald-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{positive}</div>
              <div className="text-emerald-400/80 text-sm font-medium uppercase tracking-wider">Positive</div>
            </div>
            
            <div className="bg-slate-500/10 border border-slate-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <MessageSquare className="w-8 h-8 text-slate-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{neutral}</div>
              <div className="text-slate-400/80 text-sm font-medium uppercase tracking-wider">Neutral</div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <ThumbsDown className="w-8 h-8 text-rose-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{negative}</div>
              <div className="text-rose-400/80 text-sm font-medium uppercase tracking-wider">Negative</div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-white/5 bg-white/5">
              <h2 className="font-semibold text-lg">Recent User Comments</h2>
            </div>
            <div className="divide-y divide-white/5">
              {validFeedbacks.filter((f) => f.comment).map((fb: any) => (
                <div key={fb.id} className="p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {fb.sentiment === "positive" && <ThumbsUp className="w-5 h-5 text-emerald-400" />}
                      {fb.sentiment === "neutral" && <MessageSquare className="w-5 h-5 text-slate-400" />}
                      {fb.sentiment === "negative" && <ThumbsDown className="w-5 h-5 text-rose-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">
                          {fb.release_notes?.projects?.name || "Unknown Project"}
                        </span>
                        <span className="text-xs text-slate-400">
                          on "{fb.release_notes?.title || "Unknown Release"}"
                        </span>
                      </div>
                      <div className="flex gap-3 text-slate-300">
                        <Quote className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <p className="italic">{fb.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {validFeedbacks.filter((f) => f.comment).length === 0 && (
                <div className="p-8 text-center text-slate-500 italic">
                  Users have submitted reactions, but no one has written a comment yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
