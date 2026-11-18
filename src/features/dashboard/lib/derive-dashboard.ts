import {
  shiftDate,
  daysInclusive,
  rangesOverlap,
} from "@/features/dashboard/lib/dates";
import {
  formatSignedCount,
  formatSignedPercent,
  trendFromDelta,
} from "@/features/dashboard/lib/format";
import type {
  ChartPoint,
  DailyMetric,
  DashboardModel,
  DashboardSource,
  DateRangePreset,
  MetricKey,
  Platform,
  PlatformSummary,
  SummaryMetric,
} from "@/features/dashboard/types/dashboard";
import { platforms } from "@/features/dashboard/types/dashboard";

const rangeLengths: Record<Exclude<DateRangePreset, "custom">, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

const rangeNames: Record<DateRangePreset, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  custom: "Custom range",
};

type Window = {
  start: string;
  end: string;
  valid: boolean;
};

export function resolveWindow(
  source: DashboardSource,
  range: DateRangePreset,
  customStart: string,
  customEnd: string,
): Window {
  if (range === "custom") {
    const valid = Boolean(customStart && customEnd && customStart <= customEnd);
    return { start: customStart, end: customEnd, valid };
  }

  const length = rangeLengths[range];
  return {
    start: shiftDate(source.asOf, -(length - 1)),
    end: source.asOf,
    valid: true,
  };
}

function previousWindow(window: Window): Window {
  const length = daysInclusive(window.start, window.end);
  const end = shiftDate(window.start, -1);
  return {
    start: shiftDate(end, -(length - 1)),
    end,
    valid: true,
  };
}

function adjustPoint(point: DailyMetric, revision: number) {
  if (revision <= 0) return point;
  const factor = 1 + Math.min(revision, 6) * 0.015;
  return {
    ...point,
    reach: Math.round(point.reach * factor),
    engagement: Math.round(point.engagement * factor),
    profileVisits: Math.round(point.profileVisits * factor),
  };
}

function inWindow(point: DailyMetric, window: Window) {
  return point.date >= window.start && point.date <= window.end;
}

function sumMetric(points: readonly DailyMetric[], key: MetricKey) {
  return points.reduce((total, point) => total + point[key], 0);
}

function changeLabel(current: number, previous: number, count = false) {
  const delta = current - previous;
  if (previous === 0) {
    if (count) return formatSignedCount(delta);
    return current === 0 ? "0%" : "No prior sample";
  }
  return formatSignedPercent((delta / previous) * 100);
}

function summaryMetric(
  id: SummaryMetric["id"],
  title: string,
  current: number,
  previous: number,
  comparison: string,
  count = false,
): SummaryMetric {
  const delta = current - previous;
  const noBaseline = !count && previous === 0 && current > 0;
  const trend = noBaseline
    ? { direction: "neutral" as const, tone: "neutral" as const }
    : trendFromDelta(delta);
  return {
    id,
    title,
    value: current,
    changeLabel: changeLabel(current, previous, count),
    direction: trend.direction,
    tone: trend.tone,
    comparison,
  };
}

function chartFor(
  points: readonly DailyMetric[],
  metric: MetricKey,
): ChartPoint[] {
  const byDate = new Map<string, ChartPoint>();

  for (const point of points) {
    const current = byDate.get(point.date) ?? {
      date: point.date,
      facebook: 0,
      instagram: 0,
      tiktok: 0,
    };
    current[point.platform] += point[metric];
    byDate.set(point.date, current);
  }

  return [...byDate.values()].sort((left, right) =>
    left.date.localeCompare(right.date),
  );
}

function platformSummaries(
  points: readonly DailyMetric[],
  source: DashboardSource,
): PlatformSummary[] {
  const totalReach = sumMetric(points, "reach");

  return platforms.map((platform) => {
    const rows = points.filter((point) => point.platform === platform);
    const reach = sumMetric(rows, "reach");
    const engagement = sumMetric(rows, "engagement");
    const account = source.accounts.find((item) => item.platform === platform);
    return {
      platform,
      reach,
      engagement,
      followers: account?.followers ?? 0,
      engagementRate: reach === 0 ? 0 : (engagement / reach) * 100,
      reachShare: totalReach === 0 ? 0 : (reach / totalReach) * 100,
    };
  });
}

function activeCount(source: DashboardSource, window: Window) {
  return source.campaigns.filter(
    (campaign) =>
      campaign.status === "active" &&
      rangesOverlap(
        campaign.startDate,
        campaign.endDate,
        window.start,
        window.end,
      ),
  ).length;
}

export function deriveDashboard({
  source,
  range,
  customStart,
  customEnd,
  revision,
  metric,
}: {
  source: DashboardSource;
  range: DateRangePreset;
  customStart: string;
  customEnd: string;
  revision: number;
  metric: MetricKey;
}): DashboardModel {
  const window = resolveWindow(source, range, customStart, customEnd);
  const comparisonLabel = `vs previous ${daysInclusive(window.start || source.asOf, window.end || source.asOf)} days`;

  if (!window.valid) {
    return {
      rangeLabel: rangeNames[range],
      comparisonLabel,
      startDate: window.start,
      endDate: window.end,
      rangeValid: false,
      metrics: [],
      chart: [],
      platforms: platformSummaries([], source),
      accounts: source.accounts,
      campaigns: [],
      activities: source.activities,
    };
  }

  const prior = previousWindow(window);
  const currentPoints = source.series
    .filter((point) => inWindow(point, window))
    .map((point) => adjustPoint(point, revision));
  const previousPoints = source.series.filter((point) =>
    inWindow(point, prior),
  );
  const lookingAtCurrentPeriod = window.end >= shiftDate(source.asOf, -7);
  const campaigns = source.campaigns.filter((campaign) => {
    const overlaps = rangesOverlap(
      campaign.startDate,
      campaign.endDate,
      window.start,
      window.end,
    );
    const upcoming =
      lookingAtCurrentPeriod &&
      campaign.status === "scheduled" &&
      campaign.startDate > window.end &&
      campaign.startDate <= shiftDate(source.asOf, 21);
    return overlaps || upcoming;
  });

  return {
    rangeLabel: rangeNames[range],
    comparisonLabel,
    startDate: window.start,
    endDate: window.end,
    rangeValid: true,
    metrics: [
      summaryMetric(
        "reach",
        "Total Reach",
        sumMetric(currentPoints, "reach"),
        sumMetric(previousPoints, "reach"),
        comparisonLabel,
      ),
      summaryMetric(
        "engagement",
        "Total Engagement",
        sumMetric(currentPoints, "engagement"),
        sumMetric(previousPoints, "engagement"),
        comparisonLabel,
      ),
      summaryMetric(
        "profileVisits",
        "Profile Visits",
        sumMetric(currentPoints, "profileVisits"),
        sumMetric(previousPoints, "profileVisits"),
        comparisonLabel,
      ),
      summaryMetric(
        "activeCampaigns",
        "Active Campaigns",
        activeCount(source, window),
        activeCount(source, prior),
        comparisonLabel,
        true,
      ),
    ],
    chart: chartFor(currentPoints, metric),
    platforms: platformSummaries(currentPoints, source),
    accounts: source.accounts,
    campaigns,
    activities: source.activities,
  };
}

export function platformLabel(platform: Platform) {
  if (platform === "facebook") return "Facebook";
  if (platform === "instagram") return "Instagram";
  return "TikTok";
}

export const dateRangeOptions = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "custom", label: "Custom range" },
] as const;

export const metricOptions = [
  { value: "reach", label: "Reach" },
  { value: "engagement", label: "Engagement" },
  { value: "profileVisits", label: "Profile Visits" },
] as const;

export const campaignTypeLabels = {
  "paid-promotion": "Paid promotion",
  collaboration: "Collaboration",
  organic: "Organic",
} as const;

export const campaignStatusLabels = {
  active: "Active",
  scheduled: "Scheduled",
  completed: "Completed",
  paused: "Paused",
} as const;
