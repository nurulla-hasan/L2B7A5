import { DashboardShell } from "@/components/layout/dashboard/dashboard-shell";

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
