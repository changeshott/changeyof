/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Activity, Eye, MessageSquare, ThumbsUp, TrendingUp, BarChart3, Star, Frown, Meh, Smile } from "lucide-react";
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
  const { data: allFeedbacks } = await supabase.from('feedbacks').select('id, sentiment, comment, created_at, release_notes(title, id)').order('created_at', { ascending: false });
  const recentFeedbacks = allFeedbacks?.slice(0, 5) || [];
  
  const hasReleases = recentReleases && recentReleases.length > 0;

  // Calculate Real Metrics
  const { data: metricsData } = await supabase.from('metrics').select('views_count, reactions, release_id, release_notes(title)');
  let totalViews = 0;
  let totalReactions = 0;
  let topRelease: { title: string, score: number } | null = null;
  
  if (metricsData) {
    let highestScore = -1;
    for (const m of metricsData) {
      const views = m.views_count || 0;
      totalViews += views;
      
      let rCount = 0;
      if (m.reactions && typeof m.reactions === 'object') {
        const reacts = m.reactions as Record<string, number>;
        rCount = (reacts.likes || 0) + (reacts.love || 0) + (reacts.hooray || 0);
        totalReactions += rCount;
      }
      
      // score formula (1 reaction = 5 views)
      const score = views + (rCount * 5);
      if (score > highestScore && m.release_notes) {
        highestScore = score;
        topRelease = { title: (m.release_notes as any).title, score };
      }
    }
  }

  // Calculate Sentiment Distribution
  let positiveCount = 0;
  let neutralCount = 0;
  let negativeCount = 0;
  let positiveFeedbackRatio = 0;

  if (allFeedbacks && allFeedbacks.length > 0) {
    allFeedbacks.forEach(f => {
      if (f.sentiment === 'positive') positiveCount++;
      else if (f.sentiment === 'neutral') neutralCount++;
      else if (f.sentiment === 'negative') negativeCount++;
    });
    positiveFeedbackRatio = Math.round((positiveCount / allFeedbacks.length) * 100);
  } else {
    // If no feedback, we keep it at 0 but it's "N/A" conceptually
  }

  const activeProjectsCount = projects ? projects.length : 0;

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
          <div className="w-14 h-14 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:scale-110 transition-transform">
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
          {/* Real Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl pointer-events-none rounded-full"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-300">Total Views</h3>
              </div>
              <div className="text-4xl font-bold tracking-tight mb-1">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-white font-medium">Across all projects</p>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl pointer-events-none rounded-full"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-300">User Satisfaction</h3>
              </div>
              <div className="text-4xl font-bold tracking-tight mb-1">{positiveFeedbackRatio}%</div>
              <p className="text-xs text-slate-500">Based on positive feedback</p>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-pink-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 blur-2xl pointer-events-none rounded-full"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-300">Reactions</h3>
              </div>
              <div className="text-4xl font-bold tracking-tight mb-1">{totalReactions.toLocaleString()}</div>
              <p className="text-xs text-slate-500">Likes, hoorays, & loves</p>
            </div>
            
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-400/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-400/10 blur-2xl pointer-events-none rounded-full"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-400/20 text-slate-300 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-300">Active Projects</h3>
              </div>
              <div className="text-4xl font-bold tracking-tight mb-1">{activeProjectsCount}</div>
              <p className="text-xs text-slate-500">{activeProjectsCount > 0 ? 'Actively running' : 'Create a project to start'}</p>
            </div>
          </div>

          {/* New Advanced Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            
            {/* Top Performing Release */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl pointer-events-none rounded-full group-hover:bg-white/10 transition-all duration-500"></div>
              
              <div className="mb-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white tracking-tight">Top Performing Release</h3>
                    <p className="text-xs text-slate-400">Your most engaging announcement</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>

              {topRelease ? (
                <div className="bg-gradient-to-r from-[#161616] to-[#111] border border-white/10 rounded-xl p-5 relative overflow-hidden shadow-inner group-hover:border-white/10 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-white/20 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                  <h4 className="text-white font-semibold text-lg mb-2 truncate" title={topRelease.title}>{topRelease.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-white" /> Score: {topRelease.score}</span>
                    <Link href="/dashboard/releases" className="text-white hover:text-slate-200 underline font-medium ml-auto">View Details</Link>
                  </div>
                </div>
              ) : (
                <div className="h-[92px] flex flex-col items-center justify-center text-slate-500 text-sm italic bg-[#161616] rounded-xl border border-white/5 border-dashed relative z-10">
                  <span>Not enough data yet</span>
                </div>
              )}
            </div>

            {/* Sentiment Distribution */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl pointer-events-none rounded-full group-hover:bg-white/10 transition-all duration-500"></div>
              
              <div className="mb-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white tracking-tight">Sentiment Distribution</h3>
                    <p className="text-xs text-slate-400">Breakdown of all user feedback</p>
                  </div>
                </div>
              </div>

              {(allFeedbacks && allFeedbacks.length > 0) ? (
                <div className="space-y-5 mt-2 relative z-10 bg-[#161616] border border-white/5 rounded-xl p-5">
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#222] shadow-inner">
                    <div style={{ width: `${(positiveCount / allFeedbacks.length) * 100}%` }} className="bg-gradient-to-r from-white to-white h-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <div style={{ width: `${(neutralCount / allFeedbacks.length) * 100}%` }} className="bg-slate-500 h-full transition-all duration-1000"></div>
                    <div style={{ width: `${(negativeCount / allFeedbacks.length) * 100}%` }} className="bg-gradient-to-r from-slate-400 to-slate-300 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-medium bg-[#111] py-2 px-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-white">
                      <Smile className="w-3.5 h-3.5" /> {positiveCount} Pos
                    </div>
                    <div className="w-px h-3 bg-white/10"></div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Meh className="w-3.5 h-3.5" /> {neutralCount} Neu
                    </div>
                    <div className="w-px h-3 bg-white/10"></div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Frown className="w-3.5 h-3.5" /> {negativeCount} Neg
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[92px] flex flex-col items-center justify-center text-slate-500 text-sm italic bg-[#161616] rounded-xl border border-white/5 border-dashed relative z-10">
                  <span>No feedback received yet</span>
                </div>
              )}
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
