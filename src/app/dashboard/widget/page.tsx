"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Copy, CheckCircle2, LayoutDashboard, Palette, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import AnimatedHeader from "@/components/AnimatedHeader";
import WidgetCustomizer from "@/components/WidgetCustomizer";

export default function WidgetSetupPage() {
  const supabase = createClient();
  const [projects, setProjects] = useState<{id: string, name: string}[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [codeTab, setCodeTab] = useState("html");
  const [previewKey, setPreviewKey] = useState(1);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [segment, setSegment] = useState("");

  useEffect(() => {
    // Only set on mount once
    setTimeout(() => setBaseUrl(window.location.origin), 0);
    const fetchProjects = async () => {
      const { data } = await supabase.from("projects").select("id, name");
      if (data) {
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId(data[0].id);
        }
      }
      setIsLoadingProjects(false);
    };
    fetchProjects();

    const handlePreviewReload = () => setPreviewKey(k => k + 1);
    window.addEventListener('widget-settings-updated', handlePreviewReload);
    return () => window.removeEventListener('widget-settings-updated', handlePreviewReload);
  }, [supabase]);

  // The widget route now relies on the database settings, so we just pass the ID
  let widgetUrl = `${baseUrl}/widget/${selectedProjectId}`;
  if (userId || segment) {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (segment) params.append("segment", segment);
    widgetUrl += `?${params.toString()}`;
  }

  const getHtmlCode = () => {
    return `<iframe \n  src="${widgetUrl}" \n  width="100%" \n  height="600" \n  style="border:none; border-radius:12px;"\n  allowtransparency="true"\n></iframe>`;
  };

  const getReactCode = () => {
    return `import React from 'react';\n\nexport default function ChangelogWidget() {\n  return (\n    <iframe \n      src="${widgetUrl}"\n      width="100%" \n      height="600" \n      style={{ border: 'none', borderRadius: '12px' }}\n      title="Changelog"\n    />\n  );\n}`;
  };

  const getVueCode = () => {
    return `<template>\n  <iframe \n    src="${widgetUrl}"\n    width="100%" \n    height="600" \n    style="border:none; border-radius:12px;"\n    title="Changelog"\n  ></iframe>\n</template>`;
  };

  const getCurrentCode = () => {
    if (codeTab === 'react') return getReactCode();
    if (codeTab === 'vue') return getVueCode();
    return getHtmlCode();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSettingsChange = (newSettings: Record<string, unknown>) => {
    const iframe = document.getElementById('widget-preview-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'WIDGET_SETTINGS_UPDATE', settings: newSettings }, '*');
    }
  };

  if (!isLoadingProjects && projects.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-[60vh] text-white">
        <div className="text-center max-w-md p-8 border border-white/10 bg-[#111] rounded-2xl shadow-2xl">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">No Projects Found</h1>
          <p className="text-slate-400 mb-8 text-sm">
            You need to create a project first before generating a widget script.
          </p>
          <Link 
            href="/dashboard/projects" 
            className="inline-flex items-center justify-center bg-white text-black font-semibold rounded-lg px-6 py-3 hover:bg-slate-200 transition-colors"
          >
            Create Your First Project
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto">
      <AnimatedHeader 
        title="Widget Installation"
        description="Copy the snippet below and paste it directly into your website's codebase."
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Project Selector */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-400 mb-2">Select Project</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                disabled={projects.length === 0}
                className="w-full bg-black border border-[#333] text-sm font-medium text-white focus:outline-none focus:border-indigo-500 rounded-lg px-4 py-2.5"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Tracking Box */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Advanced Tracking & Segmentation</h3>
              <p className="text-xs text-slate-400 mt-1">Pass dynamic user properties into the widget snippet to track views and show segmented releases.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">User ID (Dynamic)</label>
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. user_123"
                  className="w-full bg-black border border-[#333] text-sm text-white focus:outline-none focus:border-indigo-500 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Segment (Dynamic)</label>
                <input 
                  type="text" 
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  placeholder="e.g. premium"
                  className="w-full bg-black border border-[#333] text-sm text-white focus:outline-none focus:border-indigo-500 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Design Settings Form Button */}
          {selectedProjectId && (
            <button 
              onClick={() => setIsCustomizerOpen(true)}
              className="w-full bg-[#111] border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                  <Palette className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-white">Customize Widget Design</h3>
                  <p className="text-xs text-slate-400 mt-1">Change colors, fonts, and behavior</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
          )}

          {/* Code Snippet Box */}
          <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-white/5 bg-[#161616] justify-between items-center pr-4">
              <div className="flex">
                <button onClick={() => setCodeTab('html')} className={`px-4 py-3 text-[12px] font-semibold transition-colors relative ${codeTab === 'html' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  HTML
                  {codeTab === 'html' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
                </button>
                <button onClick={() => setCodeTab('react')} className={`px-4 py-3 text-[12px] font-semibold transition-colors relative ${codeTab === 'react' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  React
                  {codeTab === 'react' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
                </button>
                <button onClick={() => setCodeTab('vue')} className={`px-4 py-3 text-[12px] font-semibold transition-colors relative ${codeTab === 'vue' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  Vue
                  {codeTab === 'vue' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
                </button>
              </div>
              
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isCopied ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>
            
            <div className="p-6 overflow-x-auto custom-scrollbar bg-black/50">
              <pre className="text-[13px] text-emerald-400/90 font-mono leading-loose">
                <code>{getCurrentCode()}</code>
              </pre>
            </div>
            <div className="p-4 bg-[#161616] border-t border-white/5 text-xs text-slate-400">
              💡 The snippet URL is permanent. Design changes apply automatically!
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Preview
            </h3>
            <span className="text-xs text-slate-500">Updates instantly</span>
          </div>
          <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-[700px] flex flex-col">
            <div className="bg-[#1a1a1a] border-b border-white/10 p-3 flex items-center gap-2 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <div className="ml-4 bg-black/50 text-[10px] text-slate-400 px-3 py-1 rounded-full border border-white/5 flex-1 text-center font-mono truncate">
                {widgetUrl}
              </div>
            </div>
            {selectedProjectId ? (
              <iframe 
                id="widget-preview-iframe"
                key={previewKey}
                src={widgetUrl}
                className="w-full flex-1 bg-white dark:bg-black"
                title="Widget Preview"
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
                Select a project to preview
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customizer Modal */}
      {isCustomizerOpen && selectedProjectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar relative">
            <button 
              onClick={() => setIsCustomizerOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <WidgetCustomizer projectId={selectedProjectId} onChange={handleSettingsChange} />
          </div>
        </div>
      )}
    </main>
  );
}
