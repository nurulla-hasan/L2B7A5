"use client";

import { useState } from "react";
import { Plus, X, Clock, Save, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModalWrapper } from "@/components/common/modal-wrapper";
import { updateAvailabilityAction } from "../../_actions/technician.actions";
import { DAY_LABELS, SuccessToast, ErrorToast } from "@/lib/utils";
import type { User } from "@/interface/user";

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function AvailabilityEditModal({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState<Record<string, string[]>>(
    () => {
      const initial: Record<string, string[]> = {};
      for (const day of DAY_ORDER) {
        initial[day] = user.technicianProfile?.availability?.[day] || [];
      }
      return initial;
    },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasSlots = DAY_ORDER.some((day) => availability[day]?.length > 0);

  const addSlot = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: [...prev[day], "09:00-10:00"],
    }));
  };

  const removeSlot = (day: string, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const updateSlot = (day: string, index: number, value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((slot, i) => (i === index ? value : slot)),
    }));
  };

  async function handleSave() {
    setIsSubmitting(true);
    const result = await updateAvailabilityAction(availability);
    setIsSubmitting(false);

    if (result?.success) {
      SuccessToast("Availability updated successfully");
      setOpen(false);
    } else {
      ErrorToast(result?.message || "Failed to update availability");
    }
  }

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Edit Availability"
      description="Set your weekly working hours."
      actionTrigger={
        <Button size="sm" variant="outline" className="gap-1.5">
          <Pencil className="size-3.5" /> Edit
        </Button>
      }
      showClose={false}
    >
      <div className="space-y-4 pt-2">
        <div className="space-y-3">
          {DAY_ORDER.map((day) => (
            <div
              key={day}
              className="rounded-lg border border-border/40 bg-muted/20 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground/70 capitalize">
                  {DAY_LABELS[day] || day}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => addSlot(day)}
                  className="h-7 gap-1 text-xs"
                >
                  <Plus className="size-3" />
                  Add Slot
                </Button>
              </div>

              {availability[day]?.length > 0 ? (
                <div className="space-y-2">
                  {availability[day].map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                      <Input
                        value={slot}
                        onChange={(e) => updateSlot(day, index, e.target.value)}
                        className="h-8 flex-1 text-xs"
                        placeholder="09:00-10:00"
                      />
                      <button
                        type="button"
                        onClick={() => removeSlot(day, index)}
                        className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No slots added</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            loading={isSubmitting}
            loadingText="Saving..."
            disabled={!hasSlots}
          >
            <Save className="size-4" />
            Save Availability
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
