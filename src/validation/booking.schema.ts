import { z } from "zod";

export const createBookingSchema = z.object({
  technicianId: z.string().min(1, "Technician is required"),
  serviceId: z.string().min(1, "Service is required"),
  scheduleDate: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
});

export type CreateBookingFormData = z.infer<typeof createBookingSchema>;
