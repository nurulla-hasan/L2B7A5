import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard/dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";
import { getMe } from "@/services/auth.service";


export async function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  
  const userResult = await getMe();
  const user = userResult?.success ? userResult.data : null;

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader user={user} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
