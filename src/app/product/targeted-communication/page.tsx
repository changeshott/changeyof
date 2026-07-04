"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Target,
  Megaphone,
  BellRing,
  Mail,
  Smartphone,
  BarChart,
  Eye,
  MousePointerClick
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TargetedCommunicationPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "In-App Widgets",
      desc: "Deliver news directly within your product interface without disrupting the user flow.",
      icon: Megaphone
    },
    {
      title: "Push Notifications",
      desc: "Reach mobile and desktop users even when they aren't actively using your app.",
      icon: BellRing
    },
    {
      title: "Email Fallbacks",
      desc: "Automatically send an email summary if a user misses their in-app notification.",
      icon: Mail
    },
    {
      title: "Mobile Optimization",
      desc: "Announcements look native and beautiful on iOS, Android, and mobile web.",
      icon: Smartphone
    },
    {
      title: "Audience Filtering",
      desc: "Select specific segments (e.g., 'Pro Users in EMEA') to receive the update.",
      icon: Target
    },
    {
      title: "Engagement Analytics",
      desc: "Track open rates, click-through rates, and overall sentiment for every blast.",
      icon: BarChart
    }
  ];

  const steps = [
    { title: "Draft", desc: "Write your announcement using our rich text editor." },
    { title: "Select", desc: "Pick the exact user segment that needs to see this." },
    { title: "Deliver", desc: "Publish across in-app, email, and push channels." },
    { title: "Measure", desc: "Watch the analytics roll in real-time." }
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
          TARGETED COMMUNICATION
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text max-w-4xl mx-auto"
        >
          Reach the Right Users, Every Time
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-sm md:text-sm text-slate-400 mb-8 max-w-lg leading-relaxed px-4 mx-auto"
        >
          Combine segmentation and multi-channel delivery. Ensure your most important announcements cut through the noise.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/signup" className="w-full sm:w-auto group relative px-8 py-3.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-all flex items-center justify-center gap-2 overflow-hidden">
             <span className="relative z-10">Start communicating</span>
             <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
          </Link>
          <Link href="#demo" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            Book a Demo
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
          <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 min-h-[400px] flex flex-col relative z-10">
            <div className="flex flex-col md:flex-row gap-8 h-full">
              {/* Editor Side */}
              <div className="flex-1 border-r border-white/5 pr-8">
                 <div className="flex items-center gap-2 mb-6 text-slate-400 text-sm pb-4 border-b border-white/5">
                   <Target className="w-4 h-4" /> Drafting Announcement
                 </div>
                 
                 <div className="space-y-4">
                   <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-white font-medium">
                     v2.0 Beta is now live for Pro Users!
                   </div>
                   <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 text-slate-300 text-sm h-32">
                     We&apos;re excited to announce that all Pro tier users now have early access to our new dashboard overhaul...
                   </div>
                   
                   <div className="flex items-center justify-between pt-4">
                     <div className="flex items-center gap-2 text-xs text-slate-500">
                       <Target className="w-3 h-3" /> Target: &quot;Pro Users&quot;
                     </div>
                     <button className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-md">
                       Publish Now
                     </button>
                   </div>
                 </div>
              </div>
              
              {/* Analytics Side */}
              <div className="flex-1 pl-4">
                 <div className="flex items-center gap-2 mb-6 text-slate-400 text-sm pb-4 border-b border-white/5">
                   <BarChart className="w-4 h-4" /> Live Engagement
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                     <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                       <Eye className="w-3 h-3" /> Seen By
                     </div>
                     <div className="text-2xl font-semibold text-white">4,291</div>
                   </div>
                   <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                     <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                       <MousePointerClick className="w-3 h-3" /> Clicked
                     </div>
                     <div className="text-2xl font-semibold text-white">1,842</div>
                   </div>
                 </div>
                 
                 <div className="w-full h-24 rounded-lg bg-gradient-to-t from-white/5 to-transparent border-b-2 border-white/20 relative">
                   <div className="absolute bottom-0 left-1/4 w-px h-16 bg-white/20" />
                   <div className="absolute bottom-0 left-1/2 w-px h-20 bg-white/40" />
                   <div className="absolute bottom-0 left-3/4 w-px h-24 bg-white" />
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Workflow Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">The Communication Lifecycle</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A seamless way to announce changes and measure their impact.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Multi-Channel Dominance</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Meet your users wherever they are, without being spammy.</p>
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
           
           <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white relative z-10">Command Attention</h2>
           <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 text-lg">Stop relying on mass emails. Send contextual, in-app messages that actually get read.</p>
           
           <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
               Get started for free <ArrowRight className="w-4 h-4" />
             </Link>
             <Link href="/changelog" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto">
               View our changelog
             </Link>
           </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}