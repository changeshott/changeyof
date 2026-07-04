"use client";

import { useState } from "react";
import { PenTool, CheckCircle2, ChevronDown, Rocket } from "lucide-react";
import { createRelease } from "@/app/actions/dashboard";

interface QuickDraftProps {
  projects: { id: string; name: string }[];
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
    <div className={`bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/20 transition-colors ${className}`}>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 bg-white/5 border border-white/10 text-slate-300 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
          <PenTool className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-white tracking-tight">Quick Draft</h3>
          <p className="text-xs text-slate-400">Jot down an idea for a release note</p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center bg-black/50 border border-dashed border-white/10 rounded-xl relative z-10">
          <Rocket className="w-6 h-6 text-slate-600 mb-2" />
          <p className="text-slate-400 font-medium text-xs">Create a project first to use Quick Draft.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="relative">
            <select 
              name="project_id" 
              required
              defaultValue=""
              className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm font-medium text-white appearance-none focus:outline-none focus:border-slate-500 transition-colors hover:bg-white/5 cursor-pointer"
            >
              <option value="" disabled>Select a Project...</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#111]">{p.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
          
          <div className="flex gap-2">
            <div className="relative w-1/3">
              <select 
                name="type" 
                required
                className="w-full h-full bg-black border border-white/10 rounded-lg pl-3 pr-7 py-2.5 text-sm font-medium text-white appearance-none focus:outline-none focus:border-slate-500 transition-colors hover:bg-white/5 cursor-pointer"
              >
                <option value="New">New</option>
                <option value="Improvement">Improvement</option>
                <option value="Fix">Fix</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
            
            <input 
              type="text" 
              name="title" 
              required 
              placeholder="Give it a catchy title..."
              className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm font-medium text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 transition-colors hover:bg-white/5"
            />
          </div>
          
          <div>
            <textarea 
              name="content" 
              required
              rows={3}
              placeholder="What's this update about?"
              className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm font-medium text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 transition-colors hover:bg-white/5 resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || isSuccess}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-black font-semibold py-2.5 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm"
          >
            {isLoading ? "Saving Draft..." : isSuccess ? (
              <><CheckCircle2 className="w-4 h-4" /> Saved</>
            ) : "Save to Drafts"}
          </button>
        </form>
      )}
    </div>
  );
}
