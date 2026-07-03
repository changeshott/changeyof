"use client";

import React, { useEffect, useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Bell, Zap, Bug, Sparkles, ThumbsUp, ThumbsDown, MessageSquare, Loader2, Send, Megaphone, Heart, Rocket, PartyPopper } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Extracted ReleaseCard to handle individual feedback states
function ReleaseCard({ release, projectId, userIdExt }: { release: any, projectId: string, userIdExt: string | null }) {
  const [reactedWith, setReactedWith] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'submitting' | 'done'>('idle');
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

  const handleReaction = async (emoji: string) => {
    if (reactedWith) return;
    setReactedWith(emoji);
    try {
      await fetch(`/api/widget/${projectId}/reaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ releaseId: release.id, emoji, userIdExt })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const submitFeedback = async () => {
    if (!comment.trim()) return;
    setFeedbackState('submitting');
    try {
      await fetch(`/api/widget/${projectId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          releaseId: release.id,
          comment: comment,
          userIdExt
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

        {/* Emoji Reactions */}
        <div className="mt-6 flex items-center gap-2">
          {['thumbs_up', 'heart', 'rocket', 'party_popper'].map((emoji) => {
            const Icon = emoji === 'thumbs_up' ? ThumbsUp : emoji === 'heart' ? Heart : emoji === 'rocket' ? Rocket : PartyPopper;
            const isSelected = reactedWith === emoji;
            return (
              <button 
                key={emoji}
                onClick={() => handleReaction(emoji)}
                disabled={!!reactedWith && reactedWith !== emoji}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected 
                    ? 'bg-indigo-500 text-white shadow-md' 
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-slate-300'
                } ${!!reactedWith && reactedWith !== emoji ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'fill-current' : ''}`} />
              </button>
            )
          })}
        </div>

        {/* Feedback Section */}
        <div className="mt-4 border-t border-slate-100 dark:border-white/10 pt-4">
          {feedbackState === 'idle' && (
            <div className="animate-in fade-in">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What do you think of this update?"
                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 resize-none h-16 mb-2 placeholder:text-slate-400"
              />
              <div className="flex justify-end">
                <button 
                  onClick={submitFeedback} 
                  disabled={!comment.trim()}
                  className="px-4 py-1.5 bg-indigo-500 text-white rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3 h-3" /> Submit Feedback
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
            <div className="text-xs font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center py-2 animate-in fade-in">
              Thanks for your feedback! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WidgetContent({ projectId }: { projectId: string }) {
  const searchParams = useSearchParams();
  const fontParam = searchParams.get('font') || 'inter';
  const userId = searchParams.get('userId');
  const segment = searchParams.get('segment');

  const [releases, setReleases] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch settings
      const { data: projData } = await supabase
        .from("projects")
        .select("id, project_settings(*)")
        .eq("id", projectId)
        .single();
        
      const stgsData = Array.isArray(projData?.project_settings) 
        ? projData?.project_settings[0] 
        : projData?.project_settings;
        
      const stgs = stgsData || {
        theme_mode: "auto",
        accent_color: "indigo",
        font_family: "inter",
      };
      setSettings(stgs);
      
      // Apply theme
      if (stgs.theme_mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (stgs.theme_mode === 'light') {
        document.documentElement.classList.remove('dark');
      }

      let query = supabase
        .from("release_notes")
        .select("*")
        .eq("project_id", projectId)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(20);
        
      if (segment) {
        query = query.or(`target_segment.eq.all,target_segment.eq.${segment}`);
      } else {
        query = query.eq("target_segment", "all");
      }

      const { data, error } = await query;

      if (data) {
        setReleases(data);
        
        // Log views if userId is provided
        if (userId) {
          data.forEach(release => {
            fetch(`/api/widget/${projectId}/view`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ releaseId: release.id, userIdExt: userId })
            }).catch(console.error);
          });
        }
      }
      setLoading(false);
    };

    fetchData();

    // Listen for live preview updates from parent window
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'WIDGET_SETTINGS_UPDATE') {
        const newStgs = event.data.settings;
        setSettings((prev: any) => ({ ...prev, ...newStgs }));
        
        // Apply theme mode dynamically
        if (newStgs.theme_mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (newStgs.theme_mode === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // Auto (Syncs with OS) - simplistic fallback here
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
             document.documentElement.classList.add('dark');
          } else {
             document.documentElement.classList.remove('dark');
          }
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [projectId, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent p-4 flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  let fontClass = "font-sans";
  if (settings?.font_family === 'system') fontClass = "font-sans";
  if (settings?.font_family === 'mono') fontClass = "font-mono";
  if (settings?.font_family === 'outfit' || settings?.font_family === 'roboto') fontClass = `font-${settings.font_family}`; // assuming fonts are loaded

  if (releases.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] p-8 text-center flex flex-col items-center justify-center">
        <Bell className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
        <h3 className="text-slate-900 dark:text-white font-semibold">No updates yet</h3>
        <p className="text-slate-500 text-sm mt-2">Check back later for new releases.</p>
      </div>
    );
  }

  // Dynamic accent colors based on settings
  let bgClass = "bg-white dark:bg-[#0a0a0a]";
  
  const headerTitle = settings?.header_title || "Latest Updates";
  const headerDesc = settings?.header_description || "What's new in our product";
  const triggerIcon = settings?.trigger_icon || "bell";
  const hideBranding = settings?.hide_branding === true || settings?.hide_branding === "true";

  const renderHeaderIcon = () => {
    switch (triggerIcon) {
      case "megaphone": return <Megaphone className="w-4 h-4" />;
      case "sparkles": return <Sparkles className="w-4 h-4" />;
      case "bell":
      default: return <Bell className="w-4 h-4" />;
    }
  };
  
  return (
    <div className={`min-h-screen ${bgClass} text-slate-900 dark:text-white ${fontClass}`}>
      {/* Widget Header */}
      <div className="sticky top-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
            {renderHeaderIcon()}
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight">{headerTitle}</h2>
            <p className="text-xs text-slate-500">{headerDesc}</p>
          </div>
        </div>
        {!hideBranding && (
          <div className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full">
            Powered by Changeyof
          </div>
        )}
      </div>

      {/* Feed */}
      <div className="p-4 space-y-8">
        {releases.map((release, index) => (
          <div key={release.id} className="relative">
            {/* Timeline connector */}
            {index !== releases.length - 1 && (
              <div className="absolute left-[15px] top-10 bottom-[-40px] w-px bg-slate-200 dark:bg-white/10" />
            )}
            
            <ReleaseCard release={release} projectId={projectId} userIdExt={userId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WidgetPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = React.use(params);
  return (
    <Suspense fallback={<div className="min-h-screen p-4 flex justify-center items-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <WidgetContent projectId={projectId} />
    </Suspense>
  );
}
