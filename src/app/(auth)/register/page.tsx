"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import { ErrorToast } from "@/lib/utils";

import {
  registerSchema,
  type RegisterFormData,
} from "@/validation/auth.schema";
import { registerAction } from "@/app/(auth)/_actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

export default function RegisterPage() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: RegisterFormData) {
    const result = await registerAction(data);
    // Server action redirects on success — only errors reach here
    if (!result.success) {
      ErrorToast(result.message ?? "Registration failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join as a customer or technician
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Role Selection */}
        <Controller
          name="role"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>I want to join as</FieldLabel>
              <FieldContent>
                <div className="flex gap-3">
                  <Label
                    htmlFor="role-customer"
                    data-slot="field-label"
                    className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium ${field.value === "CUSTOMER" ? "border-primary/30 bg-primary/5" : "border-border"}`}
                  >
                    <input
                      type="radio"
                      id="role-customer"
                      value="CUSTOMER"
                      checked={field.value === "CUSTOMER"}
                      onChange={() => field.onChange("CUSTOMER")}
                      className="sr-only"
                    />
                    <span className="text-lg">🙋</span>
                    Customer
                  </Label>
                  <Label
                    htmlFor="role-technician"
                    data-slot="field-label"
                    className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium ${field.value === "TECHNICIAN" ? "border-primary/30 bg-primary/5" : "border-border"}`}
                  >
                    <input
                      type="radio"
                      id="role-technician"
                      value="TECHNICIAN"
                      checked={field.value === "TECHNICIAN"}
                      onChange={() => field.onChange("TECHNICIAN")}
                      className="sr-only"
                    />
                    <span className="text-lg">🔧</span>
                    Technician
                  </Label>
                </div>
              </FieldContent>
            </Field>
          )}
        />

        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <FieldContent>
                <PasswordInput
                  {...field}
                  id={field.name}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <FieldContent>
                <PasswordInput
                  {...field}
                  id={field.name}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting}
          loadingText="Creating account..."
        >
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
