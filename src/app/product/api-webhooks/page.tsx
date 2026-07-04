"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Code2,
  TerminalSquare,
  Webhook,
  ShieldCheck,
  Zap,
  BookOpen,
  Copy,
  Check
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ApiWebhooksPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const codeSnippet = `query GetFeatureRequests {
  requests(first: 10, status: "PLANNED") {
    edges {
      node {
        id
        title
        upvotes
        author {
          email
          tier
        }
      }
    }
  }
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      title: "GraphQL API",
      desc: "Fetch exactly the data you need, nothing more. Deeply query relationships in a single request.",
      icon: Code2
    },
    {
      title: "11 Webhook Events",
      desc: "Listen for new feedback, status changes, upvotes, and more in real-time.",
      icon: Webhook
    },
    {
      title: "Secure Tokens",
      desc: "Generate scoped API keys for different environments with granular read/write permissions.",
      icon: ShieldCheck
    },
    {
      title: "High Rate Limits",
      desc: "Built to scale. Make up to 1,000 requests per minute on our enterprise tier.",
      icon: Zap
    },
    {
      title: "Interactive Docs",
      desc: "Explore our schema and test queries directly in the browser with our GraphiQL explorer.",
      icon: BookOpen
    },
    {
      title: "CLI Tooling",
      desc: "Manage your schema and sync configurations using our official command-line interface.",
      icon: TerminalSquare
    }
  ];

  const steps = [
    { title: "Authenticate", desc: "Generate a Bearer token from your dashboard." },
    { title: "Query", desc: "Use GraphQL to fetch feature requests or user data." },
    { title: "Listen", desc: "Set up webhook endpoints to catch real-time events." },
    { title: "Build", desc: "Integrate deeply into your own custom admin panels." }
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
          GRAPHQL API & WEBHOOKS
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text max-w-4xl mx-auto"
        >
          Unrestricted Data Access
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-sm md:text-sm text-slate-400 mb-8 max-w-lg leading-relaxed px-4 mx-auto"
        >
          Build custom workflows, sync data to your warehouse, or create bespoke UI components with our fully featured GraphQL API.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/signup" className="w-full sm:w-auto group relative px-8 py-3.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-all flex items-center justify-center gap-2 overflow-hidden">
             <span className="relative z-10">Get your API Key</span>
             <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
          </Link>
          <Link href="#docs" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            Read the Docs
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
            
            {/* Mac OS Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="ml-4 text-xs text-slate-500">api.graphql</div>
            </div>

            <div className="flex flex-col md:flex-row h-full">
              {/* Code Editor */}
              <div className="flex-1 p-6 relative group border-r border-white/5">
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 p-2 rounded-md bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>
<span className="text-slate-500">query</span> <span className="text-white">GetFeatureRequests</span> {"{"}<br/>
  requests(<span className="text-slate-500">first:</span> <span className="text-white">10</span>, <span className="text-slate-500">status:</span> <span className="text-white">&quot;PLANNED&quot;</span>) {"{"}<br/>
    edges {"{"}<br/>
      node {"{"}<br/>
        id<br/>
        title<br/>
        upvotes<br/>
        author {"{"}<br/>
          email<br/>
          tier<br/>
        {"}"}<br/>
      {"}"}<br/>
    {"}"}<br/>
  {"}"}<br/>
{"}"}
                  </code>
                </pre>
              </div>
              
              {/* JSON Response */}
              <div className="flex-1 p-6 bg-[#0a0a0a]">
                <div className="text-xs text-white/30 mb-4 uppercase tracking-widest">JSON Response (200 OK)</div>
                <pre className="text-sm text-white/60 overflow-x-auto leading-relaxed">
                  <code>
{"{"}<br/>
  &quot;data&quot;: {"{"}<br/>
    &quot;requests&quot;: {"{"}<br/>
      &quot;edges&quot;: [<br/>
        {"{"}<br/>
          &quot;node&quot;: {"{"}<br/>
            &quot;id&quot;: &quot;req_9f82d1&quot;,<br/>
            &quot;title&quot;: &quot;SSO Authentication&quot;,<br/>
            &quot;upvotes&quot;: 342,<br/>
            &quot;author&quot;: {"{"}<br/>
              &quot;email&quot;: &quot;cto@acme.inc&quot;,<br/>
              &quot;tier&quot;: &quot;enterprise&quot;<br/>
            {"}"}<br/>
          {"}"}<br/>
        {"}"}<br/>
      ]<br/>
    {"}"}<br/>
  {"}"}<br/>
{"}"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Workflow Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Developer Experience First</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Built by developers, for developers. Get up and running in minutes.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Everything is an API</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">If you can do it in the dashboard, you can do it via the API.</p>
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
           
           <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white relative z-10">Start building today</h2>
           <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 text-lg">Generate an API key and make your first GraphQL request in under two minutes.</p>
           
           <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
               Get your API Key <ArrowRight className="w-4 h-4" />
             </Link>
             <Link href="#docs" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto">
               Read the Documentation
             </Link>
           </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}