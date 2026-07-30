"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Service } from "@/interface/service";
import { formatPrice, formatDate, SuccessToast } from "@/lib/utils";

import { ServiceModal } from "./service-modal";

import { useState } from "react";

import { Category } from "@/interface/category";
import { getCategoriesAction } from "../../_actions/technician.actions";

const ActionsCell = ({ service }: { service: Service }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const handleEditClick = async () => {
    setIsEditOpen(true);
    if (categories === null) {
      const res = await getCategoriesAction();
      if (res && res.success) {
        setCategories(res.data);
      } else {
        setCategories([]);
      }
    }
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-4">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(service.id);
                SuccessToast("Service ID copied to clipboard!");
              }}
            >
              Copy service ID
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              className="cursor-pointer w-full text-left" 
              onClick={handleEditClick}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Service
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Service
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ServiceModal
        categories={categories || []}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        actionType="edit"
        defaultData={service}
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
        <span className="text-xs text-muted-foreground truncate max-w-62" title={row.original.description}>
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
        <span className="text-muted-foreground text-sm">
          {formatDate(row.original.createdAt)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell service={row.original} />,
  },
];
