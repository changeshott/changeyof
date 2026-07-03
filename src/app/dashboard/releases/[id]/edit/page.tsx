"use client";

import { Sparkles, Save, Send, Clock, Tag, GitBranch, Image as ImageIcon, X, Plus, LayoutDashboard, ChevronDown, Globe, Hash, MessageSquare, Share2, FileText } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { updateRelease } from "@/app/actions/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import MarkdownPreview from "@/components/MarkdownPreview";

const PREDEFINED_TAGS = [
  { id: "New", label: "New Feature", color: "bg-white/5 text-slate-300 border-white/10" },
  { id: "Improvement", label: "Improvement", color: "bg-white/5 text-slate-300 border-white/10" },
  { id: "Fix", label: "Bug Fix", color: "bg-white/5 text-slate-300 border-white/10" },
  { id: "Security", label: "Security", color: "bg-white/5 text-slate-300 border-white/10" },
];

export default function EditReleasePage() {
  const router = useRouter();
  const params = useParams();
  const releaseId = params.id as string;
  const supabase = createClient();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  
  const [tags, setTags] = useState<string[]>(["New"]);
  const [customTagInput, setCustomTagInput] = useState("");
  
  const [version, setVersion] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const [viewMode, setViewMode] = useState<"write" | "preview">("write");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New SEO & Metadata States
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  
  // New Webhook States
  const [notifySlack, setNotifySlack] = useState(false);
  const [notifyTwitter, setNotifyTwitter] = useState(false);
  
  const [targetSegment, setTargetSegment] = useState("all");
  
  // UI States
  const [showSEO, setShowSEO] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch projects
      const { data: projectsData } = await supabase.from("projects").select("id, name");
      if (projectsData) {
        setProjects(projectsData);
      }

      // Fetch existing release
      if (releaseId) {
        const { data: releaseData } = await supabase.from("release_notes").select("*").eq("id", releaseId).single();
        if (releaseData) {
          setTitle(releaseData.title || "");
          setContent(releaseData.content || "");
          setProjectId(releaseData.project_id || "");
          
          if (releaseData.tags && releaseData.tags.length > 0) {
            setTags(releaseData.tags);
          } else {
            setTags([releaseData.type || "New"]);
          }
          
          setVersion(releaseData.version || "");
          if (releaseData.scheduled_for) {
            // format datetime-local
            const date = new Date(releaseData.scheduled_for);
            const formatted = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
            setScheduledFor(formatted);
          }
          
          setSlug(releaseData.slug || "");
          setMetaTitle(releaseData.meta_title || "");
          setMetaDescription(releaseData.meta_description || "");
          setNotifySlack(releaseData.notify_slack || false);
          setNotifyTwitter(releaseData.notify_twitter || false);
          setTargetSegment(releaseData.target_segment || "all");
        }
      }
      setIsLoadingProjects(false);
    };
    fetchData();
  }, [releaseId, supabase]);

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setTitle("Introducing AI-Powered Release Notes");
      setContent("We are thrilled to announce that Changeyof now supports AI-generated release notes! Simply paste your technical git commits, and our AI will translate them into beautiful, user-friendly announcements in seconds.\n\n### What's included:\n- One-click summaries\n- Automatic categorization (New, Fix, Improvement)\n- Tone adjustment for your brand");
      setTags(["New", "Improvement"]);
      setIsGenerating(false);
    }, 1500);
  };

  const loadTemplate = (templateType: string) => {
    if (templateType === "weekly") {
      setTitle("Weekly Update: " + new Date().toLocaleDateString());
      setContent("### ✨ New Features\n\n- \n\n### 🚀 Improvements\n\n- \n\n### 🐛 Bug Fixes\n\n- ");
      setTags(["Improvement", "Fix"]);
    } else if (templateType === "major") {
      setTitle("Announcing v2.0: A Whole New Experience");
      setContent("It's finally here! We've completely redesigned our platform from the ground up.\n\n### 🎨 Redesigned Interface\n\nEverything is faster and more intuitive.\n\n[youtube](https://youtube.com/watch?v=dQw4w9WgXcQ)\n\n### ⚡ Performance Boosts\n\nLoad times decreased by 50%.");
      setTags(["New"]);
    } else if (templateType === "security") {
      setTitle("Security Advisory & Patch");
      setContent("We have released a critical patch resolving a vulnerability.\n\n**Action Required:** None, your cloud instances have been auto-updated.\n\n### Details\n- Fixed an issue with session validation.");
      setTags(["Security", "Fix"]);
    }
    setShowTemplates(false);
  };

  const handleShareDraft = () => {
    setIsSharing(true);
    setTimeout(() => {
      navigator.clipboard.writeText(`https://changeyof.io/preview/${Math.random().toString(36).substring(7)}`);
      alert("Draft preview link copied to clipboard!");
      setIsSharing(false);
    }, 500);
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!title || !content || !projectId) {
      alert("Title, content, and project are required.");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("project_id", projectId);
    formData.append("status", status);
    
    // For backwards compatibility with 'type' check constraint
    formData.append("type", tags.length > 0 ? tags[0] : "New");
    
    // New fields
    formData.append("tags", JSON.stringify(tags));
    if (version) formData.append("version", version);
    if (scheduledFor) formData.append("scheduled_for", new Date(scheduledFor).toISOString());
    
    // SEO & Webhook fields
    if (slug) formData.append("slug", slug);
    if (metaTitle) formData.append("meta_title", metaTitle);
    if (metaDescription) formData.append("meta_description", metaDescription);
    if (notifySlack) formData.append("notify_slack", "true");
    if (notifyTwitter) formData.append("notify_twitter", "true");
    if (targetSegment) formData.append("target_segment", targetSegment);

    const result = await updateRelease(releaseId, formData);
    setIsSaving(false);

    if (result.error) {
      alert(result.error);
    } else {
      router.push("/dashboard/releases");
    }
  };

  const toggleTag = (tagId: string) => {
    setTags(prev => 
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  const addCustomTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customTagInput.trim()) {
      e.preventDefault();
      const newTag = customTagInput.trim();
      if (!tags.includes(newTag)) {
        setTags(prev => [...prev, newTag]);
      }
      setCustomTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    const markdownImage = `\n![${file.name}](${url})\n`;
    setContent(prev => prev + markdownImage);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (!isLoadingProjects && projects.length === 0) {
    return (
      <main className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center max-w-md p-8 border border-white/10 bg-[#111] rounded-2xl shadow-2xl">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">No Projects Found</h1>
          <p className="text-slate-400 mb-8 text-sm">
            You need to create a project first before you can write and publish release notes.
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
    <main className="fixed inset-0 z-50 flex bg-[#0a0a0a] text-white">
      
      {/* Left Sidebar (Settings) */}
      <aside className="w-64 border-r border-white/10 bg-[#111] flex flex-col h-screen shrink-0 overflow-y-auto custom-scrollbar">
        {/* Top Header: Back Icon & Project Name Editor */}
        <div className="h-16 flex items-center px-4 border-b border-white/10 gap-2 shrink-0">
          <Link href="/dashboard/releases" className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors" title="Back to Dashboard">
            <LayoutDashboard className="w-4 h-4" />
          </Link>
          <div className="text-slate-600 text-sm font-light">/</div>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            disabled={projects.length === 0}
            className="flex-1 bg-transparent text-[13px] font-medium text-slate-200 focus:outline-none appearance-none cursor-pointer hover:bg-white/5 px-2 py-1.5 rounded transition-colors truncate"
          >
            {projects.length === 0 ? (
              <option value="">No projects</option>
            ) : (
              projects.map(p => (
                <option key={p.id} value={p.id} className="bg-[#111] text-white">{p.name}</option>
              ))
            )}
          </select>
        </div>

        <div className="pt-6 pb-2 px-7 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Release Settings
        </div>

        <div className="flex-1 px-4 pb-6 flex flex-col gap-6 mt-2">
          
          {/* Categorization & Tags */}
          <div className="px-3">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PREDEFINED_TAGS.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-all ${
                    tags.includes(tag.id) ? tag.color : 'bg-transparent border-[#333] text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
              
              {/* Custom Tags */}
              {tags.filter(t => !PREDEFINED_TAGS.find(pt => pt.id === t)).map(tag => (
                <div key={tag} className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="text-neutral-500 hover:text-white">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="relative mt-2">
              <Plus className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={addCustomTag}
                placeholder="Add custom tag (Enter)"
                className="w-full bg-[#161616] border border-white/10 rounded-lg pl-7 pr-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Publishing & Versioning */}
          <div className="px-3">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Scheduled
            </label>
            <input 
              type="datetime-local" 
              value={scheduledFor}
              onChange={(e) => setScheduledFor(e.target.value)}
              style={{ colorScheme: 'dark' }}
              className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
            />
          </div>

          <div className="px-3">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5" /> Version Link
            </label>
            <input 
              type="text" 
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g. v2.4.1"
              className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="px-3">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Target Segment
            </label>
            <input 
              type="text" 
              value={targetSegment}
              onChange={(e) => setTargetSegment(e.target.value.toLowerCase())}
              placeholder="e.g. all, premium, pro"
              className="w-full bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="h-px bg-white/10 mx-3 my-2" />

          {/* SEO & Meta */}
          <div className="px-3">
            <button 
              onClick={() => setShowSEO(!showSEO)}
              className="w-full flex items-center justify-between text-xs font-medium text-slate-400 hover:text-white transition-colors group"
            >
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> SEO & Meta
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSEO ? 'rotate-180' : ''}`} />
            </button>
            
            {showSEO && (
              <div className="mt-3 flex flex-col gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-1">URL Slug</label>
                  <input 
                    type="text" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="my-awesome-release"
                    className="w-full bg-[#161616] border border-white/10 rounded-md px-2 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-1">Meta Title</label>
                  <input 
                    type="text" 
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Optional title tag"
                    className="w-full bg-[#161616] border border-white/10 rounded-md px-2 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-1">Meta Description</label>
                  <textarea 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Brief description for search engines..."
                    className="w-full bg-[#161616] border border-white/10 rounded-md px-2 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none h-16"
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-white/10 mx-3 my-2" />

          {/* Webhooks / Auto-Publish */}
          <div className="px-3">
            <label className="block text-xs font-medium text-slate-400 mb-3">Auto-Announce (On Publish)</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="hidden" checked={notifySlack} onChange={(e) => setNotifySlack(e.target.checked)} />
                <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${notifySlack ? 'bg-indigo-500 border-indigo-500' : 'bg-[#161616] border-white/20 group-hover:border-white/40'}`}>
                  {notifySlack && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 group-hover:text-white transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Post to Slack
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="hidden" checked={notifyTwitter} onChange={(e) => setNotifyTwitter(e.target.checked)} />
                <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${notifyTwitter ? 'bg-sky-500 border-sky-500' : 'bg-[#161616] border-white/20 group-hover:border-white/40'}`}>
                  {notifyTwitter && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 group-hover:text-white transition-colors">
                  <Hash className="w-3.5 h-3.5" /> Post to X (Twitter)
                </div>
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header Toolbar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-[#0a0a0a]">
          
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold tracking-tight text-white hidden sm:block">Edit Release Note</h1>
            
            {/* View Mode Toggle */}
            <div className="flex bg-[#161616] p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setViewMode("write")} 
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === 'write' ? 'bg-[#333] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Write
              </button>
              <button 
                onClick={() => setViewMode("preview")} 
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === 'preview' ? 'bg-[#333] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Share Draft Button */}
            <button
              onClick={handleShareDraft}
              disabled={isSharing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-[11px]"
            >
              <Share2 className="w-3.5 h-3.5" /> 
              {isSharing ? "Sharing..." : "Share Draft"}
            </button>
            
            <div className="w-px h-4 bg-white/10 mx-1" />

            <button
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-slate-300 hover:bg-white/5 transition-colors border border-white/10 disabled:opacity-50 text-xs"
            >
              <Save className="w-3.5 h-3.5" /> Save Draft
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={isSaving || projects.length === 0}
              className="flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-md font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 text-xs"
            >
              <Send className="w-3.5 h-3.5" /> Publish Now
            </button>
          </div>
        </div>

        {/* Editor Workspace */}
        <div className="flex-1 overflow-hidden bg-[#050505] relative flex justify-center">
          
          <div className="w-full max-w-4xl h-full flex flex-col p-6">
            
            {viewMode === "write" ? (
              <div 
                className="flex-1 flex flex-col bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between shrink-0 relative">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Release Note Title..."
                    className="w-full bg-transparent text-2xl font-bold text-white placeholder-slate-600 focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    {/* Templates Button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="flex items-center gap-1.5 text-[11px] font-semibold bg-[#111] text-slate-300 px-3 py-1.5 rounded-md hover:text-white hover:bg-[#222] transition-all border border-white/10 whitespace-nowrap ml-2"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Templates
                        <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                      </button>
                      
                      {showTemplates && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-[#161616] border border-white/10 rounded-lg shadow-xl overflow-hidden z-10 flex flex-col">
                          <button onClick={() => loadTemplate("weekly")} className="text-left px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5">
                            Weekly Update
                          </button>
                          <button onClick={() => loadTemplate("major")} className="text-left px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5">
                            Major Release (v2.0)
                          </button>
                          <button onClick={() => loadTemplate("security")} className="text-left px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                            Security Patch
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      disabled={true}
                      className="flex items-center gap-1.5 text-[11px] font-semibold bg-[#111] text-slate-500 px-3 py-1.5 rounded-md border border-white/5 whitespace-nowrap cursor-not-allowed"
                      title="This feature is coming soon!"
                    >
                      <Sparkles className="w-3.5 h-3.5 opacity-50" />
                      AI Assist (Soon)
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your release note in Markdown... You can drag & drop images here."
                  className="flex-1 w-full bg-transparent px-6 py-5 text-slate-300 placeholder-slate-600 focus:outline-none font-mono text-sm leading-relaxed resize-none custom-scrollbar"
                ></textarea>
                
                {/* Editor Footer */}
                <div className="px-5 py-3 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} 
                      className="hidden" 
                      accept="image/*,video/mp4" 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                      title="Upload Media"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-500">Supports markdown and drag & drop</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {content.length} chars
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 h-full pb-6 flex items-center justify-center">
                <div className="w-full max-w-[400px] h-full mx-auto">
                  <MarkdownPreview 
                    title={title}
                    content={content}
                    date={scheduledFor ? new Date(scheduledFor).toLocaleDateString() : "Just now"}
                    tags={tags}
                  />
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </main>
  );
}
