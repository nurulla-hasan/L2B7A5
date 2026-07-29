import { MapPin, Star } from "lucide-react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { SectionHeading } from "../common/section-heading";

const technicians = [
  { name: "Md. Rahim", role: "Plumber", rating: 4.9, jobs: 340, location: "Dhaka", price: "800 ৳/visit" },
  { name: "Kamal Hossain", role: "Electrician", rating: 4.8, jobs: 280, location: "Dhaka", price: "1,000 ৳/visit" },
  { name: "Fatima Begum", role: "Cleaner", rating: 4.9, jobs: 195, location: "Dhaka", price: "600 ৳/hour" },
  { name: "Abdul Karim", role: "Painter", rating: 4.7, jobs: 220, location: "Dhaka", price: "1,200 ৳/visit" },
];

export function FeaturedTechnicians() {
  return (
    <SectionWrapper bg="muted" padding="lg">
      <SectionHeading
        badge="Top Technicians"
        title="Our featured pros"
        description="Highly rated and trusted by homeowners like you"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {technicians.map((t) => (
          <div
            key={t.name}
            className="group rounded-xl border bg-background p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Star className="size-3.5 fill-amber-500 text-amber-500" />
                <span className="font-medium text-foreground">{t.rating}</span>
                <span>({t.jobs} jobs)</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-3.5" />
                {t.location}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-sm font-semibold">{t.price}</span>
              <Button size="sm">Book Now</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline">View All Technicians</Button>
      </div>
    </SectionWrapper>
  );
}
