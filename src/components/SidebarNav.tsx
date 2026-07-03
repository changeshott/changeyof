"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Megaphone, 
  Code, 
  GitBranch, 
  Globe,
  BarChart3
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export default function SidebarNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  // Hide the global sidebar when in the Figma-like editor mode
  if (pathname.includes('/releases/new') || pathname.includes('/edit')) {
    return null;
  }

  const getLinkClass = (path: string) => {
    // For overview, we need exact match since all other paths start with /dashboard
    const isActive = path === "/dashboard" 
      ? pathname === path 
      : pathname === path || pathname.startsWith(`${path}/`);

    return isActive 
      ? "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-white bg-white/10"
      : "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors";
  };

  return (
    <aside className="w-64 border-r border-white/10 bg-[#111] flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform">
            <span className="text-black font-extrabold text-sm tracking-tighter leading-none select-none">cf</span>
          </div>
          <span className="font-semibold tracking-tight text-lg">Changeyof</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        <Link href="/dashboard" className={getLinkClass("/dashboard")}>
          <LayoutDashboard className="w-4 h-4" />
          Overview
        </Link>
        <Link href="/dashboard/projects" className={getLinkClass("/dashboard/projects")}>
          <FolderKanban className="w-4 h-4" />
          Projects
        </Link>
        <Link href="/dashboard/analytics" className={getLinkClass("/dashboard/analytics")}>
          <BarChart3 className="w-4 h-4" />
          Analytics
        </Link>
        <Link href="/dashboard/releases" className={getLinkClass("/dashboard/releases")}>
          <Megaphone className="w-4 h-4" />
          Release Notes
        </Link>
        
        <div className="pt-6 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Integrations
        </div>
        
        <Link href="/dashboard/widget" className={getLinkClass("/dashboard/widget")}>
          <Code className="w-4 h-4" />
          Widget Setup
        </Link>
        <Link href="/dashboard/integrations" className={getLinkClass("/dashboard/integrations")}>
          <GitBranch className="w-4 h-4" />
          GitHub Sync
        </Link>
        
        <div className="pt-6 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          External
        </div>
        <Link href="/" target="_blank" className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4" />
            Back to Website
          </div>
          <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-slate-300 font-medium truncate">{userEmail}</span>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}
