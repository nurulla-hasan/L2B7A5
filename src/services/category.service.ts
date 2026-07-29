import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import { CACHE_TAGS, CACHE_TIME } from "@/lib/cache-tags";
import type { Category } from "@/interface/category";

export function getAllCategories() {
  return nextServerFetch<Category[]>("/api/categories", {
    auth: "none",
    next: { tags: [CACHE_TAGS.categories], revalidate: CACHE_TIME.hour },
  });
}
