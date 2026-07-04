"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Map,
  TrendingUp,
  Activity,
  MessageSquare,
  Users,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FeatureRequestsPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Public Roadmaps",
      desc: "Share your product vision transparently. Let users see what's planned, in progress, and shipped.",
      icon: Map
    },
    {
      title: "Upvote & Prioritize",
      desc: "Identify the most highly requested features instantly with intuitive voting mechanisms.",
      icon: TrendingUp
    },
    {
      title: "Status Automation",
      desc: "Keep users in the loop automatically when their requested feature changes status.",
      icon: Activity
    },
    {
      title: "Rich Discussions",
      desc: "Foster a community with threaded comments and rich media support on every request.",
      icon: MessageSquare
    },
    {
      title: "User Segmentation",
      desc: "Filter requests by user tier, ARR, or custom attributes to weigh feedback appropriately.",
      icon: Users
    },
    {
      title: "Closing the Loop",
      desc: "Automatically notify voters when a feature they requested goes live.",
      icon: CheckCircle2
    }
  ];

  const steps = [
    { title: "Collect", desc: "Gather feedback from a dedicated portal, widget, or API." },
    { title: "Analyze", desc: "Sort by upvotes, user segments, and estimated impact." },
    { title: "Plan", desc: "Move winning ideas to your roadmap and assign statuses." },
    { title: "Ship", desc: "Release updates and automatically notify all subscribers." }
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
          FEATURE REQUESTS & VOTING
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text max-w-4xl mx-auto"
        >
          Let Users Shape Your Roadmap
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-sm md:text-sm text-slate-400 mb-8 max-w-lg leading-relaxed px-4 mx-auto"
        >
          Collect, prioritize, and manage feature requests in one centralized hub. Build what your users actually want, and skip the guesswork.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/signup" className="w-full sm:w-auto group relative px-8 py-3.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-all flex items-center justify-center gap-2 overflow-hidden">
             <span className="relative z-10">Start building for free</span>
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
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-slate-200" />
                 </div>
                 <div>
                   <h3 className="font-medium text-white">Feature Requests</h3>
                   <p className="text-sm text-slate-500">Sorted by Top Voted</p>
                 </div>
               </div>
               <div className="px-3 py-1.5 rounded-md bg-white/10 text-xs text-slate-300 border border-white/5">
                 Active Board
               </div>
            </div>

            <div className="space-y-3 flex-grow">
              {[
                { title: "Dark Mode Support", votes: 342, status: "In Progress", color: "bg-white/20 text-white" },
                { title: "Zapier Integration", votes: 215, status: "Planned", color: "bg-white/10 text-slate-300" },
                { title: "Custom Domains", votes: 189, status: "Under Review", color: "bg-transparent border border-white/10 text-slate-400" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="flex flex-col items-center justify-center w-12 h-14 rounded-lg bg-white/5 border border-white/10 shrink-0">
                    <ChevronRight className="w-4 h-4 text-slate-500 -rotate-90 mb-1" />
                    <span className="text-sm font-medium text-white/90">{item.votes}</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-white/90">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Submitted by Enterprise Tier</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Workflow Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">From Idea to Reality</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A seamless workflow designed to bridge the gap between your users and your engineering team.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Everything You Need</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Powerful tools to manage feedback at scale without losing the personal touch.</p>
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
           
           <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white relative z-10">Ready to build what matters?</h2>
           <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 text-lg">Stop guessing what your users want. Start listening, prioritizing, and shipping with confidence today.</p>
           
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