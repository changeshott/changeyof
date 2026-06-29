"use client";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Sparkles } from "lucide-react";
import { useTilt } from "../../hooks/useTilt";

export function EngagementCard({ onClick }: { onClick?: () => void }) {
  const tilt = useTilt();

  return (
    <motion.div 
      onClick={onClick}
      {...tilt.handlers}
      style={tilt.style}
      whileHover={{ scale: 1.05, y: -8, rotate: -2 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="group relative glass p-5 rounded-2xl w-56 shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-none flex flex-col bg-gradient-to-br from-emerald-500/[0.05] to-transparent border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[24px] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-shadow">
          <Activity size={20} className="group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
          <TrendingUp size={12} /> +24%
        </div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2">
           <h3 className="text-3xl font-bold text-white tracking-tighter group-hover:text-emerald-300 transition-colors">98.4<span className="text-emerald-400 text-xl">%</span></h3>
           <Sparkles size={16} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mt-1 group-hover:text-white/60 transition-colors">Engagement Rate</p>
      </div>
      
      {/* Premium Tooltip */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-64 bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 p-3.5 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] scale-95 group-hover:scale-100 origin-bottom">
        <p className="text-xs text-white/70 leading-relaxed text-center">
          <strong className="text-white block mb-1 font-semibold text-sm">Advanced Analytics</strong> 
          Track how users interact with your updates. Get actionable data on views, clicks, and user sentiment.
        </p>
        {/* Tooltip Triangle Arrow pointing down */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0f] border-r border-b border-white/10 rotate-45"></div>
      </div>
    </motion.div>
  );
}
