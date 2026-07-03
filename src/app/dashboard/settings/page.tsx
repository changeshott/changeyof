import { createClient } from "@/utils/supabase/server";
import AnimatedHeader from "@/components/AnimatedHeader";
import { User, Mail, Shield, Bell, Key } from "lucide-react";

export default async function GlobalSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: integrations } = await supabase
    .from("user_integrations")
    .select("*")
    .eq("user_id", user?.id);

  const twitterIntegrations = integrations?.filter(i => i.provider === 'twitter') || [];

  return (
    <main className="max-w-4xl mx-auto pb-12">
      <AnimatedHeader 
        title="Settings"
        description="Manage your account preferences and personal information."
      />

      <div className="grid gap-6">
        {/* Profile Section */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">Profile Information</h2>
          </div>
          
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="flex items-center gap-3 bg-[#161616] border border-white/5 px-4 py-3 rounded-lg text-slate-300">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="flex-1">{user?.email}</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md font-medium">Verified</span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Account ID</label>
              <div className="flex items-center gap-3 bg-[#161616] border border-white/5 px-4 py-3 rounded-lg text-slate-300">
                <Key className="w-4 h-4 text-slate-500" />
                <span className="flex-1 font-mono text-xs">{user?.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Integrations */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Connected Accounts</h2>
          </div>
          
          <p className="text-sm text-slate-400 mb-6">
            Connect your external accounts here. You can then use them across all your projects.
          </p>

          <div className="space-y-4 max-w-lg">
            <div className="flex items-center justify-between bg-[#161616] border border-white/5 px-5 py-4 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border border-white/10">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">X (Twitter)</h4>
                  <p className="text-xs text-slate-400">Connect to post releases automatically.</p>
                </div>
              </div>
              <a 
                href="/api/integrations/twitter/auth"
                className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors shadow-sm"
              >
                Connect New
              </a>
            </div>

            {/* List connected twitter accounts */}
            {twitterIntegrations && twitterIntegrations.length > 0 && (
              <div className="mt-4 space-y-2">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Connected Accounts</h5>
                {twitterIntegrations.map((integration: any) => (
                  <div key={integration.id} className="flex items-center justify-between bg-sky-500/5 border border-sky-500/20 px-4 py-2.5 rounded-lg">
                    <span className="text-sm font-medium text-sky-400">@{integration.account_username}</span>
                    <span className="text-[10px] text-sky-500/70 uppercase font-semibold">Active</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notifications & Security placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl opacity-70">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-500/10 text-slate-400 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">Manage how you receive global system alerts.</p>
            <div className="text-xs text-slate-500 italic border-l-2 border-slate-700 pl-3">
              This feature is currently under development.
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl opacity-70">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-500/10 text-slate-400 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-white">Security</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">Update your password and secure your account.</p>
            <div className="text-xs text-slate-500 italic border-l-2 border-slate-700 pl-3">
              This feature is currently under development.
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
