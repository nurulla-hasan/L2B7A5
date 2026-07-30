import { Mail, CalendarClock, ShieldCheck, UserRound, Sparkles } from "lucide-react";

import { getMe } from "@/services/auth.service";
import { getInitials, formatDate } from "@/lib/utils";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function CustomerProfilePage() {
  const result = await getMe();

  if (!result.success) {
    return (
      <PageWrapper paddingSize="small">
        <CustomBreadcrumb
          links={[
            { href: "/", name: "Home" },
            { href: "/customer/profile", name: "My Profile", isCurrent: true },
          ]}
        />
        <Card className="mt-8 p-12 text-center">
          <p className="text-muted-foreground">Failed to load profile information.</p>
        </Card>
      </PageWrapper>
    );
  }

  const user = result.data;

  return (
    <PageWrapper paddingSize="small">
      {/* ── Breadcrumb ── */}
      <CustomBreadcrumb
        links={[
          { href: "/", name: "Home" },
          { href: "/customer/profile", name: "My Profile", isCurrent: true },
        ]}
      />

      {/* ── Hero Banner ─── */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 mt-2 mb-8 shadow-xs">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Profile
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            View your account information and activity details.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-success" />
              Secure Account
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-warning" />
              Verified Profile
            </span>
          </div>
        </div>
      </div>

      {/* ── Profile Content ─── */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* ── Left: Avatar + Basic Info ─── */}
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center pt-8 text-center">
            <Avatar size="lg" className="mb-4 size-20">
              <AvatarFallback className="text-2xl font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold text-foreground">
              {user.name}
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">Customer</Badge>
              <Badge
                variant={
                  user.activeStatus === "BLOCKED" ? "destructive" : "default"
                }
              >
                {user.activeStatus === "BLOCKED" ? "Blocked" : "Active"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* ── Right: Details ─── */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="size-4" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Email Address
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="shrink-0">
                Verified
              </Badge>
            </div>

            <Separator />

            {/* Role */}
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Account Type
                  </p>
                  <p className="text-sm font-medium text-foreground">Customer</p>
                </div>
              </div>
              <Badge variant="secondary">Customer</Badge>
            </div>

            <Separator />

            {/* Member Since */}
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CalendarClock className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Member Since
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="shrink-0">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
