"use client";

import { Clock, CalendarDays } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AvailabilityEditModal } from "./availability-edit-modal";
import { DAY_LABELS } from "@/lib/utils";
import type { User } from "@/interface/user";

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function AvailabilityCard({ user }: { user: User }) {
  const availability = user.technicianProfile?.availability ?? {};
  const hasSlots = DAY_ORDER.some(
    (day) => (availability[day]?.length ?? 0) > 0,
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/40">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarDays className="size-4 text-primary" /> Availability Schedule
        </CardTitle>

        <AvailabilityEditModal user={user} />
      </CardHeader>

      <CardContent>
        {hasSlots ? (
          <div className="space-y-2.5">
            {DAY_ORDER.map((day) => {
              const slots = availability[day] ?? [];
              if (slots.length === 0) return null;

              return (
                <div
                  key={day}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-4 py-3"
                >
                  <span className="w-24 shrink-0 text-sm font-medium capitalize text-foreground/80">
                    {DAY_LABELS[day] || day}
                  </span>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {slots.map((slot, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="gap-1 border-primary/20 bg-primary/5 text-primary"
                      >
                        <Clock className="size-3" /> {slot}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg bg-muted/50 px-4 py-10 text-center">
            <CalendarDays className="mx-auto size-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              No availability set yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Set your weekly working hours to receive bookings.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
