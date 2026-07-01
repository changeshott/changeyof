"use client";

import { Sparkles, Save, Send } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { createRelease } from "@/app/actions/dashboard";

export default function ReleaseEditorPage() {
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("New");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("projects").select("id, name");
      if (data) {
        setProjects(data);
        if (data.length > 0) {
          setProjectId(data[0].id);
        }
      }
    };
    fetchProjects();
  }, []);

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setTitle("Introducing AI-Powered Release Notes");
      setContent("We are thrilled to announce that Changeyof now supports AI-generated release notes! Simply paste your technical git commits, and our AI will translate them into beautiful, user-friendly announcements in seconds.\n\n### What's included:\n- One-click summaries\n- Automatic categorization (New, Fix, Improvement)\n- Tone adjustment for your brand");
      setIsGenerating(false);
    }, 1500);
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!title || !content || !projectId) {
      alert("Title, content, and project are required.");
      return;
    }
    
    setIsSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type", type);
    formData.append("status", status);
    formData.append("project_id", projectId);

    const result = await createRelease(formData);
    setIsSaving(false);

    if (result.error) {
      alert(result.error);
    } else {
      router.push("/dashboard/releases");
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/releases" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Craft Release Note</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-slate-300 hover:bg-white/5 transition-colors border border-white/10 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button 
            onClick={() => handleSave("published")}
            disabled={isSaving || projects.length === 0}
            className="flex items-center gap-2 bg-indigo-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Publish Now
          </button>
        </div>
      </header>

      {projects.length === 0 && (
        <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-3 rounded-lg text-sm">
          <strong>Wait!</strong> You need to create a project first before writing a release note. 
          <Link href="/dashboard/projects" className="underline ml-2">Go to Projects &rarr;</Link>
        </div>
      )}

      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="w-full md:flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              placeholder="E.g., Dark mode is finally here!" 
              className="w-full bg-transparent border-b border-white/20 pb-2 text-2xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-slate-400 mb-2">Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 appearance-none"
            >
              <option value="New">🚀 New Feature</option>
              <option value="Improvement">✨ Improvement</option>
              <option value="Fix">🐛 Bug Fix</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-slate-400 mb-2">Project</label>
            <select 
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              disabled={projects.length === 0}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 appearance-none disabled:opacity-50"
            >
              {projects.length === 0 ? (
                <option value="">No projects found</option>
              ) : (
                projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))
              )}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-400">Content (Markdown supported)</label>
            <button 
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-3 py-1.5 rounded-full hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3" />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </button>
          </div>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={5000}
            placeholder="Write your release notes here..." 
            className="w-full h-96 bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-mono text-sm leading-relaxed resize-none"
          ></textarea>
          <div className="text-right text-xs text-slate-500 mt-2">
            {content.length} / 5000
          </div>
        </div>
      </div>
    </main>
  );
}
