import { SectionHeading } from "@/components/common/section-heading";
import { getMyServices } from "@/services/service.service";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { serviceColumns } from "./_components/service-column";

export default async function TechnicianServicesPage() {
  const result = await getMyServices();
  const services = result?.success ? result.data : [];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="My Services"
        description="Manage and view all the services you offer."
        alignment="left"
        as="h2"
      >
        <Link href="/technician/services/create">
          <Button>
            <Plus />
            Add New Service
          </Button>
        </Link>
      </SectionHeading>

      <div className="mt-4">
        <DataTable
          columns={serviceColumns}
          data={services}
        />
      </div>
    </div>
  );
}
