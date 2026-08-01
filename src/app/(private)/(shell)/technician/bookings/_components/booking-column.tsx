"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ErrorToast, formatPrice, SuccessToast } from "@/lib/utils";
import type { TechnicianBooking, BookingStatus } from "@/interface/booking";
import { updateBookingStatusAction } from "../../_actions/technician.actions";

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  switch (status) {
    case "REQUESTED":
      return <Badge variant="pending">Requested</Badge>;
    case "ACCEPTED":
      return <Badge variant="accepted">Accepted</Badge>;
    case "IN_PROGRESS":
      return <Badge variant="processing">In Progress</Badge>;
    case "COMPLETED":
      return <Badge variant="completed">Completed</Badge>;
    case "CANCELLED":
    case "DECLINED":
      return (
        <Badge variant="rejected">
          {status === "CANCELLED" ? "Cancelled" : "Declined"}
        </Badge>
      );
    case "PAID":
      return <Badge variant="success">Paid</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const ActionsCell = ({ booking }: { booking: TechnicianBooking }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (status: BookingStatus) => {
    setIsUpdating(true);
    const res = await updateBookingStatusAction(booking.id, status);
    setIsUpdating(false);
    if (res?.success) {
      SuccessToast(`Booking status updated to ${status}`);
    } else {
      ErrorToast(res?.message || "Failed to update booking status");
    }
  };

  return (
    <div className="flex justify-end gap-1.5">
      {booking.status === "REQUESTED" && (
        <>
          <Button
            variant="outline"
            size="icon"
            title="Accept"
            disabled={isUpdating}
            onClick={() => handleUpdateStatus("ACCEPTED")}
            className="text-green-600 hover:text-green-600"
          >
            <CheckCircle />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="Decline"
            disabled={isUpdating}
            onClick={() => handleUpdateStatus("DECLINED")}
            className="text-red-600 hover:text-red-600"
          >
            <XCircle />
          </Button>
        </>
      )}
      {booking.status === "PAID" && (
        <Button
          variant="outline"
          size="icon"
          title="Start Progress"
          disabled={isUpdating}
          onClick={() => handleUpdateStatus("IN_PROGRESS")}
          className="text-blue-600 hover:text-blue-600"
        >
          <Clock />
        </Button>
      )}
      {booking.status === "IN_PROGRESS" && (
        <Button
          variant="outline"
          size="icon"
          title="Mark Completed"
          disabled={isUpdating}
          onClick={() => handleUpdateStatus("COMPLETED")}
          className="text-green-600 hover:text-green-600"
        >
          <CheckCircle />
        </Button>
      )}
      {["ACCEPTED", "COMPLETED", "CANCELLED", "DECLINED"].includes(
        booking.status,
      ) ? (
        <span className="px-2 py-1.5 text text-muted-foreground">
          No actions available
        </span>
      ) : null}
    </div>
  );
};

export const bookingColumns: ColumnDef<TechnicianBooking>[] = [
  {
    accessorKey: "serviceName",
    header: "Service Details",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-foreground">
          {row.original.serviceName}
        </span>
        <span className="text font-semibold text-primary">
          {formatPrice(row.original.price)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text font-medium">{row.original.customerName}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.customerEmail}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "scheduleDate",
    header: "Schedule",
    cell: ({ row }) => {
      const date = new Date(row.original.scheduleDate);
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-sm text-foreground">
            <Calendar className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            {format(date, "MMM dd, yyyy")}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            {row.original.timeSlot}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell booking={row.original} />,
  },
];
