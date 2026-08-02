"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Search,
  Sparkles,
  Star,
  BadgeCheck,
} from "lucide-react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoToast } from "@/lib/utils";

const STATS = [
  { value: "1,000+", label: "Happy Homeowners" },
  { value: "100+", label: "Professional Services" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "24/7", label: "Booking Support" },
];

export function HeroSection({ categories }: { categories: string[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (term) {
      router.push(`/services?searchTerm=${encodeURIComponent(term)}`);
    } else {
      InfoToast("Please enter a service type");
    }
  };
  return (
    <SectionWrapper padding="lg" className="screen-height">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
        {/* Left: Content */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
          {/* Badge */}
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              Trusted by 1,000+ homeowners
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-current" />
                ))}
              </span>
              4.9 rating
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
            Your Home
            <br className="hidden sm:block" />
            <span className="text-primary"> Fix It Now</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Book trusted professionals for any home service — from plumbing to
            electrical, cleaning to painting.{" "}
            <span className="font-medium text-foreground">
              Quality work, guaranteed.
            </span>
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 flex max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:mx-0">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                type="text"
                size="lg"
                placeholder='Search "Plumber", "Electrician"...'
                className="pl-10 shadow-xs"
              />
            </div>
            <Button
              size="lg"
              className="shrink-0 gap-1.5 w-full sm:w-auto"
              onClick={handleSearch}
            >
              Search
              <ArrowRight className="size-4" />
            </Button>
          </div>

          {/* CTAs + Popular Tags */}
          <div className="mt-6 flex flex-col items-center gap-4 lg:items-start">
            <div className="flex flex-wrap items-center justify-center gap-x-1 text-sm lg:justify-start">
              <span className="mr-1.5 text-sm font-medium text-primary">
                Trending
              </span>
              {categories.slice(0, 5).map((item) => (
                <span key={item} className="contents">
                  <span className="text-muted-foreground/15">/</span>
                  <Button
                    variant="ghost"
                    nativeButton={false}
                    render={
                      <Link
                        href={`/services?type=${encodeURIComponent(item)}`}
                      />
                    }
                    className="px-1.5 py-1 text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
                  >
                    {item}
                  </Button>
                </span>
              ))}
            </div>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/services" />}
              className="gap-1.5"
            >
              <BadgeCheck className="size-4" />
              Browse All Services
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-9 grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 self-stretch">
          <div className="relative h-full min-h-64 w-full overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 shadow-lg">
            <Image
              src="/assets/hero-image.png"
              alt="Professional home service"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
