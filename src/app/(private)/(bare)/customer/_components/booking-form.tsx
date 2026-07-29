"use client";

import { useMemo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Calendar } from "@/components/ui/calendar";
import { getDayName, getTomorrow } from "@/lib/utils";
import {
  createBookingSchema,
  type CreateBookingFormData,
} from "@/validation/booking.schema";
import { createBookingAction } from "../_actions/booking.actions";
import type { Service } from "@/interface/service";
import { BookingSummaryCard } from "./booking-summary-card";
import { BookingSidebar } from "./booking-sidebar";

type BookingFormProps = {
  service: Service;
};

export function BookingForm({ service }: BookingFormProps) {
  const router = useRouter();
  const tomorrow = useMemo(() => getTomorrow(), []);
  const availability = service.technician?.technicianProfile?.availability;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm<CreateBookingFormData>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      technicianId: service.technicianId,
      serviceId: service.id,
      scheduleDate: "",
      timeSlot: "",
    },
    mode: "onChange",
  });

  const scheduleDate = useWatch({ control, name: "scheduleDate" });
  const timeSlot = useWatch({ control, name: "timeSlot" });

  const availableSlots = useMemo(() => {
    if (!scheduleDate || !availability) return [];
    const day = getDayName(scheduleDate);
    return availability[day] || [];
  }, [scheduleDate, availability]);

  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onFormSubmit = useCallback(
    async (data: CreateBookingFormData) => {
      setSubmitError(null);
      const result = await createBookingAction(data);

      if (result?.success === false) {
        setSubmitError(result.message || "Failed to create booking.");
        return;
      }

      setSuccess(true);
    },
    [],
  );

  if (success) {
    return (
      <div className="flex min-h-95 flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
        <div className="relative flex size-20 items-center justify-center rounded-full bg-primary/20 text-primary ring-8 ring-primary/10">
          <CheckCircle2 className="size-10 animate-bounce" />
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          Booking Confirmed!
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your booking for{" "}
          <span className="font-semibold text-foreground">
            {service.name}
          </span>{" "}
          has been submitted successfully. The technician will review your
          request shortly.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div>
            <Button
              variant="outline"
              onClick={() => router.push("/customer/bookings")}
            >
              View My Bookings
            </Button>
          </div>
          <div>
            <Button onClick={() => router.push("/services")}>
              <span>Browse More Services</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="grid gap-8 lg:grid-cols-12"
    >
      {/* ── Left Column: Service Details & Date/Time Selection ── */}
      <div className="space-y-6 lg:col-span-7 xl:col-span-8">
        <BookingSummaryCard service={service} />

        {/* Date & Time Selection Card */}
        <Card className="pt-0 rounded-2xl border border-border/70 bg-card shadow-md">
          <div className="border-b border-border/50 bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CalendarIcon className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Select Date & Time Slot
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Choose when you want the technician to arrive
                </p>
              </div>
            </div>
          </div>

          <CardContent className="space-y-6">
            {/* Calendar */}
            <Controller
              name="scheduleDate"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => {
                let selectedDate: Date | undefined = undefined;
                if (value) {
                  const [y, m, d] = value.split("-").map(Number);
                  selectedDate = new Date(y, m - 1, d);
                }
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Preferred Date
                    </FieldLabel>
                    <FieldContent>
                      <div className="flex justify-center rounded-xl border border-border/60 bg-muted/20 p-3">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            if (date) {
                              const y = date.getFullYear();
                              const m = String(date.getMonth() + 1).padStart(
                                2,
                                "0",
                              );
                              const d = String(date.getDate()).padStart(2, "0");
                              onChange(`${y}-${m}-${d}`);
                              setValue("timeSlot", "");
                            } else {
                              onChange("");
                            }
                          }}
                          disabled={(date) => date < tomorrow}
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="mt-1" />
                      )}
                    </FieldContent>
                  </Field>
                );
              }}
            />

            <Separator className="bg-border/40" />

            {/* Time Slots */}
            <Controller
              name="timeSlot"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Available Time Slots
                  </FieldLabel>
                  <FieldContent>
                    {scheduleDate ? (
                      availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                          {availableSlots.map((slot) => {
                            const isSelected = value === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => onChange(slot)}
                                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                                    : "border-border/60 bg-background/60 text-foreground/80 hover:border-primary/40 hover:bg-card hover:text-foreground"
                                }`}
                              >
                                <Clock className="size-3.5" />
                                <span>{slot}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
                          <Info className="size-4 shrink-0 text-muted-foreground" />
                          <span>
                            The technician is not available on this day. Please
                            select another date.
                          </span>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 p-4 text-xs text-muted-foreground">
                        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                        <span>
                          Please select a date from the calendar above to view
                          available time slots.
                        </span>
                      </div>
                    )}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="mt-1" />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* ── Right Column: Booking Summary Sidebar ────────────── */}
      <div className="lg:col-span-5 xl:col-span-4">
        <BookingSidebar
          service={service}
          scheduleDate={scheduleDate}
          timeSlot={timeSlot}
          isValid={isValid}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onCancel={() => router.back()}
        />
      </div>
    </form>
  );
}
