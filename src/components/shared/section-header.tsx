import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  level?: 2 | 3;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  actions,
  level = 2,
  className,
}: SectionHeaderProps) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        <Heading className="text-section-title text-foreground">
          {title}
        </Heading>
        {description ? (
          <p className="text-small text-muted-foreground max-w-2xl">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
