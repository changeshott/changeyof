import { Globe } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import ProjectForm from "@/components/ProjectForm";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import AnimatedHeader from "@/components/AnimatedHeader";

export default async function ProjectsPage() {
  const supabase = await createClient();
  
  // Ambil data project dari database
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <main className="max-w-6xl mx-auto">
      <AnimatedHeader 
        title="Projects"
        description="Manage your applications and domains."
      >
        <ProjectForm />
      </AnimatedHeader>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <div key={project.id} className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors flex flex-col justify-between h-48 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold truncate max-w-[150px]">{project.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ProjectForm project={project} />
                    <DeleteProjectButton id={project.id} projectName={project.name} />
                  </div>
                </div>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {project.domain || "No domain"}
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 text-xs text-slate-500 flex justify-between items-center">
                <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:underline">
                  View Widget ID
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/20 rounded-2xl bg-white/5">
          <Globe className="w-10 h-10 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
          <p className="text-slate-400 mb-6">Create a project to get your widget script tag.</p>
          <div className="flex justify-center">
            <ProjectForm />
          </div>
        </div>
      )}
    </main>
  );
}
