"use client";

import { motion } from "framer-motion";
import { PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: PenTool,
    title: "Write an Update",
    desc: "Draft your latest release note in our clean, distraction-free dashboard.",
    color: "text-blue-400",
    bg: "from-blue-500 to-transparent"
  },
  {
    icon: Code,
    title: "Copy the Snippet",
    desc: "Grab the unique, lightweight <script> tag generated for your project.",
    color: "text-indigo-400",
    bg: "from-indigo-500 to-transparent"
  },
  {
    icon: Rocket,
    title: "Paste & Publish",
    desc: "Drop it into your root layout file, and your changelog is instantly live.",
    color: "text-purple-400",
    bg: "from-purple-500 to-transparent"
  }
];

export default function IntegrationSection() {
  return (
    <section className="w-full bg-[#0a0a0a] relative z-20 flex flex-col items-center overflow-hidden">
      
      {/* Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* SECOND SECTION: How It Works */}
      <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center py-16 md:py-20 px-4 relative z-10 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[400px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[400px] h-[300px] bg-purple-500/10 blur-[120px] pointer-events-none z-0" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-7xl relative z-10 flex flex-col items-center"
        >
          {/* Header */}
          <div className="text-center mb-16 md:mb-20 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-white/10 text-slate-300 text-xs md:text-sm font-medium mb-6 shadow-xl backdrop-blur-md">
              <Rocket className="w-4 h-4 text-indigo-400" />
              Integration
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-[1.1]">
              Live in <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">3 Simple Steps.</span>
            </h2>
          </div>

          {/* Steps Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full relative">
            
            {/* Animated Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[40px] md:top-[48px] left-[15%] right-[15%] h-[2px] bg-white/5 z-0 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              />
            </div>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 + idx * 0.2, duration: 0.6, type: "spring", stiffness: 60 }}
                  className="relative z-10 flex flex-col items-center group"
                >
                  {/* Glowing Step Number / Icon Container */}
                  <div className="relative mb-10">
                    {/* Hover Glow Behind */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bg} rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-700 ease-out`}></div>
                    
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-white/20 transition-all duration-500 group-hover:-translate-y-2">
                      {/* Number Indicator */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-indigo-500 border-2 border-[#0a0a0a] text-white font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(99,102,241,0.5)] z-20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-indigo-400">
                        {idx + 1}
                      </div>
                      
                      {/* Inner gradient fill */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                      <Icon className={`w-8 h-8 md:w-10 md:h-10 ${step.color} relative z-10 transition-transform duration-500 group-hover:scale-110`} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="bg-[#111111]/50 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 md:p-8 text-center w-full max-w-sm hover:bg-[#181818]/80 hover:border-white/10 transition-all duration-300 shadow-xl">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
