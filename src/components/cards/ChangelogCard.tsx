"use client";
import { motion } from "framer-motion";
import { FileText, Sparkles, ArrowRight } from "lucide-react";
import { useTilt } from "../../hooks/useTilt";

export function ChangelogCard({ onClick }: { onClick?: () => void }) {
  const tilt = useTilt();

  return (
    <motion.div 
      onClick={onClick}
      {...tilt.handlers}
      style={tilt.style}
      whileHover={{ scale: 1.05, y: -8, rotate: 2 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="group relative glass p-1 rounded-2xl w-64 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col cursor-none bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 hover:border-white/20 hover:bg-white/[0.1] transition-all duration-300"
    >
      {/* Dynamic Glow Effect behind the card */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[24px] blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10"></div>

      {/* Header/Hero of the Card */}
      <div className="h-32 w-full bg-gradient-to-br from-blue-900/50 via-indigo-900/40 to-purple-900/50 relative rounded-t-xl overflow-hidden flex flex-col justify-between p-3 border border-white/5">
         {/* Premium Unsplash abstract background */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-125 transition-transform duration-1000 ease-out"></div>
         {/* Fade gradient from bottom */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90"></div>
         
         {/* Top Section in Header */}
         <div className="relative z-10 flex justify-between items-start w-full">
           <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 backdrop-blur-md border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-300">
              <FileText size={18} className="group-hover:rotate-12 transition-transform duration-300" />
           </div>
           {/* 'Live' Status indicator */}
           <div className="flex flex-col items-end">
             <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               <span className="text-blue-200 text-[8px] font-bold uppercase tracking-widest leading-none mt-px">Live</span>
             </div>
           </div>
         </div>

         {/* Mock text lines to simulate document content */}
         <div className="relative z-10 w-full space-y-1.5 mt-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
           <div className="h-1.5 w-4/5 bg-white/20 rounded-full overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite]"></div>
           </div>
           <div className="h-1.5 w-1/2 bg-white/10 rounded-full"></div>
         </div>
      </div>

      {/* Body Section */}
      <div className="p-4 pt-3 relative">
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-1.5">
            <h3 className="text-white/95 font-semibold text-sm tracking-tight group-hover:text-blue-300 transition-colors">Changelog</h3>
            <Sparkles size={12} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-[10px] font-mono font-medium text-blue-200 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">v2.4.0</span>
        </div>
        
        <p className="text-white/50 text-xs leading-relaxed mb-4">
          Auto-generated beautiful release notes summarizing your latest commits.
        </p>

        {/* Footer info: Date & Avatars */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <span className="text-white/30 text-[11px] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
            Just now
          </span>
          <div className="flex items-center gap-2">
             <div className="flex -space-x-2">
               <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-[1.5px] border-[#0a0a0a] shadow-sm z-20"></div>
               <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 border-[1.5px] border-[#0a0a0a] shadow-sm z-10"></div>
             </div>
             <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
                <ArrowRight size={12} className="text-white/40 group-hover:text-blue-300 transition-colors group-hover:translate-x-0.5" />
             </div>
          </div>
        </div>
      </div>

      {/* Premium Tooltip with Triangle Pointer */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-64 bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 p-4 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] scale-95 group-hover:scale-100 origin-bottom">
        <p className="text-xs text-white/70 leading-relaxed text-center">
          <strong className="text-white block mb-1.5 font-semibold text-sm">Public Changelog</strong> 
          Host a dedicated, SEO-optimized public changelog page that builds trust and keeps your customers informed.
        </p>
        {/* Tooltip Triangle Arrow pointing down */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0f] border-r border-b border-white/10 rotate-45"></div>
      </div>
    </motion.div>
  );
}
