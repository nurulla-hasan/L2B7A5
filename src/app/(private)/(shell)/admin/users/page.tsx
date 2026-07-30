import { getAllUsers } from "@/services/admin.service";
import { SectionHeading } from "@/components/common/section-heading";
import { DataTable } from "@/components/common/data-table";
import { userColumns } from "./_components/user-columns";

export default async function AdminUsersPage() {
  const result = await getAllUsers();
  const users = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Manage Users"
        description="View and manage platform users."
        alignment="left"
        as="h3"
      />

      <DataTable
        columns={userColumns}
        data={users}
      />
    </div>
  );
}
