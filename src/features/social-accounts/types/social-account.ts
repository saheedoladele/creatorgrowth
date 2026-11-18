export const platforms = ["facebook", "instagram", "tiktok"] as const;

export type Platform = (typeof platforms)[number];

export const accountStatuses = [
  "connected",
  "expired",
  "attention",
  "disconnected",
] as const;

export type AccountStatus = (typeof accountStatuses)[number];

export const historyMetrics = ["followers", "reach", "engagement"] as const;

export type HistoryMetric = (typeof historyMetrics)[number];

/**
 * Metrics are optional because platforms and account types do not expose the
 * same fields. Missing values mean the preview does not include that figure.
 */
export type AccountMetrics = {
  followers?: number;
  following?: number;
  posts?: number;
  engagementRate?: number;
  averageReach?: number;
};

export type AccountPermission = {
  key: string;
  label: string;
  included: boolean;
  detail: string;
};

export type AccountHistoryPoint = {
  date: string;
  followers?: number;
  reach?: number;
  engagement?: number;
};

export type SocialAccount = {
  id: string;
  platform: Platform;
  username: string;
  displayName: string;
  accountType: string;
  initials: string;
  status: AccountStatus;
  connectedAt: string | null;
  lastSyncedAt: string | null;
  metrics: AccountMetrics;
  permissions: readonly AccountPermission[];
  history: readonly AccountHistoryPoint[];
  supportedMetrics: readonly HistoryMetric[];
  attentionNote?: string;
};

export type PlatformFilter = "all" | Platform;

export type StatusFilter = "all" | AccountStatus;

export type ServiceResult<T> =
  { ok: true; account: T } | { ok: false; message: string };

export type PlatformCatalogEntry = {
  platform: Platform;
  name: string;
  description: string;
  accountTypes: readonly string[];
  requirements: readonly string[];
};
