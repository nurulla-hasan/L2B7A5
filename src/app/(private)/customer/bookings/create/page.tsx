export default async function CreateBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { serviceId } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Book a Service</h1>
      {serviceId && (
        <p className="mt-2 text-muted-foreground">Service ID: {serviceId}</p>
      )}
    </div>
  );
}
