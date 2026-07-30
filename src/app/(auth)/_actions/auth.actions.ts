"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { login, register } from "@/services/auth.service";
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

async function setRefreshTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", token, {
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

export async function loginAction(
  data: { email: string; password: string },
  callbackUrl?: string
): Promise<AuthResult> {
  const result = await login(data);

  if (!result.success) return result;

  await setAccessTokenCookie(result.data.accessToken);
  if (result.data.refreshToken) {
    await setRefreshTokenCookie(result.data.refreshToken);
  }

  updateTag(CACHE_TAGS.user);

  const payload = decodeJwtPayload(result.data.accessToken);
  
  if (callbackUrl && callbackUrl.startsWith("/")) {
    redirect(callbackUrl);
  } else {
    redirectByRole(payload?.role ?? "CUSTOMER");
  }
}

export async function registerAction(data: {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN";
}): Promise<AuthResult> {
  const result = await register(data);

  if (!result.success) return result;

  await setAccessTokenCookie(result.data.accessToken);
  if (result.data.refreshToken) {
    await setRefreshTokenCookie(result.data.refreshToken);
  }

  updateTag(CACHE_TAGS.user);

  redirectByRole(data.role);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  updateTag(CACHE_TAGS.user);
  redirect("/");
}
