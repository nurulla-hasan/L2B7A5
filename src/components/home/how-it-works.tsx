import { ClipboardList, Search, ShieldCheck } from "lucide-react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Browse & Choose",
    description: "Find the right professional for your needs — browse by category, read reviews, and compare pricing.",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Book Instantly",
    description: "Pick a time that works for you and book in seconds. No phone calls, no hassle.",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Get It Done",
    description: "Your pro arrives on time, does the job, and you only pay when you're 100% satisfied.",
  },
];

export function HowItWorks() {
  return (
    <SectionWrapper padding="lg">
      <SectionHeading
        badge="How It Works"
        title="Three simple steps"
        description="Getting your home service has never been easier"
      />

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.step} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 hidden h-px w-[80%] border-t border-dashed border-muted-foreground/20 md:block" />
              )}
              <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-7" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">{s.step}</p>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
