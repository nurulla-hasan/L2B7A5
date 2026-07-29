export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Service</h1>
      <p className="mt-2 text-muted-foreground">Service ID: {id}</p>
    </div>
  );
}
