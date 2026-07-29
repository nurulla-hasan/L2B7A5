import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

const testimonials = [
  {
    name: "Shahin Alam",
    location: "Mirpur, Dhaka",
    rating: 5,
    text: "The plumber arrived within 30 minutes and fixed the leak perfectly. Very professional service!",
  },
  {
    name: "Nusrat Jahan",
    location: "Gulshan, Dhaka",
    rating: 5,
    text: "I needed an emergency electrician late at night and FixItNow saved the day. Highly recommended!",
  },
  {
    name: "Hasan Mahmud",
    location: "Uttara, Dhaka",
    rating: 4,
    text: "Great cleaning service. The team was thorough and respectful. Booking was super easy online.",
  },
];

export function Testimonials() {
  return (
    <SectionWrapper bg="muted" padding="lg">
      <SectionHeading
        badge="Testimonials"
        title="What our customers say"
        description="Real stories from real people"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card
            key={t.name}
            size="sm"
            className="shadow-sm"
          >
            <CardContent className="space-y-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < t.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/20",
                    )}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t pt-4">
                <Avatar>
                  <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
