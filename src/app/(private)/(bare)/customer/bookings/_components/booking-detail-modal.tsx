"use client";

import { useState, useTransition } from "react";
import {
  CalendarCheck,
  Clock,
  Eye,
  Loader2,
  Mail,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModalWrapper } from "@/components/common/modal-wrapper";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatPrice } from "@/lib/utils";
import { BOOKING_STATUS_VARIANT, BOOKING_STATUS_LABEL } from "@/constants/booking";
import { getBookingDetailAction } from "../../_actions/booking.actions";
import type { BookingWithRelations } from "@/interface/booking";

export function BookingDetailModal({
  bookingId,
}: {
  bookingId: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [detail, setDetail] = useState<BookingWithRelations | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen && !detail && !error) {
      startTransition(async () => {
        const result = await getBookingDetailAction(bookingId);
        if (result.success) {
          setDetail(result.data);
        } else {
          setError(result.message);
        }
      });
    }
  }

  return (
    <ModalWrapper
      open={open}
      onOpenChange={handleOpenChange}
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye className="size-4" />
        </Button>
      }
      title="Booking Details"
      showClose
    >
      {isPending ? (
        <div className="flex min-h-40 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      ) : detail ? (
        <div className="space-y-5">
          {/* Status + ID */}
          <div className="flex items-center justify-between">
            <Badge
              variant={BOOKING_STATUS_VARIANT[detail.status] ?? "default"}
              className="px-3 py-1 text-sm"
            >
              {BOOKING_STATUS_LABEL[detail.status] ?? detail.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              ID: {detail.id.slice(0, 8)}...
            </span>
          </div>

          {/* Service */}
          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Service
            </h4>
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{detail.service.name}</p>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(detail.service.price)}
                </p>
              </div>
              {detail.service.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {detail.service.description}
                </p>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Schedule
            </h4>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2">
                <CalendarCheck className="size-4 text-muted-foreground" />
                {formatDate(detail.scheduleDate)}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2">
                <Clock className="size-4 text-muted-foreground" />
                {detail.timeSlot}
              </span>
            </div>
          </div>

          <Separator />

          {/* Technician */}
          {detail.technician && (
            <div>
              <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Technician
              </h4>
              <div className="space-y-2 rounded-lg border bg-card p-3">
                <p className="flex items-center gap-2 text-sm">
                  <User className="size-4 text-muted-foreground" />
                  {detail.technician.name}
                </p>
                {detail.technician.email && (
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="size-4 text-muted-foreground" />
                    {detail.technician.email}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Customer */}
          {detail.customer && (
            <div>
              <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Customer
              </h4>
              <div className="space-y-2 rounded-lg border bg-card p-3">
                <p className="flex items-center gap-2 text-sm">
                  <User className="size-4 text-muted-foreground" />
                  {detail.customer.name}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  {detail.customer.email}
                </p>
              </div>
            </div>
          )}

          {/* Payment + Review */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Payment
              </p>
              <p className="mt-1 font-medium">
                {detail.payment ? "Paid" : "Pending"}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Review
              </p>
              <p className="mt-1 font-medium">
                {detail.review ? "Submitted" : "Not yet"}
              </p>
            </div>
          </div>

          {/* Created */}
          <div className="border-t pt-3 text-xs text-muted-foreground">
            Booked on {formatDate(detail.createdAt)}
          </div>
        </div>
      ) : null}
    </ModalWrapper>
  );
}
