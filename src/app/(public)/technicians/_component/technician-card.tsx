"use client";

import Link from "next/link";
import { Wrench, Clock, ArrowRight, Star, Briefcase } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TechnicianWithProfile } from "@/interface/user";
import { formatPrice } from "@/lib/utils";

type TechnicianCardProps = {
  technician: TechnicianWithProfile;
};

export function TechnicianCard({ technician }: TechnicianCardProps) {
  const profile = technician.technicianProfile;
  const skills = profile?.skills?.split(", ").filter(Boolean) ?? [];
  const serviceCount = technician.services?.length ?? 0;

  return (
    <Card className="pt-0 group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {/* ── Top Gradient Visual Header ───────────────────────── */}
      <div className="relative flex items-center justify-between border-b border-border/40 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-4 pb-3.5">
        <Badge variant="secondary" className="bg-primary/20">
          <Briefcase className="size-3 text-primary" />
          {profile?.experience || "Professional"}
        </Badge>

        {profile?.pricing && (
          <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-sm font-bold text-primary shadow-xs backdrop-blur-xs">
            {formatPrice(profile.pricing)}
            <span className="text-xs font-normal text-muted-foreground">/hr</span>
          </div>
        )}
      </div>

      {/* ── Card Header ───────────────────────────────────── */}
      <CardHeader className="space-y-1 p-4 pb-2">
        <CardTitle className="text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
          {technician.name}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{technician.email}</p>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 p-4 pt-0">
        {/* ── Skills ─────────────────────────────────────────── */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                <Wrench className="size-2.5" />
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* ── Meta Info ──────────────────────────────────────── */}
        <div className="flex flex-col gap-2 border-t border-border/40 pt-3 text-xs text-muted-foreground">
          {serviceCount > 0 && (
            <div className="flex items-center gap-1.5 font-medium text-foreground/80">
              <Star className="size-3.5 text-primary" />
              <span>{serviceCount} service{serviceCount !== 1 && "s"} offered</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-muted-foreground" />
            <span>Available {profile?.availability ? "this week" : "—"}</span>
          </div>
        </div>
      </CardContent>

      {/* ── Card Action Footer ──────────────────────────────── */}
      <CardFooter>
        <Link href={`/technicians/${technician.id}`} className="w-full">
          <Button
            size="sm"
            className="w-full gap-2 rounded-lg font-medium shadow-xs transition-all duration-200 group-hover:bg-primary group-hover:shadow-md"
          >
            <span>View Profile</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
