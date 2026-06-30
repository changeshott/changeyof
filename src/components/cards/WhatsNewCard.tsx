"use client";
import { motion } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";
import { useTilt } from "../../hooks/useTilt";

export function WhatsNewCard({ onClick }: { onClick?: () => void }) {
  const tilt = useTilt();
  
  return (
    <motion.div 
      onClick={onClick}
      {...tilt.handlers}
      style={tilt.style}
      whileHover={{ scale: 1.05, y: -8, rotate: -1 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="group relative glass p-3 rounded-2xl w-64 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 cursor-none border border-white/10 bg-gradient-to-br from-yellow-500/[0.05] to-transparent hover:border-white/20 hover:bg-white/[0.1] transition-all duration-300"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-[24px] blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10"></div>

      <div className="relative">
        <div className="absolute inset-0 bg-yellow-500/30 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-14 h-14 rounded-2xl bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center border border-yellow-500/30 flex items-center justify-center text-white shadow-lg overflow-hidden group-hover:border-yellow-400/50 transition-colors">
          <div className="absolute inset-0 bg-yellow-500/20 backdrop-blur-sm mix-blend-overlay group-hover:scale-125 transition-transform duration-1000 ease-out"></div>
          <Zap size={24} className="drop-shadow-[0_0_15px_rgba(250,204,21,0.9)] relative z-10 text-yellow-300 group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="flex items-center gap-1.5 mb-0.5">
           <h3 className="text-white/90 font-bold text-sm tracking-tight group-hover:text-yellow-300 transition-colors">What&apos;s New</h3>
           <Sparkles size={12} className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-white/50 text-xs">Seamless in-app sync</p>
      </div>

      {/* Premium Tooltip */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-64 bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 p-3.5 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] scale-95 group-hover:scale-100 origin-bottom">
        <p className="text-xs text-white/70 leading-relaxed text-center">
          <strong className="text-white block mb-1 font-semibold text-sm">In-App Widget</strong> 
          Keep your community engaged with a sleek &quot;What&apos;s New&quot; widget that integrates natively into your product&apos;s UI.
        </p>
        {/* Tooltip Triangle Arrow pointing down */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0f] border-r border-b border-white/10 rotate-45"></div>
      </div>
    </motion.div>
  );
}
