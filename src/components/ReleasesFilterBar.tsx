"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";


export default function ReleasesFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [status, setStatus] = useState(searchParams.get("status") || "all");

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Simple debounce logic
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }

    if (type && type !== "all") {
      params.set("type", type);
    } else {
      params.delete("type");
    }

    if (status && status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, type, status, pathname, router, searchParams]);

  const clearFilters = () => {
    setQuery("");
    setType("all");
    setStatus("all");
  };

  const hasFilters = query || type !== "all" || status !== "all";

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-[#111] p-4 rounded-xl border border-white/10 items-center justify-between">
      <div className="relative flex-1 w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search releases by title..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none"
          >
            <option value="all">All Types</option>
            <option value="New">New</option>
            <option value="Fix">Fix</option>
            <option value="Improvement">Improvement</option>
          </select>
        </div>

        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>

        {hasFilters && (
          <button 
            onClick={clearFilters}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            title="Clear filters"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
