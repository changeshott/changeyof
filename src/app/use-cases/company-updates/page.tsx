import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveRight, Building2, Users, Newspaper, ShieldCheck } from "lucide-react";

export default function CompanyUpdatesPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-200">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          Company Updates
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          Keep everyone aligned <br />on the big picture
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          From leadership announcements to quarterly reviews, create a single source of truth for company news that cuts through inbox noise.
        </p>
      </section>

      {/* Features Section */}
      <div className="bg-slate-50 py-24 border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Centralized Hub</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Give your company updates a permanent home. Employees can easily catch up on what they missed while they were away.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rich Media Support</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Embed videos from the CEO, attach slide decks, and use rich text formatting to make your announcements engaging.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Access Control</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Keep internal news internal. Use SSO, password protection, or IP whitelisting to ensure only authorized team members can read your updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-12 -z-10" />
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Replace long email threads with a beautiful timeline
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Email is great for 1-on-1 communication, but terrible for broadcasting company-wide news. Important context gets lost, attachments expire, and new hires can never access historical announcements.
            </p>
            <ul className="space-y-4">
              {[
                "Organize updates with tags and categories",
                "Automatically notify employees via Slack or Teams",
                "Track read receipts and engagement metrics"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-[#111] p-6 rounded-2xl border border-slate-200 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-3 h-3 rounded-full bg-slate-600" />
                 <div className="w-3 h-3 rounded-full bg-slate-600" />
                 <div className="w-3 h-3 rounded-full bg-slate-600" />
               </div>
               <div className="space-y-4">
                 <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                   <div className="text-xs text-white/40 mb-1">Today</div>
                   <div className="text-white font-bold mb-2">Q3 Goals & Objectives</div>
                   <div className="w-full h-2 bg-white/10 rounded-full mb-2" />
                   <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                 </div>
                 <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                   <div className="text-xs text-white/40 mb-1">Last Week</div>
                   <div className="text-white font-bold mb-2">Welcome to the new team members!</div>
                   <div className="w-full h-2 bg-white/10 rounded-full mb-2" />
                   <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section (Dark context) */}
      <div className="bg-[#050505] text-white py-32 border-t border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Start communicating better today
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Set up your company updates hub in minutes. 15-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Your work email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
              Get Started <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dark Footer */}
      <Footer theme="dark" />
    </main>
  );
}
