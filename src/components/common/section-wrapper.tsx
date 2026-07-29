import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CONTAINER_MAX_WIDTH } from "./page-wrapper";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  /** HTML id attribute for anchor linking / scroll-to */
  id?: string;
  /** Constrain content width (default: true) */
  container?: boolean;
  /** Use as a semantic <section> element (default: true) */
  asSection?: boolean;
  /** Vertical padding preset: "none" | "xs" | "sm" | "md" | "lg" | "xl" (default: "md") */
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  /** Full-width background variant for alternating section colors */
  bg?: "white" | "muted" | "primary";
};

const bgMap: Record<string, string> = {
  white: "bg-background",
  muted: "bg-muted/50",
  primary: "bg-primary/5",
};

const paddingMap: Record<string, string> = {
  none: "",
  xs: "py-4 md:py-6",
  sm: "py-8 md:py-10",
  md: "py-12 md:py-16",
  lg: "py-16 sm:py-24",
  xl: "py-20 sm:py-32",
};

function SectionWrapper({
  children,
  className,
  id,
  container = true,
  asSection = true,
  padding = "md",
  bg,
}: SectionWrapperProps) {
  const Tag = asSection ? "section" : "div";

  const inner = (
    <Tag
      id={id}
      className={cn(
        container && `mx-auto w-full ${CONTAINER_MAX_WIDTH} px-4 md:px-6`,
        paddingMap[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );

  if (bg) {
    return <div className={cn(bgMap[bg], "w-full")}>{inner}</div>;
  }

  return inner;
}

export { SectionWrapper };
