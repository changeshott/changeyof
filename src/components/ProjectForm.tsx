"use client";

import { useState } from "react";
import { Plus, X, Pencil } from "lucide-react";
import { createProject, updateProject } from "@/app/actions/dashboard";

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
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2">{project ? "Edit Project" : "New Project"}</h2>
            <p className="text-slate-400 text-sm mb-6">Enter your website details to generate the widget.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Project Name</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={project?.name}
                  required 
                  maxLength={100}
                  placeholder="E.g., Tokopedia"
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Domain (Optional)</label>
                <input 
                  type="text" 
                  name="domain" 
                  defaultValue={project?.domain}
                  maxLength={100}
                  placeholder="E.g., tokopedia.com"
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">GitHub Repo (Optional)</label>
                <input 
                  type="text" 
                  name="github_repo" 
                  defaultValue={project?.github_repo}
                  maxLength={100}
                  placeholder="owner/repo (e.g. vercel/next.js)"
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <p className="text-xs text-slate-500 mt-1">Link your repo for AI-powered auto-drafts.</p>
              </div>
              {project?.github_webhook_secret && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Webhook Secret</label>
                  <input 
                    type="text" 
                    readOnly
                    value={project.github_webhook_secret}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-slate-400 focus:outline-none font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">Use this secret when setting up the webhook in GitHub.</p>
                </div>
              )}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2.5 rounded-lg transition-colors mt-6 disabled:opacity-50"
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
