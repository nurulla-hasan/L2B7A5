import {
  CreditCard,
  HelpCircle,
  Search,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";

const faqs = [
  {
    icon: Search,
    question: "How do I find a technician?",
    answer:
      "Go to our Services page, select the category you need, and browse available professionals. You can filter by rating, location, and price to find the perfect match.",
  },
  {
    icon: UserRound,
    question: "How do I create an account?",
    answer:
      "Click the 'Get Started' button in the top-right corner, fill in your details, and verify your email. Once registered, you can book services instantly.",
  },
  {
    icon: CreditCard,
    question: "What payment methods do you accept?",
    answer:
      "We accept bKash, Nagad, credit/debit cards, and mobile banking. All payments are processed securely through our platform.",
  },
  {
    icon: ShieldCheck,
    question: "Are technicians verified?",
    answer:
      "Yes. Every technician on our platform undergoes a thorough background check and verification process. We ensure they have the required skills and credentials.",
  },
  {
    icon: XCircle,
    question: "Can I cancel a booking?",
    answer:
      "Yes, you can cancel a booking up to 24 hours before the scheduled time for a full refund. Cancellations within 24 hours may be subject to a small fee.",
  },
  {
    icon: HelpCircle,
    question: "How do I contact support?",
    answer:
      "You can reach us via the Contact page, email us at hello@fixitnow.com, or call +880 1700-000000. Our support team is available Mon–Sat, 9 AM – 9 PM.",
  },
];

export default function HelpPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper padding="lg" className="text-center">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            badge="Help Center"
            title="How can we help you?"
            description="Find answers to common questions below. If you need further assistance, feel free to contact us."
          />
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper bg="muted" padding="lg">
        <div className="mx-auto max-w-3xl space-y-6">
          {faqs.map((faq) => {
            const Icon = faq.icon;
            return (
              <details
                key={faq.question}
                className="group rounded-xl border bg-background shadow-sm transition-all open:shadow-md"
              >
                <summary className="flex cursor-pointer items-center gap-3 px-5 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                  <svg
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="border-t border-border/50 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
