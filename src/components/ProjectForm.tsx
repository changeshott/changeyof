"use client";

import { useState } from "react";
import { Plus, X, Pencil } from "lucide-react";
import { createProject, updateProject } from "@/app/actions/dashboard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectForm({ project }: { project?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = project ? await updateProject(project.id, formData) : await createProject(formData);
    
    setIsLoading(false);
    if (result.error) {
      alert(result.error);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {project ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-xl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-1.5">{project ? "Edit Project" : "New Project"}</h2>
              <p className="text-slate-400 text-sm">Enter your website details to generate the widget.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Project Name</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={project?.name}
                  required 
                  maxLength={100}
                  placeholder="E.g., Tokopedia"
                  className="w-full bg-black border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Domain (Optional)</label>
                <input 
                  type="text" 
                  name="domain" 
                  defaultValue={project?.domain}
                  maxLength={100}
                  placeholder="E.g., tokopedia.com"
                  className="w-full bg-black border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">GitHub Repo (Optional)</label>
                <input 
                  type="text" 
                  name="github_repo" 
                  defaultValue={project?.github_repo}
                  maxLength={100}
                  placeholder="owner/repo (e.g. vercel/next.js)"
                  className="w-full bg-black border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                />
                <p className="text-[11px] text-slate-500 mt-1.5">Link your repo for AI-powered auto-drafts.</p>
              </div>
              {project?.github_webhook_secret && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Webhook Secret</label>
                  <input 
                    type="text" 
                    readOnly
                    value={project.github_webhook_secret}
                    className="w-full bg-white/5 border border-[#333] rounded-lg px-3 py-2.5 text-slate-400 focus:outline-none font-mono text-sm"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">Use this secret when setting up the webhook in GitHub.</p>
                </div>
              )}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white text-black text-sm font-semibold py-2.5 rounded-lg hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] mt-6 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {isLoading ? "Saving..." : project ? "Save Changes" : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
