export default async function TechnicianBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold">Booking Details</h1>
      <p className="mt-2 text-muted-foreground">Booking ID: {id}</p>
    </div>
  );
}
