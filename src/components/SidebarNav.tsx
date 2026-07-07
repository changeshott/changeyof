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
  BarChart3,
  Settings
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

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
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
        <Link href="/dashboard/feature-requests" className={getLinkClass("/dashboard/feature-requests")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Feature Requests
        </Link>
        <Link href="/dashboard/nps" className={getLinkClass("/dashboard/nps")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          NPS Surveys
        </Link>
        <Link href="/dashboard/segments" className={getLinkClass("/dashboard/segments")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Audience Segments
        </Link>
        <Link href="/dashboard/subscribers" className={getLinkClass("/dashboard/subscribers")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Subscribers
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
        <Link href="/dashboard/webhooks" className={getLinkClass("/dashboard/webhooks")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Webhooks
        </Link>
        <Link href="/dashboard/mcp-server" className={getLinkClass("/dashboard/mcp-server")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
          MCP Server
        </Link>
        
        <div className="pt-6 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Account
        </div>
        <Link href="/dashboard/settings" className={getLinkClass("/dashboard/settings")}>
          <Settings className="w-4 h-4" />
          Settings
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

      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10 mb-4">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          <span className="text-xs text-slate-300 font-medium truncate">{userEmail}</span>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}
