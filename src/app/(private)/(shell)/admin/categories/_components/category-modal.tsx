"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/common/modal-wrapper";
import { FormInput } from "@/components/common/form-input";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../_actions/admin.actions";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import type { Category } from "@/interface/category";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryModal({
  actionType,
  defaultData,
}: {
  actionType: "create" | "edit";
  defaultData?: Category;
}) {
  const [open, setOpen] = useState(false);
  const isEdit = actionType === "edit";

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: defaultData?.name || "",
    },
  });

  async function onSubmit(data: CategoryFormData) {
    const result = isEdit
      ? await updateCategoryAction(defaultData!.id, data.name.trim())
      : await createCategoryAction(data.name.trim());

    if (result?.success) {
      SuccessToast(isEdit ? "Category updated" : "Category created");
      setOpen(false);
      reset();
    } else {
      ErrorToast(result?.message || "Failed to save category");
    }
  }

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          control={control}
          name="name"
          label="Category Name"
          placeholder="Enter category name"
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              reset();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            loadingText={isEdit ? "Updating..." : "Creating..."}
            disabled={!isValid}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
