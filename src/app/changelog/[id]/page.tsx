import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Bell, Zap, Bug, Sparkles } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("name, project_settings(seo_title, seo_description, seo_og_image)")
    .eq("id", id)
    .single();

  if (!project) return { title: "Not Found" };
  const settings = Array.isArray(project.project_settings) ? project.project_settings[0] : project.project_settings;

  return {
    title: settings?.seo_title || `${project.name} Changelog`,
    description: settings?.seo_description || `Latest updates and release notes for ${project.name}`,
    openGraph: {
      images: settings?.seo_og_image ? [settings.seo_og_image] : [],
    },
  };
}

export default async function ChangelogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*, project_settings(*)")
    .eq("id", id)
    .single();

  if (!project) notFound();

  const settingsData = Array.isArray(project.project_settings) ? project.project_settings[0] : project.project_settings;
  const settings = settingsData || {
    theme_mode: "auto",
    accent_color: "indigo",
    font_family: "inter",
  };

  const { data: releases } = await supabase
    .from("release_notes")
    .select("*")
    .eq("project_id", id)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "New": return <Zap className="w-5 h-5 text-emerald-500" />;
      case "Fix": return <Bug className="w-5 h-5 text-rose-500" />;
      case "Improvement": return <Sparkles className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "New": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Fix": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "Improvement": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  let fontClass = "font-sans";
  if (settings?.font_family === 'system') fontClass = "font-sans";
  if (settings?.font_family === 'mono') fontClass = "font-mono";
  if (settings?.font_family === 'outfit' || settings?.font_family === 'roboto') fontClass = `font-${settings.font_family}`;

  // Helper to map color settings
  const getAccentBgClass = (color: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-600';
      case 'rose': return 'bg-rose-600';
      case 'amber': return 'bg-amber-600';
      case 'blue': return 'bg-blue-600';
      default: return 'bg-indigo-600';
    }
  };

  return (
    <div className={`min-h-screen ${settings.theme_mode === 'dark' ? 'dark' : ''}`}>
      <main className={`min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white ${fontClass}`}>
        
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-6 py-8 flex items-center gap-4">
            <div className={`w-12 h-12 ${getAccentBgClass(settings.accent_color)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{project.name} Changelog</h1>
              <p className="text-sm text-slate-500 mt-1">
                {settings.seo_description || "Follow the latest updates, improvements, and fixes."}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {!releases || releases.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#111] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
              <Bell className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No updates yet</h3>
              <p className="text-slate-500 mt-2">Check back later for our latest releases.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {releases.map((release) => (
                <article key={release.id} className="bg-white dark:bg-[#111] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative">
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getTypeColor(release.type).split(' ')[2]} bg-slate-50 dark:bg-black`}>
                      {getTypeIcon(release.type)}
                    </div>
                    <div>
                      <span className={`text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${getTypeColor(release.type)} inline-block mb-1`}>
                        {release.type}
                      </span>
                      <p className="text-sm text-slate-500 font-medium">
                        {release.published_at ? formatDistanceToNow(new Date(release.published_at), { addSuffix: true }) : 'Unknown'}
                      </p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
                    {release.title}
                  </h2>
                  
                  <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-img:rounded-xl">
                    <ReactMarkdown>{release.content}</ReactMarkdown>
                  </div>
                  
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
