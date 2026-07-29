import { BadgeCheck, Heart, Lightbulb, Target } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every decision we make starts with what's best for our customers.",
  },
  {
    icon: BadgeCheck,
    title: "Trust & Transparency",
    description:
      "No hidden fees. Every technician is verified and background-checked.",
  },
  {
    icon: Target,
    title: "Quality Guaranteed",
    description: "Not satisfied? We'll make it right or your money back.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Using technology to make booking home services effortless.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper padding="lg" className="text-center">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            badge="About Us"
            title="Making home service simple"
            description="FixItNow connects homeowners with trusted professionals — making quality home service accessible to everyone."
          />
        </div>
      </SectionWrapper>

      {/* Story */}
      <SectionWrapper bg="muted" padding="lg">
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              FixItNow was born from a simple observation — finding a reliable
              plumber, electrician, or cleaner in Dhaka was unnecessarily
              difficult. We built a platform that makes it as easy as ordering
              food.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Today, we serve thousands of homeowners across Dhaka with a
              network of highly vetted professionals.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To make quality home service reliable, transparent, and effortless
              for every homeowner. We believe everyone deserves a home that
              works perfectly.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper padding="lg">
        <SectionHeading title="What we stand for" alignment="center" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-xl border bg-background p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
