export const platforms = ["facebook", "instagram", "tiktok"] as const;

export type Platform = (typeof platforms)[number];

export const dateRangePresets = ["7d", "30d", "90d", "custom"] as const;

export type DateRangePreset = (typeof dateRangePresets)[number];

export const metricKeys = ["reach", "engagement", "profileVisits"] as const;

export type MetricKey = (typeof metricKeys)[number];

export const summaryMetricIds = [
  "reach",
  "engagement",
  "profileVisits",
  "activeCampaigns",
] as const;

export type SummaryMetricId = (typeof summaryMetricIds)[number];

export const campaignStatuses = [
  "active",
  "scheduled",
  "completed",
  "paused",
] as const;

export type CampaignStatus = (typeof campaignStatuses)[number];

export const campaignTypes = [
  "paid-promotion",
  "collaboration",
  "organic",
] as const;

export type CampaignType = (typeof campaignTypes)[number];

export type TrendDirection = "up" | "down" | "neutral";

export type TrendTone = "positive" | "negative" | "neutral";

export type DailyMetric = {
  date: string;
  platform: Platform;
  reach: number;
  engagement: number;
  profileVisits: number;
};

export type SocialAccount = {
  id: string;
  platform: Platform;
  name: string;
  handle: string;
  accountType: string;
  followers: number;
};

export type CampaignRecord = {
  id: string;
  name: string;
  platform: Platform;
  type: CampaignType;
  status: CampaignStatus;
  reach: number;
  engagement: number;
  startDate: string;
  endDate: string;
};

export type ActivityKind =
  | "campaign-created"
  | "campaign-completed"
  | "account-preview"
  | "report-generated"
  | "payment-received";

export type ActivityRecord = {
  id: string;
  kind: ActivityKind;
  description: string;
  occurredAt: string;
  status?: string;
};

/**
 * Demonstration source records. Replace this module with API responses later.
 */
export type DashboardSource = {
  asOf: string;
  accounts: readonly SocialAccount[];
  series: readonly DailyMetric[];
  campaigns: readonly CampaignRecord[];
  activities: readonly ActivityRecord[];
};

export type SummaryMetric = {
  id: SummaryMetricId;
  title: string;
  value: number;
  changeLabel: string;
  direction: TrendDirection;
  tone: TrendTone;
  comparison: string;
};

export type ChartPoint = {
  date: string;
  facebook: number;
  instagram: number;
  tiktok: number;
};

export type PlatformSummary = {
  platform: Platform;
  reach: number;
  engagement: number;
  followers: number;
  engagementRate: number;
  reachShare: number;
};

export type DashboardModel = {
  rangeLabel: string;
  comparisonLabel: string;
  startDate: string;
  endDate: string;
  rangeValid: boolean;
  metrics: SummaryMetric[];
  chart: ChartPoint[];
  platforms: PlatformSummary[];
  accounts: readonly SocialAccount[];
  campaigns: readonly CampaignRecord[];
  activities: readonly ActivityRecord[];
};
