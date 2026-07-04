"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  ChevronDown,
  Star,
  Users,
  Bell,
  Code2,
  LayoutDashboard,
  Target,
  MessageSquareHeart,
  BarChart3,
  Globe,
  Palette,
  Blocks,
  Languages,
  Mail,
  Lock,
  Focus,
  CalendarDays,
  Pin,
  ShieldCheck
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
  { question: "Can I display specific product updates only to a specific user group?", answer: "Yes, our user segmentation feature allows you to target updates based on custom attributes, ensuring the right users see the right announcements." },
  { question: "Is it possible to know whether users see and read published release notes?", answer: "Absolutely. Our analytics dashboard provides detailed insights into views, clicks, and interactions for every announcement you publish." },
  { question: "Are there any limitations on monthly active tracked users?", answer: "Our plans scale with your needs. While starter plans have MAU limits, our enterprise tiers offer unlimited tracking." },
  { question: "Can I create release notes in multiple languages?", answer: "Yes, our multi-language support lets you translate and publish announcements in over 50 languages natively." },
  { question: "Which mobile platforms does Changeyof support?", answer: "We provide native SDKs for iOS (Swift), Android (Kotlin), and cross-platform frameworks like React Native and Flutter." },
  { question: "Do I need to release an app update to change announcements?", answer: "No. Once the SDK is installed, you can publish and manage all announcements dynamically from our web dashboard without requiring App Store approvals." },
  { question: "Can I use boosters or modals in my mobile app?", answer: "Yes, our mobile SDK supports various UI components including modals, full-screen takeover, and subtle banners." },
  { question: "How do I integrate Changeyof into my iOS or Android app?", answer: "We provide comprehensive documentation. It typically involves adding our SDK via your package manager (CocoaPods, Gradle, npm) and initializing it with your project key." },
  { question: "Is there a free trial for mobile app announcements?", answer: "Yes, all our plans include a 15-day free trial with full access to mobile SDK features." },
  { question: "Can I style the in-app announcement UI to match my app?", answer: "Yes, the UI is highly customizable. You can adjust colors, fonts, and layouts to perfectly match your brand's native design system." }
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
export default function MobileAnnouncementsPage() {
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
            <SectionBadge>MOBILE APP ANNOUNCEMENTS</SectionBadge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Effortless Mobile App Update Announcements
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Inform customers directly inside your mobile app via ready-to-use <strong>What&apos;s new</strong> UI components. Take the hassle out of implementing announcements <strong>natively</strong> into your mobile app. Integrate our mobile SDK and reduce repetitive, boring work.
            </p>
            <p className="text-sm text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Changeyof is a product communication platform that helps you create an interactive changelog for your product, software, and mobile applications to deliver product updates efficiently.
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

            {/* Fake Reviews Section */}
            <div className="mt-8 flex flex-col items-center lg:items-start gap-3">
               <div className="flex items-center gap-4 opacity-70 grayscale">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">G2 CROWD</div>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">Capterra</div>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">Product Hunt</div>
               </div>
               <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-xs text-slate-500 font-medium ml-2">4.8/5 based on 100+ <span className="underline">reviews</span></span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10 flex justify-center lg:justify-end">
            {/* Hero Graphic - Mobile App Mockup */}
            <div className="w-[320px] bg-slate-50 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-[8px] border-white relative overflow-hidden flex flex-col h-[600px]">
               {/* Mobile Status Bar */}
               <div className="w-full h-12 bg-slate-50 shrink-0" />
               
               {/* App Header */}
               <div className="px-6 py-4">
                  <h3 className="text-2xl font-bold text-slate-900">YOUR APP</h3>
               </div>

               {/* App Content (Feed) */}
               <div className="flex-1 overflow-hidden px-4 flex flex-col gap-4">
                  {/* Card 1 */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
                     <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0 overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-slate-300 to-slate-200" />
                     </div>
                     <div className="flex-1 py-1 flex flex-col gap-2">
                        <div className="w-full h-2.5 bg-slate-200 rounded-full" />
                        <div className="w-3/4 h-2.5 bg-slate-200 rounded-full" />
                        <div className="w-1/2 h-2.5 bg-slate-100 rounded-full mt-1" />
                     </div>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
                     <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0 overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100" />
                     </div>
                     <div className="flex-1 py-1 flex flex-col gap-2">
                        <div className="w-full h-2.5 bg-slate-200 rounded-full" />
                        <div className="w-4/5 h-2.5 bg-slate-200 rounded-full" />
                        <div className="w-2/3 h-2.5 bg-slate-100 rounded-full mt-1" />
                     </div>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
                     <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0 overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-slate-400 to-slate-200" />
                     </div>
                     <div className="flex-1 py-1 flex flex-col gap-2">
                        <div className="w-11/12 h-2.5 bg-slate-200 rounded-full" />
                        <div className="w-1/2 h-2.5 bg-slate-200 rounded-full" />
                     </div>
                  </div>

                  <div className="mt-2">
                     <h4 className="font-bold text-slate-900 mb-3 px-2">Sub Menu</h4>
                     <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
                        {[1, 2, 3].map((item, i) => (
                           <div key={i} className={`flex items-center gap-3 p-3 ${i !== 2 ? 'border-b border-slate-100' : ''}`}>
                              <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                              <div className="w-1/2 h-2 bg-slate-200 rounded-full flex-1" />
                              <ChevronDown className="w-4 h-4 text-slate-300 -rotate-90" />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Bottom Navigation */}
               <div className="h-20 bg-white border-t border-slate-100 shrink-0 flex items-center justify-around px-2 relative z-20">
                  <div className="flex flex-col items-center gap-1 opacity-40">
                     <div className="w-6 h-6 bg-slate-400 rounded-full" />
                     <span className="text-[10px] font-medium text-slate-600">Tab 1</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-slate-900">
                     <Users className="w-6 h-6" />
                     <span className="text-[10px] font-bold">Tab 2</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 relative opacity-40">
                     <Bell className="w-6 h-6" />
                     <span className="text-[10px] font-medium text-slate-600">What&apos;s New</span>
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">5</div>
                  </div>
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
            <span className="text-xl font-bold font-sans text-slate-900 uppercase">Evernote</span>
            <span className="text-2xl font-bold font-sans text-slate-900">DISH</span>
          </div>
          <div className="text-sm font-semibold text-slate-500 mb-2">+2,000 other teams</div>
          <a href="#" className="text-sm font-semibold text-slate-900 hover:underline">See how they use Changeyof &rarr;</a>
        </div>
      </section>

      {/* ────────── TOOLKIT (Grid 2x2) ────────── */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              The All-In-One Toolkit for Mobile App<br className="hidden md:block"/> Launch & Update Announcements
            </h2>
            <p className="text-xl text-slate-600">
              Save months of work. Don&apos;t reinvent the wheel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Code2 className="w-8 h-8 text-slate-800" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">One-time Easy Setup</h3>
               <p className="text-base text-slate-600 leading-relaxed">
                 Get started quickly with a one-time SDK setup into your mobile app; minimal dev time required.
               </p>
            </div>
            
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <LayoutDashboard className="w-8 h-8 text-slate-800" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Advanced Web Dashboard</h3>
               <p className="text-base text-slate-600 leading-relaxed">
                 Configure the branding look, manage announcements, and get useful insights. No need for app update, no coding is required.
               </p>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-slate-800" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">User Segmentation</h3>
               <p className="text-base text-slate-600 leading-relaxed">
                 Use advanced targeting conditions to reach users at the right moment.
               </p>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <MessageSquareHeart className="w-8 h-8 text-slate-800" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Instant Feedback</h3>
               <p className="text-base text-slate-600 leading-relaxed">
                 Get in-context feedback and insights you need to improve your product.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── MANY MORE FEATURES GRID ────────── */}
      <section className="bg-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">And many more powerful features</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: BarChart3, label: "Analytics" },
              { icon: Globe, label: "Custom Host Setup" },
              { icon: Palette, label: "Custom CSS" },
              { icon: Blocks, label: "Advanced Integrations" },
              { icon: Languages, label: "Multi-language" },
              { icon: Mail, label: "Email Notifications" },
              { icon: Lock, label: "Private Feed" },
              { icon: Target, label: "User Segmentation" },
              { icon: Focus, label: "User Tracking" },
              { icon: CalendarDays, label: "Schedule post" },
              { icon: Pin, label: "Post Pinning" },
              { icon: ShieldCheck, label: "Team Management SSO" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 px-4 py-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <feature.icon className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{feature.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
             <a href="#" className="font-bold text-slate-900 hover:underline">See all features and plans &rarr;</a>
          </div>

          {/* Floating graphic from design */}
          <div className="mt-16 mx-auto max-w-sm bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-5 flex items-start gap-3">
             <div className="w-2 h-2 rounded-full bg-slate-900 mt-1.5 shrink-0" />
             <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">New: Dark mode is here</h4>
                <p className="text-xs text-slate-500">Head to Settings to try the new look in your app.</p>
             </div>
          </div>
        </div>
      </section>

      {/* ────────── FAQ ────────── */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>
          <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CUSTOMER QUOTE ────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-100 p-8 md:p-12">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">See how DISH uses Changeyof</div>
           <p className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-8">
             &quot;Product updates coordinated across multiple products and 12+ languages from a single changelog.&quot;
           </p>
           <div className="flex justify-between items-center border-t border-slate-200 pt-6">
              <span className="font-bold text-slate-700 uppercase tracking-wide">DISH</span>
              <a href="#" className="text-sm font-semibold text-slate-900 hover:underline flex items-center gap-1">
                Read the DISH story <ArrowRight className="w-3.5 h-3.5" />
              </a>
           </div>
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="bg-white pb-24 md:pb-32 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 max-w-2xl mx-auto leading-tight">
                Get started for free with Changeyof
              </h2>
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
                Inform your users about product updates and increase feature awareness.
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
