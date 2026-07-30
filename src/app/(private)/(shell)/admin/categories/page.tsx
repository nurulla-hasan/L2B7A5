import { getAdminCategories } from "@/services/admin.service";
import { SectionHeading } from "@/components/common/section-heading";
import { DataTable } from "@/components/common/data-table";
import { CategoryModal } from "./_components/category-modal";
import { categoryColumns } from "./_components/category-columns";

export default async function AdminCategoriesPage() {
  const result = await getAdminCategories();
  const categories = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Manage Categories"
        description="Create and manage service categories."
        alignment="left"
        as="h3"
        constrain={false}
      >
        <CategoryModal actionType="create" />
      </SectionHeading>

      <DataTable
        columns={categoryColumns}
        data={categories}
      />
    </div>
  );
}
