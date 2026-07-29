import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import type { Service, ServiceWithRelations } from "@/interface";

export function getAllServices() {
  return nextServerFetch<Service[]>("/api/services", { auth: "none" });
}

export function getSingleService(id: string) {
  return nextServerFetch<ServiceWithRelations>(`/api/services/${id}`, {
    auth: "none",
  });
}

export function createService(data: {
  name: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
}) {
  return nextServerFetch<Service>("/api/services", {
    method: "POST",
    body: data,
  });
}

export function updateService(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    categoryId: string;
  }>,
) {
  return nextServerFetch<Service>(`/api/services/${id}`, {
    method: "PUT",
    body: data,
  });
}

export function deleteService(id: string) {
  return nextServerFetch<void>(`/api/services/${id}`, {
    method: "DELETE",
  });
}
