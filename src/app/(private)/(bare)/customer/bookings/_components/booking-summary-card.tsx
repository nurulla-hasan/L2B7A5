import { Wrench, Sparkles, User, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import type { Service } from "@/interface/service";

type BookingSummaryCardProps = {
  service: Service;
};

export function BookingSummaryCard({ service }: BookingSummaryCardProps) {
  return (
    <Card className="pt-0 overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-card via-card to-primary/5 shadow-md">
      <div className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wrench className="size-4" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Service Summary
            </h3>
          </div>
          <Badge variant="secondary">
            <Sparkles className="size-3" />
            {service.category?.name || "Service"}
          </Badge>
        </div>
      </div>

      <CardContent className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              {service.name}
            </h2>
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {service.description}
            </p>
          </div>
          <div className="flex flex-col items-end rounded-xl border border-primary/20 bg-primary/10 px-4 py-2 text-primary shadow-xs">
            <span className="text-xs font-medium text-muted-foreground">Price</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(service.price)}
            </span>
          </div>
        </div>

        <Separator className="bg-border/40" />

        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          {service.technician?.name && (
            <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/50 p-2.5">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <User className="size-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">Technician</span>
                <span className="font-medium text-foreground">{service.technician.name}</span>
              </div>
            </div>
          )}

          {service.location && (
            <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/50 p-2.5">
              <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <MapPin className="size-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">Location</span>
                <span className="font-medium text-foreground">{service.location}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
