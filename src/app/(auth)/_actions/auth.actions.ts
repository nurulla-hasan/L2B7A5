"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { nextServerFetch } from "@/lib/nextServerFetch";
import { decodeJwtPayload } from "@/lib/jwt";

type AuthResult =
  | { success: true }
  | { success: false; message?: string; errors?: Record<string, string[]> };

async function setAccessTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

function redirectByRole(role: string): never {
  if (role === "ADMIN") redirect("/admin/dashboard");
  if (role === "TECHNICIAN") redirect("/technician/dashboard");
  redirect("/"); // CUSTOMER
}

export async function loginAction(data: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const result = await nextServerFetch<{ accessToken: string }>(
    "/api/auth/login",
    { method: "POST", body: data, auth: "none" },
  );

  if (!result.success) return result;

  await setAccessTokenCookie(result.data.accessToken);

  const payload = decodeJwtPayload(result.data.accessToken);
  redirectByRole(payload?.role ?? "CUSTOMER");
}

export async function registerAction(data: {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN";
}): Promise<AuthResult> {
  const result = await nextServerFetch<{ accessToken: string }>(
    "/api/auth/register",
    { method: "POST", body: data, auth: "none" },
  );

  if (!result.success) return result;

  await setAccessTokenCookie(result.data.accessToken);
  redirectByRole(data.role);
}
