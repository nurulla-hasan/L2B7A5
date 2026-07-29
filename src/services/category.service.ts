import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import type { Category } from "@/interface";

export function getAllCategories() {
  return nextServerFetch<Category[]>("/api/categories", { auth: "none" });
}
