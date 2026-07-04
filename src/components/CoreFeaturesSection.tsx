"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
  },
  {
    id: "feedback",
    title: "User Feedback",
    description: "Collect reactions and feedback directly from your release notes.",
    backContent: "Add interactive reaction buttons and comments to your changelog. Understand what your users love and what needs improvement with built-in analytics.",
    image: "/images/feature-feedback.png",
    badgeText: "Pro",
    badgeColor: "bg-pink-500 text-white shadow-pink-500/50"
  }
];

type FeatureType = typeof features[0];

function FeatureScrollCard({ feature, index, total, scrollYProgress }: { feature: FeatureType, index: number, total: number, scrollYProgress: MotionValue<number> }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Estimate the scroll progress point where this card reaches the center.
  const cardCenter = index * (0.55 / (total - 1));

  const scale = useTransform(scrollYProgress, (v) => {
    const diff = Math.abs(v - cardCenter);
    // Peak at 1.05 (slightly larger), drop to 0.85
    return Math.max(0.85, 1.05 - diff * 0.8);
  });

  const opacity = useTransform(scrollYProgress, (v) => {
    const diff = Math.abs(v - cardCenter);
    // Peak at 1, drop to 0.5
    return Math.max(0.5, 1 - diff * 1.5);
  });

  return (
    <motion.div
      style={{ perspective: 1500, scale, opacity, willChange: "transform, opacity" }}
      className="relative w-[85vw] max-w-[340px] h-[320px] md:h-[360px] flex-shrink-0 cursor-pointer group float-card"
      data-card-id={feature.id}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 bg-[#111111]/95 border border-white/5 rounded-[1.5rem] flex flex-col overflow-hidden shadow-xl"
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
            <div className="w-full h-full relative">
              <Image src={feature.image} alt={feature.title} fill sizes="(max-width: 768px) 85vw, 340px" className="object-cover opacity-60 transition-opacity duration-500" />
            </div>
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
  );
}

export default function CoreFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: borderScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const radiusVal = useTransform(borderScroll, [0, 0.95, 1], [80, 80, 0]);
  const topRadius = useTransform(radiusVal, (r) => `${r}px`);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, (v) => {
    let maxScroll = 55;
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) maxScroll = 82;
      else if (window.innerWidth < 1024) maxScroll = 68;
    }
    const val = Math.min(v / 0.55, 1) * maxScroll;
    return `-${val}%`;
  });

  return (
    <motion.section
      id="features"
      ref={containerRef}
      style={{ borderTopLeftRadius: topRadius, borderTopRightRadius: topRadius }}
      className="w-full relative bg-[#0a0a0a] z-20 flex flex-col items-center -mt-[100vh]"
    >
      {/* Background Components */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit" }}>
        <div className="absolute inset-0 bg-curtain opacity-70"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <GridSnakes />
        <Particles />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--background))]"></div>
      </div>

      <div className="w-full relative z-10 flex flex-col items-center">

        {/* Scroll-Linked Horizontal Section */}
        <section ref={scrollTargetRef} className="relative h-[400vh] w-full">
          <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-16 md:pt-20 max-w-7xl mx-auto px-4 overflow-hidden">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center w-full max-w-4xl mx-auto mb-10 flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] md:text-xs font-medium mb-3 backdrop-blur-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                The Changelog Engine
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 leading-tight">
                Powerful tools, <br className="md:hidden" /> zero friction.
              </h2>
              <p className="text-base sm:text-sm md:text-sm text-slate-400 mb-5 max-w-lg leading-relaxed px-4 mx-auto">
                Everything you need to keep your users informed, beautifully designed and seamlessly integrated.
              </p>
            </motion.div>

            {/* Sliding Cards */}
            <div className="w-full mx-auto px-4 md:px-12 xl:px-24">
              <motion.div
                style={{ x, willChange: "transform" }}
                className="flex gap-6 md:gap-8 w-max items-center"
              >
                {features.map((feature, index) => (
                  <FeatureScrollCard
                    key={index}
                    feature={feature}
                    index={index}
                    total={features.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </motion.div>
            </div>

          </div>
        </section>

      </div>
    </motion.section>
  );
}
