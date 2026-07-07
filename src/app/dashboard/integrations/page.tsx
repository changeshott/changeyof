import { GitPullRequest, Link as LinkIcon, GitBranch, ArrowRight } from "lucide-react";

import AnimatedHeader from "@/components/AnimatedHeader";

export default function IntegrationsPage() {
  return (
    <main className="max-w-4xl mx-auto">
      <AnimatedHeader 
        title="Integrations"
        description="Connect Changeyof to your existing workflow."
      />

      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl pointer-events-none rounded-full"></div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <GitPullRequest className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">GitHub Sync</h2>
              <p className="text-slate-400 text-sm max-w-md">
                Automatically generate draft release notes from your merged Pull Requests and commits.
              </p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors whitespace-nowrap">
            <LinkIcon className="w-4 h-4" /> Connect GitHub
          </button>
        </div>

        <div className="bg-black/50 border border-white/5 rounded-xl p-6">
          <h3 className="font-semibold text-sm mb-4 text-slate-300">How it works</h3>
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="flex-1">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3">
                <GitBranch className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-sm text-slate-400">1. You merge a Pull Request in your connected repository.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />
            <div className="flex-1">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3">
                <span className="font-bold text-white font-mono">AI</span>
              </div>
              <p className="text-sm text-slate-400">2. Our AI reads the diff and summarizes the technical changes.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />
            <div className="flex-1">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-slate-400">3. A new draft is instantly created in your Releases dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
