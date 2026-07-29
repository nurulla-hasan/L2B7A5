import { SectionWrapper } from "@/components/common/section-wrapper";

const stats = [
  { value: "500+", label: "Verified Technicians" },
  { value: "1,000+", label: "Jobs Completed" },
  { value: "4.8★", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
];

export function StatsSection() {
  return (
    <SectionWrapper bg="primary" padding="lg">
      <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-primary sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
