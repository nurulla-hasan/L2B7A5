import type { BookingStatus, BookingTab } from "@/interface/booking";

export const BOOKING_TABS: { key: BookingTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export const ACTIVE_BOOKING_STATUSES: BookingStatus[] = [
  "REQUESTED",
  "ACCEPTED",
  "PAID",
  "IN_PROGRESS",
];

export const BOOKING_STATUS_VARIANT: Record<
  BookingStatus,
  "pending" | "accepted" | "completed" | "rejected" | "processing" | "progress"
> = {
  REQUESTED: "pending",
  ACCEPTED: "accepted",
  PAID: "processing",
  IN_PROGRESS: "progress",
  COMPLETED: "completed",
  CANCELLED: "rejected",
  DECLINED: "rejected",
};

export const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  PAID: "Paid",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  DECLINED: "Declined",
};
