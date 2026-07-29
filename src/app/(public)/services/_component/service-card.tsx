"use client";

import Link from "next/link";
import { MapPin, Wrench, ArrowRight, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Service } from "@/interface/service";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const formattedPrice = !isNaN(Number(service.price))
    ? `৳${Number(service.price).toLocaleString("en-BD")}`
    : `৳${service.price}`;

  return (
    <Card className="pt-0 group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {/* ── Top Gradient Visual Header ───────────────────────── */}
      <div className="relative flex items-center justify-between border-b border-border/40 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-4 pb-3.5">
        <Badge
          variant="secondary"
          className="bg-primary/20"
        >
          <Wrench className="size-3 text-primary" />
          {service.category?.name || "Service"}
        </Badge>

        <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-sm font-bold text-primary shadow-xs backdrop-blur-xs">
          {formattedPrice}
        </div>
      </div>

      {/* ── Card Header & Content ────────────────────────────── */}
      <CardHeader className="space-y-1.5 p-4 pb-2">
        <CardTitle className="text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
          {service.name}
        </CardTitle>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 p-4 pt-0">
        {/* ── Meta info (Technician & Location) ───────────── */}
        <div className="flex flex-col gap-2 border-t border-border/40 pt-3 text-xs text-muted-foreground">
          {service.technician?.name && (
            <div className="flex items-center gap-1.5 font-medium text-foreground/90">
              <User className="size-3.5 text-primary" />
              <span>{service.technician.name}</span>
            </div>
          )}

          {service.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-muted-foreground" />
              <span>{service.location}</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* ── Card Action Footer ───────────────────────────────── */}
      <CardFooter>
        <Link href={`/services/${service.id}`} className="w-full">
          <Button
            size="sm"
            className="w-full gap-2 rounded-lg font-medium shadow-xs transition-all duration-200 group-hover:bg-primary group-hover:shadow-md"
          >
            <span>Book Now</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
