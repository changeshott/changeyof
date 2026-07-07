"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { updateProjectSettings } from "@/app/actions/dashboard";
import { Save, Loader2 } from "lucide-react";

export default function WidgetCustomizer({ 
  projectId, 
  onChange 
}: { 
  projectId: string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (state: any) => void 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const [formDataState, setFormDataState] = useState({
    theme_mode: "auto",
    font_family: "inter",
    accent_color: "indigo",
    button_style: "solid",
    trigger_type: "floating",
    unseen_badge: "true",
    header_title: "Latest Updates",
    header_description: "What's new in our product",
    trigger_icon: "bell",
    widget_position: "bottom-right",
    hide_branding: "false",
  });

  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;
    const fetchSettings = async () => {
      setIsFetching(true);
      const { data } = await supabase
        .from("project_settings")
        .select("*")
        .eq("project_id", projectId)
        .single();
      
      if (data && isMounted) {
        const newState = {
          ...formDataState,
          theme_mode: data.theme_mode || "auto",
          font_family: data.font_family || "inter",
          accent_color: data.accent_color || "indigo",
          button_style: data.button_style || "solid",
          trigger_type: data.trigger_type || "floating",
          unseen_badge: data.unseen_badge ? "true" : "false",
          header_title: data.header_title || "Latest Updates",
          header_description: data.header_description || "What's new in our product",
          trigger_icon: data.trigger_icon || "bell",
          widget_position: data.widget_position || "bottom-right",
          hide_branding: data.hide_branding ? "true" : "false",
        };
        setFormDataState(newState);
        if (onChange) onChange(newState);
      }
      if (isMounted) setIsFetching(false);
    };

    if (projectId) {
      fetchSettings();
    }
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newState = { ...formDataState, [e.target.name]: e.target.value };
    setFormDataState(newState);
    if (onChange) onChange(newState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    const settingsFormData = new FormData();
    Object.entries(formDataState).forEach(([key, value]) => {
      settingsFormData.append(key, value);
    });

    const sResult = await updateProjectSettings(projectId, settingsFormData);
    
    if (sResult.error) {
      setMessage({ text: sResult.error, type: "error" });
    } else {
      setMessage({ text: "Customization saved!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      
      // Force preview reload by dispatching a custom event
      window.dispatchEvent(new CustomEvent('widget-settings-updated', { detail: { projectId } }));
    }
    
    setIsLoading(false);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-8 bg-[#111] border border-white/10 rounded-2xl">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/10 bg-[#161616]">
        <h3 className="text-lg font-semibold text-white">Brand & Widget Customization</h3>
        <p className="text-sm text-slate-400 mt-1">Design changes apply instantly to your embedded widget.</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Theme Forcing</label>
            <select 
              name="theme_mode" 
              value={formDataState.theme_mode}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="auto">Auto (Syncs with OS)</option>
              <option value="light">Always Light Mode</option>
              <option value="dark">Always Dark Mode</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Typography</label>
            <select 
              name="font_family" 
              value={formDataState.font_family}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="inter">Inter (Default)</option>
              <option value="roboto">Roboto</option>
              <option value="outfit">Outfit</option>
              <option value="mono">Monospace</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Accent Color</label>
            <select 
              name="accent_color" 
              value={formDataState.accent_color}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="indigo">Indigo</option>
              <option value="emerald">Emerald</option>
              <option value="rose">Rose</option>
              <option value="amber">Amber</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Button Style</label>
            <select 
              name="button_style" 
              value={formDataState.button_style}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="solid">Solid</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Trigger Type</label>
            <select 
              name="trigger_type" 
              value={formDataState.trigger_type}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="floating">Floating Badge (Bottom Corner)</option>
              <option value="custom">Custom Element Binding</option>
              <option value="embed">Inline Embed</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Unseen Notification Dot</label>
            <select 
              name="unseen_badge" 
              value={formDataState.unseen_badge}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="true">Show Red Dot for unread updates</option>
              <option value="false">Hide Dot</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Header Title</label>
            <input 
              type="text"
              name="header_title" 
              value={formDataState.header_title}
              onChange={handleChange}
              placeholder="Latest Updates"
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Header Description</label>
            <input 
              type="text"
              name="header_description" 
              value={formDataState.header_description}
              onChange={handleChange}
              placeholder="What's new in our product"
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Trigger Icon</label>
            <select 
              name="trigger_icon" 
              value={formDataState.trigger_icon}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="bell">Bell</option>
              <option value="megaphone">Megaphone</option>
              <option value="sparkles">Sparkles</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Widget Position</label>
            <select 
              name="widget_position" 
              value={formDataState.widget_position}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Branding</label>
            <select 
              name="hide_branding" 
              value={formDataState.hide_branding}
              onChange={handleChange}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-white/20"
            >
              <option value="false">Show &quot;Powered by Changeyof&quot;</option>
              <option value="true">Hide Branding (Pro)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#161616] flex items-center justify-between">
        <div>
          {message.text && (
            <span className={`text-sm ${message.type === 'error' ? 'text-slate-300' : 'text-white'}`}>
              {message.text}
            </span>
          )}
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Design
        </button>
      </div>
    </form>
  );
}
