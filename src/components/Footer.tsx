import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full relative z-20 pt-24 pb-8 px-4 border-t border-black/5 bg-[#fafafa] overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 mb-20 text-center lg:text-left text-sm text-slate-500">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center lg:items-start max-w-sm">
            <span className="text-2xl font-bold text-black tracking-tight mb-4">Changeyof.</span>
            <p className="leading-relaxed">
              Helping developers communicate better. Ship faster, keep your users in the loop, and grow your product with beautiful release notes.
            </p>
          </div>

          {/* Links Container */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-24 w-full sm:w-auto items-center sm:items-start text-center sm:text-left">
            
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-black mb-2 uppercase tracking-widest text-[10px]">Platform</span>
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <Link href="/product/changelog" className="hover:text-black transition-colors">Changelog & News Feed</Link>
              <Link href="/product/in-widget" className="hover:text-black transition-colors">In-App Widgets</Link>
              <Link href="/product/in-app-notifications" className="hover:text-black transition-colors">In-App Notifications</Link>
              <Link href="/product/multi-channel-updates" className="hover:text-black transition-colors">Multi-Channel Updates</Link>
              <Link href="/product/mobile-announcements" className="hover:text-black transition-colors">Mobile Announcements</Link>
              <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-semibold text-black mb-2 uppercase tracking-widest text-[10px]">Legal</span>
              <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
              <a href="mailto:hello@changeyof.com" className="hover:text-black transition-colors">Contact</a>
            </div>

          </div>

        </div>

        {/* Massive Text at the Bottom */}
        <div className="w-full flex flex-col items-center relative">
          <h1 className="text-[16vw] leading-none font-black tracking-tighter text-black/[0.03] select-none pointer-events-none uppercase -mb-4 lg:-mb-8">
            Changeyof
          </h1>
          
          {/* Copyright Row */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium text-slate-400 mt-8 lg:mt-4 z-10 border-t border-black/5 pt-6">
            <span>&copy; {new Date().getFullYear()} Changeyof Inc. All rights reserved.</span>
            <span className="mt-2 md:mt-0">Built for developers, by developers.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
