"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
  label?: string;
  variant?: "link" | "outline" | "ghost" | "default" | "destructive" | "secondary";
}

export default function BackButton({ 
  className, 
  label = "Back", 
  variant = "link" 
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={cn("",
        className
      )}
      onClick={() => router.back()}
    >
      <ArrowLeft />
      {label}
    </Button>
  );
}
