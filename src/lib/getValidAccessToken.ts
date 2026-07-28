import "server-only";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { ApiError } from "./nextServerFetch";

type TokenPayload = {
  exp?: number;
};

type RefreshResponse = {
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

const isTokenFresh = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<TokenPayload>(token);

    return typeof exp === "number" && exp * 1000 > Date.now() + 30_000;
  } catch {
    return false;
  }
};

export const getValidAccessToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken && isTokenFresh(accessToken)) {
    return accessToken;
  }

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new ApiError("Authentication session has expired", 401, null);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
  }

  const response = await fetch(
    `${baseUrl.replace(/\/+$/, "")}/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
      cache: "no-store",
    },
  );

  const result = (await response
    .json()
    .catch(() => null)) as RefreshResponse | null;

  const newAccessToken = result?.data?.accessToken;

  if (!response.ok || !newAccessToken) {
    throw new ApiError(
      result?.message || "Unable to refresh authentication",
      response.status || 401,
      result,
    );
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  cookieStore.set("accessToken", newAccessToken, cookieOptions);

  const newRefreshToken = result?.data?.refreshToken;

  if (newRefreshToken) {
    cookieStore.set("refreshToken", newRefreshToken, cookieOptions);
  }

  return newAccessToken;
};
