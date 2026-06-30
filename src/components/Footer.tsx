"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-12 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          
          {/* Left: Brand & Copy */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles size={18} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <span className="font-bold text-white tracking-tight text-lg">Changeyof</span>
            </Link>
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; 2026. Helping developers communicate better.
            </p>
          </div>

          {/* Center: Main Links */}
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Login
            </Link>
          </nav>

          {/* Right: Legal & Contact */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:hello@changeyof.com" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              hello@changeyof.com
            </a>
          </div>

        </div>
      </div>
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
    </footer>
  );
}
