import { Globe, Plus, MessageSquare, Code, Settings } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import ProjectForm from "@/components/ProjectForm";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import AnimatedHeader from "@/components/AnimatedHeader";
import Link from "next/link";

export default async function ProjectsPage() {
  const supabase = await createClient();
  
  // Ambil data project dari database beserta count dari relasi
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, release_notes(id, feedbacks(count))')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <main className="max-w-6xl mx-auto">
      <AnimatedHeader 
        title="Projects"
        description="Manage your applications and jump straight into action."
      >
        <ProjectForm />
      </AnimatedHeader>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => {
            const releaseCount = project.release_notes?.length || 0;
            let feedbackCount = 0;
            if (project.release_notes) {
              project.release_notes.forEach((rn: any) => {
                feedbackCount += rn.feedbacks?.[0]?.count || 0;
              });
            }

            return (
              <div key={project.id} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col group shadow-2xl relative">
                
                {/* Header */}
                <div className="p-5 pb-4 border-b border-white/5 flex items-start justify-between bg-[#161616]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 text-slate-300 rounded-xl flex items-center justify-center shadow-sm">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-white leading-tight">{project.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${project.domain ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                        <p className="text-xs text-slate-400 font-mono">
                          {project.domain || "No domain"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Context Actions (Visible on Hover) */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ProjectForm project={project} />
                    <DeleteProjectButton id={project.id} projectName={project.name} />
                  </div>
                </div>
                
                {/* Stats */}
                <div className="px-5 py-4 flex gap-6 border-b border-white/5 flex-1">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">Releases</p>
                    <p className="text-xl font-bold text-slate-200">{releaseCount}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">Feedbacks</p>
                    <p className="text-xl font-bold text-slate-200">{feedbackCount}</p>
                  </div>
                </div>

                {/* Quick Actions Footer */}
                <div className="p-3 bg-[#0a0a0a] grid grid-cols-3 gap-2 shrink-0">
                  <Link 
                    href={`/dashboard/releases/new`}
                    className="flex items-center justify-center gap-1.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-md text-xs font-medium transition-colors border border-white/5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Release
                  </Link>
                  <Link 
                    href={`/dashboard/analytics`}
                    className="flex items-center justify-center gap-1.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-md text-xs font-medium transition-colors border border-white/5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Feedbacks
                  </Link>
                  <Link 
                    href={`/dashboard/widget`}
                    className="flex items-center justify-center gap-1.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-md text-xs font-medium transition-colors border border-white/5"
                  >
                    <Code className="w-3.5 h-3.5" /> Widget
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/20 rounded-2xl bg-[#111]">
          <Globe className="w-10 h-10 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">No projects yet</h3>
          <p className="text-slate-400 mb-6 text-sm">Create a project to get your widget script tag and start writing releases.</p>
          <div className="flex justify-center">
            <ProjectForm />
          </div>
        </div>
      )}
    </main>
  );
}
