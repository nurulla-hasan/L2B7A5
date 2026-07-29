import { FileText, Scale, Ban, AlertCircle, Info, Mail } from "lucide-react";
import Link from "next/link";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";

const sections = [
  {
    icon: FileText,
    title: "Services Overview",
    content:
      "FixItNow is an online platform that connects homeowners with professional service providers. We facilitate bookings but are not directly responsible for the quality of work performed by technicians. Each service professional is an independent contractor.",
  },
  {
    icon: Scale,
    title: "User Responsibilities",
    content:
      "As a user, you agree to provide accurate information, treat service professionals with respect, and pay for services rendered. You must not misuse the platform, engage in fraudulent activity, or violate any applicable laws.",
  },
  {
    icon: Ban,
    title: "Prohibited Activities",
    content:
      "You may not use the platform for any unlawful purpose, harass or intimidate technicians, manipulate reviews or ratings, attempt to circumvent our payment system, or book services outside the platform to avoid service fees.",
  },
  {
    icon: AlertCircle,
    title: "Limitation of Liability",
    content:
      "FixItNow shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the amount you paid for the specific service giving rise to the claim.",
  },
  {
    icon: Info,
    title: "Cancellation & Refunds",
    content:
      "You may cancel a booking up to 24 hours before the scheduled time for a full refund. Cancellations within 24 hours may incur a fee. If a technician fails to show, you are entitled to a full refund.",
  },
  {
    icon: Mail,
    title: "Contact Information",
    content: (
      <>
        For any questions regarding these terms, please contact us at{" "}
        <Link
          href="mailto:hello@fixitnow.com"
          className="text-primary underline hover:no-underline"
        >
          hello@fixitnow.com
        </Link>{" "}
        or visit our{" "}
        <Link
          href="/contact"
          className="text-primary underline hover:no-underline"
        >
          Contact Page
        </Link>
        .
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper padding="lg" className="text-center">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            badge="Terms of Service"
            title="Our terms & conditions"
            description="By using FixItNow, you agree to the following terms. Please read them carefully before using our platform."
          />
        </div>
      </SectionWrapper>

      {/* Content */}
      <SectionWrapper bg="muted" padding="lg">
        <div className="mx-auto max-w-3xl space-y-10">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Last updated: July 2026
          </p>
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
