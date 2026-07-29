"use client";

import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import type { User } from "@/interface/user";

const dashboardHref: Record<string, string> = {
  CUSTOMER: "/customer/bookings",
  TECHNICIAN: "/technician/dashboard",
  ADMIN: "/admin/dashboard",
};

export function AuthDropdown({
  isAuthenticated,
  user,
  onLogout,
}: {
  isAuthenticated?: boolean;
  user?: User;
  onLogout?: () => void;
}) {
  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/register">
          <Button>Get Started</Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-auto w-auto p-0 rounded-full"
            aria-label="Profile menu"
          />
        }
      >
        <Avatar size="lg">
          <AvatarFallback>{getInitials(user?.name ?? "") || <UserRound />}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {user?.name && (
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                {user.email && (
                  <p className="mt-0.5 text-xs text-muted-foreground/70 truncate">
                    {user.email}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
        )}

        {user?.name && <DropdownMenuSeparator />}

        <DropdownMenuGroup>
          <DropdownMenuItem
            render={
              <Link
                href={dashboardHref[user?.role ?? "CUSTOMER"] ?? "/"}
                className="flex items-center gap-2"
              />
            }
          >
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={onLogout}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
