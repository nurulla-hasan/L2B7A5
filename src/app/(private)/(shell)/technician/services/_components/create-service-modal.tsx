"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";

import { ModalWrapper } from "@/components/common/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { createServiceAction, updateServiceAction } from "../../_actions/technician.actions";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import type { Category } from "@/interface/category";
import type { Service } from "@/interface/service";

const createServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  categoryId: z.string().min(1, "Category is required"),
});

type CreateServiceFormData = z.infer<typeof createServiceSchema>;

interface CreateServiceModalProps {
  categories?: Category[];
  actionType?: "create" | "edit";
  defaultData?: Service;
  actionTrigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateServiceModal({ 
  categories: initialCategories = [],
  actionType = "create",
  defaultData,
  actionTrigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange
}: CreateServiceModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;
  
  const [isPending, startTransition] = useTransition();
  const categories = initialCategories;

  const isEdit = actionType === "edit";

  const form = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: defaultData?.name || "",
      description: defaultData?.description || "",
      price: defaultData?.price ? Number(defaultData.price) : 0,
      location: defaultData?.location || "",
      categoryId: defaultData?.categoryId || "",
    },
  });

  function onSubmit(data: CreateServiceFormData) {
    startTransition(async () => {
      let result;
      if (isEdit && defaultData?.id) {
        result = await updateServiceAction(defaultData.id, data);
      } else {
        result = await createServiceAction(data);
      }
      
      if (result && !result.success) {
        ErrorToast(result.message || `Failed to ${isEdit ? "update" : "create"} service`);
      } else {
        SuccessToast(`Service ${isEdit ? "updated" : "created"} successfully`);
        handleOpenChange(false);
      }
    });
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      if (isEdit) {
        form.reset({
          name: defaultData?.name || "",
          description: defaultData?.description || "",
          price: defaultData?.price ? Number(defaultData.price) : 0,
          location: defaultData?.location || "",
          categoryId: defaultData?.categoryId || "",
        });
      } else {
        form.reset({ name: "", description: "", price: 0, location: "", categoryId: "" });
      }
    }
  }

  const defaultTrigger = (
    <Button>
      <Plus className="mr-2 size-4" />
      Add New Service
    </Button>
  );

  return (
    <ModalWrapper
      open={open}
      onOpenChange={handleOpenChange}
      title={isEdit ? "Edit Service" : "Add New Service"}
      description={isEdit ? "Make changes to your service here. Click save when you're done." : "Enter the details of your new service here. Click save when you're done."}
      actionTrigger={controlledOpen !== undefined ? undefined : (actionTrigger || defaultTrigger)}
      showClose={false}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Service Name</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="e.g. Fan Installation & Repair"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <FieldContent>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Describe the service you are offering..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Price (৳)</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  placeholder="e.g. 800"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          name="location"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Location</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="e.g. Dhaka"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Category</FieldLabel>
              <FieldContent>
                <Select
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <SelectTrigger id={field.name} className="w-full">
                    <SelectValue placeholder="Select a category">
                      {field.value ? categories.find((c) => c.id === field.value)?.name : undefined}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isPending} loadingText={isEdit ? "Updating..." : "Creating..."}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
