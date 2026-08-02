"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  autoComplete,
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <FieldContent>
            {type === "password" ? (
              <PasswordInput
                {...field}
                id={field.name}
                placeholder={placeholder}
                autoComplete={autoComplete}
              />
            ) : type === "textarea" ? (
              <Textarea {...field} id={field.name} placeholder={placeholder} />
            ) : (
              <Input
                {...field}
                id={field.name}
                type={type || "text"}
                placeholder={placeholder}
                autoComplete={autoComplete}
              />
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  );
}
