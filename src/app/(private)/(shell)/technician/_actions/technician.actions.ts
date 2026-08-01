"use server";

import { updateTag, refresh } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import {
  updateTechnicianProfile,
  updateTechnicianAvailability,
  updateBookingStatus,
} from "@/services/technician.service";
import {
  createService,
  updateService,
  deleteService,
} from "@/services/service.service";

export async function updateProfileAction(data: {
  name: string;
  skills: string;
  experience: string;
  pricing: number;
}) {
  const result = await updateTechnicianProfile(data);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.technicians);
  updateTag(CACHE_TAGS.user);
  return { success: true as const };
}

export async function updateAvailabilityAction(
  availability: Record<string, string[]>,
) {
  const result = await updateTechnicianAvailability(availability);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.user);
  return { success: true as const };
}

export async function updateBookingStatusAction(id: string, status: string) {
  const result = await updateBookingStatus(id, status);
  if (!result.success) return { success: false as const, message: result.message };

  refresh();
  return { success: true as const };
}

export async function createServiceAction(data: {
  name: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
}) {
  const result = await createService(data);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.services);
  return { success: true as const };
}

export async function updateServiceAction(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    categoryId: string;
  }>,
) {
  const result = await updateService(id, data);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.services);
  updateTag(CACHE_TAGS.service(id));
  return { success: true as const };
}

export async function deleteServiceAction(id: string) {
  const result = await deleteService(id);
  if (!result.success) return { success: false as const, message: result.message };

  updateTag(CACHE_TAGS.services);
  return { success: true as const };
}
