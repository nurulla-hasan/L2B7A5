import { ClipboardCheck, Search, ShieldCheck, Smartphone, UserCheck, Wallet } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";

const steps = [
  {
    icon: Search,
    title: "Browse & Compare",
    description: "Search for the service you need and browse through profiles of available professionals. Read reviews, compare ratings, and check pricing.",
  },
  {
    icon: UserCheck,
    title: "Choose Your Pro",
    description: "Pick the professional that best fits your needs. View their experience, past work, and availability before making a decision.",
  },
  {
    icon: Smartphone,
    title: "Book Instantly",
    description: "Select a convenient time slot and confirm your booking in seconds. No phone calls, no back-and-forth.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "Know the exact cost upfront — no surprises. Pay securely through our platform only when the job is done.",
  },
  {
    icon: ShieldCheck,
    title: "Service Delivered",
    description: "Your professional arrives on time and completes the job. We follow up to ensure you're 100% satisfied.",
  },
  {
    icon: ClipboardCheck,
    title: "Share Feedback",
    description: "Rate your experience and help other homeowners make informed decisions. Your feedback keeps quality high.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper padding="lg" className="text-center">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            badge="How It Works"
            title="Get your home fixed in 3 simple steps"
            description="From finding the right professional to getting the job done — we make it effortless."
          />
        </div>
      </SectionWrapper>

      {/* Steps */}
      <SectionWrapper bg="muted" padding="lg">
        <div className="mx-auto max-w-4xl space-y-10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
