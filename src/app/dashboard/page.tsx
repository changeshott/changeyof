import { Plus, Activity, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ActivityChart from "@/components/cards/ActivityChart";
import RecentActivity from "@/components/cards/RecentActivity";
import QuickDraft from "@/components/cards/QuickDraft";
import OnboardingWizard from "@/components/OnboardingWizard";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();
  
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  
  if (!projects || projects.length === 0) {
    return (
      <main className="min-h-screen">
        <OnboardingWizard />
      </main>
    );
  }

  const { data: recentReleases } = await supabase.from('release_notes').select('id, title, created_at, status, projects(name)').order('created_at', { ascending: false }).limit(5);
  const { data: recentFeedbacks } = await supabase.from('feedbacks').select('id, sentiment, comment, created_at, release_notes(title)').order('created_at', { ascending: false }).limit(5);
  
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight">
            <span className="bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text">
              Engagement Overview
            </span>
          </h1>
          <p className="text-base sm:text-sm md:text-sm text-white/50 mb-5 leading-relaxed">Track how users interact with your release notes.</p>
        </div>
        <Link 
          href="/dashboard/releases/new"
          className="flex items-center gap-2 px-10 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <Plus className="w-4 h-4" /> New Release
        </Link>
      </header>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl pointer-events-none rounded-full"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-300">Total Views</h3>
          </div>
          <div className="text-4xl font-bold tracking-tight mb-1">0</div>
          <p className="text-xs text-indigo-400 font-medium">+0% from last week</p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl pointer-events-none rounded-full"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-300">Open Rate</h3>
          </div>
          <div className="text-4xl font-bold tracking-tight mb-1">0%</div>
          <p className="text-xs text-slate-500">Wait for your first broadcast</p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-pink-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 blur-2xl pointer-events-none rounded-full"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-300">Reactions</h3>
          </div>
          <div className="text-4xl font-bold tracking-tight mb-1">0</div>
          <p className="text-xs text-slate-500">Likes, hoorays, & loves</p>
        </div>
        
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-2xl pointer-events-none rounded-full"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500/20 text-yellow-400 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-300">Active Projects</h3>
          </div>
          <div className="text-4xl font-bold tracking-tight mb-1">0</div>
          <p className="text-xs text-slate-500">Create a project to start</p>
        </div>
      </div>

      {/* Interactive Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <ActivityChart />
          <QuickDraft projects={projects || []} />
        </div>
        <div>
          <RecentActivity releases={recentReleases || []} feedbacks={recentFeedbacks || []} className="h-full" />
        </div>
      </div>
    </main>
  );
}
