export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Payment {
  id: string;
  bookingId: string;
  amount: string;
  method: string;
  provider: string;
  transactionId: string;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  booking?: {
    id: string;
    scheduleDate: string;
    status: string;
    service: {
      name: string;
      price: string;
    };
  };
}

export const PAYMENT_STATUS_VARIANT: Record<PaymentStatus, "pending" | "completed" | "rejected"> = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "rejected",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  FAILED: "Failed",
};
