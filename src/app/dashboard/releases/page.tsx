/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Megaphone, CheckCircle2, Clock, Pencil, Eye, CalendarClock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import DeleteReleaseButton from "@/components/DeleteReleaseButton";
import ReleasesFilterBar from "@/components/ReleasesFilterBar";

import AnimatedHeader from "@/components/AnimatedHeader";

export default async function ReleasesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const q = params.q as string | undefined;
  const type = params.type as string | undefined;
  const status = params.status as string | undefined;

  let query = supabase
    .from('release_notes')
    .select('*, projects(name), metrics(views_count)')
    .order('created_at', { ascending: false });

  if (q) query = query.ilike('title', `%${q}%`);
  if (type && type !== 'all') query = query.eq('type', type);
  
  if (status && status !== 'all') {
    if (status === 'scheduled') {
      // It's scheduled if status is published AND scheduled_for is in the future
      query = query.eq('status', 'published').gt('scheduled_for', new Date().toISOString());
    } else if (status === 'published') {
      // It's published if status is published AND (scheduled_for is null OR scheduled_for <= now)
      query = query.eq('status', 'published').or(`scheduled_for.is.null,scheduled_for.lte.${new Date().toISOString()}`);
    } else {
      query = query.eq('status', status);
    }
  }

  const { data: releases, error } = await query;

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

      <ReleasesFilterBar />

      {releases && releases.length > 0 ? (
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-sm font-semibold text-slate-300">
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-center">Views</th>
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
                    {(() => {
                      const isScheduled = release.status === 'published' && release.scheduled_for && new Date(release.scheduled_for) > new Date();
                      
                      if (isScheduled) {
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400">
                            <CalendarClock className="w-3 h-3" /> Scheduled
                          </span>
                        );
                      }
                      
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${release.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                          {release.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {release.status}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 bg-white/10 rounded text-xs font-medium text-slate-300">
                      {release.type}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 text-sm">
                      <Eye className="w-3.5 h-3.5" />
                      {Array.isArray(release.metrics) && release.metrics.length > 0 
                        ? release.metrics[0].views_count || 0 
                        : (release.metrics?.views_count || 0)}
                    </div>
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
          <p className="text-slate-400 mb-6 max-w-md mx-auto">You haven&apos;t shipped anything recently? Let your users know what you&apos;ve been building!</p>
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
