import Link from "next/link";
import { SearchX, Sparkles, ShieldCheck } from "lucide-react";

import { getMyBookings } from "@/services/booking.service";
import { BookingCard } from "./_components/booking-card";
import { BookingTabBar } from "./_components/booking-tab-bar";
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
import { BOOKING_TABS, ACTIVE_BOOKING_STATUSES } from "@/constants/booking";
import type { BookingTab, BookingWithService } from "@/interface/booking";
import { Card } from "@/components/ui/card";

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  const { tab = "all" } = await searchParams;
  const currentTab = BOOKING_TABS.some((t) => t.key === tab)
    ? (tab as BookingTab)
    : "all";

  // ── Fetch bookings ──
  const result = await getMyBookings();

  const bookings: BookingWithService[] = result.success ? result.data : [];

  // ── Filter by tab ────
  const filtered =
    currentTab === "all"
      ? bookings
      : bookings.filter((b) =>
          currentTab === "active"
            ? ACTIVE_BOOKING_STATUSES.includes(b.status)
            : currentTab === "completed"
              ? b.status === "COMPLETED"
              : ["CANCELLED", "DECLINED"].includes(b.status),
        );

  return (
    <PageWrapper paddingSize="small">
      {/* ── Breadcrumb ── */}
      <CustomBreadcrumb
        links={[
          { href: "/", name: "Home" },
          { href: "/customer/bookings", name: "My Bookings", isCurrent: true },
        ]}
      />

      {/* ── Hero Banner ─── */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 mt-2 mb-8 shadow-xs">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Bookings
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            View and manage all your service bookings in one place.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-success" />
              Track Request Status
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-warning" />
              Pay After Service
            </span>
          </div>
        </div>
      </div>

      {/* ── Tabs ─── */}
      <BookingTabBar
        currentTab={currentTab}
        activeCount={
          bookings.filter((b) => ACTIVE_BOOKING_STATUSES.includes(b.status))
            .length
        }
      />

      {/* ── Results Bar ─── */}
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
            booking{filtered.length !== 1 && "s"}
          </p>
        </div>

        <Badge variant="outline" className="capitalize">
          {currentTab === "all" ? "All Bookings" : `${currentTab} Bookings`}
        </Badge>
      </div>

      {/* ── Bookings List ─ */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
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
                  ? "No bookings yet"
                  : `No ${currentTab} bookings`}
              </EmptyTitle>
              <EmptyDescription>
                {currentTab === "all"
                  ? "You haven't booked any service yet. Browse available services and book your first one!"
                  : `You don't have any ${currentTab} bookings at the moment.`}
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
