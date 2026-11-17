import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  lines?: number;
  className?: string;
};

const lineWidths = ["w-full", "w-11/12", "w-4/5", "w-2/3"] as const;

export function LoadingState({
  label = "Loading",
  lines = 3,
  className,
}: LoadingStateProps) {
  const count = Math.max(lines, 1);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn("space-y-3", className)}
    >
      <span className="sr-only">{label}</span>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          className={cn("h-3", lineWidths[index % lineWidths.length])}
        />
      ))}
    </div>
  );
}
