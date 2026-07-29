import { Calendar as CalendarIcon, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import type { Service } from "@/interface/service";

type BookingSidebarProps = {
  service: Service;
  scheduleDate: string;
  timeSlot: string;
  isValid: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onCancel: () => void;
};

export function BookingSidebar({
  service,
  scheduleDate,
  timeSlot,
  isValid,
  isSubmitting,
  submitError,
  onCancel,
}: BookingSidebarProps) {
  return (
    <div className="sticky top-24 space-y-5">
      <Card className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-lg pt-0">
        <div className="border-b border-border/50 bg-linear-to-r from-primary/10 via-muted/30 to-transparent px-6 py-4">
          <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
            Booking Summary
          </h3>
        </div>

        <CardContent className="space-y-4 text-xs">
          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground">Selected Service</span>
            <span className="font-semibold text-foreground text-right max-w-40 truncate">
              {service.name}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground">Technician</span>
            <span className="font-semibold text-foreground">
              {service.technician?.name || "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground">Scheduled Date</span>
            <span className="font-semibold text-primary">
              {scheduleDate
                ? new Date(scheduleDate + "T00:00:00").toLocaleDateString(
                    "en-BD",
                    {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )
                : "Not Selected"}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground">Time Slot</span>
            <span className="font-semibold text-primary">
              {timeSlot || "Not Selected"}
            </span>
          </div>

          <Separator className="bg-border/50 my-2" />

          <div className="flex justify-between items-center pt-1 text-sm">
            <span className="font-bold text-foreground">Total Price</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(service.price)}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          {submitError && (
            <div className="w-full rounded-lg border border-destructive/30 bg-destructive/10 p-2.5 text-center text-xs font-medium text-destructive">
              {submitError}
            </div>
          )}

          <div className="w-full">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              loadingText="Booking…"
              className="w-full"
            >
              <CalendarIcon className="size-4" />
              <span>Confirm & Book Now</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="w-full">
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onCancel}
            >
              <ArrowLeft className="size-3" />
              <span>Go Back</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Guarantee Note Box */}
      <div className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/60 p-4 text-xs text-muted-foreground backdrop-blur-xs">
        <ShieldCheck className="size-5 shrink-0 text-primary/70 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-foreground">Satisfaction Guaranteed</p>
          <p className="leading-relaxed">
            Your booking request is sent directly to the technician. Payment will be processed after service completion.
          </p>
        </div>
      </div>
    </div>
  );
}
