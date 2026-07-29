export default async function PaymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Payment Details</h1>
      <p className="mt-2 text-muted-foreground">Payment ID: {id}</p>
    </div>
  );
}
