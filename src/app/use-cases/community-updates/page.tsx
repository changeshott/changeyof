import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveRight, Globe2, HeartHandshake, MessageCircleHeart, UsersRound } from "lucide-react";

export default function CommunityUpdatesPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-200">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          Community Updates
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          Turn users into <br />true advocates
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Keep your community informed, engaged, and excited about what you're building together with a transparent public feed.
        </p>
      </section>

      {/* Features Section */}
      <div className="bg-slate-50 py-24 border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Public Roadmap</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Show the world what you're working on. Build trust through transparency by sharing your product journey publicly.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Community Recognition</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Highlight community contributions, open-source PRs, or user of the month directly in your main update feed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <MessageCircleHeart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Two-Way Feedback</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Allow your community to react, comment, and provide feedback directly on your announcements to foster engagement.
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
              A vibrant community needs a heartbeat
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Don't let your community grow stagnant. Regular updates give people a reason to return, engage, and advocate for your product across the web.
            </p>
            <ul className="space-y-4">
              {[
                "Announce beta programs and collect testers",
                "Share weekly product roundups",
                "Celebrate milestones and user achievements"
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
               <div className="absolute top-4 right-4 w-12 h-12 bg-indigo-500/20 rounded-full blur-xl" />
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    <UsersRound className="w-6 h-6 text-slate-600" />
                 </div>
                 <div>
                    <h4 className="text-white font-bold mb-1">Community Beta Program</h4>
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">
                       We're looking for 50 passionate users to test our upcoming workflow builder. Exclusive swag for participants!
                    </p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-medium">🎉 142</span>
                       <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-medium">❤️ 89</span>
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
            Engage your community
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Create your public feed in minutes. No credit card required.
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
