"use client";

import {
  CalendarCheck,
  Clock,
  Eye,
  Mail,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModalWrapper } from "@/components/common/modal-wrapper";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatPrice } from "@/lib/utils";
import { BOOKING_STATUS_VARIANT, BOOKING_STATUS_LABEL } from "@/constants/booking";
import type { BookingWithService } from "@/interface/booking";

export function BookingDetailModal({
  booking,
}: {
  booking: BookingWithService;
}) {
  const { service, technician, customer, payment, review } = booking;

  return (
    <ModalWrapper
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye className="size-4" />
        </Button>
      }
      title="Booking Details"
      showClose
    >
      <div className="space-y-5">
        {/* Status + ID */}
        <div className="flex items-center justify-between">
          <Badge
            variant={BOOKING_STATUS_VARIANT[booking.status] ?? "default"}
            className="px-3 py-1 text-sm"
          >
            {BOOKING_STATUS_LABEL[booking.status] ?? booking.status}
          </Badge>
          <span className="text-xs text-muted-foreground">
            ID: {booking.id.slice(0, 8)}...
          </span>
        </div>

        {/* Service */}
        {service && (
          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Service
            </h4>
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{service.name}</p>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(service.price)}
                </p>
              </div>
              {service.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Schedule */}
        <div>
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Schedule
          </h4>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2">
              <CalendarCheck className="size-4 text-muted-foreground" />
              {formatDate(booking.scheduleDate)}
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2">
              <Clock className="size-4 text-muted-foreground" />
              {booking.timeSlot}
            </span>
          </div>
        </div>

        <Separator />

        {/* Technician */}
        {technician && (
          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Technician
            </h4>
            <div className="space-y-2 rounded-lg border bg-card p-3">
              <p className="flex items-center gap-2 text-sm">
                <User className="size-4 text-muted-foreground" />
                {technician.name}
              </p>
              {technician.email && (
                <p className="flex items-center gap-2 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  {technician.email}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Customer */}
        {customer && (
          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Customer
            </h4>
            <div className="space-y-2 rounded-lg border bg-card p-3">
              <p className="flex items-center gap-2 text-sm">
                <User className="size-4 text-muted-foreground" />
                {customer.name}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                {customer.email}
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
              {payment ? "Paid" : "Pending"}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Review
            </p>
            <p className="mt-1 font-medium">
              {review ? "Submitted" : "Not yet"}
            </p>
          </div>
        </div>

        {/* Created */}
        <div className="border-t pt-3 text-xs text-muted-foreground">
          Booked on {formatDate(booking.createdAt)}
        </div>
      </div>
    </ModalWrapper>
  );
}
