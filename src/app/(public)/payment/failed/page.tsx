import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/common/page-wrapper";

export default function PaymentFailedPage() {
  return (
    <PageWrapper>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <XCircle className="size-12 text-destructive" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Payment Failed</h1>
        <p className="mt-2 text-muted-foreground">
          Something went wrong while processing your payment. Please try again.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/customer/bookings">
            <Button>Try Again</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
