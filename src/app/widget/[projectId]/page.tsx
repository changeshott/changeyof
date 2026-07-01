"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Bell, Zap, Bug, Sparkles, ThumbsUp, ThumbsDown, MessageSquare, Loader2, Send } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Extracted ReleaseCard to handle individual feedback states
function ReleaseCard({ release, projectId }: { release: any, projectId: string }) {
  const [feedbackState, setFeedbackState] = useState<'idle' | 'commenting' | 'submitting' | 'done'>('idle');
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "New": return <Zap className="w-4 h-4 text-emerald-400" />;
      case "Fix": return <Bug className="w-4 h-4 text-rose-400" />;
      case "Improvement": return <Sparkles className="w-4 h-4 text-blue-400" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "New": return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
      case "Fix": return "bg-rose-400/10 text-rose-400 border-rose-400/20";
      case "Improvement": return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      default: return "bg-slate-400/10 text-slate-400 border-slate-400/20";
    }
  };

  const handleSentiment = async (s: string) => {
    setSentiment(s);
    setFeedbackState('commenting');
  };

  const submitFeedback = async () => {
    if (!sentiment && !comment) return;
    setFeedbackState('submitting');
    try {
      await fetch(`/api/widget/${projectId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          releaseId: release.id,
          sentiment: sentiment,
          comment: comment
        })
      });
      setFeedbackState('done');
    } catch (e) {
      console.error(e);
      setFeedbackState('idle');
    }
  };

  return (
    <div className="flex gap-4">
      {/* Timeline dot */}
      <div className="relative z-10 shrink-0 mt-1">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border bg-white dark:bg-[#111] ${getTypeColor(release.type).split(' ')[2]}`}>
          {getTypeIcon(release.type)}
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${getTypeColor(release.type)}`}>
            {release.type}
          </span>
          <span className="text-xs text-slate-500">
            {release.published_at ? formatDistanceToNow(new Date(release.published_at), { addSuffix: true }) : 'Unknown'}
          </span>
        </div>
        
        <h3 className="text-base font-bold mb-2 tracking-tight">{release.title}</h3>
        
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-indigo-500 prose-img:rounded-xl">
          <ReactMarkdown>{release.content}</ReactMarkdown>
        </div>

        {/* Feedback Section */}
        <div className="mt-6 border-t border-slate-100 dark:border-white/10 pt-4">
          {feedbackState === 'idle' && (
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-500">How do you feel about this?</span>
              <div className="flex items-center gap-2">
                <button onClick={() => handleSentiment('positive')} className="p-1.5 hover:bg-emerald-500/10 rounded-full transition-colors group">
                  <ThumbsUp className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                </button>
                <button onClick={() => handleSentiment('neutral')} className="p-1.5 hover:bg-slate-500/10 rounded-full transition-colors group">
                  <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-slate-500" />
                </button>
                <button onClick={() => handleSentiment('negative')} className="p-1.5 hover:bg-rose-500/10 rounded-full transition-colors group">
                  <ThumbsDown className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
                </button>
              </div>
            </div>
          )}

          {feedbackState === 'commenting' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more... (optional)"
                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 resize-none h-20 mb-2"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setFeedbackState('idle')} className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Cancel</button>
                <button onClick={submitFeedback} className="px-4 py-1.5 bg-indigo-500 text-white rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-indigo-600 transition-colors">
                  <Send className="w-3 h-3" /> Submit
                </button>
              </div>
            </div>
          )}

          {feedbackState === 'submitting' && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 py-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
            </div>
          )}

          {feedbackState === 'done' && (
            <div className="text-xs font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-center py-2 animate-in fade-in">
              Thanks for your feedback! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WidgetPage({ params }: { params: { projectId: string } }) {
  const [releases, setReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchReleases = async () => {
      // Due to RLS, anon users can now fetch published releases thanks to the public_read policy
      const { data, error } = await supabase
        .from("release_notes")
        .select("*")
        .eq("project_id", params.projectId)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(20);

      if (data) {
        setReleases(data);
      }
      setLoading(false);
    };

    fetchReleases();
  }, [params.projectId, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent p-4 flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (releases.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] p-8 text-center flex flex-col items-center justify-center">
        <Bell className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
        <h3 className="text-slate-900 dark:text-white font-semibold">No updates yet</h3>
        <p className="text-slate-500 text-sm mt-2">Check back later for new releases.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white">
      {/* Widget Header */}
      <div className="sticky top-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight">Latest Updates</h2>
            <p className="text-xs text-slate-500">What's new in our product</p>
          </div>
        </div>
        <div className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full">
          Powered by cf
        </div>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-8">
        {releases.map((release, index) => (
          <div key={release.id} className="relative">
            {/* Timeline connector */}
            {index !== releases.length - 1 && (
              <div className="absolute left-[15px] top-10 bottom-[-40px] w-px bg-slate-200 dark:bg-white/10" />
            )}
            
            <ReleaseCard release={release} projectId={params.projectId} />
          </div>
        ))}
      </div>
    </div>
  );
}
