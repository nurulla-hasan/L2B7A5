import { HeroSection } from "@/components/home/hero-section";
import { ServiceCategories } from "@/components/home/service-categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedTechnicians } from "@/components/home/featured-technicians";
import { WhyFixItNow } from "@/components/home/why-fix-it-now";
import { StatsSection } from "@/components/home/stats-section";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
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
