"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Code2,
  Layout,
  MousePointerClick,
  Target,
  Eye,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Section Components ───────────────────────────────
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
      {children}
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-6 ${className}`}>
      {children}
    </h2>
  );
}

function SectionDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-base md:text-lg text-slate-600 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────
const faqs = [
  { question: "Do I need to be a developer to install this?", answer: "Not at all. If you can copy and paste a snippet of code into your website's <head> tag (or use Google Tag Manager), you can install our widget in minutes." },
  { question: "Will the widget slow down my website?", answer: "No. Our widget is highly optimized, loads asynchronously, and is delivered via a global CDN to ensure zero impact on your site's performance." },
  { question: "Can I customize how the notifications look?", answer: "Absolutely. You can customize colors, typography, positioning, and trigger behaviors directly from your dashboard without touching any CSS." },
  { question: "Can I target specific users?", answer: "Yes! By passing user attributes in the initialization script, you can show updates only to specific segments (e.g., 'Pro' users, or users on a specific operating system)." },
  { question: "Does it support multiple languages?", answer: "Yes, you can configure translations and serve localized updates based on the user's browser language or preferred settings." }
];

function FaqItem({ faq }: { faq: typeof faqs[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>{faq.question}</span>
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
            <div className="pb-6 text-base text-slate-500 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════
export default function InAppNotificationsPage() {
  const router = useRouter();

  return (
    <main className="bg-white min-h-screen font-sans">
      {/* Navbar overlay logic: In a pure white page, we pass theme="light" to get a clean white navbar */}
      <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] w-full flex justify-center pointer-events-none">
        <Navbar isHidden={false} theme="light" />
      </div>

      {/* ────────── HERO ────────── */}
      <section className="relative pt-[180px] pb-[100px] px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left z-10">
            <SectionBadge>In-App Notifications</SectionBadge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6">
              Reach users the moment they&apos;re in your app
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              With in-app notifications and messages, you can communicate to active users right inside your web app, dashboard, or SaaS. Alert users to new features, maintenance, upcoming webinars, and more without relying on emails.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => router.push("/login")} className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-black transition-colors shadow-xl shadow-slate-900/20">
                Start for free
              </button>
              <button className="px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-900 font-bold text-sm hover:border-slate-900 transition-colors">
                View demo
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10">
            {/* Hero Graphic - Dashboard Mockup */}
            <div className="bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-4 aspect-[4/3] flex flex-col relative overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="flex gap-6 flex-1">
                <div className="w-1/4 bg-slate-50 rounded-lg flex flex-col gap-3 p-3">
                  <div className="w-full h-8 bg-slate-200 rounded-md" />
                  <div className="w-full h-4 bg-slate-200 rounded-md" />
                  <div className="w-3/4 h-4 bg-slate-200 rounded-md" />
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <div className="w-full h-32 bg-slate-50 rounded-lg border border-slate-100 p-4">
                     <div className="w-1/3 h-6 bg-slate-200 rounded-md mb-4" />
                     <div className="w-full h-4 bg-slate-200 rounded-md mb-2" />
                     <div className="w-2/3 h-4 bg-slate-200 rounded-md" />
                  </div>
                  <div className="flex gap-4 flex-1">
                     <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100" />
                     <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100" />
                  </div>
                </div>
              </div>
              {/* Fake In-App Notification hovering on the dashboard mockup */}
              <div className="absolute top-20 right-10 bg-white p-4 rounded-lg shadow-2xl border border-slate-100 w-64 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 shrink-0 flex items-center justify-center">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="w-24 h-3 bg-slate-800 rounded-full mb-2" />
                    <div className="w-full h-2 bg-slate-200 rounded-full mb-1" />
                    <div className="w-3/4 h-2 bg-slate-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── LOGOS ────────── */}
      <section className="border-y border-slate-100 py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Trusted by teams at</span>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center">
            <span className="text-xl font-bold font-serif text-slate-900">DrDoctor</span>
            <span className="text-xl font-bold font-sans text-slate-900 tracking-tighter">eidan</span>
            <span className="text-xl font-bold font-sans text-slate-900">ACME</span>
            <span className="text-xl font-bold font-serif italic text-slate-900">Quantum</span>
            <span className="text-xl font-bold font-sans text-slate-900">Nexus</span>
          </div>
        </div>
      </section>

      {/* ────────── INTRODUCTION ────────── */}
      <section className="py-24 max-w-4xl mx-auto text-center px-6">
        <SectionBadge>In-app notifications vs boosters</SectionBadge>
        <SectionDescription className="text-xl md:text-2xl !text-slate-800 font-medium">
          In-app notifications are an absolute game changer. Using emails to reach your active users isn&apos;t effective. Most emails get buried in spam or simply ignored. By reaching users natively within your app, you guarantee a 100% open rate. Catch your users while they&apos;re already in your product.
        </SectionDescription>
      </section>

      {/* ────────── FEATURES ────────── */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-32">
        
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-slate-50 rounded-3xl -z-10" />
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 max-w-sm mx-auto transform -rotate-2 hover:rotate-0 transition-transform relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Something new for you</h4>
                  <div className="w-full h-2 bg-slate-200 rounded-full mb-2" />
                  <div className="w-4/5 h-2 bg-slate-200 rounded-full mb-2" />
                  <div className="w-2/3 h-2 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
            {/* Paper Airplane abstract decoration */}
            <div className="absolute top-0 right-10 opacity-20 -z-10 w-32 h-32">
              <Send className="w-full h-full text-slate-400 rotate-[-45deg]" />
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <SectionBadge>Your Website</SectionBadge>
            <SectionHeading>Every notification style your users expect</SectionHeading>
            <SectionDescription>
              You wouldn&apos;t send a full-screen popup for a minor bug fix. We provide exactly the right style you need for every message. No coding or CSS required.
            </SectionDescription>
            <ul className="mt-8 space-y-4">
              {['Slide-in side notifications', 'Center modal popups', 'Non-intrusive top banners', 'Corner floating widgets'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-slate-900 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <SectionBadge>Updates Live</SectionBadge>
            <SectionHeading>Updates appear the moment you publish</SectionHeading>
            <SectionDescription>
              Push updates in real-time. The moment you hit &apos;Publish&apos; in your dashboard, every active user sees the notification instantly via WebSockets. No page refresh needed.
            </SectionDescription>
            <ul className="mt-8 space-y-4">
              {['Real-time WebSocket connection', 'Zero performance impact', 'No database polling overhead'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-slate-900 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-slate-50 rounded-3xl -z-10" />
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-4 aspect-[4/3] flex flex-col transform rotate-2 hover:rotate-0 transition-transform relative z-10">
               <div className="w-full h-8 border-b border-slate-100 mb-4 flex items-center px-2">
                  <div className="w-16 h-3 bg-slate-200 rounded-full" />
               </div>
               <div className="flex-1 flex gap-4">
                  <div className="w-1/3 bg-slate-50 rounded-lg" />
                  <div className="flex-1 flex flex-col gap-4">
                     <div className="flex-1 bg-slate-50 rounded-lg" />
                     <div className="flex-1 bg-slate-50 rounded-lg" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-slate-50 rounded-3xl -z-10" />
            <div className="aspect-square max-w-sm mx-auto relative flex items-center justify-center">
               {/* Abstract circles for frameworks */}
               <div className="absolute inset-0 border border-slate-200 rounded-full border-dashed" />
               <div className="w-20 h-20 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center absolute top-0 -translate-y-1/2">
                  <Code2 className="w-8 h-8 text-slate-800" />
               </div>
               <div className="w-20 h-20 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center absolute bottom-0 translate-y-1/2">
                  <Layout className="w-8 h-8 text-slate-800" />
               </div>
               <div className="w-20 h-20 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center absolute left-0 -translate-x-1/2">
                  <Target className="w-8 h-8 text-slate-800" />
               </div>
               <div className="w-20 h-20 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center absolute right-0 translate-x-1/2">
                  <Eye className="w-8 h-8 text-slate-800" />
               </div>
               <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl relative z-10">
                  <MousePointerClick className="w-10 h-10" />
               </div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <SectionBadge>Seamless Integration</SectionBadge>
            <SectionHeading>Notifications that feel native to your product</SectionHeading>
            <SectionDescription>
              Don&apos;t let ugly 3rd-party widgets ruin your design system. Our components automatically inherit your app&apos;s typography and color scheme, looking like you spent weeks building them from scratch.
            </SectionDescription>
            <ul className="mt-8 space-y-4">
              {['Native DOM injection', 'Inherits your CSS variables', 'Fully headless options available'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-slate-900 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <SectionBadge>Smart Targeting</SectionBadge>
            <SectionHeading>Show the right update to the right users</SectionHeading>
            <SectionDescription>
              Never spam your entire user base again. Pass user metadata like &apos;plan&apos;, &apos;role&apos;, or &apos;signup_date&apos; to surgically target your announcements to the exact audience that needs to see them.
            </SectionDescription>
            <ul className="mt-8 space-y-4">
              {['Target by custom user attributes', 'Target by specific page URLs', 'A/B test different messages'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-slate-900 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
             <div className="absolute -inset-4 bg-slate-50 rounded-3xl -z-10" />
             <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-8 transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="flex flex-col gap-4 items-center">
                   <div className="px-4 py-2 bg-slate-100 rounded-md text-sm font-bold border border-slate-200">User matches all conditions</div>
                   <div className="w-px h-6 bg-slate-300" />
                   <div className="flex items-center gap-2 w-full justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                      <span className="font-mono text-sm font-bold text-slate-700">plan</span>
                      <span className="text-xs text-slate-400 font-bold uppercase">equals</span>
                      <span className="font-mono text-sm font-bold bg-slate-900 text-white px-2 py-1 rounded">PRO</span>
                   </div>
                   <div className="w-px h-6 bg-slate-300" />
                   <div className="flex justify-center gap-8 w-full">
                      <div className="flex flex-col items-center">
                         <div className="w-px h-6 bg-slate-300" />
                         <div className="w-10 h-10 bg-slate-100 rounded-full mt-2" />
                      </div>
                      <div className="flex flex-col items-center">
                         <div className="w-px h-6 bg-slate-300" />
                         <div className="w-10 h-10 bg-slate-100 rounded-full mt-2" />
                      </div>
                      <div className="flex flex-col items-center">
                         <div className="w-px h-6 bg-slate-300" />
                         <div className="w-10 h-10 bg-slate-100 rounded-full mt-2" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-slate-50 rounded-3xl -z-10" />
            <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 flex flex-col justify-end aspect-[4/3] transform rotate-1 hover:rotate-0 transition-transform">
               <div className="flex justify-between items-end h-[60%] gap-4 mb-4">
                  {[40, 70, 45, 90, 65, 100].map((h, i) => (
                     <div key={i} className="w-full bg-slate-200 rounded-t-md relative group">
                        <div className="absolute bottom-0 left-0 w-full bg-slate-900 rounded-t-md transition-all duration-1000" style={{ height: `${h}%` }} />
                     </div>
                  ))}
               </div>
               <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div>
                     <div className="text-sm font-bold text-slate-900">Total Views</div>
                     <div className="text-2xl font-bold text-slate-900">14.2k</div>
                  </div>
                  <div>
                     <div className="text-sm font-bold text-slate-900">Click Rate</div>
                     <div className="text-2xl font-bold text-slate-900">12.4%</div>
                  </div>
               </div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <SectionBadge>Analytics</SectionBadge>
            <SectionHeading>Know which updates your users actually see</SectionHeading>
            <SectionDescription>
              Stop guessing. Get detailed analytics on views, clicks, and dismissals. See exactly how your announcements drive engagement and feature adoption.
            </SectionDescription>
            <ul className="mt-8 space-y-4">
              {['View-through rates', 'Click-through analytics', 'Dismissal tracking'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-slate-900 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </section>

      {/* ────────── FAQ ────────── */}
      <section className="bg-slate-50 py-24 md:py-32 border-t border-slate-100 mt-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionHeading>Frequently asked questions</SectionHeading>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 px-8 py-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="bg-white py-24 md:py-32 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100 shadow-xl relative overflow-hidden">
             {/* Abstract wave or subtle texture could go here, keeping it clean for now */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02),transparent_70%)]" />
             <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  Start delivering in-app notifications today
                </h2>
                <p className="text-lg text-slate-600 mb-10">
                  Join thousands of teams keeping their users informed with in-app notifications. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 bg-white border border-slate-200 rounded-full px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-sm"
                  />
                  <button
                    onClick={() => router.push("/login")}
                    className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-colors shadow-lg shadow-slate-900/20 whitespace-nowrap flex justify-center items-center gap-2"
                  >
                    Start for free <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-6 text-sm text-slate-500">14-day free trial. Cancel anytime.</p>
             </div>
          </div>
        </div>
      </section>

      {/* ────────── FOOTER ────────── */}
      <Footer />
    </main>
  );
}
