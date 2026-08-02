"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminLinks, technicianLinks } from "@/constants/nav-links";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/common/logo";

export function DashboardSidebar() {
  const pathname = usePathname();
  const links = pathname.startsWith("/admin") ? adminLinks : technicianLinks;

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex h-16 items-center border-b px-4">
          <Logo size="md" showText />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton size="lg" isActive={isActive} render={<Link href={link.href} />}>
                      <link.icon />
                      <span>{link.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
