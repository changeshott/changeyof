"use client";
import { motion } from "framer-motion";
import { GitCommit, Sparkles } from "lucide-react";
import { useTilt } from "../../hooks/useTilt";

export function CodeDiffCard({ onClick }: { onClick?: () => void }) {
  const tilt = useTilt();
  
  return (
    <motion.div 
      onClick={onClick}
      {...tilt.handlers}
      style={tilt.style}
      whileHover={{ scale: 1.05, y: -8, rotate: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="group relative glass p-1 rounded-2xl w-72 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col cursor-none bg-[#050505]/40 border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 overflow-visible"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-slate-400 via-slate-400 to-green-500 rounded-[24px] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>

      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/5 rounded-t-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex gap-1.5 relative z-10">
          <div className="w-3 h-3 rounded-full bg-slate-400/80 shadow-[0_0_5px_rgba(239,68,68,0.5)] group-hover:shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-shadow" />
          <div className="w-3 h-3 rounded-full bg-slate-400/80 shadow-[0_0_5px_rgba(234,179,8,0.5)] group-hover:shadow-[0_0_10px_rgba(234,179,8,0.8)] transition-shadow" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)] group-hover:shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-shadow" />
        </div>
        <div className="flex items-center gap-1.5 relative z-10">
           <Sparkles size={12} className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
           <GitCommit size={14} className="text-white/30 group-hover:text-white/80 transition-colors group-hover:rotate-180 duration-500" />
        </div>
      </div>
      <div className="p-4 font-mono text-[11px] leading-relaxed relative overflow-hidden rounded-b-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 z-0 pointer-events-none"></div>
        <div className="text-slate-300/90 bg-white/5 px-2 py-0.5 rounded-md mb-1.5 border border-white/5 relative z-10">- const workflow = &quot;manual&quot;;</div>
        <div className="text-green-400/90 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/10 relative z-10">+ const workflow = &quot;automated&quot;;</div>
      </div>

      {/* Premium Tooltip */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-64 bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 p-3.5 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] scale-95 group-hover:scale-100 origin-top">
        <p className="text-xs text-white/70 leading-relaxed text-center">
          <strong className="text-white block mb-1 font-semibold text-sm">Git Integration</strong> 
          Automatically sync with GitHub or GitLab to pull commit diffs and instantly generate human-readable release notes.
        </p>
        {/* Tooltip Triangle Arrow pointing up */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0f] border-t border-l border-white/10 rotate-45"></div>
      </div>
    </motion.div>
  );
}
