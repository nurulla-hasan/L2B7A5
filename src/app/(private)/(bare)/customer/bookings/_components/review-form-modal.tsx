"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/form-input";
import { ModalWrapper } from "@/components/common/modal-wrapper";
import { StarRating } from "@/components/common/star-rating";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { createReviewAction } from "../../_actions/booking.actions";
import {
  createReviewSchema,
  type CreateReviewFormData,
} from "@/validation/review.schema";

interface ReviewFormModalProps {
  bookingId: string;
  bookingServiceName?: string;
}

export function ReviewFormModal({
  bookingId,
  bookingServiceName,
}: ReviewFormModalProps) {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateReviewFormData>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  async function onSubmit(data: CreateReviewFormData) {
    const result = await createReviewAction({
      bookingId,
      rating: data.rating,
      comment: data.comment ?? "",
    });

    if (result && !result.success) {
      ErrorToast(result.message);
    } else {
      SuccessToast("Review submitted successfully");
      setOpen(false);
      reset();
    }
  }

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      actionTrigger={
        <Button variant="outline" size="sm">
          <MessageSquareText />
          Review
        </Button>
      }
      title={
        bookingServiceName ? `Review: ${bookingServiceName}` : "Leave a Review"
      }
      description="Share your experience with the service and technician."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Star Rating */}
        <Controller
          name="rating"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Rating</FieldLabel>
              <FieldContent>
                <StarRating
                  rating={field.value}
                  onRate={field.onChange}
                  totalStars={5}
                  size={20}
                  gap={4}
                />
                {field.value > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {field.value === 1 && "Poor"}
                    {field.value === 2 && "Fair"}
                    {field.value === 3 && "Good"}
                    {field.value === 4 && "Very Good"}
                    {field.value === 5 && "Excellent"}
                  </p>
                )}
              </FieldContent>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FormInput
          control={control}
          name="comment"
          label="Comment (optional)"
          placeholder="Tell us about your experience..."
          type="textarea"
        />

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              reset();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            loadingText="Submitting..."
          >
            Submit Review
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
