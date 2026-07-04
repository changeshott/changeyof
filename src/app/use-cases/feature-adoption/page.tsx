import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveRight, TrendingUp, Compass, Pointer, Gamepad2 } from "lucide-react";

export default function FeatureAdoptionPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-200">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          Feature Adoption
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          Make sure your hard <br />work gets used
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Don't just launch and pray. Drive PLG adoption and re-engage users with contextual, in-app onboarding nudges that actually convert.
        </p>
      </section>

      {/* Features Section */}
      <div className="bg-slate-50 py-24 border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Onboarding Nudges</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Guide new users to their "aha!" moment faster. Use targeted tooltips to highlight core features on their first login.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Pointer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Contextual Tooltips</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Point out new buttons or hidden settings exactly where they live in the UI. No more "I didn't know you had that feature."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Product Led Growth</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Upsell premium features naturally. Show "Pro" feature announcements only to users on the free tier.
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
              Turn passive logins into active engagement
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              If a user doesn't know a feature exists, to them, it doesn't. Changeyof's in-app widgets help you educate users seamlessly without interrupting their workflow.
            </p>
            <ul className="space-y-4">
              {[
                "Track click-through rates on feature announcements",
                "A/B test different messaging and placements",
                "Dismissible banners that respect user preference"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
             {/* Abstract UI representation */}
            <div className="relative w-full max-w-sm h-80 bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden shadow-inner">
               <div className="absolute top-4 left-4 right-4 h-12 bg-white rounded-xl shadow-sm border border-slate-200" />
               <div className="absolute top-20 left-4 w-1/3 h-48 bg-white rounded-xl shadow-sm border border-slate-200" />
               
               {/* The Nudge */}
               <div className="absolute top-[80px] left-[150px] z-20 animate-bounce">
                  <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs font-medium w-48 relative">
                     <div className="absolute -left-2 top-4 w-4 h-4 bg-slate-900 rotate-45" />
                     <div className="relative z-10 flex flex-col gap-1">
                       <span className="font-bold">New: Advanced Filters</span>
                       <span className="text-slate-400">Find what you need 10x faster. Try it out now.</span>
                     </div>
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
            Drive adoption from day one
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Start increasing your feature usage today.
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
