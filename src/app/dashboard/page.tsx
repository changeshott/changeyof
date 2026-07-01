import { Plus, Activity, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();
  
  // Note: Once schema is applied, we could fetch actual stats here
  // const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
  
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Engagement Overview</h1>
          <p className="text-slate-400">Track how users interact with your release notes.</p>
        </div>
        <Link 
          href="/dashboard/releases/new"
          className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-200 transition-colors active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
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

      {/* Quick Start / Onboarding */}
      <div className="bg-gradient-to-r from-[#111] to-[#151515] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 blur-3xl pointer-events-none rounded-full"></div>
        <h2 className="text-2xl font-bold mb-3">Welcome to your new HQ</h2>
        <p className="text-slate-400 max-w-2xl mb-8 leading-relaxed">
          You're just a few steps away from an automated, beautiful changelog. Let's get your first project set up so you can start broadcasting updates to your users.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/dashboard/projects"
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl text-center hover:bg-slate-200 transition-colors"
          >
            Create Your First Project
          </Link>
          <Link 
            href="/dashboard/widget"
            className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-center hover:bg-white/10 transition-colors"
          >
            Get Widget Code
          </Link>
        </div>
      </div>
    </main>
  );
}
