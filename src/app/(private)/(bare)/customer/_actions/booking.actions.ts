"use server";

import { redirect } from "next/navigation";
import { createBooking, cancelBooking, getSingleBooking } from "@/services/booking.service";
import { createPayment } from "@/services/payment.service";
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

export async function cancelBookingAction(bookingId: string) {
  const result = await cancelBooking(bookingId);

  if (!result.success) return { success: false, message: result.message };

  redirect("/customer/bookings");
}

export async function getBookingDetailAction(bookingId: string) {
  return getSingleBooking(bookingId);
}

export async function createPaymentAction(bookingId: string) {
  const result = await createPayment(bookingId);

  if (!result.success) return { success: false as const, message: result.message };

  return {
    success: true as const,
    paymentUrl: result.data.paymentUrl,
  };
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
