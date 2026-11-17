import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const statusBadgeStatuses = [
  "neutral",
  "info",
  "success",
  "warning",
  "danger",
] as const;

export type StatusBadgeStatus = (typeof statusBadgeStatuses)[number];

type StatusBadgeProps = {
  status: StatusBadgeStatus;
  children: ReactNode;
  className?: string;
};

const statusClassName: Record<StatusBadgeStatus, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-destructive/10 text-destructive",
};

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md border-transparent",
        statusClassName[status],
        className,
      )}
    >
      {children}
    </Badge>
  );
}
