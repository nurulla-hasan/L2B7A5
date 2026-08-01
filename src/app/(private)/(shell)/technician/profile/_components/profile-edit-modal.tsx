"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/common/modal-wrapper";
import { FormInput } from "@/components/common/form-input";
import { updateProfileAction } from "../../_actions/technician.actions";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import type { User } from "@/interface/user";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  skills: z.string().min(1, "Skills is required"),
  experience: z.string().min(1, "Experience is required"),
  pricing: z.coerce.number().min(1, "Pricing must be greater than 0"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileEditModal({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const profile = user.technicianProfile;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      skills: profile?.skills || "",
      experience: profile?.experience || "",
      pricing: profile?.pricing ? Number(profile.pricing) : 0,
    },
  });

  async function onSubmit(data: ProfileFormData) {
    const result = await updateProfileAction(data);

    if (result && !result.success) {
      ErrorToast(result.message || "Failed to update profile");
    } else {
      SuccessToast("Profile updated successfully");
      setOpen(false);
      reset(data);
    }
  }

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Edit Personal Information"
      description="Update your professional profile details."
      actionTrigger={
        <Button size="sm" variant="outline" className="gap-1.5">
          <Pencil className="size-3.5" /> Edit
        </Button>
      }
      showClose={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <FormInput
          control={control}
          name="name"
          label="Name"
          placeholder="Your name"
        />
        <FormInput
          control={control}
          name="skills"
          label="Skills"
          placeholder="e.g. Plumbing, Pipe Repair"
        />
        <FormInput
          control={control}
          name="experience"
          label="Experience"
          placeholder="e.g. 5 years"
        />
        <FormInput
          control={control}
          name="pricing"
          label="Hourly Rate (৳)"
          placeholder="e.g. 60"
          type="number"
        />

        <div className="flex justify-end gap-2 pt-4">
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
            disabled={!isDirty}
            loadingText="Saving..."
          >
            Save Changes
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
