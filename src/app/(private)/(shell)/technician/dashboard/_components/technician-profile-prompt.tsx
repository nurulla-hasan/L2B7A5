"use client";

import { useState } from "react";
import Link from "next/link";
import { UserRoundCog, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const COOKIE_NAME = "fixitnow_technician_profile_prompt_seen";
const DAY_SECONDS = 60 * 60 * 24;

export function TechnicianProfilePrompt({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const setPromptCookie = (maxAge: number) => {
    document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${maxAge}; SameSite=Lax`;
  };

  const dismiss = () => {
    // Permanently hide (user chose to update their profile)
    setPromptCookie(365 * DAY_SECONDS);
    setOpen(false);
  };

  const dismissForNow = () => {
    // Hide for 1 day — remind the technician again later
    setPromptCookie(DAY_SECONDS);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && dismissForNow()}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRoundCog className="size-5" />
          </div>
          <DialogTitle className="text-lg">Complete Your Profile</DialogTitle>
          <DialogDescription>
            Update your professional profile and weekly availability so
            customers can find and book you easily.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={dismissForNow}>
            Maybe Later
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/technician/profile" onClick={dismiss} />}
          >
            Update Profile & Availability
            <ArrowRight className="size-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
