import Link from "next/link";

const categories = [
  { name: "Cleaning", icon: "🧹", count: "12 Services" },
  { name: "Electrical", icon: "⚡", count: "8 Services" },
  { name: "Plumbing", icon: "🔧", count: "15 Services" },
  { name: "Painting", icon: "🎨", count: "6 Services" },
  { name: "Carpentry", icon: "🪚", count: "9 Services" },
  { name: "Gardening", icon: "🌿", count: "7 Services" },
];

const steps = [
  { step: "01", title: "Browse Services", desc: "Explore services offered by trusted professionals near you." },
  { step: "02", title: "Book a Slot", desc: "Choose a convenient date and time for your service." },
  { step: "03", title: "Get It Done", desc: "Relax while our expert handles the job professionally." },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ──────── Hero ──────── */}
      <section className="from-background via-background to-muted/30 bg-linear-to-b">
        <div className="container mx-auto flex flex-col items-center px-4 pt-24 pb-16 text-center md:pt-32 md:pb-20">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Professional Home Services{" "}
            <span className="text-primary">at Your Doorstep</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Find trusted technicians for cleaning, electrical, plumbing, and more.
            Book in seconds, relax while we handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse Services
            </Link>
            <Link
              href="/register"
              className="rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              Become a Technician
            </Link>
          </div>
        </div>
      </section>

      {/* ──────── How It Works ──────── */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="rounded-xl border bg-background p-6 text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {s.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── Categories ──────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Service Categories</h2>
            <Link href="/services" className="text-sm font-medium text-primary hover:underline">
              View All &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/services?category=${cat.name.toLowerCase()}`}
                className="rounded-xl border bg-background p-5 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="mt-3 font-semibold">{cat.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA ──────── */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of satisfied customers. Book your first service today.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* ──────── Footer ──────── */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Service Platform. All rights reserved.
      </footer>
    </div>
  );
}
