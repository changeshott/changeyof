"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowDownRight, Rocket, CheckCircle2, Loader2 } from "lucide-react";

export default function InteractiveDemoSection() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const handleTriggerRelease = () => {
    if (isDeploying || deployed) return;
    
    setIsDeploying(true);
    
    // Simulate a short "build and deploy" process
    setTimeout(() => {
      setIsDeploying(false);
      setDeployed(true);
      
      // Trigger the floating widget to update
      window.dispatchEvent(new Event("trigger-new-release"));
      
      // Reset state after a few seconds so they can do it again
      setTimeout(() => setDeployed(false), 5000);
    }, 1500);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] py-16 md:py-24 bg-transparent flex flex-col items-center justify-center z-30">
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 w-full flex flex-col items-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center flex flex-col items-center w-full"
        >
          {/* Header */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 leading-tight"
          >
            <motion.span
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="bg-[linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.4)_20%,rgba(0,0,0,1)_40%,rgba(0,0,0,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text"
            >
              Experience the Magic Instantly
            </motion.span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-sm md:text-sm text-slate-500 mb-8 md:mb-12 max-w-lg leading-relaxed px-4 mx-auto"
          >
            Click the button below to simulate pushing a new release to production. Watch how your users get notified in real-time without refreshing the page.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center w-full max-w-2xl"
          >
            <div className="flex flex-col items-center justify-center relative w-full pt-4">
              
              <button
                onClick={handleTriggerRelease}
                disabled={isDeploying || deployed}
                className={`relative overflow-hidden group px-8 py-3.5 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  deployed 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                    : 'bg-black text-white hover:bg-neutral-800 shadow-[0_0_30px_rgba(0,0,0,0.1)] hover:shadow-xl hover:scale-105 active:scale-95'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isDeploying ? (
                    <motion.div key="deploying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                    </motion.div>
                  ) : deployed ? (
                    <motion.div key="deployed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Live! Check Widget
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Push New Update
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Animated Hint Pointing to Widget */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={deployed ? { opacity: 1, y: [0, 10, 0] } : { opacity: 0 }}
                transition={deployed ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
                className="mt-8 flex flex-col items-center gap-2 text-slate-400"
              >
                <span className="text-xs font-medium">Look at the bottom right corner</span>
                <ArrowDownRight className="w-4 h-4" />
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
