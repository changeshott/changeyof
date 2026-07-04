"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Users,
  Filter,
  Layers,
  Zap,
  Target,
  Database,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SegmentationPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Custom Attributes",
      desc: "Pass any user data—like pricing tier, role, or signup date—to build precise segments.",
      icon: Database
    },
    {
      title: "Dynamic Cohorts",
      desc: "Segments update in real-time as users meet or fall out of your defined criteria.",
      icon: Users
    },
    {
      title: "Boolean Logic",
      desc: "Combine AND/OR rules to create highly specific targeting conditions.",
      icon: Filter
    },
    {
      title: "CRM Sync",
      desc: "Automatically sync cohorts from HubSpot, Salesforce, or your data warehouse.",
      icon: Zap
    },
    {
      title: "Feature Flagging",
      desc: "Use segments to gate beta features to specific user groups.",
      icon: Target
    },
    {
      title: "Analytics Breakdown",
      desc: "Filter any dashboard view by your saved segments to find hidden trends.",
      icon: Layers
    }
  ];

  const steps = [
    { title: "Sync Data", desc: "Connect your user database or CRM via our API." },
    { title: "Define Rules", desc: "Use our visual builder to create targeting conditions." },
    { title: "Preview", desc: "Instantly see how many users fall into your new segment." },
    { title: "Target", desc: "Use the segment for announcements, surveys, or rollouts." }
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
          SEGMENTATION
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text max-w-4xl mx-auto"
        >
          Right Message, Right Users, Right Time
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-sm md:text-sm text-slate-400 mb-8 max-w-lg leading-relaxed px-4 mx-auto"
        >
          Stop blasting everyone. Use powerful data attributes to group your users and deliver hyper-relevant communications.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/signup" className="w-full sm:w-auto group relative px-8 py-3.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-all flex items-center justify-center gap-2 overflow-hidden">
             <span className="relative z-10">Start segmenting</span>
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
                    <Filter className="w-5 h-5 text-slate-200" />
                 </div>
                 <div>
                   <h3 className="font-medium text-white">Segment Builder</h3>
                   <p className="text-sm text-slate-500">&quot;Enterprise Power Users&quot;</p>
                 </div>
               </div>
               <div className="px-3 py-1.5 rounded-md bg-white/10 text-xs text-slate-300 border border-white/5 flex items-center gap-2">
                 <Users className="w-3 h-3" /> 1,204 Users Matched
               </div>
            </div>

            <div className="space-y-4 flex-grow px-4">
               <div className="flex items-center gap-4">
                 <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-slate-300">Plan</div>
                 <span className="text-slate-500 text-sm">is</span>
                 <div className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-md text-sm text-white">Enterprise</div>
               </div>
               
               <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                 <div className="text-xs text-white/30 w-8">AND</div>
                 <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-slate-300">Last Login</div>
                 <span className="text-slate-500 text-sm">less than</span>
                 <div className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-md text-sm text-white">7 days ago</div>
               </div>

               <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                 <div className="text-xs text-white/30 w-8">AND</div>
                 <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-slate-300">Role</div>
                 <span className="text-slate-500 text-sm">is one of</span>
                 <div className="flex gap-2">
                   <div className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-md text-sm text-white">Admin</div>
                   <div className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-md text-sm text-white">Owner</div>
                 </div>
               </div>

               <div className="mt-8 pt-6 border-t border-white/5">
                 <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:scale-105 transition-transform">
                   <CheckCircle2 className="w-4 h-4" /> Save Segment
                 </button>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Workflow Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Precision Targeting</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Build powerful audiences in seconds without writing a single SQL query.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Your Data, Activated</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to turn raw user properties into actionable cohorts.</p>
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
           
           <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white relative z-10">Stop the noise.</h2>
           <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 text-lg">Ensure every message reaches exactly who it needs to. Start building powerful user segments today.</p>
           
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