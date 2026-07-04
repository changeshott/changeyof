"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Zap,
  Maximize2,
  PanelRight,
  Flag,
  MessageSquare,
  Code,
  MousePointerClick,
  BadgeInfo,
  Rocket,
  Users,
  Layers,
  Code2,
  Palette,
  MousePointer2,
  Activity,
  Play
} from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

// ── Section Components ───────────────────────────────
function SectionBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 tracking-wider uppercase mb-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] ${className}`}>
      {children}
    </h2>
  );
}

function SectionDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed mt-5 ${className}`}>
      {children}
    </p>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────
const faqs = [
  { question: "Do I need to be a developer to install this?", answer: "Not at all. If you can copy and paste a snippet of code into your website's <head> tag (or use Google Tag Manager), you can install our widget in minutes." },
  { question: "Will the widget slow down my website?", answer: "No. Our widget is highly optimized, loads asynchronously, and is delivered via a global CDN to ensure zero impact on your site's performance." },
  { question: "Can I customize how the widget looks?", answer: "Absolutely. You can customize colors, typography, positioning, and trigger behaviors directly from your dashboard without touching any CSS." },
  { question: "Can I target specific users?", answer: "Yes! By passing user attributes in the initialization script, you can show updates only to specific segments (e.g., 'Pro' users, or users on a specific operating system)." },
  { question: "Does it support multiple languages?", answer: "Yes, you can configure translations and serve localized updates based on the user's browser language or preferred settings." }
];

function FaqItem({ faq }: { faq: typeof faqs[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item border-b border-slate-200 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className={`text-base font-semibold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-800 group-hover:text-slate-900'}`}>{faq.question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm text-slate-500 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Authentic Icons for Integrations ──────────────────────────────
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" className="w-6 h-6 text-slate-300"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
);
const VueIcon = () => (
  <svg viewBox="0 0 256 221" fill="currentColor" className="w-6 h-6 text-slate-400"><path d="M204.8 0H256L128 220.8 0 0h51.2L128 132.48 204.8 0z" fill="currentColor"/><path d="M204.8 0L128 132.48 51.2 0H0l128 220.8L256 0h-51.2z" fill="currentColor"/><path d="M51.2 0L128 132.48 204.8 0h-51.2L128 44.16 102.4 0H51.2z" fill="currentColor"/></svg>
);
const HTMLIcon = () => (
  <svg viewBox="0 0 384 512" fill="currentColor" className="w-5 h-5 text-slate-500"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg>
);
const WebflowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-300"><path d="M24 6.843l-4.509 9.996h-3.411l2.457-5.59-3.238 5.59H12.02l-1.39-7.234-2.825 7.234H4.551L7.54 11.23 4.29 16.84H.87L5.595 6.84h3.407L6.641 12.3l3.228-5.46h3.292l1.378 7.201L17.275 6.84H24z"/></svg>
);

// ══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════
export default function InAppWidgetPage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeWidgetType, setActiveWidgetType] = useState<"modal" | "banner" | "tooltip">("banner");

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Code Section Animation Setup
  const codeSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: codeProgress } = useScroll({
    target: codeSectionRef,
    offset: ["start end", "end start"]
  });
  
  const codeScale = useTransform(codeProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const codeOpacity = useTransform(codeProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <main className="relative bg-[#050505]">
      {/* Navbar */}
      <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] w-full flex justify-center pointer-events-none">
        <Navbar isHidden={isScrolled} />
      </div>

      {/* ────────── HERO (NEW LAYOUT) ────────── */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative pt-[120px] md:pt-[160px] pb-[80px] md:pb-[100px] min-h-[100vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-curtain pointer-events-none opacity-50" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Subtle Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111] border border-white/10 text-xs font-semibold text-slate-300 tracking-wider uppercase mb-6 backdrop-blur-sm"
          >
            <Zap className="w-3.5 h-3.5 text-slate-400" /> Stop Being Ignored
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-white px-4"
          >
            Turn silent users into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              active participants
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-sm md:text-sm text-white/50 max-w-xl mx-auto mt-4 md:mt-6 leading-relaxed px-4"
          >
            Announce features, gather feedback, and drive product adoption natively. Embed stunning widgets in your app without writing a single line of UI code.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-6 md:mt-8 pointer-events-auto"
          >
            <button onClick={() => router.push("/login")} className="px-8 md:px-10 py-3 md:py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
              Start for free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 md:px-10 py-3 md:py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <Play className="w-4 h-4" /> Watch Demo
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* ────────── INFINITE MARQUEE ────────── */}
      <div className="relative z-20 py-8 bg-[#111] border-y border-white/5 overflow-hidden flex items-center">
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#111] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#111] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex w-max"
        >
          {/* Repeat content twice for seamless loop */}
          {[1, 2].map((group) => (
            <div key={group} className="flex items-center flex-nowrap shrink-0">
               {[
                  { icon: <Maximize2 className="w-5 h-5" />, title: "Modals" },
                  { icon: <PanelRight className="w-5 h-5" />, title: "Sidebars" },
                  { icon: <Flag className="w-5 h-5" />, title: "Banners" },
                  { icon: <MessageSquare className="w-5 h-5" />, title: "Tooltips" },
                  { icon: <Code className="w-5 h-5" />, title: "Embeds" },
                  { icon: <MousePointerClick className="w-5 h-5" />, title: "Popovers" },
                  { icon: <BadgeInfo className="w-5 h-5" />, title: "Micro Badges" }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-8 py-2">
                     <span className="text-white/30">{item.icon}</span>
                     <span className="text-lg font-medium text-white/70">{item.title}</span>
                     <span className="ml-8 text-white/10">•</span>
                  </div>
               ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ────────── WHITE BACKGROUND SECTION ────────── */}
      <div className="bg-[#fafafa] relative z-20 w-full pt-32 pb-24 rounded-t-[3rem] -mt-6 overflow-hidden">
         {/* Faint Grid Background */}
         <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
         
         {/* ────────── INTERACTIVE PLAYGROUND ────────── */}
         <motion.section
            initial={{ opacity: 0, y: 60, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 mb-32"
         >
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-16">
                  <SectionBadge><MousePointer2 className="w-3.5 h-3.5" /> Live Preview</SectionBadge>
                  <SectionHeading>Experience it live</SectionHeading>
                  <SectionDescription className="mx-auto">See how different widget types command attention without disrupting the user flow.</SectionDescription>
               </div>

               <div className="flex flex-col lg:flex-row gap-8 items-stretch h-auto lg:h-[600px]">
                  {/* Left Controls */}
                  <div className="w-full lg:w-1/3 flex flex-col gap-3">
                     {[
                        { id: "banner", icon: <Flag className="w-5 h-5" />, title: "Top Banner", desc: "Non-intrusive global alerts." },
                        { id: "modal", icon: <Maximize2 className="w-5 h-5" />, title: "Center Modal", desc: "For major, high-priority announcements." },
                        { id: "tooltip", icon: <MessageSquare className="w-5 h-5" />, title: "Contextual Tooltip", desc: "Guide users to specific UI elements." }
                     ].map((item) => (
                        <button 
                           key={item.id}
                           onClick={() => setActiveWidgetType(item.id as "modal" | "banner" | "tooltip")}
                           className={`p-5 rounded-2xl border text-left transition-all ${
                              activeWidgetType === item.id 
                              ? 'bg-white border-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.05)] ring-1 ring-slate-900' 
                              : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300 opacity-60 hover:opacity-100'
                           }`}
                        >
                           <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${activeWidgetType === item.id ? 'bg-slate-100 text-slate-900' : 'bg-slate-200 text-slate-500'}`}>
                              {item.icon}
                           </div>
                           <h4 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h4>
                           <p className="text-sm text-slate-500">{item.desc}</p>
                        </button>
                     ))}
                  </div>

                  {/* Right Preview */}
                  <div className="flex-1 bg-slate-100 rounded-3xl border border-slate-200 shadow-inner overflow-hidden relative flex flex-col p-4 md:p-8 h-[400px] lg:h-auto">
                     {/* Fake Browser Chrome */}
                     <div className="absolute top-0 left-0 w-full h-12 bg-white/50 backdrop-blur-md border-b border-slate-200/50 flex items-center px-4 gap-2 z-10">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                        <div className="w-3 h-3 rounded-full bg-slate-300" />
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                     </div>

                     {/* Fake App Background */}
                     <div className="pt-12 w-full h-full opacity-30 pointer-events-none flex flex-col gap-4">
                        <div className="w-1/3 h-8 bg-slate-300 rounded-lg mb-4" />
                        <div className="flex gap-4">
                           <div className="w-1/4 h-32 bg-slate-300 rounded-xl" />
                           <div className="w-1/4 h-32 bg-slate-300 rounded-xl" />
                           <div className="flex-1 h-32 bg-slate-300 rounded-xl" />
                        </div>
                        <div className="w-full h-64 bg-slate-300 rounded-xl mt-4" />
                     </div>

                     {/* Interactive Widgets Rendered based on State */}
                     <AnimatePresence mode="wait">
                        {activeWidgetType === "banner" && (
                           <motion.div 
                              key="banner"
                              initial={{ y: -50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -50, opacity: 0 }}
                              className="absolute top-12 left-0 w-full bg-slate-900 text-white py-3 px-6 shadow-md flex items-center justify-between z-20"
                           >
                              <div className="flex items-center gap-3">
                                 <Sparkles className="w-5 h-5 text-slate-400" />
                                 <span className="text-sm font-medium">We just launched a massive update to our reporting dashboard!</span>
                              </div>
                              <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-md text-xs font-bold transition-colors">Read more</button>
                           </motion.div>
                        )}
                        {activeWidgetType === "modal" && (
                           <motion.div 
                              key="modal"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-30"
                           >
                              <div className="w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-black/5">
                                 <div className="h-32 bg-gradient-to-r from-slate-200 to-slate-100 relative">
                                    <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                                       <Rocket className="w-6 h-6 text-slate-700" />
                                    </div>
                                 </div>
                                 <div className="pt-10 px-6 pb-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Dark Mode is finally here!</h3>
                                    <p className="text-sm text-slate-500 mb-6 line-clamp-3">You asked, we listened. Flip the switch in your account settings to rest your eyes and code into the night.</p>
                                    <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">Awesome, thanks!</button>
                                 </div>
                              </div>
                           </motion.div>
                        )}
                        {activeWidgetType === "tooltip" && (
                           <motion.div 
                              key="tooltip"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-[35%] right-[20%] z-20"
                           >
                              {/* Pulse beacon */}
                              <div className="absolute -top-1 -left-1 w-4 h-4 bg-white rounded-full animate-ping opacity-75" />
                              <div className="absolute -top-1 -left-1 w-4 h-4 bg-slate-900 rounded-full border-2 border-white" />
                              
                              {/* Tooltip Card */}
                              <div className="absolute top-6 left-0 w-64 bg-slate-900 text-white rounded-xl p-4 shadow-xl">
                                 <div className="absolute -top-2 left-2 w-4 h-4 bg-slate-900 rotate-45" />
                                 <div className="relative z-10">
                                    <h4 className="font-bold text-sm mb-1">New Feature</h4>
                                    <p className="text-xs text-slate-400 mb-3">Export your reports to CSV or PDF with a single click.</p>
                                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-300">
                                       <span>1 of 3</span>
                                       <button className="bg-white hover:bg-slate-100 text-slate-900 px-3 py-1 rounded">Next</button>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </motion.section>

         {/* ────────── BENTO BOX GRID ────────── */}
         <motion.section
            initial={{ opacity: 0, y: 60, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 mb-32"
         >
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-16">
                  <SectionBadge><Layers className="w-3.5 h-3.5" /> Built for Scale</SectionBadge>
                  <SectionHeading>Everything you need. Nothing you don&apos;t.</SectionHeading>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                  
                  {/* Targeting - Large block */}
                  <div className="md:col-span-2 rounded-[2rem] bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between overflow-hidden relative group">
                     <div className="absolute top-0 right-0 w-[400px] h-full opacity-50 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.03),transparent_70%)] transition-opacity duration-500 group-hover:opacity-100" />
                     <div className="relative z-10 max-w-sm">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-700 mb-6">
                           <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Surgical Precision Targeting</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">Don&apos;t blast all users. Target segments using custom attributes (e.g., plan, role, tenure) to ensure perfect relevance.</p>
                     </div>
                     <div className="relative z-10 w-[80%] max-w-[300px] bg-white rounded-xl border border-slate-200 shadow-xl p-4 mt-8 ml-auto translate-x-12 group-hover:translate-x-4 transition-transform duration-500">
                        <div className="text-xs font-bold text-slate-500 mb-2">Target Audience</div>
                        <div className="flex items-center gap-2 mb-2">
                           <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono">plan</span>
                           <span className="text-xs text-slate-400">equals</span>
                           <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-white font-bold rounded text-[10px]">PRO</span>
                        </div>
                     </div>
                  </div>

                  {/* Analytics - Tall block */}
                  <div className="rounded-[2rem] bg-slate-900 border border-slate-800 p-8 flex flex-col justify-between overflow-hidden relative group">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent)] transition-opacity duration-500 group-hover:opacity-100" />
                     <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-xl shadow-sm flex items-center justify-center text-white mb-6">
                           <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Actionable Insights</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Track views, clicks, and dismissals to measure exactly how your announcements perform.</p>
                     </div>
                     <div className="relative z-10 w-full h-24 mt-8 flex items-end gap-2 px-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        {[40, 70, 45, 90, 65, 100].map((h, i) => (
                           <motion.div 
                              key={i} 
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="flex-1 bg-gradient-to-t from-white/10 to-white/70 rounded-t-sm" 
                           />
                        ))}
                     </div>
                  </div>

                  {/* Customization - Wide block */}
                  <div className="md:col-span-3 rounded-[2rem] bg-white border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex-1 max-w-lg">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl shadow-sm flex items-center justify-center text-slate-700 mb-6">
                           <Palette className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Native Feel, Zero CSS</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">Our widgets inherit your brand style out of the box, or can be customized entirely from the dashboard. Say goodbye to iframes that break your design system.</p>
                     </div>
                     <div className="flex-1 flex justify-center md:justify-end">
                        <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           {["bg-black", "bg-slate-800", "bg-slate-500", "bg-slate-300"].map((c, i) => (
                              <div key={i} className={`w-10 h-10 rounded-full ${c} shadow-md border-2 border-white ring-2 ring-transparent hover:ring-slate-300 cursor-pointer transition-all`} />
                           ))}
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </motion.section>

      </div>

      {/* ────────── CODE SECTION (DARK TERMINAL) ────────── */}
      <motion.section 
         ref={codeSectionRef}
         style={{ scale: codeScale, opacity: codeOpacity }}
         className="relative py-32 px-6 bg-[#0a0a0a] border-t border-white/5"
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
         
         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
               <SectionBadge className="bg-white/5 border-white/10 text-slate-300 backdrop-blur-sm"><Code2 className="w-3.5 h-3.5" /> Developer Friendly</SectionBadge>
               <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">One script tag.<br/>Infinite possibilities.</h2>
               <p className="text-lg text-white/50 mb-8 max-w-md">Deploys in 5 minutes. Framework agnostic. Fully typed for those who want deeper control.</p>
               
               <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-sm font-medium"><ReactIcon /> React</div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-sm font-medium"><VueIcon /> Vue</div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-sm font-medium"><WebflowIcon /> Webflow</div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-sm font-medium"><HTMLIcon /> HTML</div>
               </div>
            </div>

            <div className="flex-1 w-full max-w-lg">
               <div className="rounded-2xl border border-white/10 bg-[#111] shadow-2xl overflow-hidden font-mono text-[11px] md:text-sm">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                     <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                     <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                     <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                     <span className="ml-2 text-white/30 text-xs">layout.tsx</span>
                  </div>
                  <div className="p-6 text-white/70 overflow-x-auto bg-[#0a0a0a]">
<pre><code><span className="text-slate-500">import</span> {"{"} <span className="text-slate-300">ChangeyofWidget</span> {"}"} <span className="text-slate-500">from</span> <span className="text-slate-400">&apos;@changeyof/react&apos;</span>;

<span className="text-slate-500">export default function</span> <span className="text-white">RootLayout</span>({"{ children }"}) {"{"}
  <span className="text-slate-500">return</span> (
    <span className="text-slate-400">&lt;html&gt;</span>
      <span className="text-slate-400">&lt;body&gt;</span>
        {"{children}"}
        <span className="text-slate-300">&lt;ChangeyofWidget</span> 
          <span className="text-slate-500">projectId</span>=<span className="text-slate-400">&quot;proj_x89&quot;</span>
          <span className="text-slate-500">user</span>={"{{ id, plan }}"} 
        <span className="text-slate-300">/&gt;</span>
      <span className="text-slate-400">&lt;/body&gt;</span>
    <span className="text-slate-400">&lt;/html&gt;</span>
  );
{"}"}</code></pre>
                  </div>
               </div>
            </div>
         </div>
      </motion.section>

      {/* ────────── WHITE BACKGROUND WRAPPER (FAQ & CTA) ────────── */}
      <div className="bg-[#fafafa] relative z-20 w-full pt-24 rounded-t-[3rem] -mt-6 overflow-hidden">
         {/* Faint Grid Background */}
         <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
         
         {/* ────────── FAQ ────────── */}
         <motion.section
            initial={{ opacity: 0, y: 60, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 mb-32"
         >
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-16">
                  <SectionHeading>Frequently asked questions</SectionHeading>
               </div>
               <div className="divide-y divide-slate-200">
                  {faqs.map((faq, index) => (
                     <FaqItem key={index} faq={faq} />
                  ))}
               </div>
            </div>
         </motion.section>

         {/* ────────── CTA ────────── */}
         <motion.section
            initial={{ opacity: 0, y: 60, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="px-4 md:px-6 pb-24 md:pb-32"
         >
            <div className="relative z-10 max-w-5xl mx-auto text-center bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] px-6 py-20 md:py-32 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_20px_80px_rgba(0,0,0,0.15)] border border-white/5">
               {/* Premium Dark Background Elements */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
               <motion.div 
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" 
               />
               
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-3xl mx-auto">
                     Ready to boost engagement?
                  </h2>
                  <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
                     Deploy your first widget in minutes. Stop letting important updates go unnoticed.
                  </p>
                  <div className="flex justify-center">
                     <button
                        onClick={() => router.push("/login")}
                        className="relative overflow-hidden px-10 py-4 md:px-12 md:py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
                     >
                        <span className="relative z-10">Start for free</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                     </button>
                  </div>
               </div>
            </div>
         </motion.section>

         {/* ────────── FOOTER ────────── */}
         <Footer />
      </div>
    </main>
  );
}
