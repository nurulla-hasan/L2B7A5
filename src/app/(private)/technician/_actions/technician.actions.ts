"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
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
  skills: string;
  experience: string;
  pricing: number;
}) {
  const result = await updateTechnicianProfile(data);
  if (!result.success) return { success: false, message: result.message };

  updateTag(CACHE_TAGS.technicians);
  redirect("/technician/profile");
}

export async function updateAvailabilityAction(
  availability: Record<string, string[]>,
) {
  const result = await updateTechnicianAvailability(availability);
  if (!result.success) return { success: false, message: result.message };

  redirect("/technician/availability");
}

export async function updateBookingStatusAction(id: string, status: string) {
  const result = await updateBookingStatus(id, status);
  if (!result.success) return { success: false, message: result.message };

  redirect("/technician/bookings");
}

export async function createServiceAction(data: {
  name: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
}) {
  const result = await createService(data);
  if (!result.success) return { success: false, message: result.message };

  updateTag(CACHE_TAGS.services);
  redirect("/technician/services");
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
  if (!result.success) return { success: false, message: result.message };

  updateTag(CACHE_TAGS.services);
  updateTag(CACHE_TAGS.service(id));
  redirect("/technician/services");
}

export async function deleteServiceAction(id: string) {
  const result = await deleteService(id);
  if (!result.success) return { success: false, message: result.message };

  updateTag(CACHE_TAGS.services);
  redirect("/technician/services");
}
