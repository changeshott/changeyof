"use client";

import { useState } from "react";
import { updateProjectSettings, updateProject } from "@/app/actions/dashboard";
import { Save, LayoutTemplate, Palette, Globe, Search, Monitor, Sun, Moon, Webhook, Mail, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectSettingsForm({ project, initialSettings }: { project: any, initialSettings: any }) {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formDataState, setFormDataState] = useState({
    name: project.name || "",
    custom_domain: initialSettings?.custom_domain || project.domain || "",
    theme_mode: initialSettings?.theme_mode || "auto",
    font_family: initialSettings?.font_family || "inter",
    accent_color: initialSettings?.accent_color || "indigo",
    button_style: initialSettings?.button_style || "solid",
    trigger_type: initialSettings?.trigger_type || "floating",
    unseen_badge: initialSettings?.unseen_badge ? "true" : "false",
    seo_title: initialSettings?.seo_title || "",
    seo_description: initialSettings?.seo_description || "",
    seo_og_image: initialSettings?.seo_og_image || "",
    slack_webhook_url: initialSettings?.slack_webhook_url || "",
    discord_webhook_url: initialSettings?.discord_webhook_url || "",
    vercel_webhook_secret: initialSettings?.vercel_webhook_secret || "",
    gitlab_webhook_secret: initialSettings?.gitlab_webhook_secret || "",
    enable_email_newsletter: initialSettings?.enable_email_newsletter ? "true" : "false",
    public_api_key: initialSettings?.public_api_key || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormDataState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const tabs = [
    { id: "general", label: "General", icon: <Globe className="w-4 h-4" /> },
    { id: "seo", label: "SEO & Meta", icon: <Search className="w-4 h-4" /> },
    { id: "integrations", label: "Integrations", icon: <Webhook className="w-4 h-4" /> },
    { id: "api", label: "API Access", icon: <Terminal className="w-4 h-4" /> },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    // Split the logic: name and domain go to projects table, rest to settings
    const projectFormData = new FormData();
    projectFormData.append("name", formDataState.name);
    
    const settingsFormData = new FormData();
    Object.entries(formDataState).forEach(([key, value]) => {
      settingsFormData.append(key, value);
    });

    const pResult = await updateProject(project.id, projectFormData);
    
    if (pResult.error) {
      setMessage({ text: pResult.error, type: "error" });
      setIsLoading(false);
      return;
    }

    const sResult = await updateProjectSettings(project.id, settingsFormData);
    
    if (sResult.error) {
      setMessage({ text: sResult.error, type: "error" });
    } else {
      setMessage({ text: "Settings saved successfully!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#161616] p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? "bg-white/10 text-white" 
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <AnimatePresence mode="wait">
            {activeTab === "general" && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Project Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formDataState.name}
                        onChange={handleChange}
                        required 
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Custom Domain (CNAME)</label>
                      <input 
                        type="text" 
                        name="custom_domain" 
                        value={formDataState.custom_domain}
                        onChange={handleChange}
                        placeholder="updates.yourdomain.com"
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                      <p className="text-[11px] text-slate-500 mt-1.5">Map a custom domain to your changelog page.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "seo" && (
              <motion.div
                key="seo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">SEO & Open Graph</h3>
                  <p className="text-sm text-slate-400 mb-6">Customize how your public changelog page appears in search engines and social media.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Meta Title</label>
                      <input 
                        type="text" 
                        name="seo_title" 
                        value={formDataState.seo_title}
                        onChange={handleChange}
                        placeholder={`What's New in ${project.name}`}
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Meta Description</label>
                      <textarea 
                        name="seo_description" 
                        value={formDataState.seo_description}
                        onChange={handleChange}
                        placeholder="Check out our latest updates, features, and fixes."
                        rows={3}
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Open Graph Image URL</label>
                      <input 
                        type="text" 
                        name="seo_og_image" 
                        value={formDataState.seo_og_image}
                        onChange={handleChange}
                        placeholder="https://yourdomain.com/og-image.png"
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "integrations" && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Automated Drafts</h3>
                  <p className="text-sm text-slate-400 mb-4">Trigger draft release notes from CI/CD deployments.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Vercel Webhook Secret</label>
                      <input 
                        type="text" 
                        name="vercel_webhook_secret" 
                        value={formDataState.vercel_webhook_secret}
                        onChange={handleChange}
                        placeholder="Your Vercel Secret"
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 transition-all"
                      />
                      <p className="text-[11px] text-slate-500 mt-1.5">Endpoint: <code>/api/webhooks/vercel?projectId={project.id}</code></p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">GitLab Webhook Secret</label>
                      <input 
                        type="text" 
                        name="gitlab_webhook_secret" 
                        value={formDataState.gitlab_webhook_secret}
                        onChange={handleChange}
                        placeholder="Your GitLab Token"
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 transition-all"
                      />
                      <p className="text-[11px] text-slate-500 mt-1.5">Endpoint: <code>/api/webhooks/gitlab?projectId={project.id}</code></p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Broadcasting</h3>
                  <p className="text-sm text-slate-400 mb-4">Automatically post published release notes to your community.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Slack Webhook URL</label>
                      <input 
                        type="url" 
                        name="slack_webhook_url" 
                        value={formDataState.slack_webhook_url}
                        onChange={handleChange}
                        placeholder="https://hooks.slack.com/services/..."
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Discord Webhook URL</label>
                      <input 
                        type="url" 
                        name="discord_webhook_url" 
                        value={formDataState.discord_webhook_url}
                        onChange={handleChange}
                        placeholder="https://discord.com/api/webhooks/..."
                        className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email Newsletter</h3>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="enable_email_newsletter"
                      name="enable_email_newsletter" 
                      checked={formDataState.enable_email_newsletter === "true"}
                      onChange={(e) => setFormDataState(prev => ({ ...prev, enable_email_newsletter: e.target.checked ? "true" : "false" }))}
                      className="w-4 h-4 rounded border-[#333] bg-black text-indigo-500 focus:ring-indigo-500"
                    />
                    <label htmlFor="enable_email_newsletter" className="text-sm font-medium text-slate-300">
                      Enable automated monthly email newsletter (Mock)
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Public API Access</h3>
                  <p className="text-sm text-slate-400 mb-6">Fetch your changelog data as JSON to build completely custom UI.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">API Key</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          name="public_api_key" 
                          value={formDataState.public_api_key}
                          onChange={handleChange}
                          placeholder="Your API Key"
                          className="flex-1 bg-black border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setFormDataState(prev => ({ ...prev, public_api_key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) }))}
                          className="px-4 py-2 bg-[#222] hover:bg-[#333] border border-[#444] rounded-lg text-sm font-medium text-white transition-colors"
                        >
                          Generate
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">Example usage:</p>
                      <div className="bg-black border border-[#333] rounded-lg p-3 mt-1 overflow-x-auto">
                        <code className="text-xs text-indigo-300 whitespace-nowrap">
                          curl -X GET "https://your-domain.com/api/v1/changelog?apiKey={formDataState.public_api_key || 'YOUR_KEY'}"
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
            <div>
              {message.text && (
                <span className={`text-sm ${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {message.text}
                </span>
              )}
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
