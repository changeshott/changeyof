"use client";

import { useState } from "react";
import { createSegment, deleteSegment } from "@/app/actions/segments";
import { Plus, Users, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Segment = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export default function SegmentsClient({ projectId, initialSegments }: { projectId: string, initialSegments: Segment[] }) {
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);
    await createSegment(projectId, newName, newDesc);
    
    // Optimistically update list for now, or just let Server Components revalidate
    // Since we revalidatePath in action, we can just reload or let next.js handle it
    // But to be snappy, we can just reload the page for now
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this segment?")) return;
    setDeletingId(id);
    await deleteSegment(id);
    window.location.reload();
  };

  return (
    <div className="mt-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Segment
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
              <h3 className="text-lg font-medium text-white mb-4">New Audience Segment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Segment Name</label>
                  <input
                    required
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="e.g., Enterprise Users, Beta Testers"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description (Rules)</label>
                  <textarea
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors h-24 resize-none"
                    placeholder="Describe who belongs in this segment..."
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
                    disabled={isSubmitting || !newName.trim()}
                    className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Segment"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {segments.map((segment) => (
          <div key={segment.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 relative group hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{segment.name}</h3>
            <p className="text-sm text-slate-400 line-clamp-3 mb-6">
              {segment.description || "No description provided."}
            </p>
            
            <button
              onClick={() => handleDelete(segment.id)}
              disabled={deletingId === segment.id}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
            >
              {deletingId === segment.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
          </div>
        ))}

        {segments.length === 0 && (
          <div className="col-span-full border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Segments Yet</h3>
            <p className="text-slate-400 max-w-sm mb-6">Create audience segments to target your release notes to specific groups of users.</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Create First Segment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
