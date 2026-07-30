import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HeadingAlignment = "left" | "center";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  alignment?: HeadingAlignment;
  className?: string;
  children?: ReactNode;
  /** Heading HTML tag: h1-h4 (default: h2) */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Override default title size classes */
  titleClassName?: string;
  /** Whether to constrain width to max-w-2xl (default: true). Set false inside grid/flex layouts */
  constrain?: boolean;
}

const alignmentClasses: Record<HeadingAlignment, string> = {
  left: "text-left",
  center: "text-center",
};

const headingSizes: Record<string, string> = {
  h1: "text-3xl font-bold sm:text-4xl",
  h2: "text-2xl font-semibold sm:text-3xl",
  h3: "text-xl font-semibold sm:text-2xl",
  h4: "text-lg font-semibold",
};

export function SectionHeading({
  badge,
  title,
  description,
  alignment = "center",
  className,
  children,
  as: Tag = "h2",
  titleClassName,
  constrain = true,
}: SectionHeadingProps) {
  return (
    <div className={cn(constrain && !children && "max-w-2xl", alignment === "center" && "mx-auto", alignmentClasses[alignment], !children && className)}>
      <div className={cn(
        children && "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        children && className,
      )}>
        <div className="min-w-0">
          {badge && (
            <Badge className="bg-primary/10 text-primary p-3">
              {badge}
            </Badge>
          )}
          <Tag
            className={cn(
              badge ? "mt-3" : "",
              "tracking-tight text-primary font-heading",
              titleClassName ?? headingSizes[Tag],
            )}
          >
            {title}
          </Tag>
          {description && (
            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
