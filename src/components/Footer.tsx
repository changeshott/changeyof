import Link from "next/link";

export default function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
  const isDark = theme === "dark";

  return (
    <footer className={`w-full relative z-20 pt-24 pb-8 px-4 border-t overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#050505] border-white/5' : 'bg-[#fafafa] border-black/5'}`}>
      
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Main Footer Content */}
        <div className={`flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 mb-20 text-center lg:text-left text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          
          {/* Brand Info */}
          <div className="flex flex-col items-center lg:items-start max-w-sm">
            <span className={`text-2xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Changeyof.</span>
            <p className="leading-relaxed">
              Helping developers communicate better. Ship faster, keep your users in the loop, and grow your product with beautiful release notes.
            </p>
          </div>

          {/* Links Container */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-24 w-full sm:w-auto items-center sm:items-start text-center sm:text-left">
            
            <div className="flex flex-col gap-4">
              <span className={`font-semibold mb-2 uppercase tracking-widest text-[10px] ${isDark ? 'text-white/80' : 'text-black'}`}>Platform</span>
              <Link href="/" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Home</Link>
              <Link href="/product/changelog" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Changelog & News Feed</Link>
              <Link href="/product/in-widget" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>In-App Widgets</Link>
              <Link href="/product/in-app-notifications" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>In-App Notifications</Link>
              <Link href="/product/multi-channel-updates" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Multi-Channel Updates</Link>
              <Link href="/product/mobile-announcements" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Mobile Announcements</Link>
              <Link href="#pricing" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Pricing</Link>
            </div>

            <div className="flex flex-col gap-4">
              <span className={`font-semibold mb-2 uppercase tracking-widest text-[10px] ${isDark ? 'text-white/80' : 'text-black'}`}>Legal</span>
              <Link href="/privacy" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Privacy</Link>
              <Link href="/terms" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Terms</Link>
              <a href="mailto:hello@changeyof.com" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Contact</a>
            </div>

          </div>

        </div>

        {/* Massive Text at the Bottom */}
        <div className="w-full flex flex-col items-center relative">
          <h1 className={`text-[16vw] leading-none font-black tracking-tighter select-none pointer-events-none uppercase -mb-4 lg:-mb-8 ${isDark ? 'text-white/[0.03]' : 'text-black/[0.03]'}`}>
            Changeyof
          </h1>
          
          {/* Copyright Row */}
          <div className={`w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium mt-8 lg:mt-4 z-10 border-t pt-6 ${isDark ? 'border-white/5 text-slate-500' : 'border-black/5 text-slate-400'}`}>
            <span>&copy; {new Date().getFullYear()} Changeyof Inc. All rights reserved.</span>
            <span className="mt-2 md:mt-0">Built for developers, by developers.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
