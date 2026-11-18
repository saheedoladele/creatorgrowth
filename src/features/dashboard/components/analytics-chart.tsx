"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { formatShortDate } from "@/features/dashboard/lib/dates";
import {
  metricOptions,
  platformLabel,
} from "@/features/dashboard/lib/derive-dashboard";
import { formatCompact, formatInteger } from "@/features/dashboard/lib/format";
import type {
  ChartPoint,
  MetricKey,
} from "@/features/dashboard/types/dashboard";

const series = [
  { key: "facebook", label: "Facebook", color: "var(--chart-1)" },
  { key: "instagram", label: "Instagram", color: "var(--chart-2)" },
  { key: "tiktok", label: "TikTok", color: "var(--chart-3)" },
] as const;

type AnalyticsChartProps = {
  points: readonly ChartPoint[];
  metric: MetricKey;
  onMetricChange: (metric: MetricKey) => void;
  refreshing: boolean;
};

export function AnalyticsChart({
  points,
  metric,
  onMetricChange,
  refreshing,
}: AnalyticsChartProps) {
  const metricLabel =
    metricOptions.find((option) => option.value === metric)?.label ?? "Reach";

  return (
    <Card className="min-w-0 overflow-visible">
      <CardContent className="space-y-4">
        <SectionHeader
          title="Performance trend"
          description="Sample reach, engagement, and profile visits for the selected dates."
          actions={
            <div
              role="radiogroup"
              aria-label="Chart metric"
              className="bg-muted flex rounded-lg p-0.5"
            >
              {metricOptions.map((option) => {
                const selected = option.value === metric;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onMetricChange(option.value)}
                    className={
                      selected
                        ? "bg-card text-foreground focus-visible:ring-ring/50 rounded-md px-2.5 py-1 text-xs font-medium shadow-sm focus-visible:ring-3 focus-visible:outline-none"
                        : "text-muted-foreground focus-visible:ring-ring/50 rounded-md px-2.5 py-1 text-xs font-medium focus-visible:ring-3 focus-visible:outline-none"
                    }
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          }
        />
        {points.length === 0 ? (
          <EmptyState
            title="No sample points in this range"
            description="Choose dates that overlap the demonstration series."
          />
        ) : (
          <div
            className="h-64 w-full min-w-0 sm:h-72"
            role="img"
            aria-label={`Demonstration ${metricLabel} trend by platform`}
            aria-busy={refreshing}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[...points]}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value: string) => formatAxisDate(value)}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={28}
                />
                <YAxis
                  tickFormatter={(value: number) => formatCompact(value)}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                />
                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload && payload.length ? (
                      <ChartTooltip
                        label={String(label)}
                        metric={metricLabel}
                        rows={payload.map((item) => ({
                          name: platformLabel(
                            item.dataKey as "facebook" | "instagram" | "tiktok",
                          ),
                          value: Number(item.value ?? 0),
                          color: String(item.color ?? "var(--foreground)"),
                        }))}
                      />
                    ) : null
                  }
                />
                <Legend
                  verticalAlign="top"
                  align="left"
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: 12,
                    paddingBottom: 8,
                    color: "var(--muted-foreground)",
                  }}
                />
                {series.map((item) => (
                  <Area
                    key={item.key}
                    type="monotone"
                    dataKey={item.key}
                    name={item.label}
                    stroke={item.color}
                    fill={item.color}
                    fillOpacity={0.12}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3 }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatAxisDate(value: string) {
  const [, month, day] = value.split("-");
  return `${month}/${day}`;
}

function ChartTooltip({
  label,
  metric,
  rows,
}: {
  label: string;
  metric: string;
  rows: { name: string; value: number; color: string }[];
}) {
  return (
    <div className="bg-popover text-popover-foreground ring-foreground/10 rounded-lg px-3 py-2 text-xs shadow-md ring-1">
      <p className="font-medium">{formatShortDate(label)}</p>
      <p className="text-muted-foreground mb-1">{metric}</p>
      <ul className="space-y-1">
        {rows.map((row) => (
          <li
            key={row.name}
            className="flex items-center justify-between gap-4"
          >
            <span className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: row.color }}
              />
              {row.name}
            </span>
            <span className="tabular-nums">{formatInteger(row.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
