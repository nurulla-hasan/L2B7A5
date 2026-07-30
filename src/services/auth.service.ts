import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import type { User } from "@/interface/user";
import type { LoginPayload, RegisterPayload } from "@/interface/auth";
import { CACHE_TAGS, CACHE_TIME } from "@/lib/cache-tags";

export function login(payload: LoginPayload) {
  return nextServerFetch<{ accessToken: string; refreshToken: string }>("/api/auth/login", {
    method: "POST",
    body: payload,
    auth: "none",
  });
}

export function register(payload: RegisterPayload) {
  return nextServerFetch<{ accessToken: string; refreshToken: string; }>("/api/auth/register", {
    method: "POST",
    body: payload,
    auth: "none",
  });
}

export function getMe() {
  return nextServerFetch<User>("/api/auth/me", {
    next: { tags: [CACHE_TAGS.user], revalidate: CACHE_TIME.day },
  });
}

export function refreshToken() {
  return nextServerFetch<{ accessToken: string }>("/api/auth/refresh-token", {
    method: "POST",
  });
}
