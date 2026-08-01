"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Service } from "@/interface/service";
import { formatPrice, formatDate, SuccessToast, ErrorToast } from "@/lib/utils";

import { ServiceModal } from "./service-modal";
import { ConfirmationModal } from "@/components/common/confirmation-modal";

import type { Category } from "@/interface/category";
import { deleteServiceAction } from "../../_actions/technician.actions";

const ActionsCell = ({
  service,
  categories,
}: {
  service: Service;
  categories?: Category[];
}) => {
  return (
    <div className="flex justify-end items-center gap-1.5">
      <Button
        variant="outline"
        size="icon"
        title="Copy Service ID"
        onClick={() => {
          navigator.clipboard.writeText(service.id);
          SuccessToast("Service ID copied to clipboard!");
        }}
      >
        <Copy />
      </Button>
      <ServiceModal
        actionType="edit"
        defaultData={service}
        categories={categories}
      />
      <ConfirmationModal
        trigger={
          <Button variant="outline" size="icon" title="Delete Service">
            <Trash2 />
          </Button>
        }
        title="Delete Service"
        description={`Are you sure you want to delete "${service.name}"? This action cannot be undone.`}
        confirmText="Delete"
        loadingText="Deleting..."
        variant="destructive"
        onConfirm={async () => {
          const result = await deleteServiceAction(service.id);
          if (result.success) {
            SuccessToast("Service deleted successfully");
          } else {
            ErrorToast(result.message || "Failed to delete service");
          }
        }}
      />
    </div>
  );
};

export const serviceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Service Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-foreground">{row.original.name}</span>
        <span
          className="text-xs text-muted-foreground truncate max-w-62"
          title={row.original.description}
        >
          {row.original.description}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => {
      // In case category is not populated, fall back to location or just text
      return (
        <span className="text-muted-foreground">
          {row.original.category?.name || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">
          {row.getValue("location") || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div className="font-semibold text-primary">
          {formatPrice(String(row.getValue("price")))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground text">
          {formatDate(row.original.createdAt)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row, table }) => {
      const tableMeta = table.options.meta as
        | { categories?: Category[] }
        | undefined;
      return (
        <ActionsCell
          service={row.original}
          categories={tableMeta?.categories}
        />
      );
    },
  },
];
