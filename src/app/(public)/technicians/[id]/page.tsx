import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Wrench,
  Calendar,
  User,
  ShieldCheck,
  Sparkles,
  Clock,
  Briefcase,
  Star,
  ChevronRight,
  DollarSign,
} from "lucide-react";

import { getSingleTechnician } from "@/services/technician.service";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { AvailabilitySchedule } from "@/components/common/availability-schedule";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TechnicianWithProfile } from "@/interface/user";

export default async function TechnicianDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getSingleTechnician(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const technician: TechnicianWithProfile = res.data;
  const profile = technician.technicianProfile;
  const skills = profile?.skills?.split(", ").filter(Boolean) ?? [];
  const availability = profile?.availability;
  const services = technician.services ?? [];

  return (
    <PageWrapper paddingSize="small">
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <CustomBreadcrumb
        links={[
          { href: "/", name: "Home" },
          { href: "/technicians", name: "Technicians" },
          { name: technician.name, isCurrent: true },
        ]}
      />

      {/* ── Main Layout ─────────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* ── Left: Technician Details ──────────────────────── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header Card */}
          <Card className="pt-0 overflow-hidden border-border/60 shadow-xs">
            <div className="border-b border-border/40 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-primary/20 px-3 py-1 text-xs font-medium"
                >
                  <Briefcase className="mr-1 size-3.5 text-primary" />
                  {profile?.experience || "Professional"}
                </Badge>
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {technician.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="size-4 text-primary" />
                  {technician.email}
                </span>
                {services.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Star className="size-4 text-primary" />
                    {services.length} service{services.length !== 1 && "s"}
                  </span>
                )}
              </div>
            </div>

            <CardContent>
              {/* Skills */}
              {skills.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold text-foreground/80">
                    Skills & Expertise
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                      >
                        <Wrench className="size-3" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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

          {/* Availability Schedule */}
          {availability && Object.keys(availability).length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Clock className="size-4 text-primary" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border/50 bg-card/40 p-4">
                  <AvailabilitySchedule availability={availability} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Services Offered */}
          {services.length > 0 && (
            <Card className="border-border/60 shadow-xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Wrench className="size-4 text-primary" />
                  Services Offered ({services.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {services.map((svc) => (
                  <Link
                    key={svc.id}
                    href={`/services/${svc.id}`}
                    className="flex items-center justify-between rounded-lg border border-border/40 bg-card/30 p-3.5 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Wrench className="size-3.5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground/90">
                          {svc.name}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" />
                          {svc.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">
                        {formatPrice(svc.price)}
                      </span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── Right: Sidebar Info ────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Rate Card */}
            <Card className="border-border/60 shadow-xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <DollarSign className="size-4 text-primary" />
                  Hourly Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.pricing && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(profile.pricing)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      per hour
                    </span>
                  </div>
                )}

                <Separator className="bg-border/50" />

                {/* Quick Stats */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium text-foreground">
                      {profile?.experience || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Skills</span>
                    <span className="font-medium text-foreground">
                      {skills.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Services</span>
                    <span className="font-medium text-foreground">
                      {services.length}
                    </span>
                  </div>
                </div>

                <Separator className="bg-border/50" />

                <div className="rounded-lg bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
                  <p className="font-medium text-foreground/80 mb-1">
                    How to book?
                  </p>
                  <p>
                    Browse the services listed on the left and book through the
                    individual service page.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <div className="rounded-xl border border-border/50 bg-card/40 p-4 text-xs text-muted-foreground">
              <p className="font-medium text-foreground/80">Need help?</p>
              <p className="mt-1 leading-relaxed">
                Contact our support team if you have any questions about this
                technician.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
