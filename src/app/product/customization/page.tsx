"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Palette,
  Globe,
  Code,
  Droplet,
  EyeOff,
  Wrench,
  CheckCircle2,
  PaintBucket
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CustomizationPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Custom Domains",
      desc: "Host your changelog and feedback board on feedback.yourcompany.com with free SSL.",
      icon: Globe
    },
    {
      title: "Remove Branding",
      desc: "Completely remove all 'Powered by' badges and links for a pure white-label experience.",
      icon: EyeOff
    },
    {
      title: "Custom CSS",
      desc: "Inject your own CSS to completely overhaul the layout and match your exact brand guidelines.",
      icon: Code
    },
    {
      title: "Theme Variables",
      desc: "Easily map our UI components to your brand colors, border radius, and typography via our editor.",
      icon: Palette
    },
    {
      title: "Dark Mode Native",
      desc: "Built-in support for light, dark, and system themes that adapt to your users' preferences.",
      icon: Droplet
    },
    {
      title: "Language Overrides",
      desc: "Change any string of text in the UI (e.g., change 'Upvote' to 'Like' or 'Feature' to 'Idea').",
      icon: Wrench
    }
  ];

  const steps = [
    { title: "Point Domain", desc: "Add a CNAME record in your DNS settings." },
    { title: "Set Colors", desc: "Pick your brand's primary and secondary hex codes." },
    { title: "Whitelabel", desc: "Toggle off our branding with a single click." },
    { title: "Launch", desc: "Your users will never know you're using a third-party tool." }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#fafafa] selection:bg-white/20 overflow-hidden flex flex-col">
      <Navbar theme="dark" />
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 bg-curtain pointer-events-none opacity-50" />
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--background))] pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-40 md:pt-48 pb-24 text-center flex-grow flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] md:text-xs font-medium mb-5 backdrop-blur-sm"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          BRANDING & CUSTOMIZATION
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text max-w-4xl mx-auto"
        >
          Make It Look Like Yours
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-sm md:text-sm text-slate-400 mb-8 max-w-lg leading-relaxed px-4 mx-auto"
        >
          Custom domains, custom CSS, and full white-labeling. Ensure a seamless brand experience from your marketing site to your feedback board.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/signup" className="w-full sm:w-auto group relative px-8 py-3.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-all flex items-center justify-center gap-2 overflow-hidden">
             <span className="relative z-10">Start customizing</span>
             <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
          </Link>
          <Link href="#demo" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            View Showcase
          </Link>
        </motion.div>
      </section>

      {/* 2. Visual Dashboard Mockup (Deep Dive) */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="glass rounded-3xl border border-white/10 p-2 overflow-hidden shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[450px]">
            
            {/* Editor Sidebar */}
            <div className="w-full md:w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
              <div className="px-4 py-3 border-b border-white/5 text-sm font-semibold text-white flex items-center gap-2">
                <PaintBucket className="w-4 h-4" /> Theme Editor
              </div>
              
              <div className="p-4 space-y-6 flex-grow">
                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Primary Color</label>
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-md bg-white border border-white/20" />
                    <input type="text" value="#FFFFFF" readOnly className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-slate-200 w-full outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Border Radius</label>
                  <div className="flex gap-2">
                    <div className="flex-1 py-1 text-center bg-white/5 border border-white/10 rounded-md text-xs text-slate-300">0px</div>
                    <div className="flex-1 py-1 text-center bg-white/20 border border-white/30 rounded-md text-xs text-white font-medium">8px</div>
                    <div className="flex-1 py-1 text-center bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">Max</div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Typography</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-slate-200 outline-none appearance-none">
                    <option>Inter (Sans-serif)</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Whitelabel</span>
                  <div className="w-8 h-4 rounded-full bg-white relative flex items-center cursor-pointer">
                    <div className="w-3 h-3 rounded-full bg-black absolute right-0.5" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-white/5">
                <button className="w-full py-2 bg-white text-black text-xs font-semibold rounded-md">Save Changes</button>
              </div>
            </div>
            
            {/* Live Preview Side */}
            <div className="flex-1 p-8 bg-[#030303] flex items-center justify-center relative">
              <div className="absolute top-4 right-4 text-xs text-white/30">Live Preview</div>
              
              {/* Fake UI Component */}
              <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
                 <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                   <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                     <div className="w-3 h-3 bg-black rounded-sm" />
                   </div>
                   <span className="text-sm font-semibold text-white">Acme Inc</span>
                 </div>
                 <div className="p-6">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                     <CheckCircle2 className="w-5 h-5 text-white" />
                   </div>
                   <h4 className="text-lg font-medium text-white mb-2">Request Submitted</h4>
                   <p className="text-xs text-slate-400 mb-6 leading-relaxed">Thank you for your feedback! We&apos;ve added this to our triage queue.</p>
                   <button className="w-full py-2.5 bg-white text-black rounded-lg text-sm font-semibold">
                     Return to Dashboard
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Workflow Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Your Brand, Front and Center</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Don&apos;t settle for generic portals. Extend your brand identity perfectly.</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
           <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
           {steps.map((step, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.15 }}
               className="relative z-10 flex flex-col items-center text-center group"
             >
               <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center mb-6 text-xl text-slate-200 group-hover:bg-white/10 transition-colors group-hover:scale-110 duration-300">
                 0{idx + 1}
               </div>
               <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
               <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Pixel Perfect Control</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">From simple color tweaks to full CSS rewrites, you hold the keys.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {features.map((feature, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               onMouseEnter={() => setHoveredFeature(idx)}
               onMouseLeave={() => setHoveredFeature(null)}
               className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors"
             >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                
                {/* Subtle Hover Glow */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 blur-3xl rounded-full transition-opacity duration-700 pointer-events-none ${hoveredFeature === idx ? 'opacity-100' : 'opacity-0'}`} />
             </motion.div>
           ))}
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32 text-center">
         <div className="glass p-12 md:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none group-hover:opacity-50 transition-opacity duration-700" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />
           
           <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white relative z-10">Make it yours</h2>
           <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 text-lg">Remove our logo, add yours, and map a custom domain today.</p>
           
           <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
               Upgrade to Whitelabel <ArrowRight className="w-4 h-4" />
             </Link>
             <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto">
               View Pricing
             </Link>
           </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}