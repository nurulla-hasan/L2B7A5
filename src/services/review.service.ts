import "server-only";
import { nextServerFetch } from "@/lib/nextServerFetch";
import type { Review } from "@/interface/review";

export function createReview(data: {
  bookingId: string;
  rating: number;
  comment: string;
}) {
  return nextServerFetch<Review>("/api/reviews", {
    method: "POST",
    body: data,
  });
}
