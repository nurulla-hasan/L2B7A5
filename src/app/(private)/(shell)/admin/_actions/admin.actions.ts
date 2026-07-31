"use server";

import { updateTag } from "next/cache";
import {
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  updateUserStatus,
} from "@/services/admin.service";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { getValidAccessToken } from "@/lib/getValidAccessToken";

export async function createCategoryAction(name: string) {
  const auth = await getValidAccessToken();
  if (!auth.ok) return { success: false as const, message: auth.message };

  const result = await createAdminCategory(name);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.categories);
  return { success: true as const, data: result.data };
}

export async function updateCategoryAction(id: string, name: string) {
  const auth = await getValidAccessToken();
  if (!auth.ok) return { success: false as const, message: auth.message };

  const result = await updateAdminCategory(id, name);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.categories);
  return { success: true as const };
}

export async function deleteCategoryAction(id: string) {
  const auth = await getValidAccessToken();
  if (!auth.ok) return { success: false as const, message: auth.message };

  const result = await deleteAdminCategory(id);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.categories);
  return { success: true as const };
}

export async function updateUserStatusAction(
  id: string,
  activeStatus: "ACTIVE" | "BLOCKED",
) {
  const auth = await getValidAccessToken();
  if (!auth.ok) return { success: false as const, message: auth.message };

  const result = await updateUserStatus(id, activeStatus);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.user);
  return { success: true as const };
}
