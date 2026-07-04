import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveRight, Target, Users, ScanSearch, SlidersHorizontal } from "lucide-react";

export default function TargetedCommunicationPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-200">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          Targeted User Communication
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          Right message. <br />Right user. Right time.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Stop blasting your entire user base with irrelevant updates. Use segmentation to ensure users only see the news that matters to them.
        </p>
      </section>

      {/* Features Section */}
      <div className="bg-slate-50 py-24 border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Attributes</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Pass user data like `plan_type`, `role`, or `location` to our widget and create granular audiences for your announcements.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Behavioral Targeting</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Trigger updates based on in-app behavior. Show an onboarding video only when a user visits a specific page for the first time.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <ScanSearch className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">User-Level Analytics</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Don't just track raw views. See exactly *who* opened your update and measure engagement by segment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-50 skew-x-[-12deg] -z-10" />
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Respect your users' attention
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              When everything is an alert, nothing is. By targeting updates to the specific cohort that needs them, you preserve trust and guarantee high engagement when it actually matters.
            </p>
            <ul className="space-y-4">
              {[
                "Target by subscription tier (Free, Pro, Enterprise)",
                "Target by user lifecycle (New vs Active vs Churn-risk)",
                "Test messaging with specific small cohorts first"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 shadow-2xl relative">
               <div className="flex flex-col gap-4">
                  <div className="text-white/50 text-sm uppercase tracking-wider font-bold mb-2">Audience Rule Builder</div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                     <span className="text-white font-medium text-sm">Where</span>
                     <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-md font-mono">user.plan</span>
                     <span className="text-white/60 text-sm">is exactly</span>
                     <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-md uppercase">Enterprise</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                     <span className="text-white font-medium text-sm">And</span>
                     <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-md font-mono">user.role</span>
                     <span className="text-white/60 text-sm">is exactly</span>
                     <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-md uppercase">Admin</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-indigo-400 text-sm font-semibold">
                     <Target className="w-4 h-4" /> Estimated reach: 1,240 users
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#050505] text-white py-32 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to get personal?
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Start targeting your updates in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
              Start Free Trial <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <Footer theme="dark" />
    </main>
  );
}
