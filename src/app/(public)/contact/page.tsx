'use client'
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactMethods = [
  { icon: Phone, label: "Phone", value: "+880 1700-000000" },
  { icon: Mail, label: "Email", value: "hello@fixitnow.com" },
  { icon: MapPin, label: "Address", value: "Dhaka, Bangladesh" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9 AM – 9 PM" },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <SectionWrapper padding="lg" className="text-center">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            badge="Contact Us"
            title="We'd love to hear from you"
            description="Have a question, feedback, or need help? Reach out to us."
          />
        </div>
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper bg="muted" padding="lg">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          {/* Form */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} placeholder="Tell us more..." />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <MessageSquare className="size-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info */}
          <Card className="shadow-sm self-start">
            <CardHeader>
              <CardTitle>Get in touch</CardTitle>
              <p className="text-sm text-muted-foreground">
                Our team typically responds within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactMethods.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{m.label}</p>
                        <p className="text-sm text-muted-foreground">{m.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </>
  );
}
