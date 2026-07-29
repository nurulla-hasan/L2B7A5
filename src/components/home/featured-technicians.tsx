import { Star, Wrench } from "lucide-react";
import Link from "next/link";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials, formatPrice } from "@/lib/utils";
import { SectionHeading } from "../common/section-heading";
import { getAllTechnicians } from "@/services/technician.service";

export async function FeaturedTechnicians() {
  const res = await getAllTechnicians();
  const technicians = res.success ? res.data.slice(0, 4) : [];

  if (technicians.length === 0) return null;

  return (
    <SectionWrapper bg="muted" padding="lg">
      <SectionHeading
        badge="Top Technicians"
        title="Our featured pros"
        description="Highly rated and trusted by homeowners like you"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {technicians.map((t) => {
          const profile = t.technicianProfile;
          const firstSkill = profile?.skills?.split(", ").filter(Boolean)[0];
          const serviceCount = t.services?.length ?? 0;

          return (
            <Card
              key={t.id}
              size="sm"
              className="shadow-sm transition-all hover:shadow-md"
            >
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {firstSkill || "Technician"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Wrench className="size-3.5 text-primary" />
                    <span className="font-medium text-foreground">
                      {serviceCount}
                    </span>
                    <span>service{serviceCount !== 1 && "s"}</span>
                  </div>
                  {profile?.experience && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Star className="size-3.5 text-amber-500" />
                      {profile.experience}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm font-semibold">
                    {profile?.pricing ? formatPrice(profile.pricing) : "—"}
                  </span>
                  <Link href={`/technicians/${t.id}`}>
                    <Button size="sm">View Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link href="/technicians">
          <Button variant="outline">View All Technicians</Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
