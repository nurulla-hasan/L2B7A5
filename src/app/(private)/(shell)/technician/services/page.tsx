import { SectionHeading } from "@/components/common/section-heading";
import { getMyServices } from "@/services/service.service";
import { getAllCategories } from "@/services/category.service";

import { serviceColumns } from "./_components/service-column";

import { CreateServiceModal } from "./_components/create-service-modal";
import { DataTable } from "@/components/common/data-table";

export default async function TechnicianServicesPage() {
  const result = await getMyServices();
  const services = result?.success ? result.data : [];
  const categoriesRes = await getAllCategories();
  const categories = categoriesRes?.success ? categoriesRes.data : [];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="My Services"
        description="Manage and view all the services you offer."
        alignment="left"
        as="h2"
      >
        <CreateServiceModal categories={categories} />
      </SectionHeading>

      <div className="mt-4">
        <DataTable columns={serviceColumns} data={services} />
      </div>
    </div>
  );
}
