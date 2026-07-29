export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Service Details</h1>
      <p className="mt-2 text-muted-foreground">Service ID: {id}</p>
    </div>
  );
}
