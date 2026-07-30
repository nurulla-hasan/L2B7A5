import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
