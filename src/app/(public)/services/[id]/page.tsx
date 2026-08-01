import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Wrench,
  Calendar,
  User,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { getSingleService } from "@/services/service.service";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { AvailabilitySchedule } from "@/components/common/availability-schedule";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Service } from "@/interface/service";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getSingleService(id);

  if (!res.success) {
    if (res.statusCode === 404) {
      notFound();
    }
    throw new Error(res.message);
  }

  const service: Service = res.data;
  const availability = service.technician?.technicianProfile?.availability;

  return (
    <PageWrapper paddingSize="small">
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <CustomBreadcrumb
        links={[
          { href: "/", name: "Home" },
          { href: "/services", name: "Services" },
          { name: service.name, isCurrent: true },
        ]}
      />

      {/* ── Main Layout ─────────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* ── Left: Service Details ──────────────────────────── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header Card */}
          <Card className="pt-0 overflow-hidden border-border/60 shadow-xs">
            <div className="border-b border-border/40 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-primary/20 px-3 py-1 text-xs font-medium"
                >
                  <Wrench className="mr-1 size-3.5 text-primary" />
                  {service.category?.name || "Service"}
                </Badge>
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {service.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {service.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4 text-primary" />
                    {service.location}
                  </span>
                )}
                {service.technician?.name && (
                  <span className="flex items-center gap-1.5">
                    <User className="size-4 text-primary" />
                    {service.technician.name}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center gap-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(service.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    flat rate
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700 text-xs dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                >
                  <ShieldCheck className="size-3.5" />
                  Verified
                </Badge>
              </div>
            </div>

            <CardContent>
              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-foreground/80">
                  About This Service
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>

              <Separator className="my-6 bg-border/50" />

              {/* Trust Badges */}
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: ShieldCheck,
                    label: "Background Checked",
                    desc: "All technicians are verified",
                  },
                  {
                    icon: Sparkles,
                    label: "Upfront Pricing",
                    desc: "No hidden charges",
                  },
                  {
                    icon: Calendar,
                    label: "Flexible Schedule",
                    desc: "Book at your convenience",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/30 p-3.5"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground/90">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Technician & Availability */}
          {availability && Object.keys(availability).length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <User className="size-4 text-primary" />
                  {service.technician?.name || "Technician"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border/50 bg-card/40 p-4">
                  <AvailabilitySchedule availability={availability} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── Right: Booking Sidebar ─────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <Card className="border-border/60 shadow-xs">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Book This Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(service.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    one-time payment
                  </span>
                </div>

                <Separator className="bg-border/50" />

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span className="font-medium text-foreground">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charge</span>
                    <span className="font-medium text-foreground">Free</span>
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-primary">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/customer/bookings/create?serviceId=${service.id}`} className="w-full">
                  <Button className="w-full">
                    <Calendar className="size-4" />
                    Proceed to Book
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Quick Info */}
            <div className="rounded-xl border border-border/50 bg-card/40 p-4 text-xs text-muted-foreground">
              <p className="font-medium text-foreground/80">
                Need help?
              </p>
              <p className="mt-1 leading-relaxed">
                Contact our support team if you have any questions about this
                service before booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
