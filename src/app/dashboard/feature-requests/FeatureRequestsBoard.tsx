"use client";

import { useEffect, useState } from "react";
import { getFeatureRequests, updateFeatureRequestStatus, createFeatureRequest } from "@/app/actions/featureRequests";
import { Plus, MessageSquare, ThumbsUp, Loader2, GripVertical, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Request = {
  id: string;
  title: string;
  description: string;
  status: string;
  votes_count: number;
  created_at: string;
};

const STATUSES = [
  { id: 'under_review', label: 'Under Review', color: 'border-slate-500' },
  { id: 'planned', label: 'Planned', color: 'border-blue-400' },
  { id: 'in_progress', label: 'In Progress', color: 'border-yellow-400' },
  { id: 'completed', label: 'Completed', color: 'border-white' },
];

export default function FeatureRequestsBoard({ projectId }: { projectId: string }) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadRequests();
  }, [projectId]);

  const loadRequests = async () => {
    setLoading(true);
    const data = await getFeatureRequests(projectId);
    setRequests(data);
    setLoading(false);
  };

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    // Optimistic update
    setRequests(current => 
      current.map(req => req.id === requestId ? { ...req, status: newStatus } : req)
    );
    
    await updateFeatureRequestStatus(requestId, newStatus);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    await createFeatureRequest(projectId, newTitle, newDesc);
    await loadRequests();
    
    setNewTitle("");
    setNewDesc("");
    setIsCreating(false);
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Request
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
              <h3 className="text-lg font-medium text-white mb-4">Create Feature Request</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                  <input
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="e.g., Dark Mode Support"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                  <textarea
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors h-24 resize-none"
                    placeholder="Describe the feature..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newTitle.trim()}
                    className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Request"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-x-auto custom-scrollbar flex flex-col xl:flex-row gap-6 pb-4">
        {STATUSES.map(status => {
          const colRequests = requests.filter(r => r.status === status.id);
          
          return (
            <div key={status.id} className="flex flex-col w-full xl:w-80 shrink-0 bg-[#0a0a0a] rounded-2xl border border-white/5">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full border-[2px] ${status.color}`}></div>
                  <h3 className="font-semibold text-slate-200 text-sm">{status.label}</h3>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                  {colRequests.length}
                </span>
              </div>
              
              <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar max-h-[60vh] xl:max-h-full">
                {colRequests.map(req => (
                  <div 
                    key={req.id}
                    className="bg-[#161616] border border-white/10 p-4 rounded-xl shadow-sm hover:border-white/20 transition-all group"
                  >
                    <h4 className="font-medium text-slate-200 text-sm mb-2">{req.title}</h4>
                    {req.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{req.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                        <ThumbsUp className="w-3 h-3" /> {req.votes_count}
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <select 
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          className="bg-white/10 text-white text-xs rounded-md border-none px-2 py-1 focus:ring-0 cursor-pointer appearance-none outline-none hover:bg-white/20 transition-colors"
                        >
                          {STATUSES.map(s => (
                            <option key={s.id} value={s.id} className="bg-[#111]">{s.label}</option>
                          ))}
                          <option value="rejected" className="bg-[#111]">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                
                {colRequests.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-xs text-slate-600">
                    No requests
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
