"use client";

import { useState, useTransition } from "react";
import { MessageSquareText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ModalWrapper } from "@/components/common/modal-wrapper";
import { StarRating } from "@/components/common/star-rating";
import { ErrorToast } from "@/lib/utils";
import { createReviewAction } from "../../_actions/booking.actions";

interface ReviewFormModalProps {
  bookingId: string;
  bookingServiceName?: string;
}

export function ReviewFormModal({
  bookingId,
  bookingServiceName,
}: ReviewFormModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function handleSubmit() {
    if (rating === 0) return;

    startTransition(async () => {
      const result = await createReviewAction({ bookingId, rating, comment });
      if (result && !result.success) {
        ErrorToast(result.message);
      }
    });
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      setRating(0);
      setComment("");
    }
  }

  return (
    <ModalWrapper
      open={open}
      onOpenChange={handleOpenChange}
      actionTrigger={
        <Button variant="outline" size="sm">
          <MessageSquareText />
          Review
        </Button>
      }
      title={
        bookingServiceName
          ? `Review: ${bookingServiceName}`
          : "Leave a Review"
      }
      description="Share your experience with the service and technician."
    >
      <div className="space-y-6">
        {/* Star Rating */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Rating</p>
          <StarRating
            rating={rating}
            onRate={setRating}
            totalStars={5}
            size={20}
            gap={4}
          />
          {rating > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          )}
          {rating === 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              Please select a rating
            </p>
          )}
        </div>

        {/* Comment */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            Comment <span className="text-muted-foreground">(optional)</span>
          </p>
          <Textarea
            placeholder="Tell us about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            loading={isPending}
            loadingText="Submitting..."
          >
            Submit Review
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
