import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import AnimatedHeader from "@/components/AnimatedHeader";
import ProjectSettingsForm from "@/components/ProjectSettingsForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*, project_settings(*)")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  // Ensure settings exist (fallback if trigger failed)
  const settingsData = Array.isArray(project.project_settings) 
    ? project.project_settings[0] 
    : project.project_settings;

  let settings = settingsData || {
    theme_mode: "auto",
    accent_color: "indigo",
    font_family: "inter",
    button_style: "solid",
    trigger_type: "floating",
    unseen_badge: true,
    custom_domain: "",
    seo_title: "",
    seo_description: "",
    seo_og_image: "",
    header_title: "Latest Updates",
    header_description: "What's new in our product",
    trigger_icon: "bell",
    widget_position: "bottom-right",
    hide_branding: false,
  };

  return (
    <main className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>

      <AnimatedHeader 
        title={`${project.name} Settings`}
        description="Customize branding, widget behavior, and SEO for this project."
      />

      <div className="mt-8">
        <ProjectSettingsForm project={project} initialSettings={settings} />
      </div>
    </main>
  );
}
