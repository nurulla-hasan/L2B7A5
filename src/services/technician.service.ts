import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import type { User, Booking, TechnicianProfile } from "@/interface";

export function getAllTechnicians() {
  return nextServerFetch<User[]>("/api/technicians", { auth: "none" });
}

export function getSingleTechnician(id: string) {
  return nextServerFetch<User>(`/api/technicians/${id}`, { auth: "none" });
}

export function getTechnicianBookings() {
  return nextServerFetch<Booking[]>("/api/technician/bookings");
}

export function updateTechnicianProfile(data: {
  skills: string;
  experience: string;
  pricing: number;
}) {
  return nextServerFetch<TechnicianProfile>("/api/technician/profile", {
    method: "PUT",
    body: data,
  });
}

export function updateTechnicianAvailability(availability: Record<string, string[]>) {
  return nextServerFetch<TechnicianProfile>("/api/technician/availability", {
    method: "PUT",
    body: availability,
  });
}

export function updateBookingStatus(id: string, status: string) {
  return nextServerFetch<Booking>(`/api/technician/bookings/${id}`, {
    method: "PATCH",
    body: { status },
  });
}
