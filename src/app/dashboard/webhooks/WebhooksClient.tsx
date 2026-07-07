"use client";

import { useState } from "react";
import { createWebhook, deleteWebhook } from "@/app/actions/webhooks";
import { Plus, Trash2, Loader2, Webhook, CheckCircle2, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type WebhookData = {
  id: string;
  url: string;
  secret: string;
  events: string[];
  status: string;
  created_at: string;
};

const AVAILABLE_EVENTS = [
  { id: 'release.created', label: 'Release Created' },
  { id: 'feedback.submitted', label: 'Feedback Submitted' },
  { id: 'nps.submitted', label: 'NPS Submitted' },
  { id: 'featurerequest.created', label: 'Feature Request Created' },
];

export default function WebhooksClient({ projectId, initialWebhooks }: { projectId: string, initialWebhooks: WebhookData[] }) {
  const [webhooks, setWebhooks] = useState<WebhookData[]>(initialWebhooks);
  const [isCreating, setIsCreating] = useState(false);
  
  const [newUrl, setNewUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleEvent = (eventId: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) ? prev.filter(e => e !== eventId) : [...prev, eventId]
    );
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || selectedEvents.length === 0) return;

    setIsSubmitting(true);
    await createWebhook(projectId, newUrl, selectedEvents);
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this webhook?")) return;
    setDeletingId(id);
    await deleteWebhook(id);
    window.location.reload();
  };

  const copySecret = (secret: string, id: string) => {
    navigator.clipboard.writeText(secret);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Webhook
        </button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <form onSubmit={handleCreate} className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Configure Webhook</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Payload URL</label>
                  <input
                    type="url"
                    required
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="https://your-server.com/webhook"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Events to send</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AVAILABLE_EVENTS.map(event => (
                      <label 
                        key={event.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          selectedEvents.includes(event.id) 
                            ? 'bg-white/10 border-white/20' 
                            : 'bg-white/5 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          selectedEvents.includes(event.id) ? 'bg-white border-white' : 'border-slate-500'
                        }`}>
                          {selectedEvents.includes(event.id) && <CheckCircle2 className="w-3 h-3 text-black" />}
                        </div>
                        <span className="text-sm font-medium text-slate-200">{event.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newUrl.trim() || selectedEvents.length === 0}
                    className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Save Webhook
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 group hover:border-white/20 transition-all">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Webhook className="w-5 h-5 text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-white truncate">{webhook.url}</h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-green-400/10 text-green-400 border border-green-400/20">
                    {webhook.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {webhook.events.map(ev => (
                    <span key={ev} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-slate-400 border border-white/5">
                      {ev}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 bg-black/50 border border-white/5 rounded-lg px-3 py-1.5 w-fit">
                  <span className="text-xs text-slate-500 font-mono">Secret:</span>
                  <span className="text-xs text-slate-300 font-mono select-all">
                    ••••••••••••••••
                  </span>
                  <button 
                    onClick={() => copySecret(webhook.secret, webhook.id)}
                    className="ml-2 text-slate-500 hover:text-white transition-colors p-1"
                    title="Copy Secret"
                  >
                    {copiedId === webhook.id ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleDelete(webhook.id)}
              disabled={deletingId === webhook.id}
              className="md:opacity-0 group-hover:opacity-100 transition-all p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg shrink-0 self-start md:self-center"
            >
              {deletingId === webhook.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-5 h-5" />}
            </button>
          </div>
        ))}

        {webhooks.length === 0 && (
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Webhook className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Webhooks Configured</h3>
            <p className="text-slate-400 max-w-md mb-6 text-sm leading-relaxed">
              Set up webhooks to receive real-time HTTP POST requests when events happen in your project, such as new feedback or release notes.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Add First Webhook
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
