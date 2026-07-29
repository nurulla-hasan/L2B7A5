import { BadgeCheck, Handshake, Shield, Timer } from "lucide-react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "Every technician is background-checked and vetted for quality and reliability.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guaranteed",
    description: "Not happy with the work? We'll make it right or your money back.",
  },
  {
    icon: Timer,
    title: "On-Time, Every Time",
    description: "Real-time tracking and punctual service — because your time matters.",
  },
  {
    icon: Handshake,
    title: "Transparent Pricing",
    description: "No hidden fees. Know the exact cost before you book.",
  },
];

export function WhyFixItNow() {
  return (
    <SectionWrapper padding="lg">
      <SectionHeading
        badge="Why FixItNow"
        title="Built with you in mind"
        description="We're redefining home service — making it reliable, transparent, and effortless."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => {
          const Icon = r.icon;
          return (
            <Card key={r.title} size="sm" className="text-center shadow-sm">
              <CardContent className="space-y-3">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
