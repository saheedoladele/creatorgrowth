import { DashboardStatCard } from "@/features/dashboard/components/stat-card";
import type { SummaryMetric } from "@/features/dashboard/types/dashboard";

export function PerformanceCards({
  metrics,
}: {
  metrics: readonly SummaryMetric[];
}) {
  if (metrics.length === 0) return null;

  return (
    <section aria-label="Performance summary">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <DashboardStatCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}
