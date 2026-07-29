"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { isValidElement, type ReactNode } from "react";

interface ModalWrapperProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  actionTrigger?: ReactNode;
  showClose?: boolean;
}

export function ModalWrapper({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  title,
  description,
  children,
  actionTrigger,
  showClose = false,
}: ModalWrapperProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const onOpenChange = controlledOnOpenChange ?? setInternalOpen;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {isValidElement(actionTrigger) && (
        <DialogTrigger render={actionTrigger} />
      )}

      <DialogContent className="p-0 gap-0 shadow-md shadow-primary overflow-hidden">
        {/* Header Section */}
        {(title || description) && (
          <DialogHeader className="px-6 py-4 border-b shrink-0 text-left gap-0">
            {title && (
              <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {/* Content Body */}
        <div className="p-6 flex-1 max-h-[70dvh] md:max-h-[80dvh] overflow-auto">
          {children}
        </div>

        {showClose && (
          <div className="p-4 border-t bg-muted flex justify-end shrink-0">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Close
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
