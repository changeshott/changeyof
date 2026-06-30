"use client";

import { motion } from "framer-motion";
import { ArrowRight, BellRing } from "lucide-react";

export default function InteractiveDemoSection() {
  return (
    <section className="w-full py-24 md:py-32 relative bg-[#0a0a0a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_50%)] pointer-events-none z-0" />
      
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#1a1a24] to-[#0d0d14] border border-white/10 p-8 md:p-16 text-center shadow-[0_30px_100px_-20px_rgba(99,102,241,0.3)]"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2)_0,transparent_70%)] pointer-events-none" />

          {/* Pulsing Bell Icon (Decorative) */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -10, 10, -10, 10, 0] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="w-20 h-20 mx-auto bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
          >
            <BellRing size={40} />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-2xl mx-auto leading-tight">
            Don&apos;t Just Read About It. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Experience It.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
            👉 Click the floating bell icon in the bottom right corner of this screen to see the Changeyof widget in action!
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Try It Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

        </motion.div>
      </div>
    </section>
  );
}
