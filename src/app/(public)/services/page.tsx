import { getAllServices } from "@/services/service.service";
import { getAllCategories } from "@/services/category.service";
import { ServiceCard } from "./_component/service-card";
import { ServiceFilter } from "./_component/service-filter";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { SectionHeading } from "@/components/common/section-heading";
import { SlidersHorizontal } from "lucide-react";
import type { TSearchParams } from "@/interface/global";
import type { Category } from "@/interface/category";
import { Service } from "@/interface/service";
import { PageWrapper } from "@/components/common/page-wrapper";

type Props = {
  searchParams: TSearchParams;
};

export default async function ServicesPage({ searchParams }: Props) {
  const params = await searchParams;

  // ── Fetch filtered data from API ────────────────────────
  const [servicesRes, categoriesRes] = await Promise.allSettled([
    getAllServices(params),
    getAllCategories(),
  ]);

  const services: Service[] =
    servicesRes.status === "fulfilled" && servicesRes.value.success
      ? servicesRes.value.data
      : [];

  const categories: Category[] =
    categoriesRes.status === "fulfilled" && categoriesRes.value.success
      ? categoriesRes.value.data
      : [];

  // ── Category name lookup ────────────────────────────────
  const categoryMap = new Map<string, string>();
  categories.forEach((c) => categoryMap.set(c.id, c.name));

  return (
    <>
      <PageWrapper paddingSize="small">
        <CustomBreadcrumb
          links={[
            { href: "/", name: "Home" },
            { href: "/services", name: "Services", isCurrent: true },
          ]}
        />
        <SectionHeading
          title="Find the Right Service for Your Home"
          as="h2"
          alignment="left"
          description="Browse trusted professionals near you and book with confidence."
        />
        <div className="flex flex-col gap-6 md:flex-row md:gap-8 mt-6">
          {/* ── Filter sidebar (client component) ──────────── */}
          <div className="w-full shrink-0 md:w-64 lg:w-72">
            <ServiceFilter categories={categories} />
          </div>

          {/* ── Services grid (server-rendered) ────────────── */}
          <div className="min-w-0 flex-1 space-y-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {services.length}
              </span>{" "}
              service{services.length !== 1 && "s"} found
            </p>

            {services.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service: Service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    categoryName={categoryMap.get(service.categoryId)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted/50">
                  <SlidersHorizontal className="size-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-semibold">No services found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
