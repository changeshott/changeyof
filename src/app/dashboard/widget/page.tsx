"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Code2, Copy, CheckCircle2, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export default function WidgetSetupPage() {
  const supabase = createClient();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
    const fetchProjects = async () => {
      const { data } = await supabase.from("projects").select("id, name");
      if (data) {
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId(data[0].id);
        }
      }
    };
    fetchProjects();
  }, [supabase]);

  const getEmbedCode = () => {
    if (!selectedProjectId) return "";
    return `<iframe \n  src="${baseUrl}/widget/${selectedProjectId}" \n  width="400" \n  height="600" \n  style="border:none; border-radius:12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"\n  allowtransparency="true"\n></iframe>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getEmbedCode());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <LayoutTemplate className="w-8 h-8 text-indigo-400" />
          Widget Installation
        </h1>
        <p className="text-slate-400">Copy the embed code and paste it into your website's HTML to show your changelog.</p>
      </header>

      {projects.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <Code2 className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No projects available</h3>
          <p className="text-slate-400 mb-6">You need to create a project first before generating a widget script.</p>
          <Link href="/dashboard/projects" className="bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-600 transition-colors inline-block">
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                1. Select Project
              </label>
              <select 
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 appearance-none"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  2. Customize Appearance (Coming Soon)
                </label>
                <div className="opacity-50 pointer-events-none space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked readOnly className="rounded bg-black border-white/20" />
                    <span className="text-sm">Dark Mode</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked readOnly className="rounded bg-black border-white/20" />
                    <span className="text-sm">Show Dates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-slate-300">
                  3. Copy Embed Code
                </label>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {isCopied ? "Copied!" : "Copy Code"}
                </button>
              </div>
              
              <pre className="bg-black/80 border border-white/5 rounded-xl p-5 overflow-x-auto text-sm text-emerald-400 font-mono shadow-inner">
                <code>{getEmbedCode()}</code>
              </pre>

              <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <h4 className="text-indigo-400 font-semibold text-sm mb-1">How to use this?</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Paste this iframe code exactly where you want the changelog to appear on your website (e.g., inside a sidebar, modal, or dedicated release page). The widget will automatically sync with your latest published release notes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
