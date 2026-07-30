import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarCheck, 
  CircleDollarSign, 
  Star, 
  Wrench,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TechnicianDashboardPage() {
  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ───────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 shadow-xs">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back, Technician! 👋
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-2xl">
            Here&apos;s what&apos;s happening with your services today. You have <span className="font-semibold text-foreground">2 pending bookings</span> that require your attention.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link href="/technician/bookings">
              <Button size="sm">View Bookings</Button>
            </Link>
            <Link href="/technician/services">
              <Button size="sm" variant="outline">Manage Services</Button>
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
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground mt-1">
              +14% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Wrench className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
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
            <div className="text-2xl font-bold">$3,240</div>
            <p className="text-xs text-muted-foreground mt-1">
              +$430 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="size-4 text-yellow-400 fill-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on 86 reviews
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
          <CardContent className="pt-5">
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 flex-col items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <span className="text-xs font-semibold leading-none">OCT</span>
                      <span className="text-sm font-bold leading-none">{12 + i}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Home Deep Cleaning</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        <span>10:00 AM - 12:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                    Upcoming
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
            <CardTitle className="text-lg">Recent Reviews</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
              View All <ArrowRight className="size-3" />
            </Button>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-5">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        U{i}
                      </div>
                      <span className="text-sm font-medium">User {i}</span>
                    </div>
                    <div className="flex text-yellow-400">
                      <Star className="size-3 fill-current" />
                      <Star className="size-3 fill-current" />
                      <Star className="size-3 fill-current" />
                      <Star className="size-3 fill-current" />
                      <Star className="size-3 fill-current" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    &quot;Excellent service! Arrived on time and did a fantastic job. Highly recommended.&quot;
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
