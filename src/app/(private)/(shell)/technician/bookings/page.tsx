import { DataTable } from "@/components/common/data-table";
import { getTechnicianBookings } from "@/services/technician.service";
import { bookingColumns } from "./_components/booking-column";
import { SectionHeading } from "@/components/common/section-heading";

export default async function TechnicianBookingsPage() {
  const result = await getTechnicianBookings();
  const bookings = result?.success ? result.data : [];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Assigned Bookings"
        description="View and manage your bookings."
        alignment="left"
        as="h3"
      />

      <div>
        <DataTable columns={bookingColumns} data={bookings} />
      </div>
    </div>
  );
}
