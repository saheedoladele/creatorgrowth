import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="border-border flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-10 text-center">
      {Icon ? (
        <Icon className="text-muted-foreground size-5" aria-hidden="true" />
      ) : null}
      <div className="space-y-1">
        <h3 className="text-card-title text-foreground">{title}</h3>
        {description ? (
          <p className="text-small text-muted-foreground mx-auto max-w-sm">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
