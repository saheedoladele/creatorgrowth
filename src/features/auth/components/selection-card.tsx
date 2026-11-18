import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SelectionCard({
  title,
  description,
  icon,
  selected,
  children,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  selected: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "border-border hover:bg-muted/50 focus-within:border-ring focus-within:ring-ring/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors focus-within:ring-3",
        selected && "border-primary bg-primary/5",
      )}
    >
      {icon ? (
        <span className="bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-md">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="text-muted-foreground mt-0.5 block text-sm leading-5">
          {description}
        </span>
      </span>
      {children}
    </label>
  );
}
