import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/common/page-wrapper";

export default function PaymentCancelledPage() {
  return (
    <PageWrapper>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-warning/10 p-4">
          <XCircle className="size-12 text-warning" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Payment Cancelled</h1>
        <p className="mt-2 text-muted-foreground">
          You have cancelled the payment. No charges have been made.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/customer/bookings">
            <Button>Back to Bookings</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
