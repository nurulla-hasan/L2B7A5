import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import type { Payment } from "@/interface/payment";

export function getMyPayments() {
  return nextServerFetch<Payment[]>("/api/payments");
}

export function getSinglePayment(id: string) {
  return nextServerFetch<Payment>(`/api/payments/${id}`);
}

export function createPayment(bookingId: string) {
  return nextServerFetch<{ paymentUrl: string; transactionId: string; amount: number }>("/api/payments/create", {
    method: "POST",
    body: { bookingId },
  });
}
