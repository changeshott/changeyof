"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import GridSnakes from "@/components/GridSnakes";
import Particles from "@/components/Particles";

const features = [
  {
    id: "whatsnew",
    title: "Instant Widget",
    description: "Paste a single script tag, and a floating notification bell appears.",
    backContent: "Integrate deeply with your product. Our floating widget supports unread badges, read receipts, and opens an in-app feed so users never have to leave your platform to see what's new.",
    image: "/images/feature-widget.png",
    badgeText: "Core",
    badgeColor: "bg-indigo-500 text-white shadow-indigo-500/50"
  },
  {
    id: "releaseeditor",
    title: "Fast Editor",
    description: "Write release notes easily. Supports rich text & auto tags.",
    backContent: "A Notion-like writing experience. Use slash commands, drag-and-drop images, and automatically categorize updates into 'New', 'Fix', or 'Improvement'. Generates clean HTML instantly.",
    image: "/images/feature-editor.png",
    badgeText: "New",
    badgeColor: "bg-orange-500 text-white shadow-orange-500/50"
  },
  {
    id: "changelog",
    title: "Public Page",
    description: "Auto-generate a beautiful, SEO-friendly dedicated changelog.",
    backContent: "Your own dedicated changelog.changeyof.com page. Fully optimized for SEO to drive organic traffic, with RSS feeds, dark mode, and custom domains.",
    image: "/images/feature-page.png",
    badgeText: "Update",
    badgeColor: "bg-amber-400 text-black shadow-amber-500/50"
  },
  {
    id: "engagement",
    title: "Zero Impact",
    description: "Loads asynchronously. Zero impact on Core Web Vitals.",
    backContent: "Built for speed. Our script is less than 5KB gzipped and loads fully asynchronously. It won't block your main thread, ensuring your product's performance remains pristine.",
    image: "/images/feature-performance.png",
    badgeText: "Speed",
    badgeColor: "bg-emerald-500 text-white shadow-emerald-500/50"
  }
];

export default function CoreFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const { scrollYProgress: borderScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const radiusVal = useTransform(borderScroll, [0, 0.95, 1], [80, 80, 0]);
  const topRadius = useTransform(radiusVal, (r) => `${r}px`);

  return (
    <motion.section 
      id="features-core" 
      ref={containerRef} 
      style={{ borderTopLeftRadius: topRadius, borderTopRightRadius: topRadius }}
      className="w-full relative bg-[#0a0a0a] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-20 flex flex-col items-center overflow-hidden -mt-[100vh]"
    >
      {/* Background Components */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-curtain opacity-70"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <GridSnakes />
        <Particles />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--background))]"></div>
      </div>

      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* FIRST FULL SCREEN: Headline & Cards (With Scroll Pause) */}
        <div className="w-full h-[150vh] relative">
          <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center max-w-7xl mx-auto py-16 md:py-20 px-4">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center w-full max-w-4xl mx-auto mb-10 flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs md:text-sm font-medium mb-4 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                The Changelog Engine
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-white mb-4 leading-[1.1]">
                Powerful tools, <br className="md:hidden" /> zero friction.
              </h2>
              <p className="text-sm md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed hidden md:block">
                Everything you need to keep your users informed, beautifully designed and seamlessly integrated.
              </p>
            </motion.div>

            {/* Feature Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                }}
                className="relative w-full h-[280px] md:h-[320px] float-card cursor-none group"
                data-card-id={feature.id}
                data-cursor-text={flippedCards[index] ? "Flip Back" : "Swipe Me"}
                style={{ perspective: 1500 }}
                onClick={() => toggleCard(index)}
              >
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  {/* FRONT FACE */}
                  <div 
                    className="absolute inset-0 bg-[#111111]/80 backdrop-blur-md border border-white/5 rounded-[1.5rem] flex flex-col overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-lg z-30 ${feature.badgeColor} transition-transform duration-500 group-hover:scale-110`}>
                      {feature.badgeText}
                    </div>
                    <div className="p-5 md:p-6 z-20 relative">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 line-clamp-2 md:line-clamp-3">
                        {feature.description}
                      </p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 top-[100px] z-10 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 via-[#111111]/20 to-transparent z-20 pointer-events-none"></div>
                      <motion.div 
                        className="w-full h-full relative"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Image src={feature.image} alt={feature.title} fill className="object-cover opacity-60 transition-opacity duration-500 mix-blend-screen" />
                      </motion.div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#181818] to-[#0a0a0a] border border-white/10 rounded-[1.5rem] p-5 md:p-6 flex flex-col justify-center items-center text-center shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight relative z-10">
                      {feature.title}
                    </h3>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-3 relative z-10"></div>
                    <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed px-1 relative z-10">
                      {feature.backContent}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            </motion.div>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
