"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit } from "lucide-react";

import { ModalWrapper } from "@/components/common/modal-wrapper";
import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
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

import { createServiceSchema, type CreateServiceFormData } from "@/validation/service.schema";

interface ServiceModalProps {
  actionType?: "create" | "edit";
  defaultData?: Service;
  categories?: Category[];
  children?: React.ReactNode;
}

export function ServiceModal({ 
  actionType = "create",
  defaultData,
  categories = [],
}: ServiceModalProps) {
  const [open, setOpen] = useState(false);
  
  const isEdit = actionType === "edit";

  const { control, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: defaultData?.name || "",
      description: defaultData?.description || "",
      price: defaultData?.price ? Number(defaultData.price) : 0,
      location: defaultData?.location || "",
      categoryId: defaultData?.categoryId || "",
    },
  });

  async function onSubmit(data: CreateServiceFormData) {
    const result = isEdit && defaultData?.id
      ? await updateServiceAction(defaultData.id, data)
      : await createServiceAction(data);

    if (result && !result.success) {
      ErrorToast(result.message || `Failed to ${isEdit ? "update" : "create"} service`);
    } else {
      SuccessToast(`Service ${isEdit ? "updated" : "created"} successfully`);
      setOpen(false);
      reset();
    }
  }

  const trigger = isEdit ? (
    <Button variant="outline" size="icon" title="Edit Service">
      <Edit />
    </Button>
  ) : (
    <Button>
      <Plus />
      Add New Service
    </Button>
  );

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={isEdit ? "Edit Service" : "Add New Service"}
      description={isEdit ? "Make changes to your service here. Click save when you're done." : "Enter the details of your new service here. Click save when you're done."}
      actionTrigger={trigger}
      showClose={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <FormInput control={control} name="name" label="Service Name" placeholder="e.g. Fan Installation & Repair" />
        <FormInput control={control} name="description" label="Description" placeholder="Describe the service you are offering..." type="textarea" />
        <FormInput control={control} name="price" label="Price (৳)" placeholder="e.g. 800" type="number" />
        <FormInput control={control} name="location" label="Location" placeholder="e.g. Dhaka" />

        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Category</FieldLabel>
              <FieldContent>
                <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                  <SelectTrigger id={field.name} className="w-full">
                    <SelectValue placeholder="Select a category">
                      {field.value ? categories.find((c) => c.id === field.value)?.name : undefined}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => { setOpen(false); reset(); }} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} loadingText={isEdit ? "Updating..." : "Creating..."} disabled={!isDirty && isEdit}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
