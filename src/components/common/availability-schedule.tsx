import { Calendar, Clock } from "lucide-react";
import { DAY_LABELS } from "@/lib/utils";

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

type AvailabilityScheduleProps = {
  availability?: Record<string, string[]>;
};

export function AvailabilitySchedule({
  availability,
}: AvailabilityScheduleProps) {
  if (!availability) return null;

  const days = DAY_ORDER.filter((day) => availability[day]?.length > 0);

  if (days.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
        <Calendar className="size-3.5 text-primary" />
        Weekly Availability
      </h4>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {days.map((day) => (
          <div
            key={day}
            className="rounded-lg border border-border/40 bg-muted/20 px-3 py-2"
          >
            <p className="text-[11px] font-medium text-foreground/70 capitalize">
              {DAY_LABELS[day] || day}
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
              {availability[day].map((slot, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary"
                >
                  <Clock className="size-2.5" />
                  {slot}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
