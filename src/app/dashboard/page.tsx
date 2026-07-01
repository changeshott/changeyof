import { Plus, Activity, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ActivityChart from "@/components/cards/ActivityChart";
import RecentActivity from "@/components/cards/RecentActivity";
import QuickDraft from "@/components/cards/QuickDraft";
import OnboardingWizard from "@/components/OnboardingWizard";
import AnimatedHeader from "@/components/AnimatedHeader";
import SkipEmptyStateButton from "@/components/SkipEmptyStateButton";
import { cookies } from "next/headers";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();
  
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  
  const cookieStore = await cookies();
  const hasCompletedOnboarding = cookieStore.get('onboarding_completed')?.value === 'true';
  const hasSkippedEmptyState = cookieStore.get('skip_empty_state')?.value === 'true';
  
  if (!hasCompletedOnboarding && (!projects || projects.length === 0)) {
    return (
      <main className="min-h-screen">
        <OnboardingWizard />
      </main>
    );
  }

  const { data: recentReleases } = await supabase.from('release_notes').select('id, title, created_at, status, projects(name)').order('created_at', { ascending: false }).limit(5);
  const { data: recentFeedbacks } = await supabase.from('feedbacks').select('id, sentiment, comment, created_at, release_notes(title)').order('created_at', { ascending: false }).limit(5);
  
  const hasReleases = recentReleases && recentReleases.length > 0;

  return (
    <main className="max-w-6xl mx-auto">
      <AnimatedHeader 
        title="Engagement Overview" 
        description="Track how users interact with your release notes."
      >
        <Link 
          href="/dashboard/releases/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <Plus className="w-4 h-4" /> New Release
        </Link>
      </AnimatedHeader>

      {!hasReleases && !hasSkippedEmptyState ? (
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center shadow-xl mt-4 sm:mt-8 group hover:border-white/20 transition-colors">
          
          <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2.5 text-white">
            {(!projects || projects.length === 0) ? "Ready to build something great?" : "You're all set! Let's make some noise."}
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            {(!projects || projects.length === 0) 
              ? "You haven't created a project yet. Create your first project to start collecting feedback and publishing release notes." 
              : "Your project is ready. Publish your first release note to start engaging with your users, or grab the widget code to embed it directly into your application."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {(!projects || projects.length === 0) ? (
              <Link 
                href="/dashboard/projects"
                className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-lg text-center hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
              >
                Create Your First Project
              </Link>
            ) : (
              <>
                <Link 
                  href="/dashboard/releases/new"
                  className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-lg text-center hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
                >
                  Write First Release Note
                </Link>
                <Link 
                  href="/dashboard/widget"
                  className="px-6 py-2.5 bg-[#161616] border border-[#333] text-white text-sm font-semibold rounded-lg text-center hover:border-slate-500 transition-all hover:scale-105 active:scale-95"
                >
                  Get Widget Code
                </Link>
              </>
            )}
          </div>
          
          <SkipEmptyStateButton />
        </div>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
