import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveRight, Smartphone, Bell, Apple, AppWindow } from "lucide-react";

export default function MobileAnnouncementsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-200">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          Mobile Announcements
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          Reach users right <br />in their pockets
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Embed native changelog feeds and push announcements directly into your iOS, Android, and Flutter apps with our lightweight SDKs.
        </p>
      </section>

      {/* Features Section */}
      <div className="bg-slate-50 py-24 border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Apple className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Native iOS & Android SDKs</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Drop in our Swift or Kotlin SDKs to render a beautiful native feed in minutes. No webviews or clunky wrappers.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <AppWindow className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cross-Platform Support</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Using React Native or Flutter? We have official packages that let you integrate the widget into hybrid apps flawlessly.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">In-App Modals</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Force critical version update notices or display rich "What's New" carousels natively the next time a user opens the app.
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
              App Store release notes aren't enough
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Users rarely read App Store update logs. To truly communicate new features or required updates, you need a native feed directly inside your application interface.
            </p>
            <ul className="space-y-4">
              {[
                "Unread badge indicators natively synced with your backend",
                "Deep linking support from push notifications",
                "Dark mode auto-sync with OS settings"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
             {/* Mock Phone UI */}
             <div className="relative w-[280px] h-[560px] bg-black rounded-[3rem] border-[12px] border-slate-800 shadow-2xl overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" /> {/* Notch */}
                
                {/* App Header */}
                <div className="pt-12 pb-4 px-6 bg-slate-900 border-b border-white/10 flex justify-between items-center relative z-10">
                   <span className="text-white font-bold text-lg">Updates</span>
                   <div className="relative">
                      <Bell className="w-5 h-5 text-white/50" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-slate-900" />
                   </div>
                </div>

                {/* Feed */}
                <div className="flex-1 bg-[#0a0a0a] p-4 space-y-4 overflow-hidden relative z-10">
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] uppercase font-bold rounded-md">New Feature</span>
                      <h4 className="text-white font-bold mt-2 text-sm">FaceID Login is here!</h4>
                      <p className="text-white/50 text-xs mt-1">You can now use biometrics to quickly access your account...</p>
                      <button className="mt-3 w-full py-2 bg-white/10 text-white rounded-xl text-xs font-bold">Enable Now</button>
                   </div>
                   
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/10 opacity-70">
                      <span className="px-2 py-0.5 bg-slate-500/20 text-slate-400 text-[10px] uppercase font-bold rounded-md">Improvement</span>
                      <h4 className="text-white font-bold mt-2 text-sm">Faster image loading</h4>
                      <p className="text-white/50 text-xs mt-1">Images now load 2x faster on cellular networks.</p>
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
            Bring your changelog to mobile
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Read the docs and integrate the SDK today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
              Get Started <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <Footer theme="dark" />
    </main>
  );
}
