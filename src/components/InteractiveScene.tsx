"use client";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import FloatingCards from "./FloatingCards";

export default function InteractiveScene({ 
  activeCard, 
  setActiveCard 
}: { 
  activeCard: string | null;
  setActiveCard: (id: string | null) => void;
}) {

  // x > 0 pans camera left (moving scene right)
  // y > 0 pans camera up (moving scene down)
  const getCameraAnimation = () => {
    switch (activeCard) {
      case "whatsnew": return { x: "30vw", y: "-25vh", scale: 1.4 };
      case "updatebroadcast": return { x: "25vw", y: "45vh", scale: 1.4 };
      case "engagement": return { x: "-10vw", y: "-55vh", scale: 1.4 };
      case "releaseeditor": return { x: "-15vw", y: "40vh", scale: 1.4 };
      case "changelog": return { x: "-15vw", y: "-55vh", scale: 1.4 };
      case "codediff": return { x: "-40vw", y: "-25vh", scale: 1.4 };
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  const getOverlayContent = () => {
    switch (activeCard) {
      case "whatsnew":
        return {
          position: "right", colorClasses: "bg-slate-400/20 text-yellow-300 border-slate-400/30",
          badge: "Spotlight", title: "In-App Widget",
          desc: "Keep your community engaged without leaving your product. Sync release notes and gather feedback in real-time.",
        };
      case "updatebroadcast":
        return {
          position: "right", colorClasses: "bg-white/10 text-slate-200 border-white/10",
          badge: "Network", title: "Instant Broadcast",
          desc: "Push updates to thousands of users instantly. Our edge network ensures everyone is on the same page, zero latency.",
        };
      case "engagement":
        return {
          position: "right", colorClasses: "bg-white/10 text-emerald-300 border-white/30",
          badge: "Analytics", title: "Engagement Metrics",
          desc: "Track exactly how users interact with updates. Measure open rates and sentiment to understand your audience.",
        };
      case "releaseeditor":
        return {
          position: "left", colorClasses: "bg-pink-500/20 text-pink-300 border-pink-500/30",
          badge: "Creation", title: "AI-Powered Editor",
          desc: "Craft release notes in seconds. Use AI to summarize technical commits into user-friendly announcements.",
        };
      case "changelog":
        return {
          position: "left", colorClasses: "bg-white/10 text-white/90 border-white/20",
          badge: "Docs", title: "Beautiful Changelogs",
          desc: "Host an ultra-modern changelog page that builds trust. Showcase your product's momentum and shipped value.",
        };
      case "codediff":
        return {
          position: "left", colorClasses: "bg-green-500/20 text-green-300 border-green-500/30",
          badge: "Integrations", title: "Automated Git Sync",
          desc: "Sync with GitHub. We pull latest commits and instantly generate beautiful diffs and release notes automatically.",
        };
      default: return null;
    }
  };

  const overlay = getOverlayContent();
  const modalX = overlay?.position === "right" ? 50 : -50;

  return (
    <>
      <motion.div
        animate={getCameraAnimation()}
        transition={{ type: "spring", bounce: 0, duration: 0.9 }}
        style={{ willChange: "transform" }}
        className="relative w-full max-w-7xl mx-auto flex items-center justify-center min-h-screen z-10"
      >
        {/* Floating Cards (Background layer) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <FloatingCards 
            onCardClick={(id) => setActiveCard(id)} 
            activeCard={activeCard} 
          />
        </div>

        {/* Central Hero text (Foreground layer) */}
        <motion.div 
          animate={{ 
            filter: activeCard ? "blur(4px)" : "blur(0px)",
            opacity: activeCard ? 0.3 : 1
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.9 }}
          className={`relative z-10 pointer-events-auto ${activeCard ? 'pointer-events-none' : ''}`}
        >
          <Hero />
        </motion.div>
      </motion.div>

      {/* Feature Detail Overlay */}
      <AnimatePresence>
        {overlay && (
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, x: modalX, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: modalX, filter: "blur(10px)" }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className={`fixed ${overlay.position === 'right' ? 'right-[5%] md:right-[10%]' : 'left-[5%] md:left-[10%]'} top-1/2 -translate-y-1/2 z-50 max-w-lg pointer-events-auto`}
          >
            <div className="p-10 rounded-[32px] bg-[#050505]/60 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              <div className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-6 border ${overlay.colorClasses}`}>
                {overlay.badge}
              </div>
              <h2 className="text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
                {overlay.title}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 text-sm">
                {overlay.desc}
              </p>
              <button 
                onClick={() => setActiveCard(null)}
                className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Back to Overview
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
