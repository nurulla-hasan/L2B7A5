import { Suspense } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { ServiceCategories } from "@/components/home/service-categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedTechnicians } from "@/components/home/featured-technicians";
import { WhyFixItNow } from "@/components/home/why-fix-it-now";
import { StatsSection } from "@/components/home/stats-section";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";
import { getAllCategories } from "@/services/category.service";

export default async function HomePage() {
  const categoriesRes = await getAllCategories();
  if(!categoriesRes.success) throw new Error(categoriesRes.message);
  const categoryNames = categoriesRes.success
    ? categoriesRes.data.map((cat) => cat.name)
    : [];

  return (
    <>
      <Suspense>
        <HeroSection categories={categoryNames} />
      </Suspense>
      <ServiceCategories />
      <HowItWorks />
      <FeaturedTechnicians />
      <WhyFixItNow />
      <StatsSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
