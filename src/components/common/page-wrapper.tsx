import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const CONTAINER_MAX_WIDTH = "max-w-7xl";

interface PageWrapperProps {
  children: ReactNode;
  pagination?: ReactNode;
  className?: string;
  paddingSize?: "default" | "small" | "none" | "zero";
}

const paddingMap: Record<string, string> = {
  default: "px-5 py-12 lg:py-18",
  small: "px-5 pt-5 pb-12 lg:pb-18",
  none: "px-5 pb-12 lg:pb-18",
  zero: "px-5",
};

function PageWrapper({
  children,
  pagination,
  className,
  paddingSize = "default",
}: PageWrapperProps) {
  return (
    <div className={cn(`container mx-auto ${CONTAINER_MAX_WIDTH} screen-height`, paddingMap[paddingSize])}>
      <div className={cn("grow lg:mb-0", className)}>{children}</div>
      {pagination}
    </div>
  );
}

export { PageWrapper };
