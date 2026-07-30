"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
import { CategoryModal } from "./category-modal";
import { deleteCategoryAction } from "../../_actions/admin.actions";
import { SuccessToast, ErrorToast, formatDate } from "@/lib/utils";
import type { Category } from "@/interface/category";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center justify-end gap-1">
          <div onClick={(e) => e.stopPropagation()}>
            <CategoryModal actionType="edit" defaultData={category} />
          </div>
          <ConfirmationModal
            triggerText=""
            triggerIcon={<Trash2 className="size-4" />}
            triggerVariant="ghost"
            triggerSize="icon"
            title="Delete Category"
            description={`Delete "${category.name}"? This action cannot be undone.`}
            confirmText="Delete"
            variant="destructive"
            onConfirm={async () => {
              const result = await deleteCategoryAction(category.id);
              if (result?.success) {
                SuccessToast("Category deleted");
              } else {
                ErrorToast(result?.message || "Failed to delete category");
              }
            }}
          />
        </div>
      );
    },
  },
];
