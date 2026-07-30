"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { TechnicianBooking, BookingStatus } from "@/interface/booking";
import { useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = (status: BookingStatus) => {
    startTransition(async () => {
      const res = await updateBookingStatusAction(booking.id, status);
      if (res?.success) {
        toast.success(`Booking status updated to ${status}`);
      } else {
        toast.error(res?.message || "Failed to update booking status");
      }
    });
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-4" disabled={isPending}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {booking.status === "REQUESTED" && (
              <>
                <DropdownMenuItem
                  onClick={() => handleUpdateStatus("ACCEPTED")}
                  className="cursor-pointer text-green-600 focus:text-green-600"
                >
                  <CheckCircle/> Accept
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleUpdateStatus("DECLINED")}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <XCircle/> Decline
                </DropdownMenuItem>
              </>
            )}
            {booking.status === "PAID" && (
              <DropdownMenuItem
                onClick={() => handleUpdateStatus("IN_PROGRESS")}
                className="cursor-pointer text-blue-600 focus:text-blue-600"
              >
                <Clock/> Start Progress
              </DropdownMenuItem>
            )}
            {booking.status === "IN_PROGRESS" && (
              <DropdownMenuItem
                onClick={() => handleUpdateStatus("COMPLETED")}
                className="cursor-pointer text-green-600 focus:text-green-600"
              >
                <CheckCircle/> Mark Completed
              </DropdownMenuItem>
            )}
            {["ACCEPTED", "COMPLETED", "CANCELLED", "DECLINED"].includes(
              booking.status,
            ) ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No actions available
              </div>
            ) : null}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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
        <span className="text-sm font-semibold text-primary">
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
        <span className="text-sm font-medium">{row.original.customerName}</span>
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
