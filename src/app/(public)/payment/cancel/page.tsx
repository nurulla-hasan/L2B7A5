import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-yellow-100 p-4 text-4xl dark:bg-yellow-900/30">
        ⏭️
      </div>
      <h1 className="mt-6 text-3xl font-bold">Payment Cancelled</h1>
      <p className="mt-2 text-muted-foreground">
        You have cancelled the payment. No charges were made.
      </p>
      <Link
        href="/bookings"
        className="mt-6 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to Bookings
      </Link>
    </div>
  );
}
