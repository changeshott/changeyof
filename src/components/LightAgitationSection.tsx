"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { XCircle, Share2, EyeOff, Code, Layers } from "lucide-react";

const logos = ["Vercel", "Supabase", "Linear", "Stripe", "Raycast"];
const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

const cards = [
  {
    title: "Endless Re-deployments",
    desc: "Pushing code to your repository just to announce a minor bug fix or a tiny improvement.",
    icon: Code,
    color: "from-blue-50 to-blue-100/50",
    iconColor: "text-blue-500",
    border: "border-blue-200/50",
    glow: "bg-blue-400/20 group-hover:bg-blue-500/30"
  },
  {
    title: "Lost in the Algorithm",
    desc: "Social media announcements rarely reach your actual active users where it matters most.",
    icon: Share2,
    color: "from-purple-50 to-purple-100/50",
    iconColor: "text-purple-500",
    border: "border-purple-200/50",
    glow: "bg-purple-400/20 group-hover:bg-purple-500/30"
  },
  {
    title: "Ignored Features",
    desc: "Users simply don't notice the hard work you put into new updates without a dedicated feed.",
    icon: EyeOff,
    color: "from-red-50 to-red-100/50",
    iconColor: "text-red-500",
    border: "border-red-200/50",
    glow: "bg-red-400/20 group-hover:bg-red-500/30"
  },
  {
    title: "Fragmented Communication",
    desc: "Sending emails, tweeting, and writing blog posts means your release notes are scattered everywhere.",
    icon: Layers,
    color: "from-amber-50 to-amber-100/50",
    iconColor: "text-amber-500",
    border: "border-amber-200/50",
    glow: "bg-amber-400/20 group-hover:bg-amber-500/30"
  },
  {
    title: "High Maintenance",
    desc: "Maintaining a custom changelog page drains resources that should be spent on building the core product.",
    icon: XCircle,
    color: "from-rose-50 to-rose-100/50",
    iconColor: "text-rose-500",
    border: "border-rose-200/50",
    glow: "bg-rose-400/20 group-hover:bg-rose-500/30"
  }
];

function ScrollCard({ item, index, total, scrollYProgress }: { item: any, index: number, total: number, scrollYProgress: MotionValue<number> }) {
  // Estimate the scroll progress point where this card reaches the center.
  // Since x goes from 0% to -55% between scroll progress 0 and 0.55, we distribute the 5 cards evenly over 0.55.
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

  const Icon = item.icon;

  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-[85vw] max-w-[340px] flex-shrink-0 group relative bg-white/80 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 text-left border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-slate-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
      <div className={`absolute top-8 left-8 w-16 h-16 ${item.glow} rounded-full filter blur-xl transition-all duration-500`} />
      <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.iconColor} border ${item.border} group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 shadow-sm z-10`}>
        <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
      </div>
      <div className="space-y-3 z-10 mt-2">
        <h3 className="font-medium text-lg md:text-xl tracking-tight text-slate-800 transition-colors">{item.title}</h3>
        <p className="text-sm leading-relaxed text-slate-500 transition-colors">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function LightAgitationSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Track translates leftwards and finishes early (0.55) to give a very noticeable delay before the next section rises
  const x = useTransform(scrollYProgress, [0, 0.55], ["0%", "-55%"]);

  return (
    <div id="changelog" className="w-full flex flex-col items-center justify-center text-[#111] relative bg-slate-50/30">

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white via-slate-50/50 to-white" />
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-5%] w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-rose-200/40 rounded-full mix-blend-multiply filter blur-[100px]"
        />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 mt-8 md:mt-12 relative z-10 px-4">
        {/* Social Proof (Trust Banner) - Infinite Marquee */}
        <div className="flex flex-col items-center text-center gap-8 w-full overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase"
          >
            Trusted by indie hackers and modern developers
          </motion.p>
          <div className="relative flex overflow-x-hidden w-full max-w-5xl [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] mt-2">
            <motion.div
              className="flex whitespace-nowrap gap-10 md:gap-20 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            >
              {marqueeLogos.map((logo, index) => (
                <div key={index} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">
                  <span className="font-extrabold text-xl md:text-3xl tracking-tighter text-slate-800">{logo}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll-Linked Horizontal Section */}
      <section ref={targetRef} className="relative h-[400vh] w-full mt-10 md:mt-16">
        {/* Sticky container stays on screen */}
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">

          {/* Title Area */}
          <div className="flex flex-col items-center text-center gap-6 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4 max-w-4xl px-4"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.15]">
                Stop Wasting Time <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
                  Designing Changelogs.
                </span>
              </h2>
              <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Coding a custom &quot;What&apos;s New&quot; page, provisioning a database, and styling the UI from scratch drains your valuable development time.
              </p>
            </motion.div>
          </div>

          {/* Sliding Cards */}
          <div className="w-full mx-auto px-4 md:px-12 xl:px-24">
            <motion.div
              style={{ x }}
              className="flex gap-6 md:gap-8 w-max items-center"
            >
              {cards.map((item, index) => (
                <ScrollCard
                  key={index}
                  item={item}
                  index={index}
                  total={cards.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
