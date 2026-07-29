"use server";

import { redirect } from "next/navigation";
import {
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  updateUserStatus,
} from "@/services/admin.service";

export async function createCategoryAction(name: string) {
  const result = await createAdminCategory(name);

  if (!result.success) return { success: false, message: result.message };

  redirect("/admin/categories");
}

export async function updateCategoryAction(id: string, name: string) {
  const result = await updateAdminCategory(id, name);

  if (!result.success) return { success: false, message: result.message };

  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: string) {
  const result = await deleteAdminCategory(id);

  if (!result.success) return { success: false, message: result.message };

  redirect("/admin/categories");
}

export async function updateUserStatusAction(
  id: string,
  activeStatus: "ACTIVE" | "BLOCKED",
) {
  const result = await updateUserStatus(id, activeStatus);

  if (!result.success) return { success: false, message: result.message };

  redirect("/admin/users");
}
