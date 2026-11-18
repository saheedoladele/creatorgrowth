import { Eye, Megaphone, MousePointerClick, UserRound } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { formatCompact, formatInteger } from "@/features/dashboard/lib/format";
import type {
  SummaryMetric,
  SummaryMetricId,
} from "@/features/dashboard/types/dashboard";

const metricIcons = {
  reach: Eye,
  engagement: MousePointerClick,
  profileVisits: UserRound,
  activeCampaigns: Megaphone,
} as const;

function formatValue(id: SummaryMetricId, value: number) {
  return id === "activeCampaigns" ? formatInteger(value) : formatCompact(value);
}

export function DashboardStatCard({ metric }: { metric: SummaryMetric }) {
  const Icon = metricIcons[metric.id];

  return (
    <StatCard
      title={metric.title}
      value={formatValue(metric.id, metric.value)}
      icon={Icon}
      trend={{
        value: metric.changeLabel,
        direction: metric.direction,
        tone: metric.tone,
      }}
      description={metric.comparison}
    />
  );
}
