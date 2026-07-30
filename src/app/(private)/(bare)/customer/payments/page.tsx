import Link from "next/link";
import { SearchX, Sparkles, ShieldCheck } from "lucide-react";

import { getMyPayments } from "@/services/payment.service";
import { PaymentCard } from "./_components/payment-card";
import { PaymentTabBar } from "./_components/payment-tab-bar";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyMedia,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import type { TSearchParams } from "@/interface/global";
import type { Payment } from "@/interface/payment";
import { Card } from "@/components/ui/card";

export default async function MyPaymentsPage({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  const { tab = "all" } = await searchParams;
  const currentTab = typeof tab === "string" && ["all", "completed"].includes(tab)
    ? (tab as "all" | "completed")
    : "all";

  const result = await getMyPayments();
  const payments: Payment[] = result.success ? result.data : [];

  const filtered =
    currentTab === "all"
      ? payments
      : payments.filter((p) => p.status === "COMPLETED");

  return (
    <PageWrapper paddingSize="small">
      <CustomBreadcrumb
        links={[
          { href: "/", name: "Home" },
          { href: "/customer/payments", name: "Payments", isCurrent: true },
        ]}
      />

      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 mt-2 mb-8 shadow-xs">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Payments
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Track all your payment transactions and history.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-success" />
              Secure Payments
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-warning" />
              Multiple Methods
            </span>
          </div>
        </div>
      </div>

      {/* ── Tabs ─── */}
      <div className="border-b border-border/60 pb-0">
        <PaymentTabBar currentTab={currentTab} payments={payments} />
      </div>

      <div className="my-5 flex items-center justify-between rounded-lg border border-border/40 bg-card/60 px-4 py-3 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
          </span>
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            payment{filtered.length !== 1 && "s"}
          </p>
        </div>

        <Badge variant="outline" className="capitalize">
          {currentTab === "all" ? "All Payments" : `${currentTab} Payments`}
        </Badge>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      ) : (
        <Card>
          <Empty>
            <EmptyMedia variant="icon" className="size-10">
              <SearchX className="size-5" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>
                {currentTab === "all"
                  ? "No payments yet"
                  : `No ${currentTab} payments`}
              </EmptyTitle>
              <EmptyDescription>
                {currentTab === "all"
                  ? "You haven't made any payments yet. Book a service to get started!"
                  : `You don't have any ${currentTab} payments at the moment.`}
              </EmptyDescription>
            </EmptyHeader>
            {currentTab === "all" && (
              <Link href="/services">
                <Button>Browse Services</Button>
              </Link>
            )}
          </Empty>
        </Card>
      )}
    </PageWrapper>
  );
}
