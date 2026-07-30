/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { BookingWithRelations, BookingStatus } from "@/interface/booking";

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

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge variant={statusVariantMap[status] as any || "outline"}>
      {statusLabelMap[status] || status}
    </Badge>
  );
}

export const bookingColumns: ColumnDef<BookingWithRelations>[] = [
  {
    accessorKey: "service.name",
    header: "Service",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.service?.name || "—"}</div>
    ),
  },
  {
    header: "Customer",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.customer?.name || "—"}</div>
    ),
  },
  {
    header: "Technician",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.technician?.name || "—"}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-sm">৳{row.original.service?.price || "—"}</span>
    ),
  },
  {
    accessorKey: "scheduleDate",
    header: "Schedule",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        <div>{formatDate(row.original.scheduleDate)}</div>
        <div className="text-xs">{row.original.timeSlot}</div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: "Booked",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
];
