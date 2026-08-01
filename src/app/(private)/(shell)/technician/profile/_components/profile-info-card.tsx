"use client";

import {
  UserRound,
  Mail,
  Wrench,
  Clock,
  BadgeDollarSign,
  ShieldCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProfileEditModal } from "./profile-edit-modal";
import {
  getInitials,
  formatDate,
  formatPrice,
} from "@/lib/utils";
import type { User } from "@/interface/user";

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-sm font-medium text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function ProfileInfoCard({ user }: { user: User }) {
  const profile = user.technicianProfile;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/40">
        <CardTitle className="flex items-center gap-2 text-lg">
          <UserRound className="size-4 text-primary" /> Personal Information
        </CardTitle>

        <ProfileEditModal user={user} />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          <Avatar size="lg" className="size-14">
            <AvatarFallback className="text-lg font-bold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 space-y-1">
            <p className="truncate text-lg font-semibold text-foreground">
              {user.name}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Technician</Badge>
              <Badge
                variant={
                  user.activeStatus === "BLOCKED" ? "destructive" : "default"
                }
              >
                {user.activeStatus === "BLOCKED" ? "Blocked" : "Active"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Detail rows */}
        <DetailRow icon={Mail} label="Email Address" value={user.email} />
        <DetailRow
          icon={Wrench}
          label="Skills"
          value={profile?.skills || "—"}
        />
        <DetailRow
          icon={Clock}
          label="Experience"
          value={profile?.experience || "—"}
        />
        <DetailRow
          icon={BadgeDollarSign}
          label="Hourly Rate"
          value={
            profile?.pricing ? formatPrice(profile.pricing) : "Not set yet"
          }
        />
        <DetailRow
          icon={ShieldCheck}
          label="Member Since"
          value={formatDate(user.createdAt)}
        />
      </CardContent>
    </Card>
  );
}
