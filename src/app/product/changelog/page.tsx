"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { 
  Megaphone, 
  Paintbrush, 
  Rss, 
  BarChart3, 
  CalendarClock, 
  Search, 
  Share2, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Globe,
  Sparkles,
  Bug,
  ChevronDown
} from "lucide-react";

// ── Section Component ───────────────────────────────────────────
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-400 tracking-wider uppercase mb-6"
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight ${className}`}
    >
      {children}
    </motion.h2>
  );
}

function SectionDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={`text-base md:text-lg text-white/50 max-w-2xl leading-relaxed mt-5 ${className}`}
    >
      {children}
    </motion.p>
  );
}

// ── Fake changelog preview card ──────────────────────────────────
function ChangelogPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl shadow-black/50"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/5 rounded-md px-4 py-1 text-[11px] text-white/40 font-mono">
            yourapp.com/changelog
          </div>
        </div>
      </div>

      {/* Changelog content */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/30">cf</div>
          <div>
            <h3 className="text-lg font-bold text-white">Your App Changelog</h3>
            <p className="text-xs text-white/40">Follow the latest updates and improvements</p>
          </div>
        </div>

        {/* Release entries */}
        {[
          { type: "New", title: "Dark Mode & Theme Customization", date: "Today", color: "emerald", icon: <Sparkles className="w-4 h-4" /> },
          { type: "Fix", title: "Resolved image upload timeout issue", date: "2 days ago", color: "rose", icon: <Bug className="w-4 h-4" /> },
          { type: "Improvement", title: "30% faster page load times", date: "1 week ago", color: "blue", icon: <Zap className="w-4 h-4" /> },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
          >
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
              <p className="text-xs text-white/40 mt-1 line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Feature card component ───────────────────────────────────────
function FeatureCard({ icon, title, desc, delay = 0 }: { icon: React.ReactNode; title: string; desc: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.05]"
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────
const faqs = [
  {
    question: "How do I set up my changelog page?",
    answer: "Once you create a project in Changeyof, your changelog page is automatically generated. You can customize the theme, colors, and fonts from the Project Settings panel. Share the link and you're live!"
  },
  {
    question: "Can I use my own domain for the changelog?",
    answer: "Yes! You can point a custom domain or subdomain (like changelog.yourapp.com) to your Changeyof-powered changelog page for a fully branded experience."
  },
  {
    question: "How does the analytics/view tracking work?",
    answer: "Every time a user views a release on your public changelog page, we automatically track it. You can see view counts per release directly in your dashboard."
  },
  {
    question: "Can I schedule releases for the future?",
    answer: "Absolutely! In the release editor, set a future date and click 'Schedule Release'. The release will remain hidden from your public changelog until the scheduled time arrives."
  },
  {
    question: "What channels can I broadcast to?",
    answer: "Currently, Changeyof supports broadcasting to Slack, GitHub Releases, and sharing to X (Twitter). We're continuously adding more channels."
  }
];

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-white/50 leading-relaxed">{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════
export default function ChangelogProductPage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  return (
    <main className="relative bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] w-full flex justify-center pointer-events-none">
        <Navbar isHidden={isScrolled} />
      </div>

      {/* ────────── HERO ────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 z-0 bg-curtain" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_40%,rgba(99,102,241,0.08),transparent)]" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--background))]" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <SectionBadge>
            <Megaphone className="w-3.5 h-3.5" /> Changelog & News Feed
          </SectionBadge>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            Keep a changelog{" "}
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              users actually check
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            A beautifully branded changelog page on your domain. Announce every release, keep users informed, and make every update count.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-10"
          >
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="#features"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium transition-all text-sm"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Hero Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl mx-auto mt-16"
        >
          <ChangelogPreviewCard />

          {/* Glow behind the card */}
          <div className="absolute -inset-10 bg-indigo-500/5 blur-3xl rounded-full -z-10 pointer-events-none" />
        </motion.div>
      </section>

      {/* ────────── FEATURES GRID ────────── */}
      <section id="features" className="relative py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge><Sparkles className="w-3.5 h-3.5" /> Features</SectionBadge>
            <SectionHeading>Everything you need to ship updates</SectionHeading>
            <SectionDescription>
              Powerful tools that make writing, publishing, and tracking your product updates effortless.
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<Globe className="w-5 h-5" />}
              title="Branded Changelog Page"
              desc="A beautiful, SEO-optimized public page that matches your brand. Customize colors, fonts, and themes."
              delay={0}
            />
            <FeatureCard
              icon={<Paintbrush className="w-5 h-5" />}
              title="Full Customization"
              desc="Adjust themes, accent colors, typography, and more from the dashboard. Make it yours."
              delay={0.1}
            />
            <FeatureCard
              icon={<Rss className="w-5 h-5" />}
              title="Multi-Channel Broadcasting"
              desc="Automatically broadcast to Slack, GitHub Releases, and X (Twitter) when you publish."
              delay={0.2}
            />
            <FeatureCard
              icon={<CalendarClock className="w-5 h-5" />}
              title="Scheduled Releases"
              desc="Schedule releases for the future. They'll appear on your changelog only when the time comes."
              delay={0.3}
            />
            <FeatureCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="View Analytics"
              desc="Track how many people actually read each release. See which updates resonate with your users."
              delay={0.4}
            />
            <FeatureCard
              icon={<Search className="w-5 h-5" />}
              title="Search & Filter"
              desc="Let users and your team quickly find releases by type, status, or keywords."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ────────── SECTION: Branded Page ────────── */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <SectionBadge><Paintbrush className="w-3.5 h-3.5" /> Customization</SectionBadge>
              <SectionHeading>A changelog page that looks like yours</SectionHeading>
              <SectionDescription>
                Customize every detail — from colors and fonts to layout and branding. Your changelog should feel like a native part of your product, not a third-party tool.
              </SectionDescription>
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-3"
              >
                {["Theme mode (light / dark / auto)", "Custom accent colors", "Typography selection", "SEO title & meta description", "Custom Open Graph images"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl">
                {/* Color swatches mockup */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs text-white/40 font-medium">Accent</span>
                  {["bg-indigo-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500", "bg-blue-500"].map((c, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full ${c} ${i === 0 ? 'ring-2 ring-offset-2 ring-offset-[#111] ring-indigo-500' : ''} cursor-pointer hover:scale-110 transition-transform`} />
                  ))}
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs text-white/40 font-medium">Theme</span>
                  <div className="flex gap-2">
                    {["Light", "Dark", "Auto"].map((t, i) => (
                      <div key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${i === 1 ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-white/40'}`}>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40 font-medium">Font</span>
                  <div className="flex gap-2">
                    {["Inter", "System", "Mono", "Outfit"].map((f, i) => (
                      <div key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${i === 0 ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-white/40'}`}>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Preview area */}
                <div className="mt-6 rounded-xl border border-white/5 bg-black/30 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">cf</div>
                    <div className="text-sm font-bold text-white">Your App</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                    <div className="h-3 bg-white/5 rounded w-5/6" />
                  </div>
                </div>
              </div>
              <div className="absolute -inset-10 bg-purple-500/5 blur-3xl rounded-full -z-10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────── SECTION: Broadcasting ────────── */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual — left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl space-y-4">
                {/* Channel cards */}
                {[
                  { name: "Slack", color: "bg-[#4A154B]", desc: "Auto-post to #product-updates", emoji: "💬" },
                  { name: "GitHub Releases", color: "bg-[#24292e]", desc: "Create a release on your repo", emoji: "🐙" },
                  { name: "X (Twitter)", color: "bg-black", desc: "Share to your followers", emoji: "𝕏" },
                  { name: "Public Changelog", color: "bg-indigo-600", desc: "Live on your branded page", emoji: "📢" },
                ].map((ch, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg ${ch.color} flex items-center justify-center text-white text-lg shrink-0`}>
                      {ch.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white">{ch.name}</h4>
                      <p className="text-xs text-white/40">{ch.desc}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </motion.div>
                ))}
              </div>
              <div className="absolute -inset-10 bg-emerald-500/5 blur-3xl rounded-full -z-10 pointer-events-none" />
            </motion.div>

            {/* Text — right */}
            <div className="order-1 lg:order-2">
              <SectionBadge><Rss className="w-3.5 h-3.5" /> Multi-Channel</SectionBadge>
              <SectionHeading>Write once, deliver everywhere</SectionHeading>
              <SectionDescription>
                Publish a release once and automatically broadcast it to Slack, GitHub, X, and your public changelog — all at once. No copy-pasting, no manual posting.
              </SectionDescription>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── SECTION: Analytics ────────── */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <SectionBadge><BarChart3 className="w-3.5 h-3.5" /> Analytics</SectionBadge>
              <SectionHeading>See which updates resonate</SectionHeading>
              <SectionDescription>
                Know exactly how many people read each release. Understand what your users care about and iterate faster based on real data, not guesswork.
              </SectionDescription>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex gap-8"
              >
                {[
                  { label: "Views per release", value: "Real-time" },
                  { label: "Per-release tracking", value: "Automatic" },
                  { label: "Dashboard analytics", value: "Built-in" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-lg font-bold text-indigo-400">{stat.value}</span>
                    <span className="text-xs text-white/40 mt-1">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl">
                <h4 className="text-sm font-semibold text-white/60 mb-5">Release Performance</h4>
                {/* Fake analytics bars */}
                {[
                  { title: "Dark Mode & Themes", views: 342, pct: 95 },
                  { title: "API Rate Limiting", views: 218, pct: 60 },
                  { title: "Bug Fix: Upload Timeout", views: 156, pct: 43 },
                  { title: "New Onboarding Flow", views: 127, pct: 35 },
                  { title: "Widget Customization", views: 89, pct: 25 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="mb-4 last:mb-0"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-white/80 truncate mr-4">{item.title}</span>
                      <span className="text-xs text-white/40 shrink-0">{item.views} views</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="absolute -inset-10 bg-indigo-500/5 blur-3xl rounded-full -z-10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────── SECTION: Export & Share ────────── */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <SectionBadge><Share2 className="w-3.5 h-3.5" /> Share & Export</SectionBadge>
          <SectionHeading className="mx-auto">Share your releases anywhere</SectionHeading>
          <SectionDescription className="mx-auto">
            Export as PNG/JPG, share to X, or copy the link. Every release is designed to be shared.
          </SectionDescription>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto"
          >
            {[
              { icon: "🖼️", title: "Export as Image", desc: "Download as PNG or JPG for social sharing" },
              { icon: "𝕏", title: "Share to X", desc: "One-click post to your Twitter/X audience" },
              { icon: "🔗", title: "Copy Link", desc: "Shareable URL for every single release" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-center"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-white/40">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────── FAQ ────────── */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <SectionHeading className="mx-auto">Frequently asked questions</SectionHeading>
          </div>
          <div className="divide-y divide-white/10">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_50%,rgba(99,102,241,0.1),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            Start your changelog in minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-white/50 mb-10 max-w-lg mx-auto"
          >
            Set up your branded changelog, start publishing releases, and keep your users informed — all for free.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-4 rounded-full bg-white text-black font-bold text-base hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] mx-auto flex items-center gap-2"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ────────── FOOTER ────────── */}
      <footer className="relative z-20 pt-16 pb-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <Link href="/" className="text-white font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
            Changeyof.
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
          <span>&copy; {new Date().getFullYear()} Changeyof Inc.</span>
        </div>
      </footer>
    </main>
  );
}
