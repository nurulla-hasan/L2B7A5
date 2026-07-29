"use client";

import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { publicNavLinks } from "./nav-links";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import type { User } from "@/interface/user";

const dashboardHref: Record<string, string> = {
  CUSTOMER: "/customer/bookings",
  TECHNICIAN: "/technician/dashboard",
  ADMIN: "/admin/dashboard",
};

export function MobileDrawer({
  isAuthenticated,
  user,
  onLogout,
}: {
  isAuthenticated?: boolean;
  user?: User;
  onLogout?: () => void;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-full"
            aria-label="Toggle menu"
          >
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent side="right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <Logo showText />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
            Menu
          </p>
          {publicNavLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <SheetClose
                key={item.href}
                nativeButton={false}
                render={
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "size-4 shrink-0",
                          active && "text-primary",
                        )}
                      />
                    )}
                    <span>{item.label}</span>
                    {active && (
                      <span className="ml-auto size-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                }
              />
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border/50 p-4">
          {isAuthenticated && user ? (
            <>
              <div className="mb-3 flex items-center gap-3 px-1">
                <Avatar size="sm">
                  <AvatarFallback>
                    {getInitials(user.name) || <UserRound />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground/70 truncate">
                    {user.email}
                  </span>
                </div>
              </div>
              <div className="grid gap-1">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href={dashboardHref[user.role] ?? "/"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <LayoutDashboard className="size-4 shrink-0" />
                      Dashboard
                    </Link>
                  }
                />
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href={`/${user.role.toLowerCase()}/profile`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <UserRound className="size-4 shrink-0" />
                      Profile
                    </Link>
                  }
                />
              </div>
              <hr className="my-2 border-border/50" />
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="size-4 shrink-0" />
                Logout
              </button>
            </>
          ) : (
            <>
              <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                Account
              </p>
              <div className="grid gap-2">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href="/login"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <LogIn className="size-4 shrink-0" />
                      Login
                    </Link>
                  }
                />
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link href="/register">
                      <Button className="w-full gap-2">
                        <UserPlus className="size-4" />
                        Get Started
                      </Button>
                    </Link>
                  }
                />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
