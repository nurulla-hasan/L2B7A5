import { getAllServices } from "@/services/service.service";
import { getAllCategories } from "@/services/category.service";
import { ServiceCard } from "./_component/service-card";
import { ServiceFilter } from "./_component/service-filter";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { SlidersHorizontal, Sparkles, ShieldCheck, SearchX } from "lucide-react";
import type { TSearchParams } from "@/interface/global";
import type { Category } from "@/interface/category";
import type { Service } from "@/interface/service";
import { PageWrapper } from "@/components/common/page-wrapper";
import { Badge } from "@/components/ui/badge";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  const params = await searchParams;

  // ------- Fetch filtered data from API -------
  const [servicesRes, categoriesRes] = await Promise.allSettled([
    getAllServices(params),
    getAllCategories(),
  ]);

  if (servicesRes.status === "rejected") {
    throw servicesRes.reason;
  }
  if (!servicesRes.value.success) {
    throw new Error(servicesRes.value.message);
  }

  if (categoriesRes.status === "rejected") {
    throw categoriesRes.reason;
  }
  if (!categoriesRes.value.success) {
    throw new Error(categoriesRes.value.message);
  }

  const services: Service[] = servicesRes.value.data;
  const categories: Category[] = categoriesRes.value.data;

  return (
    <PageWrapper paddingSize="small">
      {/* ------- Breadcrumb Navigation ------- */}
      <CustomBreadcrumb
        links={[
          { href: "/", name: "Home" },
          { href: "/services", name: "Services", isCurrent: true },
        ]}
      />

      {/* ------- Hero Banner Header ------- */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 mt-2 mb-8 shadow-xs">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur-xs">
            <Sparkles className="size-3.5 text-primary" />
            <span>Trusted & Verified Local Experts</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Find the Right Service for Your Home
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Browse background-checked professionals near you, compare upfront prices, and book instant services with 100% satisfaction guarantee.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-500" />
              Verified Professionals
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-amber-500" />
              Transparent Upfront Pricing
            </span>
          </div>
        </div>
      </div>

      {/* ------- Main Layout (Filter + Grid) ------- */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* ------- Filter Sidebar (Client Component) ------- */}
        <div className="w-full shrink-0 md:w-64 lg:w-72">
          <ServiceFilter categories={categories} />
        </div>

        {/* ------- Services Content Grid ------- */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* Results Bar */}
          <div className="flex items-center justify-between rounded-lg border border-border/40 bg-card/60 px-4 py-3 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {services.length}
                </span>{" "}
                service{services.length !== 1 && "s"} available
              </p>
            </div>

            <Badge variant="outline" className="hidden sm:inline-flex gap-1 text-xs font-normal">
              <SlidersHorizontal className="size-3 text-muted-foreground" />
              Filtered Results
            </Badge>
          </div>

          {/* Grid View */}
          {services.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service: Service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/40 p-8 text-center backdrop-blur-xs">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground shadow-xs">
                <SearchX className="size-8" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No Services Match Your Search
              </h3>
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                We couldn&apos;t find any services matching your active filters. Try broadening your location or clearing price limits.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
