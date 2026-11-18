import { platformLabels } from "@/features/social-accounts/lib/summary";
import type { Platform } from "@/features/social-accounts/types/social-account";
import { cn } from "@/lib/utils";

const accent: Record<Platform, string> = {
  facebook: "bg-[#1877F2]",
  instagram: "bg-[#E1306C]",
  tiktok: "bg-[#111111] dark:bg-[#69C9D0]",
};

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
        "bg-muted text-foreground relative flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
        className,
      )}
    >
      {platformLabels[platform].slice(0, 1)}
      <span
        className={cn(
          "ring-card absolute -right-0.5 -bottom-0.5 size-2 rounded-full ring-2",
          accent[platform],
        )}
      />
    </span>
  );
}
