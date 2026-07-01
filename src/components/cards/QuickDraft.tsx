"use client";

import { useState } from "react";
import { PenTool, CheckCircle2 } from "lucide-react";
import { createRelease } from "@/app/actions/dashboard";

interface QuickDraftProps {
  projects: any[];
  className?: string;
}

export default function QuickDraft({ projects = [], className = "" }: QuickDraftProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projects.length === 0) return;
    
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    // Force status to draft
    formData.append("status", "draft");
    
    const result = await createRelease(formData);
    
    setIsLoading(false);
    if (result.error) {
      alert(result.error);
    } else {
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <div className={`bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl pointer-events-none rounded-full transition-opacity group-hover:bg-pink-500/10"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center">
          <PenTool className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-300">Quick Draft</h3>
          <p className="text-xs text-slate-500">Jot down an idea for a release note</p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
          Create a project first to use Quick Draft.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select 
              name="project_id" 
              required
              className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <select 
              name="type" 
              required
              className="w-1/3 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors"
            >
              <option value="New">New</option>
              <option value="Improvement">Improvement</option>
              <option value="Fix">Fix</option>
            </select>
            <input 
              type="text" 
              name="title" 
              required 
              placeholder="Draft title..."
              className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
          
          <div>
            <textarea 
              name="content" 
              required
              rows={3}
              placeholder="What's this update about?"
              className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 transition-colors resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || isSuccess}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            {isLoading ? "Saving..." : isSuccess ? (
              <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Saved as Draft</>
            ) : "Save Draft"}
          </button>
        </form>
      )}
    </div>
  );
}
