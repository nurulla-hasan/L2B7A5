"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModalWrapper } from "@/components/common/modal-wrapper";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../_actions/admin.actions";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import type { Category } from "@/interface/category";

export function CategoryModal({
  actionType,
  defaultData,
}: {
  actionType: "create" | "edit";
  defaultData?: Category;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(defaultData?.name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = actionType === "edit";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const result = isEdit
      ? await updateCategoryAction(defaultData!.id, name.trim())
      : await createCategoryAction(name.trim());
    setIsSubmitting(false);

    if (result?.success) {
      SuccessToast(isEdit ? "Category updated" : "Category created");
      setOpen(false);
      setName(isEdit ? defaultData?.name || "" : "");
    } else {
      ErrorToast(result?.message || "Failed to save category");
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={isEdit ? "Edit Category" : "Create Category"}
      description={
        isEdit ? `Update "${defaultData?.name}"` : "Add a new service category."
      }
      actionTrigger={
        isEdit ? (
          <Button variant="ghost">
            <Pencil />
          </Button>
        ) : (
          <Button>
            <Plus />
            Add Category
          </Button>
        )
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Category Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="mt-2"
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              setName(defaultData?.name || "");
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            loadingText={isEdit ? "Updating..." : "Creating..."}
            disabled={!name.trim()}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
