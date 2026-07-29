import type { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
} from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard/header";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
