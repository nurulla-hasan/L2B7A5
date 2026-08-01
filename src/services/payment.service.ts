import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import type { Payment } from "@/interface/payment";

export function getMyPayments() {
  return nextServerFetch<Payment[]>("/api/payments");
}

export function createPayment(bookingId: string) {
  return nextServerFetch<{ paymentUrl: string; transactionId: string; amount: number }>("/api/payments/create", {
    method: "POST",
    body: { bookingId },
  });
}
