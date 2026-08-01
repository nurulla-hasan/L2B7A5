import { getAdminDashboardStats } from "@/services/admin.service";
import {
  Users,
  CalendarCheck,
  CircleDollarSign,
  Wrench,
  TrendingUp,
  ArrowRight,
  UserRound,
  ListChecks,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingStatusBadge } from "@/components/common/booking-status-badge";
import { formatDate, formatPrice } from "@/lib/utils";


function StatCard({
  title,
  value,
  sub,
  icon,
}: {
  title: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {sub ? (
          <p className="text-xs text-muted-foreground mt-1">{sub}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default async function AdminDashboardPage() {
  const result = await getAdminDashboardStats();
  const stats = result.success ? result.data : null;
  const totals = stats?.totals;
  const statusCounts = stats?.bookingStatusCounts;

  const totalBookings = totals?.bookings ?? 0;
  const activeBookings =
    (statusCounts?.REQUESTED ?? 0) +
    (statusCounts?.ACCEPTED ?? 0) +
    (statusCounts?.PAID ?? 0) +
    (statusCounts?.IN_PROGRESS ?? 0);

  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ───────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 shadow-xs">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Platform Overview 👋
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-2xl">
            {totals
              ? `${totals.customers} customers, ${totals.technicians} technicians and ${totals.bookings} bookings across the platform. ${activeBookings} bookings are currently active.`
              : "Here&apos;s a snapshot of what&apos;s happening across the platform."}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link href="/admin/bookings">
              <Button size="sm">View All Bookings</Button>
            </Link>
            <Link href="/admin/users">
              <Button size="sm" variant="outline">
                Manage Users
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ───────────────────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={(totals?.users ?? 0).toLocaleString()}
          sub={
            totals
              ? `${totals.customers} customers · ${totals.technicians} technicians`
              : undefined
          }
          icon={<Users className="size-4 text-primary" />}
        />
        <StatCard
          title="Total Bookings"
          value={totalBookings.toLocaleString()}
          sub={`${activeBookings} active now`}
          icon={<CalendarCheck className="size-4 text-primary" />}
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(String(totals?.revenue ?? 0))}
          sub="From completed payments"
          icon={<CircleDollarSign className="size-4 text-amber-500" />}
        />
        <StatCard
          title="Total Services"
          value={(totals?.services ?? 0).toLocaleString()}
          sub={`${totals?.categories ?? 0} categories`}
          icon={<Wrench className="size-4 text-emerald-500" />}
        />
      </div>

      {/* ── Recent Activity ──────────────────────────────── */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Recent Bookings */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ListChecks className="size-4 text-primary" /> Recent Bookings
              </CardTitle>
              <Link href="/admin/bookings">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                  View All <ArrowRight className="size-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {stats?.recentBookings?.length ? (
                <div className="space-y-4">
                  {stats.recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0 space-y-1">
                        <p className="truncate text-sm font-medium">
                          {booking.service.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <UserRound className="size-3" />
                            {booking.customer.name}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <TrendingUp className="size-3" />
                            {booking.technician.name}
                          </span>
                          <span>{formatDate(booking.scheduleDate)}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <BookingStatusBadge status={booking.status} />
                        <span className="text-xs font-semibold text-primary">
                          {formatPrice(booking.service.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No bookings yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          {/* Recent Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="size-4 text-primary" /> New Users
              </CardTitle>
              <Link href="/admin/users">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                  View All <ArrowRight className="size-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {stats?.recentUsers?.length ? (
                <div className="space-y-3">
                  {stats.recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Badge
                          variant={
                            user.role === "ADMIN"
                              ? "admin"
                              : user.role === "TECHNICIAN"
                                ? "manager"
                                : "member"
                          }
                        >
                          {user.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No users yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
