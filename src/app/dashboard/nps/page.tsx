import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AnimatedHeader from "@/components/AnimatedHeader";
import { getNpsData } from "@/app/actions/nps";
import { FolderKanban, ChevronRight, BarChart2, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default async function NpsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const selectedProjectId = searchParams.projectId as string | undefined;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user's projects
  const { data: projects } = await supabase
    .from("projects")
    .select("id, name")
    .order("created_at", { ascending: false });

  if (!projects || projects.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <AnimatedHeader 
          title="NPS Surveys" 
          description="Measure customer loyalty and satisfaction." 
        />
        <div className="bg-[#111] border border-white/10 rounded-2xl p-10 text-center mt-6">
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
          <p className="text-slate-400">You need to create a project first before you can measure NPS.</p>
        </div>
      </main>
    );
  }

  // If no project selected and multiple exist, show selection screen
  if (!selectedProjectId && projects.length > 1) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <AnimatedHeader 
          title="Select a Project" 
          description="Choose a project to view its NPS score." 
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              href={`/dashboard/nps?projectId=${project.id}`}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col group hover:border-white/20 transition-all hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FolderKanban className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
              <div className="mt-auto pt-4 flex items-center justify-between text-sm text-slate-400 group-hover:text-white transition-colors">
                <span>View NPS</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  const activeProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId) || projects[0]
    : projects[0];

  if (!selectedProjectId && projects.length === 1) {
    redirect(`/dashboard/nps?projectId=${projects[0].id}`);
  }

  // Fetch NPS Data
  const npsData = await getNpsData(activeProject.id);

  if ('error' in npsData) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">
        <p className="text-red-400">Error loading NPS data.</p>
      </main>
    );
  }

  const { score, total, breakdown, responses } = npsData;
  const promoterPct = total > 0 ? Math.round((breakdown.promoters / total) * 100) : 0;
  const passivePct = total > 0 ? Math.round((breakdown.passives / total) * 100) : 0;
  const detractorPct = total > 0 ? Math.round((breakdown.detractors / total) * 100) : 0;

  let ScoreIcon = Minus;
  let scoreColor = "text-slate-400";
  if (score > 30) {
    ScoreIcon = TrendingUp;
    scoreColor = "text-green-400";
  } else if (score < 0) {
    ScoreIcon = TrendingDown;
    scoreColor = "text-red-400";
  }

  return (
    <main className="max-w-6xl mx-auto flex flex-col px-4 sm:px-6 py-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AnimatedHeader 
          title="Net Promoter Score" 
          description={`Customer loyalty metrics for ${activeProject.name}`} 
        />
        {projects.length > 1 && (
          <Link 
            href="/dashboard/nps"
            className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            Change Project
          </Link>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="lg:col-span-1 bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
          <div className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-widest">Overall NPS</div>
          
          <div className={`text-7xl font-bold tracking-tighter flex items-center gap-4 ${scoreColor}`}>
            {score}
          </div>
          
          <div className="mt-8 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <BarChart2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">{total} Responses</span>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col justify-center">
          <h3 className="text-lg font-medium text-white mb-6">Score Breakdown</h3>
          
          <div className="space-y-6">
            {/* Promoters */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-400 font-medium">Promoters (9-10)</span>
                <span className="text-slate-400">{breakdown.promoters} ({promoterPct}%)</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5">
                <div className="bg-green-400/80 h-full rounded-full transition-all duration-1000" style={{ width: `${promoterPct}%` }}></div>
              </div>
            </div>

            {/* Passives */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Passives (7-8)</span>
                <span className="text-slate-400">{breakdown.passives} ({passivePct}%)</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5">
                <div className="bg-slate-500/80 h-full rounded-full transition-all duration-1000" style={{ width: `${passivePct}%` }}></div>
              </div>
            </div>

            {/* Detractors */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-red-400 font-medium">Detractors (0-6)</span>
                <span className="text-slate-400">{breakdown.detractors} ({detractorPct}%)</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5">
                <div className="bg-red-400/80 h-full rounded-full transition-all duration-1000" style={{ width: `${detractorPct}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedback List */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Responses</h3>
        {responses.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-slate-400">No NPS responses collected yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((resp) => (
              <div key={resp.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 group hover:border-white/20 transition-colors">
                <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-xl font-bold border ${
                  resp.score >= 9 ? 'bg-green-400/10 text-green-400 border-green-400/20' : 
                  resp.score >= 7 ? 'bg-slate-500/10 text-slate-300 border-slate-500/20' : 
                  'bg-red-400/10 text-red-400 border-red-400/20'
                }`}>
                  {resp.score}
                </div>
                <div className="flex-1">
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                    {resp.comment ? `"${resp.comment}"` : <span className="text-slate-500 italic">No comment provided</span>}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="bg-white/5 px-2 py-1 rounded-md">{new Date(resp.created_at).toLocaleDateString()}</span>
                    {resp.user_identifier && <span>User: {resp.user_identifier}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
