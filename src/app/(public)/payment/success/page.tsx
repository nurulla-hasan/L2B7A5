import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-green-100 p-4 text-4xl dark:bg-green-900/30">
        ✅
      </div>
      <h1 className="mt-6 text-3xl font-bold">Payment Successful!</h1>
      <p className="mt-2 text-muted-foreground">
        Your payment has been processed successfully.
      </p>
      <Link
        href="/bookings"
        className="mt-6 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        View My Bookings
      </Link>
    </div>
  );
}
