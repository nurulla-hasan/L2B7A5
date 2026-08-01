/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "@/interface/booking";

const statusVariantMap: Record<BookingStatus, string> = {
  REQUESTED: "pending",
  ACCEPTED: "accepted",
  IN_PROGRESS: "processing",
  COMPLETED: "completed",
  CANCELLED: "rejected",
  DECLINED: "rejected",
  PAID: "success",
};

const statusLabelMap: Record<BookingStatus, string> = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  DECLINED: "Declined",
  PAID: "Paid",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge variant={(statusVariantMap[status] as any) || "outline"}>
      {statusLabelMap[status] || status}
    </Badge>
  );
}
