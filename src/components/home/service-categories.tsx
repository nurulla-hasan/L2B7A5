import { Bolt, Hammer, PaintBucket, Sparkles, Wrench, Zap } from "lucide-react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";

const categories = [
  { label: "Electrical", icon: Zap, count: "45 technicians" },
  { label: "Plumbing", icon: Wrench, count: "62 technicians" },
  { label: "Cleaning", icon: Sparkles, count: "38 technicians" },
  { label: "Painting", icon: PaintBucket, count: "27 technicians" },
  { label: "Carpentry", icon: Hammer, count: "19 technicians" },
  { label: "AC Repair", icon: Bolt, count: "31 technicians" },
];

export function ServiceCategories() {
  return (
    <SectionWrapper bg="muted" padding="lg">
      <SectionHeading
        badge="Categories"
        title="What are you looking for?"
        description="Browse our wide range of professional home services"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.label}
              className="group flex items-center gap-4 rounded-xl border bg-background p-5 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="font-medium">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.count}</p>
              </div>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
