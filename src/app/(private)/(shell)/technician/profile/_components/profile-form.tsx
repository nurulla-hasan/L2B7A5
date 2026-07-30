"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

export function ProfileForm({ user }: { user: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      skills: user.technicianProfile?.skills || "",
      experience: user.technicianProfile?.experience || "",
      pricing: user.technicianProfile?.pricing ? Number(user.technicianProfile.pricing) : 0,
    },
  });

  async function onSubmit(data: ProfileFormData) {
    setIsSubmitting(true);
    const result = await updateProfileAction(data);
    setIsSubmitting(false);

    if (result?.success) {
      SuccessToast("Profile updated successfully");
      reset(data);
    } else {
      ErrorToast(result?.message || "Failed to update profile");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput control={control} name="name" label="Name" placeholder="Your name" />
      <FormInput control={control} name="skills" label="Skills" placeholder="e.g. Plumbing, Pipe Repair" />
      <FormInput control={control} name="experience" label="Experience" placeholder="e.g. 5 years" />
      <FormInput control={control} name="pricing" label="Hourly Rate (৳)" placeholder="e.g. 60" type="number" />

      <div className="pt-2">
        <Button type="submit" loading={isSubmitting} loadingText="Saving...">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
