"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { isValidElement, useState, type ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface ConfirmationModalProps {
  title?: string;
  description?: string;
  confirmText?: string;
  loadingText?: string;
  cancelText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  trigger?: ReactNode;
  actionTrigger?: ReactNode;
  triggerText?: string;
  triggerIcon?: ReactNode;
  triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  children?: ReactNode;
}

export function ConfirmationModal({
  title = "Are you sure?",
  description = "Are you sure you want to continue? This action cannot be undone.",
  confirmText = "Confirm",
  loadingText = "Loading...",
  cancelText = "Cancel",
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  trigger,
  actionTrigger,
  triggerText,
  triggerIcon = <Trash2 />,
  triggerVariant = "outline",
  triggerSize = "icon",
  variant = "default",
  children,
}: ConfirmationModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const showLoading = isControlled ? isLoading : internalLoading;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;
  const finalTrigger = actionTrigger || trigger;

  const handleConfirm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isControlled) setInternalLoading(true);
    try {
      await onConfirm();
    } finally {
      if (!isControlled) {
        setInternalLoading(false);
        setInternalOpen(false);
      }
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      {" "}
      {finalTrigger !== null && (
        <AlertDialogTrigger
          render={
            isValidElement(finalTrigger) ? (
              finalTrigger
            ) : (
              <Button variant={triggerVariant} size={triggerSize}>
                {triggerIcon}
                {triggerText}
              </Button>
            )
          }
        />
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={showLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            variant={variant}
            disabled={showLoading}
          >
            {showLoading ? (
              <>
                <Spinner />
                {loadingText}
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
