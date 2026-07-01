import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SidebarNav from "@/components/SidebarNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Check if user has any projects
  // We no longer hide the sidebar if count === 0. The OnboardingWizard is a fixed full-screen overlay,
  // so it will naturally cover the sidebar. Once onboarding is skipped/finished, the sidebar will be visible.
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar Navigation */}
      <SidebarNav userEmail={user?.email || "guest@example.com"} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
