"use client";

import { useMemo, useState } from "react";

import {
  dashboardAsOf,
  dashboardSource,
} from "@/features/dashboard/data/dashboard-mock-data";
import { shiftDate } from "@/features/dashboard/lib/dates";
import { deriveDashboard } from "@/features/dashboard/lib/derive-dashboard";
import type {
  DateRangePreset,
  MetricKey,
} from "@/features/dashboard/types/dashboard";

export function useDashboardData() {
  const [range, setRange] = useState<DateRangePreset>("30d");
  const [customStart, setCustomStart] = useState(shiftDate(dashboardAsOf, -13));
  const [customEnd, setCustomEnd] = useState(dashboardAsOf);
  const [metric, setMetric] = useState<MetricKey>("reach");
  const [revision, setRevision] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const model = useMemo(
    () =>
      deriveDashboard({
        source: dashboardSource,
        range,
        customStart,
        customEnd,
        revision,
        metric,
      }),
    [range, customStart, customEnd, revision, metric],
  );

  function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    window.setTimeout(() => {
      setRevision((current) => current + 1);
      setUpdatedAt(new Date());
      setRefreshing(false);
    }, 700);
  }

  return {
    range,
    setRange,
    customStart,
    setCustomStart,
    customEnd,
    setCustomEnd,
    metric,
    setMetric,
    refreshing,
    refresh,
    updatedAt,
    model,
  };
}
