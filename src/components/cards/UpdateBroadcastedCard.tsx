"use client";
import { motion } from "framer-motion";
import { Bell, Radio, Sparkles } from "lucide-react";
import { useTilt } from "../../hooks/useTilt";

export function UpdateBroadcastedCard({ onClick }: { onClick?: () => void }) {
  const tilt = useTilt();

  return (
    <motion.div 
      onClick={onClick}
      {...tilt.handlers}
      style={tilt.style}
      whileHover={{ scale: 1.05, y: -8, rotate: -2 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="group relative glass p-1 rounded-2xl w-64 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col cursor-none bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-white/20 hover:bg-white/[0.1] transition-all duration-300"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[24px] blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10"></div>

      <div className="h-28 w-full bg-indigo-950/30 relative rounded-t-xl overflow-hidden flex items-center justify-center border border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-125 transition-transform duration-1000 ease-out"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/80"></div>
        <div className="relative z-10 w-14 h-14 rounded-full bg-indigo-500/30 flex items-center justify-center text-indigo-300 border border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.5)] backdrop-blur-sm group-hover:shadow-[0_0_35px_rgba(99,102,241,0.8)] transition-all duration-300">
          <div className="group-hover:scale-110 transition-transform duration-300">
             <Radio size={26} className="animate-pulse" />
          </div>
        </div>
      </div>
      <div className="p-4 pt-3 relative">
        <div className="flex items-center justify-between mb-1 gap-2">
          <div className="flex items-center gap-1.5">
            <h3 className="text-white/90 font-semibold text-sm tracking-tight group-hover:text-indigo-300 transition-colors">Broadcast Sent</h3>
            <Sparkles size={12} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <Bell size={14} className="text-white/40 group-hover:text-indigo-300 transition-colors" />
        </div>
        <p className="text-indigo-300/80 text-xs font-mono mb-3">12,409 Users Reached</p>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative z-0"
          />
        </div>
      </div>

      {/* Premium Tooltip */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-64 bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 p-3.5 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] scale-95 group-hover:scale-100 origin-top">
        <p className="text-xs text-white/70 leading-relaxed text-center">
          <strong className="text-white block mb-1 font-semibold text-sm">Global Broadcasting</strong> 
          Instantly push your latest updates to thousands of active users through our high-speed edge network.
        </p>
        {/* Tooltip Triangle Arrow pointing up */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0f] border-t border-l border-white/10 rotate-45"></div>
      </div>
    </motion.div>
  );
}
