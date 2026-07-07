import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AnimatedHeader from "@/components/AnimatedHeader";
import FeatureRequestsBoard from "./FeatureRequestsBoard";
import { FolderKanban, ChevronRight } from "lucide-react";

export default async function FeatureRequestsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
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
      <main className="max-w-6xl mx-auto">
        <AnimatedHeader 
          title="Feature Requests" 
          description="Manage and prioritize what your users want." 
        />
        <div className="bg-[#111] border border-white/10 rounded-2xl p-10 text-center mt-6">
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
          <p className="text-slate-400">You need to create a project first before you can manage feature requests.</p>
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
          description="Choose a project to manage its feature requests." 
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              href={`/dashboard/feature-requests?projectId=${project.id}`}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col group hover:border-white/20 transition-all hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FolderKanban className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
              <div className="mt-auto pt-4 flex items-center justify-between text-sm text-slate-400 group-hover:text-white transition-colors">
                <span>Manage Requests</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  // Determine active project
  const activeProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId) || projects[0]
    : projects[0];

  // If we arrived here without a projectId but one was auto-selected, redirect to the URL with param
  // This is optional, but ensures the URL is always explicit when a project is selected
  if (!selectedProjectId && projects.length === 1) {
    redirect(`/dashboard/feature-requests?projectId=${projects[0].id}`);
  }

  return (
    <main className="max-w-6xl mx-auto flex flex-col xl:h-[calc(100vh-6rem)] px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AnimatedHeader 
          title="Feature Requests" 
          description={`Manage the roadmap for ${activeProject.name}`} 
        />
        {projects.length > 1 && (
          <Link 
            href="/dashboard/feature-requests"
            className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            Change Project
          </Link>
        )}
      </div>
      <div className="mt-6 flex-1 xl:overflow-hidden">
        <FeatureRequestsBoard projectId={activeProject.id} />
      </div>
    </main>
  );
}
