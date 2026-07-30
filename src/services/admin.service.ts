import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { User } from "@/interface/user";
import type { Booking } from "@/interface/booking";
import type { Category } from "@/interface/category";

export function getAllUsers() {
  return nextServerFetch<User[]>("/api/admin/users", {
    next: { tags: [CACHE_TAGS.user] },
  });
}

export function updateUserStatus(
  id: string,
  activeStatus: "ACTIVE" | "BLOCKED",
) {
  return nextServerFetch<User>(`/api/admin/users/${id}`, {
    method: "PATCH",
    body: { activeStatus },
  });
}

export function getAllBookings() {
  return nextServerFetch<Booking[]>("/api/admin/bookings");
}

export function getAdminCategories() {
  return nextServerFetch<Category[]>("/api/admin/categories", {
    next: { tags: [CACHE_TAGS.categories] },
  });
}

export function createAdminCategory(name: string) {
  return nextServerFetch<Category>("/api/admin/categories", {
    method: "POST",
    body: { name },
  });
}

export function updateAdminCategory(id: string, name: string) {
  return nextServerFetch<Category>(`/api/admin/categories/${id}`, {
    method: "PATCH",
    body: { name },
  });
}

export function deleteAdminCategory(id: string) {
  return nextServerFetch<void>(`/api/admin/categories/${id}`, {
    method: "DELETE",
  });
}
