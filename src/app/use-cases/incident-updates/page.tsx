import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveRight, AlertTriangle, ShieldAlert, Activity, Wifi } from "lucide-react";

export default function IncidentUpdatesPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-200">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          Incident & Status Updates
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          Communicate clearly <br />when things go wrong
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Maintain user trust during downtime and maintenance with real-time status updates and proactive communication.
        </p>
      </section>

      {/* Features Section */}
      <div className="bg-slate-50 py-24 border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Incident Banners</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Display critical high-priority banners inside your app the moment an incident is declared to intercept support tickets.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Maintenance Notices</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Schedule and announce upcoming maintenance windows well in advance so users can plan accordingly.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Post-Mortem Reports</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Publish detailed incident resolutions and post-mortems in a dedicated category to build long-term trust.
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
              Don't leave your users in the dark
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              When systems fail, silence is your worst enemy. Proactive communication reduces support load and proves to your users that you are on top of the situation.
            </p>
            <ul className="space-y-4">
              {[
                "Trigger alerts programmatically via API",
                "Color-coded urgency levels",
                "Email broadcasts for critical issues"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-[#111] rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
               <div className="h-12 bg-red-600 flex items-center px-6 gap-3">
                 <Wifi className="w-4 h-4 text-white" />
                 <span className="text-white font-bold text-sm">Active Incident: API Degradation</span>
               </div>
               <div className="p-8">
                 <div className="border-l-2 border-red-500 pl-4 mb-6">
                    <h4 className="text-white font-bold mb-1">Investigating</h4>
                    <p className="text-white/60 text-sm">We are currently investigating elevated latency and error rates on our core API endpoints. We will provide an update shortly.</p>
                 </div>
                 <div className="border-l-2 border-slate-700 pl-4 opacity-50">
                    <h4 className="text-white font-bold mb-1">Identified</h4>
                    <p className="text-white/60 text-sm">The issue has been traced to a database lock. Mitigation is in progress.</p>
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
            Prepare for the unexpected
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Set up your status and incident comms before you need them.
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
