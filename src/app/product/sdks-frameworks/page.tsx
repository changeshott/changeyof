"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Smartphone,
  Blocks,
  WifiOff,
  Type,
  BoxSelect,
  Package,
  Check,
  Copy
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SDKsFrameworksPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const codeSnippet = `import { init, identify } from '@acme/react';

// 1. Initialize the SDK
init('pk_live_your_public_key');

// 2. Identify the current user
identify({
  id: 'usr_123',
  email: 'founder@startup.com',
  plan: 'enterprise'
});

// 3. Drop in the React component
export default function App() {
  return <FeedbackWidget theme="dark" />;
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      title: "Drop-in UI Components",
      desc: "Beautiful, fully accessible React and Vue components ready to use out of the box.",
      icon: BoxSelect
    },
    {
      title: "Full Type Safety",
      desc: "Our SDKs are written in TypeScript, providing excellent autocomplete and compile-time checks.",
      icon: Type
    },
    {
      title: "Offline Support",
      desc: "Mobile SDKs cache events when offline and automatically sync when a connection is restored.",
      icon: WifiOff
    },
    {
      title: "Cross-Platform",
      desc: "Native support for iOS (Swift), Android (Kotlin), React Native, and Flutter.",
      icon: Smartphone
    },
    {
      title: "Tiny Bundle Size",
      desc: "Our core web SDK is less than 5kb minified and gzipped. We won't slow down your app.",
      icon: Package
    },
    {
      title: "Modular Architecture",
      desc: "Import only the modules you need (e.g., just tracking, or just UI components).",
      icon: Blocks
    }
  ];

  const steps = [
    { title: "Install", desc: "Add the package via npm, yarn, SwiftPM, or Gradle." },
    { title: "Initialize", desc: "Pass your public key at the root of your application." },
    { title: "Identify", desc: "Pass user properties for accurate segmentation." },
    { title: "Render", desc: "Use our pre-built components or build your own." }
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
          <span className="flex h-1.5 w-1.5 rounded-full bg-white/20 animate-pulse" />
          SDKS & FRAMEWORKS
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text max-w-4xl mx-auto"
        >
          Native Everywhere
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-sm md:text-sm text-slate-400 mb-8 max-w-lg leading-relaxed px-4 mx-auto"
        >
          React, Vue, Angular, iOS, Android, React Native, and Flutter. First-class support for whatever stack you choose.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/signup" className="w-full sm:w-auto group relative px-8 py-3.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-all flex items-center justify-center gap-2 overflow-hidden">
             <span className="relative z-10">Start building</span>
             <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
          </Link>
          <Link href="#docs" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            View SDK Docs
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
            
            {/* Package Manager Tabs */}
            <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.02] border-b border-white/5">
              <div className="text-sm font-semibold text-white">npm</div>
              <div className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">yarn</div>
              <div className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">pnpm</div>
            </div>

            {/* Install Command */}
            <div className="px-6 py-4 border-b border-white/5 bg-[#0a0a0a] flex justify-between items-center group">
               <code className="text-sm text-slate-200">npm install @acme/react @acme/core</code>
               <button className="text-white/30 hover:text-white transition-colors">
                 <Copy className="w-4 h-4" />
               </button>
            </div>

            {/* Code Editor */}
            <div className="flex-1 p-6 relative group bg-[#0a0a0a]">
              <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 rounded-md bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="text-sm text-slate-300 overflow-x-auto leading-relaxed">
                <code>
<span className="text-slate-500">import</span> {"{ init, identify }"} <span className="text-slate-500">from</span> <span className="text-white">&apos;@acme/react&apos;</span>;<br/><br/>
<span className="text-white/30">{"// 1. Initialize the SDK"}</span><br/>
<span className="text-white">init</span>(<span className="text-white">&apos;pk_live_your_public_key&apos;</span>);<br/><br/>
<span className="text-white/30">{"// 2. Identify the current user"}</span><br/>
<span className="text-white">identify</span>({"{"}<br/>
  <span className="text-slate-500">id:</span> <span className="text-white">&apos;usr_123&apos;</span>,<br/>
  <span className="text-slate-500">email:</span> <span className="text-white">&apos;founder@startup.com&apos;</span>,<br/>
  <span className="text-slate-500">plan:</span> <span className="text-white">&apos;enterprise&apos;</span><br/>
{"}"});<br/><br/>
<span className="text-white/30">{"// 3. Drop in the React component"}</span><br/>
<span className="text-slate-500">export default function</span> <span className="text-white">App</span>() {"{"}<br/>
  <span className="text-slate-500">return</span> <span className="text-white">{"<FeedbackWidget theme=\"dark\" />"}</span>;<br/>
{"}"}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Workflow Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">From Zero to Live in Minutes</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">We&apos;ve done the heavy lifting so your engineers can focus on your core product.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Engineered for Performance</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Robust tools that respect your app&apos;s bundle size and battery life.</p>
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
           
           <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white relative z-10">Stop rebuilding the wheel</h2>
           <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 text-lg">Use our battle-tested components and SDKs to integrate feedback and announcements in hours, not weeks.</p>
           
           <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
               Install the SDK <ArrowRight className="w-4 h-4" />
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