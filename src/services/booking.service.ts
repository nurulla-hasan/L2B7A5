import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import type { Booking, BookingWithRelations, BookingWithService } from "@/interface/booking";

export function getMyBookings() {
  return nextServerFetch<BookingWithService[]>("/api/bookings");
}

export function getSingleBooking(id: string) {
  return nextServerFetch<BookingWithRelations>(`/api/bookings/${id}`);
}

export function createBooking(data: {
  technicianId: string;
  serviceId: string;
  scheduleDate: string;
  timeSlot: string;
}) {
  return nextServerFetch<Booking>("/api/bookings", {
    method: "POST",
    body: data,
  });
}

export function cancelBooking(id: string) {
  return nextServerFetch<Booking>(`/api/bookings/${id}/cancel`, {
    method: "PATCH",
  });
}
