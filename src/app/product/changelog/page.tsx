"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GridSnakes from "@/components/GridSnakes";
import Particles from "@/components/Particles";
import {
  Megaphone,
  Paintbrush,
  Rss,
  BarChart3,
  CalendarClock,
  Search,
  Globe,
  Sparkles,
  Bug,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Zap
} from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

// ── Section Components (Light Mode) ───────────────────────────────
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

// ── Hero Changelog preview card (Dark) ───────────────────────────
function ChangelogPreviewCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-400/70" />
          <div className="w-3 h-3 rounded-full bg-slate-300/70" />
          <div className="w-3 h-3 rounded-full bg-slate-200/70" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/5 rounded-md px-4 py-1 text-[11px] text-white/40 font-mono">
            changelog.yourapp.com
          </div>
        </div>
      </div>

      {/* Changelog content */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-tighter">cf</div>
          <div>
            <h3 className="text-lg font-bold text-white">Changeyof Updates</h3>
            <p className="text-xs text-white/40">The latest product updates and fixes.</p>
          </div>
        </div>

        {/* Release entries */}
        {[
          { type: "New", title: "Introducing Auto-tags & Rich Text Editor", date: "Today", color: "slate", icon: <Sparkles className="w-4 h-4" /> },
          { type: "Fix", title: "Resolved Slack broadcast duplication", date: "2 days ago", color: "slate", icon: <Bug className="w-4 h-4" /> },
          { type: "Improvement", title: "Page load speed increased by 40%", date: "1 week ago", color: "slate", icon: <Zap className="w-4 h-4" /> },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-${item.color}-500/10 text-${item.color}-400`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border bg-${item.color}-500/10 text-${item.color}-400 border-${item.color}-500/20`}>
                  {item.type}
                </span>
                <span className="text-[11px] text-white/30">{item.date}</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              <p className="text-xs text-white/40 mt-1 line-clamp-2">We&apos;ve just rolled out significant updates to improve your workflow and performance...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Feature card component (Scroll Triggered) ─────────────────────────
function AnimatedFeatureCard({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 15%"]
  });

  // Stagger the animation peak based on the column index (0, 1, or 2)
  const colIndex = index % 3;
  const peak = 0.35 + (colIndex * 0.15);
  const start = peak - 0.35;
  const end = peak + 0.35;

  const scale = useTransform(scrollYProgress, [start, peak, end], [0.95, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.4, 1, 0.4]);
  const borderColor = useTransform(
    scrollYProgress,
    [start, peak, end],
    ["rgba(226, 232, 240, 1)", "rgba(100, 116, 139, 0.8)", "rgba(226, 232, 240, 1)"]
  );
  const shadow = useTransform(
    scrollYProgress,
    [start, peak, end],
    [
      "0px 10px 15px -3px rgba(0,0,0,0.05)",
      "0px 25px 50px -12px rgba(0,0,0,0.15)",
      "0px 10px 15px -3px rgba(0,0,0,0.05)"
    ]
  );

  const descOpacity = useTransform(scrollYProgress, [start, peak, end], [0, 1, 0]);
  const yOffset = useTransform(scrollYProgress, [start, peak, end], [15, 0, 15]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, borderColor, boxShadow: shadow }}
      className="relative p-6 md:p-8 rounded-[1.5rem] bg-white border-2 flex flex-col justify-start min-h-[260px] md:min-h-[280px]"
    >
      <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 mb-6 shrink-0 shadow-sm">
        {icon}
      </div>
      <h3 className="relative z-10 text-lg md:text-xl font-bold tracking-tight text-slate-800 mb-2 shrink-0">{title}</h3>
      <motion.div style={{ opacity: descOpacity, y: yOffset }} className="relative z-10 pointer-events-none">
        <p className="text-sm text-slate-500 leading-relaxed m-0">{desc}</p>
      </motion.div>
    </motion.div>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────
const faqs = [
  { question: "How fast can I set up my changelog?", answer: "Literally in minutes. Just create a project in Changeyof, and your page is live. You can then tweak the colors, fonts, and domains whenever you're ready." },
  { question: "Can I host it on my own domain?", answer: "Yes, fully supported. You can point a custom domain or subdomain (like updates.yourwebsite.com) to your Changeyof page to maintain perfect brand consistency." },
  { question: "Will my team be able to collaborate?", answer: "Absolutely. Changeyof supports team workspaces. You can invite your PMs, marketers, and developers to draft and publish releases together." },
  { question: "Can I preview my release before publishing?", answer: "Yes, our editor features a live preview mode. What you see is exactly what your users will get on your public changelog." },
  { question: "Is there a limit on how many releases I can publish?", answer: "No limits. Publish as often as you ship. In fact, we encourage you to share even the smallest bug fixes to show your users that your product is actively evolving." }
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

// ── Authentic Icons ──────────────────────────────────────────────
const SlackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" /></svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

// ══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════
export default function ChangelogProductPage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const stickyRef = useRef<HTMLDivElement>(null);

  // Parallax and border rounding as the sticky section enters
  const { scrollYProgress: darkProgress } = useScroll({
    target: stickyRef,
    offset: ["start end", "start start"]
  });
  const featuresOpacity = useTransform(darkProgress, [0, 1], [1, 0.3]);
  const featuresY = useTransform(darkProgress, [0, 1], ["0%", "15%"]);
  const topRadius = useTransform(darkProgress, [0, 1], ["0rem", "4rem"]);

  // Sticky internal animation sequence
  const { scrollYProgress: stickyProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const text1X = useTransform(stickyProgress, [0, 0.12, 0.28], ["0%", "0%", "-100%"]);
  const text1Opacity = useTransform(stickyProgress, [0, 0.12, 0.24], [1, 1, 0]);

  const text2X = useTransform(stickyProgress, [0, 0.44, 0.6], ["100vw", "100vw", "0vw"]);
  const text2Opacity = useTransform(stickyProgress, [0.36, 0.52, 0.6], [0, 0, 1]);

  const cardWidth = useTransform(stickyProgress, [0, 0.12, 0.28, 0.44, 0.6],
    isDesktop ? ["55vw", "55vw", "100vw", "100vw", "55vw"] : ["90vw", "90vw", "100vw", "100vw", "90vw"]
  );
  const cardHeight = useTransform(stickyProgress, [0, 0.12, 0.28, 0.44, 0.6],
    isDesktop ? ["70vh", "70vh", "100vh", "100vh", "70vh"] : ["50vh", "50vh", "100vh", "100vh", "50vh"]
  );
  const cardLeft = useTransform(stickyProgress, [0, 0.12, 0.28, 0.44, 0.6],
    isDesktop ? ["50vw", "50vw", "0vw", "0vw", "-5vw"] : ["5vw", "5vw", "0vw", "0vw", "5vw"]
  );
  const cardTop = useTransform(stickyProgress, [0, 0.12, 0.28, 0.44, 0.6],
    isDesktop ? ["50%", "50%", "50%", "50%", "50%"] : ["70%", "70%", "50%", "50%", "70%"]
  );
  const cardBorderRadius = useTransform(stickyProgress, [0, 0.12, 0.28, 0.44, 0.6],
    isDesktop
      ? ["32px 0px 0px 32px", "32px 0px 0px 32px", "0px 0px 0px 0px", "0px 0px 0px 0px", "0px 32px 32px 0px"]
      : ["32px", "32px", "0px", "0px", "32px"]
  );

  const content1X = useTransform(stickyProgress, [0.28, 0.48], ["0%", "-100%"]);
  const content2X = useTransform(stickyProgress, [0.28, 0.48], ["100%", "0%"]);

  // Analytics Scroll Transition
  const analyticsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: analyticsProgress } = useScroll({
    target: analyticsRef,
    offset: ["start end", "start start"]
  });
  const analyticsTopRadius = useTransform(analyticsProgress, [0, 1], ["4rem", "0rem"]);
  const analyticsShadow = useTransform(analyticsProgress, [0, 1], ["0px -30px 50px rgba(0,0,0,0.3)", "0px 0px 0px rgba(0,0,0,0)"]);
  const darkExitY = useTransform(analyticsProgress, [0, 1], ["0%", "10%"]);
  const darkExitOpacity = useTransform(analyticsProgress, [0, 1], [1, 0.2]);
  const darkExitScale = useTransform(analyticsProgress, [0, 1], [1, 0.95]);

  return (
    <main className="relative bg-[#0a0a0a]">
      {/* Navbar */}
      <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] w-full flex justify-center pointer-events-none">
        <Navbar isHidden={isScrolled} />
      </div>

      {/* ────────── STICKY HERO ────────── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center z-0"
      >
        {/* Background effects */}
        <div className="absolute inset-0 z-0 bg-curtain pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <GridSnakes />
        <Particles />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--background))] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center pt-[100px] md:pt-[120px] w-full px-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 tracking-wider uppercase mb-6 backdrop-blur-sm">
            <Megaphone className="w-3.5 h-3.5" /> Changelog & News Feed
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-tight text-white px-4">
            Give your updates the{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              spotlight they deserve
            </span>
          </h1>

          <p className="text-base sm:text-sm md:text-sm text-white/50 max-w-lg mx-auto mt-4 md:mt-6 leading-relaxed px-4">
            A dedicated, beautifully branded changelog page on your domain. Because great features shouldn&apos;t die in crowded inboxes or loud social feeds.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-6 md:mt-10">
            <button
              onClick={() => router.push("/login")}
              className="px-8 md:px-10 py-3 md:py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2 pointer-events-auto"
            >
              Start for free <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Mockup */}
          <div className="relative z-10 w-full max-w-4xl mx-auto mt-12 md:mt-16 pointer-events-auto transform scale-90 md:scale-100 origin-top">
            <ChangelogPreviewCard />
            {/* Glow behind the card */}
            <div className="absolute -inset-10 bg-white/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>

      {/* ────────── LIGHT MODE CONTENT WRAPPER ────────── */}
      <motion.div
        className="relative z-20 w-full min-h-[100dvh] bg-[#fafafa] mt-[80px]"
      >
        {/* The subtle wave that shifts based on scroll */}
        <div className="absolute bottom-full left-0 w-full h-[80px] overflow-hidden pointer-events-none flex items-end">
          <div className="absolute bottom-[-1px] left-0 w-full h-[80px] bg-gradient-to-b from-transparent via-white/40 to-[#fafafa] backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />

          <motion.svg
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute bottom-[-2px] left-0 w-[200%] h-[40px]"
            viewBox="0 0 2000 40"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q250,40 500,20 T1000,20 T1500,20 T2000,20 L2000,40 L0,40 Z"
              fill="#fafafa"
            />
          </motion.svg>
        </div>

        {/* Content container */}
        <div className="w-full relative">

          {/* Seamless Grid Pattern */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

          {/* ────────── FEATURES GRID ────────── */}
          <motion.section
            id="features"
            style={{ opacity: featuresOpacity, y: featuresY }}
            className="relative py-24 md:py-32 px-6 z-10"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <SectionBadge><Sparkles className="w-3.5 h-3.5" /> Frictionless Updates</SectionBadge>
                <SectionHeading>Everything you need to ship fast</SectionHeading>
                <SectionDescription className="mx-auto">
                  No more wrestling with static site generators or fighting with CMS platforms. Changeyof gives you powerful, purpose-built tools to make writing and publishing effortless.
                </SectionDescription>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                {[
                  { icon: <Globe className="w-5 h-5" />, title: "Your Domain, Your Brand", desc: "A beautifully hosted public page on your own custom domain. Fully SEO-optimized to capture organic traffic." },
                  { icon: <Paintbrush className="w-5 h-5" />, title: "Seamless Customization", desc: "Instantly adapt themes, accent colors, and typography from the dashboard to perfectly match your brand guidelines." },
                  { icon: <Rss className="w-5 h-5" />, title: "Multi-Channel Sync", desc: "Publish once, broadcast everywhere. Automatically push your updates to Slack, GitHub, and social media." },
                  { icon: <CalendarClock className="w-5 h-5" />, title: "Schedule in Advance", desc: "Write releases when you have time and schedule them for launch day. Let automation handle the rollout." },
                  { icon: <BarChart3 className="w-5 h-5" />, title: "Actionable Analytics", desc: "See exactly how many users are reading your updates. Use real data to understand which features drive engagement." },
                  { icon: <Search className="w-5 h-5" />, title: "Instant Search & Filters", desc: "Give your users a blazingly fast way to search through years of product history with built-in categorized filters." }
                ].map((feat, i) => (
                  <AnimatedFeatureCard
                    key={i}
                    icon={feat.icon}
                    title={feat.title}
                    desc={feat.desc}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </motion.section>

          {/* ────────── DARK SECTION WRAPPER (Branded Page + Broadcasting) ────────── */}
          <motion.div
            ref={stickyRef}
            style={{ borderTopLeftRadius: topRadius, borderTopRightRadius: topRadius }}
            className="relative w-full h-[600vh] bg-[#0a0a0a] z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
          >
            {/* ────────── STICKY ANIMATION CONTAINER ────────── */}
            <motion.div 
               style={{ y: darkExitY, opacity: darkExitOpacity, scale: darkExitScale }}
               className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

              {/* Continuous Dark Background Effects */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-curtain" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
              </div>

              {/* Text 1: Branded Page */}
              <motion.div
                style={{ x: text1X, opacity: text1Opacity }}
                className="absolute z-10 w-[90%] lg:w-[40%] left-[5%] top-[15%] lg:top-[50%] -translate-y-1/2"
              >
                <SectionBadge className="bg-white/5 border-white/10 text-slate-300 backdrop-blur-sm"><Paintbrush className="w-3.5 h-3.5" /> Pixel-Perfect Design</SectionBadge>
                <SectionHeading className="!text-white">An extension of your product</SectionHeading>
                <SectionDescription className="!text-white/70">
                  Your changelog shouldn&apos;t look like a generic third-party tool. With Changeyof, you have full control over the aesthetics, ensuring a seamless experience for your users.
                </SectionDescription>
                <ul className="mt-8 space-y-4">
                  {["Light, Dark, or Auto themes", "Custom CSS support", "Google & Custom Fonts", "Dynamic Open Graph images for sharing"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Text 2: Broadcasting */}
              <motion.div
                style={{ x: text2X, opacity: text2Opacity }}
                className="absolute z-10 w-[90%] lg:w-[40%] left-[5%] lg:left-[55%] top-[15%] lg:top-[50%] -translate-y-1/2"
              >
                <SectionBadge className="bg-white/5 border-white/10 text-slate-300 backdrop-blur-sm"><Rss className="w-3.5 h-3.5" /> Omnichannel Reach</SectionBadge>
                <SectionHeading className="!text-white">Write once, distribute everywhere</SectionHeading>
                <SectionDescription className="!text-white/70">
                  Don&apos;t waste time copying and pasting release notes into five different platforms. With Changeyof, you hit publish once and we automatically syndicate your updates to where your users actually are.
                </SectionDescription>
              </motion.div>

              {/* The Morphing Card Container */}
              <motion.div
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  left: cardLeft,
                  top: cardTop,
                  y: "-50%",
                  borderRadius: cardBorderRadius
                }}
                className="absolute z-20 border border-white/10 bg-[#111]/80 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col justify-center"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10"></div>

                {/* Card 1 Content */}
                <motion.div style={{ x: content1X }} className="absolute inset-0 p-6 md:p-10 lg:pr-[8vw] flex flex-col justify-center pointer-events-none">
                  <div className="max-w-sm md:max-w-md mx-auto w-full">
                    {/* Color swatches mockup */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <span className="text-sm text-white/40 font-semibold uppercase tracking-wider">Primary Color</span>
                      <div className="flex items-center gap-3">
                        {["bg-black", "bg-slate-800", "bg-slate-500", "bg-slate-300", "bg-white"].map((c, i) => (
                          <div key={i} className={`w-8 h-8 rounded-full ${c} ${i === 0 ? 'ring-4 ring-offset-2 ring-offset-[#111] ring-white/50' : 'opacity-80 shadow-md'} shrink-0`} />
                        ))}
                      </div>
                    </div>

                    {/* Font Dropdown Mockup */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-white/10">
                      <span className="text-sm text-white/40 font-semibold uppercase tracking-wider">Typography</span>
                      <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-between gap-2 text-white/70 font-medium text-sm w-full sm:w-auto">
                        <span>Inter (Sans-serif)</span> <ChevronDown className="w-4 h-4 text-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Preview area */}
                  <div className="max-w-lg mx-auto w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-inner relative overflow-hidden mt-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 shrink-0">Ya</div>
                      <div className="text-base font-bold text-white whitespace-nowrap">YourApp Changelog</div>
                    </div>
                    <div className="space-y-3 w-[250px] md:w-auto">
                      <div className="h-4 bg-white/10 rounded-md w-[80%] md:w-3/4" />
                      <div className="h-4 bg-white/5 rounded-md w-[60%] md:w-1/2" />
                      <div className="h-4 bg-white/5 rounded-md w-[90%] md:w-5/6" />
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -z-10"></div>
                  </div>
                </motion.div>

                {/* Card 2 Content */}
                <motion.div style={{ x: content2X }} className="absolute inset-0 p-6 md:p-10 lg:pl-[8vw] flex flex-col justify-center pointer-events-none">
                  <div className="max-w-md mx-auto w-full space-y-4">
                    {[
                      { name: "Slack Integration", color: "bg-[#4A154B]", text: "text-white", desc: "Push to #product-updates", icon: <SlackIcon /> },
                      { name: "GitHub Sync", color: "bg-[#24292e]", text: "text-white", desc: "Create a repo release", icon: <GithubIcon /> },
                      { name: "X (Twitter)", color: "bg-black", text: "text-white", desc: "Share with followers", icon: <XIcon /> },
                      { name: "Widget Feed", color: "bg-indigo-600", text: "text-white", desc: "Alert active users in-app", icon: <Zap className="w-5 h-5" /> },
                    ].map((ch, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-white/5 bg-white/[0.02] transition-all">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${ch.color} flex items-center justify-center ${ch.text} shrink-0 shadow-lg shadow-black/30`}>
                          {ch.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm md:text-base font-bold text-white">{ch.name}</h4>
                          <p className="text-xs md:text-sm text-white/50 truncate">{ch.desc}</p>
                        </div>
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/5 flex items-center justify-center scale-90">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          </motion.div>

          {/* ────────── SECTION: Analytics ────────── */}
          <motion.section
            ref={analyticsRef}
            style={{ 
              borderTopLeftRadius: analyticsTopRadius, 
              borderTopRightRadius: analyticsTopRadius,
              boxShadow: analyticsShadow,
              marginTop: "-100vh"
            }}
            className="relative py-24 md:py-32 px-6 bg-[#fafafa] overflow-hidden z-20"
          >
            {/* Animated Background Elements */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-10 w-[30rem] h-[30rem] bg-slate-200/40 rounded-full blur-[120px] pointer-events-none" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} 
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-10 left-10 w-[25rem] h-[25rem] bg-slate-300/40 rounded-full blur-[100px] pointer-events-none" 
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text */}
                <motion.div
                  initial={{ x: -60, opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionBadge><BarChart3 className="w-3.5 h-3.5" /> Intelligent Analytics</SectionBadge>
                  <SectionHeading>Know what your users care about</SectionHeading>
                  <SectionDescription>
                    Stop guessing if your updates are being read. Changeyof provides granular insights into view counts and engagement, so you can measure the true impact of your product velocity.
                  </SectionDescription>
                  <div className="mt-10 flex gap-10">
                    {[
                      { label: "Views per release", value: "Real-time" },
                      { label: "User Feedback", value: "Built-in" },
                    ].map((stat, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                        <span className="text-sm text-slate-500 font-medium mt-1">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Visual */}
                <motion.div
                  initial={{ x: 60, opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  whileInView={{ x: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="relative"
                >
                  <motion.div 
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="rounded-[2rem] border border-white bg-white/70 backdrop-blur-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                      <h4 className="text-base font-bold text-slate-800">Top Performing Releases</h4>
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Last 30 days</span>
                    </div>

                    {/* Fake analytics bars */}
                    {[
                      { title: "Redesigned Dashboard UI", views: 1242, pct: 95 },
                      { title: "Stripe Integration", views: 856, pct: 60 },
                      { title: "Bug Fix: SSO Timeout", views: 432, pct: 35 },
                      { title: "Custom Webhooks", views: 321, pct: 25 },
                    ].map((item, i) => (
                      <div key={i} className="mb-5 last:mb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-slate-700 truncate mr-4">{item.title}</span>
                          <span className="text-sm font-bold text-slate-900 shrink-0">
                            {item.views.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${item.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-slate-800 to-slate-600 rounded-full relative"
                          >
                            <div className="absolute top-0 left-0 w-1/2 h-full bg-white/30 skew-x-12" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* ────────── FAQ ────────── */}
          <motion.section
            initial={{ opacity: 0, y: 60, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-24 md:py-32 px-6 z-10"
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <SectionHeading className="mx-auto">Frequently asked questions</SectionHeading>
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden z-10"
          >
            <div className="relative z-10 max-w-5xl mx-auto text-center bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] px-6 py-20 md:py-32 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_20px_80px_rgba(0,0,0,0.15)] border border-white/5">
              {/* Premium Dark Background Elements */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
              <motion.div 
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" 
              />
              <motion.div 
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-0 w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" 
              />
              
              <div className="relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-3xl mx-auto"
                >
                  Ready to showcase your hard work?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                  Stop hiding your updates in long email threads. Set up a gorgeous, branded changelog with Changeyof in under 5 minutes.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={() => router.push("/login")}
                    className="relative overflow-hidden px-10 py-4 md:px-12 md:py-5 rounded-full bg-white text-slate-900 font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
                  >
                    {/* Shiny sweep effect */}
                    <motion.div 
                      animate={{ x: ["-200%", "300%"] }} 
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-slate-500/15 to-transparent skew-x-12 z-0" 
                    />
                    <span className="relative z-10">Create your Changelog</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* ────────── FOOTER ────────── */}
          <Footer />
        </div>
      </motion.div>
    </main>
  );
}
