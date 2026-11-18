"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatCompact,
  formatInteger,
} from "@/features/social-accounts/lib/format";
import { formatDate } from "@/features/social-accounts/lib/dates";
import type {
  HistoryMetric,
  SocialAccount,
} from "@/features/social-accounts/types/social-account";
import { cn } from "@/lib/utils";

const metricLabels: Record<HistoryMetric, string> = {
  followers: "Followers",
  reach: "Reach",
  engagement: "Engagement",
};

export function AccountPerformanceChart({
  account,
}: {
  account: SocialAccount;
}) {
  const available = account.supportedMetrics;
  const [metric, setMetric] = useState<HistoryMetric>(
    available[0] ?? "followers",
  );
  const selected = available.includes(metric)
    ? metric
    : (available[0] ?? "followers");
  const points = account.history.flatMap((point) => {
    const value = point[selected];
    return value == null ? [] : [{ date: point.date, value }];
  });

  return (
    <Card className="min-w-0 overflow-visible">
      <CardContent className="space-y-4">
        <SectionHeader
          title="Performance overview"
          description="Demonstration history for this preview account."
          actions={
            available.length > 0 ? (
              <div
                role="radiogroup"
                aria-label="Chart metric"
                className="bg-muted flex rounded-lg p-0.5"
              >
                {available.map((option) => {
                  const active = option === selected;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setMetric(option)}
                      className={cn(
                        "focus-visible:ring-ring/50 rounded-md px-2.5 py-1 text-xs font-medium focus-visible:ring-3 focus-visible:outline-none",
                        active
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground",
                      )}
                    >
                      {metricLabels[option]}
                    </button>
                  );
                })}
              </div>
            ) : null
          }
        />
        {points.length === 0 ? (
          <EmptyState
            title="No performance series in this preview"
            description="This account type does not include that history."
          />
        ) : (
          <div
            className="h-64 w-full min-w-0 sm:h-72"
            role="img"
            aria-label={`Demonstration ${metricLabels[selected]} history`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={points}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value: string) => {
                    const [, month, day] = value.split("-");
                    return `${month}/${day}`;
                  }}
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
                    active && payload?.length ? (
                      <div className="bg-popover text-popover-foreground ring-foreground/10 rounded-lg px-3 py-2 text-xs shadow-md ring-1">
                        <p className="font-medium">
                          {formatDate(String(label))}
                        </p>
                        <p className="text-muted-foreground">
                          {metricLabels[selected]}
                        </p>
                        <p className="tabular-nums">
                          {formatInteger(Number(payload[0]?.value ?? 0))}
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  name={metricLabels[selected]}
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
