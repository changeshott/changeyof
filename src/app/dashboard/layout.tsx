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

  // Check if user has any projects to determine if we should show the sidebar
  // Using optional chaining and fallback for when auth is bypassed
  let count = 0;
  if (user) {
    const { count: projectCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    count = projectCount || 0;
  }

  if (count === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar Navigation */}
      <SidebarNav userEmail={user?.email || "guest@example.com"} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
