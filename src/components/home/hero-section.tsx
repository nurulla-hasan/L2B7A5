"use client";
import Image from "next/image";
import { ArrowRight, Search, Sparkles } from "lucide-react";

import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNextFilter } from "@/hooks/useNextFilter";

export function HeroSection() {
  const {updateFilter} = useNextFilter();
  return (
    <SectionWrapper padding="xl">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        {/* Left: Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Trusted by 1,000+ homeowners
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
            Your Home
            <br />
            <span className="text-primary">Fix It Now</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Book trusted professionals for any home service — from plumbing to
            electrical, cleaning to painting.{" "}
            <span className="font-medium text-foreground">
              Quality work, guaranteed.
            </span>
          </p>

          {/* Search */}
          <div className="mx-auto mt-9 flex max-w-xl items-center gap-2 lg:mx-0">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                onChange={(e) => updateFilter("searchTerm", e.target.value)}
                type="text"
                size="xl"
                placeholder='Search "Plumber", "Electrician"...'
                className="pl-10 shadow-xs"
              />
            </div>
            <Button size="xl" className="shrink-0 gap-1.5">
              Search
              <ArrowRight className="size-4" />
            </Button>
          </div>

          {/* Popular Tags */}
          <div className="mt-7 flex flex-wrap items-center gap-x-1 text-sm lg:justify-start">
            <span className="mr-1.5 text-sm font-medium text-primary">
              Trending
            </span>
            {["Plumbing", "Electrical", "Cleaning", "Painting"].map((item) => (
              <span key={item} className="contents">
                <span className="text-muted-foreground/15">/</span>
                <Button
                  variant="ghost"
                  className="px-1.5 py-1 text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {item}
                </Button>
              </span>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 shadow-lg">
            <Image
              src="/assets/hero-image.png"
              alt="Professional home service"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
