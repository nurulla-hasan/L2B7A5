import { Lock, Shield, Eye, Database, Cookie, Mail } from "lucide-react";
import Link from "next/link";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";

const sections = [
  {
    icon: Shield,
    title: "Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, phone number, and service address when you create an account or book a service. We also automatically collect certain technical information like IP address, browser type, and device information when you use our platform.",
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content:
      "Your information is used to provide and improve our services, process transactions, send service-related communications, and personalize your experience. We may also use your data to detect and prevent fraud or misuse of our platform.",
  },
  {
    icon: Database,
    title: "Data Storage & Security",
    content:
      "We implement industry-standard security measures to protect your personal data. Your information is stored on secure servers with encryption at rest and in transit. We regularly review our security practices to maintain the highest level of protection.",
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    content:
      "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings at any time.",
  },
  {
    icon: Lock,
    title: "Your Rights",
    content:
      "You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us. We will respond to your request within 30 days.",
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: (
      <>
        If you have any questions about this Privacy Policy, please reach out to
        us at{" "}
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

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper padding="lg" className="text-center">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            badge="Privacy Policy"
            title="Your privacy matters to us"
            description="We are committed to protecting your personal data and being transparent about how we handle your information."
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
