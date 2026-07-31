"use server";

import { refresh } from "next/cache";
import { createBooking, cancelBooking, getSingleBooking } from "@/services/booking.service";
import { createPayment } from "@/services/payment.service";
import { createReview } from "@/services/review.service";
import { getValidAccessToken } from "@/lib/getValidAccessToken";

export async function createBookingAction(data: {
  technicianId: string;
  serviceId: string;
  scheduleDate: string;
  timeSlot: string;
}) {
  const auth = await getValidAccessToken();
  if (!auth.ok) return { success: false as const, message: auth.message };

  const result = await createBooking(data);

  if (!result.success) return { success: false as const, message: result.message };

  return { success: true as const };
}

export async function cancelBookingAction(bookingId: string) {
  const auth = await getValidAccessToken();
  if (!auth.ok) return { success: false as const, message: auth.message };

  const result = await cancelBooking(bookingId);

  if (!result.success) return { success: false as const, message: result.message };

  refresh();
  return { success: true as const };
}

export async function getBookingDetailAction(bookingId: string) {
  return getSingleBooking(bookingId);
}

export async function createPaymentAction(bookingId: string) {
  const auth = await getValidAccessToken();
  if (!auth.ok) return { success: false as const, message: auth.message };

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
  const auth = await getValidAccessToken();
  if (!auth.ok) return { success: false as const, message: auth.message };

  const result = await createReview(data);

  if (!result.success) return { success: false as const, message: result.message };

  refresh();
  return { success: true as const };
}
