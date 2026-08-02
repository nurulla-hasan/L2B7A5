"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast } from "@/lib/utils";

import { loginSchema, type LoginFormData } from "@/validation/auth.schema";
import { loginAction } from "@/app/(auth)/_actions/auth.actions";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/form-input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { handleSubmit, control, formState: { isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  async function onSubmit(data: LoginFormData) {
    const result = await loginAction(data, callbackUrl ?? undefined);
    if (!result.success) {
      ErrorToast(result.message ?? "Login failed");
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
          />

          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting}
            loadingText="Signing in..."
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
