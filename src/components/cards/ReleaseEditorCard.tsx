"use client";
import { motion } from "framer-motion";
import { PenTool, Sparkles } from "lucide-react";
import { useTilt } from "../../hooks/useTilt";

export function ReleaseEditorCard({ onClick }: { onClick?: () => void }) {
  const tilt = useTilt();
  
  return (
    <motion.div 
      onClick={onClick}
      {...tilt.handlers}
      style={tilt.style}
      whileHover={{ scale: 1.05, y: -8, rotate: 2 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="group relative glass p-4 rounded-2xl w-64 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-3 cursor-none bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-slate-400 rounded-[24px] blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10"></div>

      <div className="h-20 w-full bg-gradient-to-r from-pink-500/10 to-slate-400/10 relative rounded-t-xl p-3 flex flex-col justify-end overflow-hidden border border-white/5">
         <div className="absolute top-3 right-3 text-pink-400/50 group-hover:text-pink-300 transition-colors group-hover:rotate-12 duration-300">
           <PenTool size={16} />
         </div>
         <h4 className="text-pink-300 font-medium text-xs flex items-center gap-1 group-hover:scale-105 origin-left transition-transform"><Sparkles size={12}/> AI Editor Active</h4>
      </div>
      <div className="p-4 pt-3 space-y-2.5 relative">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
           <div className="w-1/3 h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full relative z-0 group-hover:w-1/2 transition-all duration-700 ease-out"></div>
        </div>
        <div className="w-4/5 h-2 bg-white/5 rounded-full" />
        <div className="w-2/3 h-2 bg-white/5 rounded-full" />
      </div>

      {/* Premium Tooltip */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-64 bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 p-3.5 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] scale-95 group-hover:scale-100 origin-top">
        <p className="text-xs text-white/70 leading-relaxed text-center">
          <strong className="text-white block mb-1 font-semibold text-sm">AI Release Editor</strong> 
          Draft beautiful release notes faster with our AI-powered rich text editor. Supports Markdown and real-time collaboration.
        </p>
        {/* Tooltip Triangle Arrow pointing up */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0f] border-t border-l border-white/10 rotate-45"></div>
      </div>
    </motion.div>
  );
}
