"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Bot,
  BrainCircuit,
  MessageSquare,
  LockKeyhole,
  Sparkles,
  ServerCog,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MCPServerPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Universal Protocol",
      desc: "Built on the Model Context Protocol (MCP), ensuring compatibility with Claude Desktop and more.",
      icon: ServerCog
    },
    {
      title: "Context Injection",
      desc: "LLMs can read your existing roadmaps and feature requests to understand what users want.",
      icon: BrainCircuit
    },
    {
      title: "Autonomous Publishing",
      desc: "Agents can draft, format, and publish release notes directly to your changelog.",
      icon: Sparkles
    },
    {
      title: "Secure Operations",
      desc: "Fine-grained permissions ensure agents only perform actions you explicitly authorize.",
      icon: LockKeyhole
    },
    {
      title: "Chat Interface",
      desc: "Command your feedback board naturally through a chat interface without opening the dashboard.",
      icon: MessageSquare
    },
    {
      title: "Agentic Workflows",
      desc: "Allow complex agents (like Devin or AutoGPT) to triage incoming bug reports automatically.",
      icon: Bot
    }
  ];

  const steps = [
    { title: "Connect", desc: "Add our MCP Server to your Claude Desktop config file." },
    { title: "Contextualize", desc: "Ask the AI what the top requested feature is this week." },
    { title: "Command", desc: "Instruct the AI to draft a changelog for your recent commits." },
    { title: "Publish", desc: "The AI executes the API calls to publish the update." }
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
          MODEL CONTEXT PROTOCOL
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text max-w-4xl mx-auto"
        >
          Let Agents Publish For You
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-sm md:text-sm text-slate-400 mb-8 max-w-lg leading-relaxed px-4 mx-auto"
        >
          Connect Claude, ChatGPT, and autonomous coding agents directly to your feedback board and changelog using our native MCP server.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/signup" className="w-full sm:w-auto group relative px-8 py-3.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-all flex items-center justify-center gap-2 overflow-hidden">
             <span className="relative z-10">Get the MCP Server</span>
             <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
          </Link>
          <Link href="#demo" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            Read the Specs
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
          <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden flex flex-col relative z-10">
            
            {/* LLM Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                 </div>
                 <div>
                    <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                    <p className="text-xs text-slate-500">MCP Connection: Active</p>
                 </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-6 space-y-6 flex-grow bg-[#0a0a0a]">
               {/* User Message */}
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                   <span className="text-xs font-bold text-slate-300">U</span>
                 </div>
                 <div className="flex-grow pt-1">
                   <p className="text-sm text-white/90">Can you check what the most upvoted feature request is right now?</p>
                 </div>
               </div>

               {/* AI Response */}
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                   <Sparkles className="w-4 h-4 text-white" />
                 </div>
                 <div className="flex-grow pt-1 space-y-3">
                   <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                     <ServerCog className="w-3 h-3" /> calling tool <code>get_top_requests</code>
                   </div>
                   <p className="text-sm text-white/90">Based on your feedback board, the most upvoted feature request is **&quot;Dark Mode Support&quot;** with 342 upvotes. It is currently marked as &quot;Planned&quot;.</p>
                 </div>
               </div>

               {/* User Message 2 */}
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                   <span className="text-xs font-bold text-slate-300">U</span>
                 </div>
                 <div className="flex-grow pt-1">
                   <p className="text-sm text-white/90">Great. I just shipped that. Please update the status to &quot;Shipped&quot; and draft a quick changelog post about it.</p>
                 </div>
               </div>

               {/* AI Response 2 */}
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                   <Sparkles className="w-4 h-4 text-white" />
                 </div>
                 <div className="flex-grow pt-1 space-y-3">
                   <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                     <ServerCog className="w-3 h-3" /> calling tool <code>update_request_status</code>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                     <ServerCog className="w-3 h-3" /> calling tool <code>create_changelog_draft</code>
                   </div>
                   <div className="p-4 rounded-xl border border-white/10 bg-white/5 relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-200" />
                        <span className="text-sm font-semibold text-white">Draft Created</span>
                      </div>
                      <p className="text-sm text-slate-300">I&apos;ve updated the status to &quot;Shipped&quot; and created a draft changelog titled &quot;Introducing Dark Mode&quot;. It is waiting for your review in the dashboard.</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Workflow Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">The AI-Native Workflow</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Stop context switching. Let your AI coding assistant manage product communications.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Empower Your Agents</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Turn read-only LLMs into proactive product managers.</p>
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
           
           <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white relative z-10">The Future of Product Ops</h2>
           <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 text-lg">Connect Claude to your workspace today and experience fully autonomous product updates.</p>
           
           <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
               Get the Server URI <ArrowRight className="w-4 h-4" />
             </Link>
             <Link href="#docs" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto">
               View GitHub Repo
             </Link>
           </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}