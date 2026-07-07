"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Mail,
  Hash,
  LayoutTemplate,
  Send,
  Star,
  Trash2,
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Section Components ───────────────────────────────
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-6 border border-slate-200">
      {children}
    </div>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────
const faqs = [
  { question: "What channels does Changeyof support for product updates?", answer: "We support in-app widgets (modals, banners, tooltips), standalone in-app messages, email newsletters, automated email digests, Slack channel notifications, and RSS/JSON feeds." },
  { question: "What is the difference between in-app notifications and email digest?", answer: "In-app notifications appear instantly while a user is actively using your product. Email digests are summaries of recent updates sent periodically (e.g., weekly) to users who may not have logged in recently." },
  { question: "Can I use my own domain for product update emails?", answer: "Yes, you can configure custom SMTP settings or verify your domain through our dashboard to send emails directly from your own domain (e.g., updates@yourcompany.com) for maximum deliverability and branding." },
  { question: "Does Changeyof support Slack for product updates?", answer: "Absolutely. You can integrate your workspace and select specific Slack channels where updates should be broadcasted automatically the moment you hit publish." },
  { question: "How do multi-channel updates work with segmentation?", answer: "You can apply segmentation rules (like 'Plan = Pro') to a release. The update will only be sent via email and in-app to users who match those specific criteria." }
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
export default function MultiChannelUpdatesPage() {
  const router = useRouter();

  return (
    <main className="bg-white min-h-screen font-sans">
      <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] w-full flex justify-center pointer-events-none">
        <Navbar isHidden={false} theme="light" />
      </div>

      {/* ────────── HERO ────────── */}
      <section className="relative pt-[160px] pb-[80px] px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left z-10">
            <SectionBadge>MULTI-CHANNEL UPDATES</SectionBadge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              One message, every channel your users use
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              In-app notifications, email newsletters and digests, Slack, and RSS. Publish once - reach users in-app, in their inbox, and in Slack. No duplicate content, no extra tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => router.push("/login")} className="px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-black transition-colors shadow-lg shadow-slate-900/10 flex justify-center items-center gap-2">
                Start free <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors flex justify-center items-center">
                Book a demo
              </button>
            </div>
            <p className="mt-6 text-xs text-slate-400 font-medium">
              No credit card required • 15-day trial • All features included
            </p>
          </div>
          
          <div className="flex-1 w-full relative z-10 flex justify-center lg:justify-end">
            {/* Hero Graphic - Email Card Mockup matching PDF */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-6 relative">
              {/* Paper Airplane abstract decoration */}
              <div className="absolute -top-12 -right-8 opacity-20 -z-10 w-32 h-32">
                <Send className="w-full h-full text-slate-400 rotate-[-45deg]" />
              </div>
              <svg className="absolute -top-8 right-16 w-16 h-16 text-slate-200 -z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 90 C 40 90, 60 50, 90 10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-slate-400 font-bold text-xl">
                    M
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Great Co.</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">To: User <ChevronDown className="w-3 h-3" /></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Star className="w-4 h-4" />
                  <Trash2 className="w-4 h-4" />
                  <MoreVertical className="w-4 h-4" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug max-w-xs">
                Something important you shouldn&apos;t miss
              </h3>
              
              <div className="space-y-3">
                <div className="w-full h-3 bg-slate-100 rounded-full" />
                <div className="w-11/12 h-3 bg-slate-100 rounded-full" />
                <div className="w-4/5 h-3 bg-slate-100 rounded-full" />
                <div className="w-3/4 h-3 bg-slate-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── LOGOS ────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by product teams at</div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale mb-6">
            <span className="text-2xl font-bold font-serif text-slate-900">DrDoctor</span>
            <span className="text-2xl font-bold font-sans text-slate-900 border-2 border-slate-900 px-3 py-0.5 rounded-full tracking-tighter">carta</span>
            <span className="text-2xl font-bold font-sans text-slate-900">atlan</span>
            <span className="text-2xl font-bold font-sans text-slate-900 tracking-widest">CISCO</span>
            <span className="text-2xl font-bold font-serif italic text-slate-900">AdaptiveCX</span>
            <span className="text-2xl font-bold font-sans text-slate-900">Meetup</span>
          </div>
          <div className="text-sm font-semibold text-slate-500 mb-2">+2,000 other teams</div>
          <a href="#stories" className="text-sm font-semibold text-slate-900 hover:underline">See how they use Changeyof &rarr;</a>
        </div>
      </section>

      {/* ────────── WHO IT'S FOR (Gray Background) ────────── */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Who it&apos;s for</h2>
          <div className="flex flex-col gap-6 max-w-2xl mx-auto text-left">
            {[
              "Product and marketing teams that ship frequent updates and want one place to publish",
              "Teams that need both in-app visibility and email for users who aren't in the product",
              "Companies using Slack for internal or customer communication and want updates there too"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-slate-700" />
                </div>
                <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── COMMON SCENARIOS ────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Common scenarios</h2>
          <div className="flex flex-col gap-5 max-w-2xl mx-auto text-left">
            {[
              "Changelog posts delivered in-app (widgets, toasts, modals) and by email",
              "Weekly or monthly email digest of recent product updates",
              "Slack channel notifications when you publish a release",
              "Standalone in-app messages (marketing, status) independent of changelog",
              "RSS/Atom feed for power users and third-party tools"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                </div>
                <p className="text-base text-slate-700 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CENTRAL VISUAL (Mock UI) ────────── */}
      <section className="bg-white pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200 p-2 md:p-4">
             {/* Fake Browser Chrome */}
             <div className="flex items-center gap-4 px-4 py-3 bg-white rounded-t-xl border-b border-slate-100">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-slate-300" />
                   <div className="w-3 h-3 rounded-full bg-slate-300" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-slate-50 rounded-md py-1.5 px-4 text-center text-xs text-slate-400 font-mono">
                   updates.yourapp.com
                </div>
             </div>
             
             {/* Fake Content Feed */}
             <div className="bg-white p-6 md:p-8 flex flex-col gap-6 rounded-b-xl min-h-[400px]">
                
                {/* Post 1 */}
                <div className="border border-slate-100 rounded-xl p-5 shadow-sm">
                   <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">New</span>
                      <span className="text-xs text-slate-400 font-medium">2d ago</span>
                   </div>
                   <h3 className="font-bold text-slate-900 mb-3">Slack notifications for new releases</h3>
                   <div className="w-full h-2.5 bg-slate-100 rounded-full mb-2" />
                   <div className="w-5/6 h-2.5 bg-slate-100 rounded-full" />
                </div>

                {/* Post 2 */}
                <div className="border border-slate-100 rounded-xl p-5 shadow-sm">
                   <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Improved</span>
                      <span className="text-xs text-slate-400 font-medium">1w ago</span>
                   </div>
                   <h3 className="font-bold text-slate-900 mb-3">Weekly email digest now customizable</h3>
                   <div className="w-full h-2.5 bg-slate-100 rounded-full mb-2" />
                   <div className="w-4/5 h-2.5 bg-slate-100 rounded-full mb-2" />
                   <div className="w-2/3 h-2.5 bg-slate-100 rounded-full" />
                </div>

                {/* Post 3 */}
                <div className="border border-slate-100 rounded-xl p-5 shadow-sm">
                   <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Announcement</span>
                      <span className="text-xs text-slate-400 font-medium">2w ago</span>
                   </div>
                   <h3 className="font-bold text-slate-900 mb-3">RSS and JSON feeds now available</h3>
                   <div className="w-full h-2.5 bg-slate-100 rounded-full mb-2" />
                   <div className="w-3/4 h-2.5 bg-slate-100 rounded-full" />
                </div>

             </div>
          </div>
        </div>
      </section>

      {/* ────────── HOW IT HELPS (Gray Background) ────────── */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How Changeyof helps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <LayoutTemplate className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">In-app</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                10+ widget types, boosters, and standalone in-app notifications. Reach users inside your product in real time.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Email</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Per-post emails or automated digest. Custom SMTP, subscriber management, branded templates.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Hash className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Slack & RSS</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Post to Slack channels when you publish. RSS, Atom, and JSON feed for integrations and power users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── FAQ ────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>
          <div className="bg-white rounded-3xl">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CUSTOMER QUOTE ────────── */}
      <section className="bg-white pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-100 p-8 md:p-12">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">See how Atlan uses Changeyof</div>
           <p className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-8">
             &quot;Atlan publishes each update once and distributes it across public changelog, in-app notifications, and email - so critical changes are never missed.&quot;
           </p>
           <div className="flex justify-between items-center border-t border-slate-200 pt-6">
              <span className="font-bold text-slate-700">Atlan</span>
              <a href="#" className="text-sm font-semibold text-slate-900 hover:underline flex items-center gap-1">
                Read the Atlan story <ArrowRight className="w-3.5 h-3.5" />
              </a>
           </div>
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="bg-white pb-24 md:pb-32 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 max-w-2xl mx-auto leading-tight">
                Start delivering updates on every channel
              </h2>
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
                15-day free trial. All features included. No credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 items-center justify-center">
                <input 
                  type="email" 
                  placeholder="Your work email" 
                  className="w-full sm:flex-1 bg-white border border-slate-200 rounded-md px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-sm"
                />
                <button
                  onClick={() => router.push("/login")}
                  className="w-full sm:w-auto px-6 py-3 rounded-md bg-slate-900 text-white font-bold text-sm hover:bg-black transition-colors shadow-md whitespace-nowrap flex justify-center items-center gap-2"
                >
                  Start free <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <p className="mt-8 text-sm text-slate-500">
                Or <a href="#" className="font-semibold text-slate-900 hover:underline">book a demo</a> to see Changeyof in action.
              </p>
           </div>
        </div>
      </section>

      {/* ────────── FOOTER ────────── */}
      <Footer />
    </main>
  );
}
