import type { Platform } from "@/features/dashboard/types/dashboard";
import { platformLabel } from "@/features/dashboard/lib/derive-dashboard";
import { cn } from "@/lib/utils";

export function PlatformMark({
  platform,
  className,
}: {
  platform: Platform;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
        className,
      )}
    >
      {platformLabel(platform).slice(0, 1)}
    </span>
  );
}
