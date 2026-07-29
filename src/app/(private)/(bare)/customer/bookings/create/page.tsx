import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarCheck2, Sparkles, ShieldCheck } from "lucide-react";

import { getSingleService } from "@/services/service.service";
import { PageWrapper } from "@/components/common/page-wrapper";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { BookingForm } from "../../_components/booking-form";
import type { Service } from "@/interface/service";
import { Badge } from "@/components/ui/badge";

export default async function CreateBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { serviceId } = await searchParams;

  if (!serviceId) {
    return (
      <PageWrapper paddingSize="small">
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/40 p-8 text-center backdrop-blur-xs">
          <h2 className="text-xl font-semibold text-foreground">
            No Service Selected
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Please browse our services and select one to book.
          </p>
          <Link
            href="/services"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Browse Services
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const res = await getSingleService(serviceId);

  if (!res.success || !res.data) {
    notFound();
  }

  const service: Service = res.data;

  return (
    <PageWrapper paddingSize="small">
      {/* ── Breadcrumbs ──────────────────────────────────────── */}
      <CustomBreadcrumb
        links={[
          { href: "/", name: "Home" },
          { href: "/services", name: "Services" },
          { href: `/services/${service.id}`, name: service.name },
          { name: "Book", isCurrent: true },
        ]}
      />

      {/* ── Modern Hero Banner Header ────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 mt-2 mb-8 shadow-xs">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur-xs">
            <CalendarCheck2 className="size-3.5 text-primary" />
            <span>Instant Online Booking</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Book Your Service
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Select your preferred date & time slot. Instant technician confirmation guaranteed with upfront pricing.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-500" />
              Verified Technician
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-amber-500" />
              Pay After Service
            </span>
          </div>
        </div>
      </div>

      {/* ── Booking Form ────────────────────────────────────── */}
      <BookingForm service={service} />
    </PageWrapper>
  );
}
