"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { CONTAINER_MAX_WIDTH } from "@/components/common/page-wrapper";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { AuthButtons } from "./auth-buttons";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className={`${CONTAINER_MAX_WIDTH} mx-auto flex h-16 items-center justify-between px-5`}>
        <Logo showText />

        <DesktopNav />

        <AuthButtons />

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
