import { getAllBookings } from "@/services/admin.service";
import { SectionHeading } from "@/components/common/section-heading";
import { DataTable } from "@/components/common/data-table";
import { bookingColumns } from "./_components/booking-columns";

export default async function AdminBookingsPage() {
  const result = await getAllBookings();
  const bookings = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="All Bookings"
        description="View all platform bookings."
        alignment="left"
        as="h3"
        constrain={false}
      />

      <DataTable columns={bookingColumns} data={bookings} />
    </div>
  );
}
