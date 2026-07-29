import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import { CACHE_TAGS, CACHE_TIME } from "@/lib/cache-tags";
import type { Service, ServiceWithRelations } from "@/interface/service";

export function getAllServices() {
  return nextServerFetch<Service[]>("/api/services", {
    auth: "none",
    next: { tags: [CACHE_TAGS.services], revalidate: CACHE_TIME.fiveMinutes },
  });
}

export function getSingleService(id: string) {
  return nextServerFetch<ServiceWithRelations>(`/api/services/${id}`, {
    auth: "none",
    next: {
      tags: [CACHE_TAGS.service(id), CACHE_TAGS.services],
      revalidate: CACHE_TIME.fiveMinutes,
    },
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
