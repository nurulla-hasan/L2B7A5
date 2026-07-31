import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.number().int().min(1, "Please select a rating").max(5),
  comment: z.string().optional(),
});

export type CreateReviewFormData = z.infer<typeof createReviewSchema>;
