import { Plus, Megaphone, CheckCircle2, Clock, Pencil } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import DeleteReleaseButton from "@/components/DeleteReleaseButton";

import AnimatedHeader from "@/components/AnimatedHeader";

export default async function ReleasesPage() {
  const supabase = await createClient();
  const { data: releases, error } = await supabase
    .from('release_notes')
    .select('*, projects(name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Failed to fetch releases:", error);
  }

  return (
    <main className="max-w-6xl mx-auto">
      <AnimatedHeader 
        title="Release Notes"
        description="Broadcast your product updates to the world."
      >
        <Link 
          href="/dashboard/releases/new"
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" /> New Release
        </Link>
      </AnimatedHeader>

      {releases && releases.length > 0 ? (
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-sm font-semibold text-slate-300">
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-right">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {releases.map((release: any) => (
                <tr key={release.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-medium">
                    {release.title}
                    <div className="text-xs text-slate-500 font-normal mt-1">{release.projects?.name}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${release.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                      {release.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {release.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 bg-white/10 rounded text-xs font-medium text-slate-300">
                      {release.type}
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm text-slate-400">
                    {new Date(release.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/dashboard/releases/${release.id}/edit`}
                        className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        title="Edit Release"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteReleaseButton id={release.id} title={release.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-white/20 rounded-2xl bg-white/5">
          <Megaphone className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No releases yet</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">You haven't shipped anything recently? Let your users know what you've been building!</p>
          <Link 
            href="/dashboard/releases/new"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Plus className="w-4 h-4" /> Write First Release
          </Link>
        </div>
      )}
    </main>
  );
}
