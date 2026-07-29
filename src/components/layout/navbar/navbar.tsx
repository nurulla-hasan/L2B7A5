"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { CONTAINER_MAX_WIDTH } from "@/components/common/page-wrapper";
import { publicNavLinks } from "./nav-links";
import { MobileDrawer } from "./mobile-drawer";
import { AuthDropdown } from "@/components/auth/auth-dropdown";

export function Navbar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div
        className={`${CONTAINER_MAX_WIDTH} mx-auto flex h-16 items-center gap-2 px-5`}
      >
        {/* Left */}
        <div className="flex flex-1 items-center gap-2">
          <Logo showText />
        </div>

        {/* Center */}
        <nav className="hidden items-center gap-8 md:flex">
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                isActive(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <AuthDropdown isAuthenticated={true} />
          </div>
          <MobileDrawer isAuthenticated={true} />
        </div>
      </div>
    </header>
  );
}
