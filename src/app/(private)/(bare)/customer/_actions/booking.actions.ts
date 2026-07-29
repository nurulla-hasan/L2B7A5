"use server";

import { redirect } from "next/navigation";
import { createBooking, cancelBooking } from "@/services/booking.service";
import { createReview } from "@/services/review.service";

export async function createBookingAction(data: {
  technicianId: string;
  serviceId: string;
  scheduleDate: string;
  timeSlot: string;
}) {
  const result = await createBooking(data);

  if (!result.success) return { success: false, message: result.message };

  redirect("/customer/bookings");
}

export async function cancelBookingAction(id: string) {
  const result = await cancelBooking(id);

  if (!result.success) return { success: false, message: result.message };

  redirect("/customer/bookings");
}

export async function createReviewAction(data: {
  bookingId: string;
  rating: number;
  comment: string;
}) {
  const result = await createReview(data);

  if (!result.success) return { success: false, message: result.message };

  redirect("/customer/bookings");
}
