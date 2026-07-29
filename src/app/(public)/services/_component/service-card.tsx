"use client";

import Link from "next/link";
import { MapPin, Wrench } from "lucide-react";

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

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

type ServiceCardProps = {
  service: Service;
  categoryName?: string;
};

export function ServiceCard({ service, categoryName }: ServiceCardProps) {
  return (
    <Card
      size="sm"
      className="flex flex-col shadow-sm transition-all hover:shadow-md"
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{service.name}</CardTitle>
          <span className="shrink-0 text-lg font-bold text-primary">
            {formatPrice(service.price)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {service.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {categoryName && (
            <Badge variant="secondary" className="gap-1">
              <Wrench className="size-3" />
              {categoryName}
            </Badge>
          )}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" />
            {service.location}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/services/${service.id}`} className="w-full">
          <Button className="w-full" size="sm">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
