import { ArrowRight, Hammer, UserRound } from "lucide-react";
import Link from "next/link";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CTASection() {
  return (
    <SectionWrapper padding="lg">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer CTA */}
        <Card className="shadow-sm text-center md:text-left">
          <CardContent className="space-y-4 p-8">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary md:mx-0">
              <UserRound className="size-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Need a Service?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse top-rated professionals in your area and get your work done today.
              </p>
            </div>
            <Link href="/services">
              <Button className="gap-2">
                Browse Services
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Technician CTA */}
        <Card className="shadow-sm text-center md:text-left bg-primary/5 ring-primary/20">
          <CardContent className="space-y-4 p-8">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary md:mx-0">
              <Hammer className="size-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Join as a Technician</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Grow your business with thousands of homeowners looking for trusted professionals.
              </p>
            </div>
            <Link href="/register">
              <Button variant="outline" className="gap-2">
                Apply Now
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
