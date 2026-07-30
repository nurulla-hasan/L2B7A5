"use client";

import Link from "next/link";
import { CalendarCheck, Clock, X } from "lucide-react";
import { useActionState, startTransition } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
import { formatDate, formatPrice, timeAgo } from "@/lib/utils";
import { BOOKING_STATUS_VARIANT, BOOKING_STATUS_LABEL } from "@/constants/booking";
import type { BookingWithService } from "@/interface/booking";
import { BookingDetailModal } from "./booking-detail-modal";
import { cancelBookingAction } from "../../_actions/booking.actions";

export function BookingCard({ booking }: { booking: BookingWithService }) {
  const canCancel = booking.status === "REQUESTED";
  const [, dispatch, isPending] = useActionState(cancelBookingAction, null);

  function handleCancel() {
    const form = new FormData();
    form.append("bookingId", booking.id);
    startTransition(() => dispatch(form));
  }

  return (
    <Card className="transition-shadow hover:shadow-md group">
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/customer/bookings/${booking.id}`}
            className="flex-1 space-y-2"
          >
            <div className="flex items-center gap-3">
              <Badge variant={BOOKING_STATUS_VARIANT[booking.status] ?? "default"}>
                {BOOKING_STATUS_LABEL[booking.status] ?? booking.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {timeAgo(booking.createdAt)}
              </span>
            </div>

            {booking.service && (
              <p className="font-medium">{booking.service.name}</p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarCheck className="size-3.5" />
                {formatDate(booking.scheduleDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {booking.timeSlot}
              </span>
              {booking.service && (
                <span className="font-medium text-foreground">
                  {formatPrice(booking.service.price)}
                </span>
              )}
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:shrink-0 sm:self-center">
            {canCancel && (
              <ConfirmationModal
                title="Cancel Booking?"
                description="Are you sure you want to cancel this booking?"
                confirmText="Yes, Cancel"
                variant="destructive"
                isLoading={isPending}
                actionTrigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="size-3.5" />
                    Cancel
                  </Button>
                }
                onConfirm={handleCancel}
              />
            )}
            <BookingDetailModal bookingId={booking.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
