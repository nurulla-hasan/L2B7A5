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
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/common/form-input";
import {
  Field,
  FieldLabel,
  FieldContent,
} from "@/components/ui/field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function RegisterPage() {
  const {handleSubmit, control, formState: { isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    const result = await registerAction(data);
    // Server action redirects on success — only errors reach here
    if (!result.success) {
      ErrorToast(result.message ?? "Registration failed");
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Join as a customer or technician
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Role Selection */}
          <Controller
            name="role"
            control={control}
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
          <FormInput
            control={control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            autoComplete="name"
          />

          {/* Email */}
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
          />

          {/* Password */}
          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            autoComplete="new-password"
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
      </CardContent>
    </Card>
  );
}
