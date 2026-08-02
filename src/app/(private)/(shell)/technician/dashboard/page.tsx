import { getTechnicianDashboardStats } from "@/services/technician.service";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarCheck,
  CircleDollarSign,
  Star,
  Wrench,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookingStatusBadge } from "@/components/common/booking-status-badge";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { cookies } from "next/headers";
import { TechnicianProfilePrompt } from "./_components/technician-profile-prompt";

export default async function TechnicianDashboardPage() {
  const result = await getTechnicianDashboardStats();
  const stats = result.success ? result.data : null;
  const totals = stats?.totals;

  const pendingBookings = totals?.pendingBookings ?? 0;
  const earnings = totals?.earnings ?? 0;
  const averageRating = totals?.averageRating ?? 0;
  const reviewCount = totals?.reviewCount ?? 0;

  // Show the profile prompt only once (until the technician dismisses it)
  const cookieStore = await cookies();
  const promptSeen = cookieStore.get("fixitnow_technician_profile_prompt_seen")?.value;

  return (
    <div className="space-y-6">
      {/* ── Onboarding Prompt (shows once) ──────────────── */}
      <TechnicianProfilePrompt defaultOpen={!promptSeen} />

      {/* ── Welcome Banner ───────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 shadow-xs">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back, Technician! 👋
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-2xl">
            {pendingBookings > 0 ? (
              <>
                Here&apos;s what&apos;s happening with your services today. You
                have{" "}
                <span className="font-semibold text-foreground">
                  {pendingBookings} pending booking
                  {pendingBookings > 1 ? "s" : ""}
                </span>{" "}
                that require your attention.
              </>
            ) : (
              "All caught up! No pending bookings right now. Here&apos;s a snapshot of your services."
            )}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link href="/technician/bookings">
              <Button size="sm">View Bookings</Button>
            </Link>
            <Link href="/technician/services">
              <Button size="sm" variant="outline">
                Manage Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ───────────────────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CalendarCheck className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totals?.bookings ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totals?.completedBookings ?? 0} completed
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Wrench className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totals?.activeServices ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently visible to customers
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <CircleDollarSign className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(String(earnings))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From completed payments
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="size-4 text-yellow-400 fill-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {reviewCount} review{reviewCount === 1 ? "" : "s"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Recent Activity ──────────────────────────────── */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            <Link href="/technician/bookings">
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                View All <ArrowRight className="size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.upcomingAppointments?.length ? (
              <div className="space-y-5">
                {stats.upcomingAppointments.map((appointment) => {
                  const date = new Date(appointment.scheduleDate);
                  return (
                    <div
                      key={appointment.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-10 flex-col items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                          <span className="text-xs font-semibold leading-none uppercase">
                            {format(date, "MMM")}
                          </span>
                          <span className="text-sm font-bold leading-none">
                            {format(date, "dd")}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {appointment.service.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            <span>{appointment.timeSlot}</span>
                            <span>·</span>
                            <span>{appointment.customer.name}</span>
                          </div>
                        </div>
                      </div>
                      <BookingStatusBadge status={appointment.status} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No upcoming appointments.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
            <CardTitle className="text-lg">Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.recentReviews?.length ? (
              <div className="space-y-5">
                {stats.recentReviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {review.customerName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium">
                          {review.customerName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          · {review.serviceName}
                        </span>
                      </div>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 ${
                              i < review.rating
                                ? "fill-current"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No reviews yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
