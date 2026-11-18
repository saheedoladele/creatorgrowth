import { shiftDate } from "@/features/social-accounts/lib/dates";
import type {
  AccountHistoryPoint,
  AccountPermission,
  HistoryMetric,
  Platform,
  PlatformCatalogEntry,
  SocialAccount,
} from "@/features/social-accounts/types/social-account";

/**
 * Fixed demonstration accounts for the social account module.
 * Status values describe this preview only. They are not platform authorizations.
 */

const historyEnd = "2026-11-18";

export const platformCatalog: readonly PlatformCatalogEntry[] = [
  {
    platform: "facebook",
    name: "Facebook",
    description:
      "Connect your eligible Facebook assets to manage account performance and campaigns.",
    accountTypes: ["Page"],
    requirements: [
      "A Facebook Page you manage",
      "Page performance data available for that Page",
    ],
  },
  {
    platform: "instagram",
    name: "Instagram",
    description: "Connect your eligible Instagram professional account.",
    accountTypes: ["Professional account", "Business account"],
    requirements: [
      "An Instagram professional account",
      "Insights available for that account",
    ],
  },
  {
    platform: "tiktok",
    name: "TikTok",
    description:
      "Connect your TikTok account to manage supported creator and content insights.",
    accountTypes: ["Creator account"],
    requirements: [
      "A TikTok account",
      "Creator or content insights available for that account",
    ],
  },
];

const facebookPermissions: readonly AccountPermission[] = [
  {
    key: "profile",
    label: "Page profile",
    included: true,
    detail: "Included in this preview for the Page name and picture.",
  },
  {
    key: "insights",
    label: "Page insights",
    included: true,
    detail: "Included in this preview for reach and engagement summaries.",
  },
  {
    key: "ads",
    label: "Ad account access",
    included: false,
    detail: "Not included in this demonstration.",
  },
];

const instagramInsights: readonly AccountPermission[] = [
  {
    key: "profile",
    label: "Professional profile",
    included: true,
    detail: "Included in this preview for the account name and picture.",
  },
  {
    key: "insights",
    label: "Insights",
    included: true,
    detail: "Included in this preview for reach and engagement summaries.",
  },
  {
    key: "publishing",
    label: "Content publishing",
    included: false,
    detail: "Not included in this demonstration.",
  },
];

const instagramLimited: readonly AccountPermission[] = [
  {
    key: "profile",
    label: "Professional profile",
    included: true,
    detail: "Included in this preview for the account name and picture.",
  },
  {
    key: "insights",
    label: "Insights",
    included: false,
    detail: "Not included for this preview account.",
  },
  {
    key: "messages",
    label: "Messages",
    included: false,
    detail: "Not included in this demonstration.",
  },
];

const tiktokInsights: readonly AccountPermission[] = [
  {
    key: "profile",
    label: "Creator profile",
    included: true,
    detail: "Included in this preview for the account name and picture.",
  },
  {
    key: "insights",
    label: "Content insights",
    included: true,
    detail: "Included in this preview for reach and engagement summaries.",
  },
  {
    key: "inbox",
    label: "Inbox",
    included: false,
    detail: "Not included in this demonstration.",
  },
];

const tiktokProfileOnly: readonly AccountPermission[] = [
  {
    key: "profile",
    label: "Creator profile",
    included: true,
    detail: "Included in this preview for the account name and picture.",
  },
  {
    key: "insights",
    label: "Content insights",
    included: false,
    detail: "Not included for this preview account.",
  },
];

type HistoryInput = {
  followers: number;
  dailyReach?: number;
  dailyEngagement?: number;
  phase: number;
};

function mean(values: number[]) {
  if (values.length === 0) return undefined;
  return Math.round(
    values.reduce((total, value) => total + value, 0) / values.length,
  );
}

export function buildHistory(input: HistoryInput): AccountHistoryPoint[] {
  const points: AccountHistoryPoint[] = [];

  for (let index = 0; index < 30; index += 1) {
    const progress = index / 29;
    const wave = 0.5 + 0.5 * Math.sin(progress * Math.PI * 2 + input.phase);
    const point: AccountHistoryPoint = {
      date: shiftDate(historyEnd, index - 29),
      followers: Math.round(input.followers * (0.92 + progress * 0.08)),
    };

    if (input.dailyReach != null) {
      point.reach = Math.round(input.dailyReach * (0.85 + wave * 0.3));
    }

    if (input.dailyEngagement != null) {
      point.engagement = Math.round(input.dailyEngagement * (0.8 + wave * 0.4));
    }

    points.push(point);
  }

  const last = points[points.length - 1];
  if (last) last.followers = input.followers;
  return points;
}

function supportedMetrics(
  history: readonly AccountHistoryPoint[],
): HistoryMetric[] {
  return (["followers", "reach", "engagement"] as const).filter((metric) =>
    history.some((point) => point[metric] != null),
  );
}

type AccountInput = {
  id: string;
  platform: Platform;
  username: string;
  displayName: string;
  accountType: string;
  initials: string;
  status: SocialAccount["status"];
  connectedAt: string | null;
  lastSyncedAt: string | null;
  followers?: number;
  following?: number;
  posts?: number;
  engagementRate?: number;
  dailyReach?: number;
  dailyEngagement?: number;
  phase: number;
  permissions: readonly AccountPermission[];
  attentionNote?: string;
};

function createAccount(input: AccountInput): SocialAccount {
  const history =
    input.followers == null
      ? []
      : buildHistory({
          followers: input.followers,
          dailyReach: input.dailyReach,
          dailyEngagement: input.dailyEngagement,
          phase: input.phase,
        });
  const reachValues = history.flatMap((point) =>
    point.reach == null ? [] : [point.reach],
  );

  return {
    id: input.id,
    platform: input.platform,
    username: input.username,
    displayName: input.displayName,
    accountType: input.accountType,
    initials: input.initials,
    status: input.status,
    connectedAt: input.connectedAt,
    lastSyncedAt: input.lastSyncedAt,
    metrics: {
      followers: input.followers,
      following: input.following,
      posts: input.posts,
      engagementRate: input.engagementRate,
      averageReach: mean(reachValues),
    },
    permissions: input.permissions,
    history,
    supportedMetrics: supportedMetrics(history),
    attentionNote: input.attentionNote,
  };
}

export const seedAccounts: readonly SocialAccount[] = [
  createAccount({
    id: "creator-growth-studio",
    platform: "facebook",
    username: "creatorgrowthstudio",
    displayName: "Creator Growth Studio",
    accountType: "Page",
    initials: "CG",
    status: "connected",
    connectedAt: "2026-04-02T10:00:00.000Z",
    lastSyncedAt: "2026-11-18T09:00:00.000Z",
    followers: 48_240,
    posts: 186,
    engagementRate: 2.4,
    dailyReach: 18_400,
    dailyEngagement: 442,
    phase: 0.4,
    permissions: facebookPermissions,
  }),
  createAccount({
    id: "saheed-creates",
    platform: "instagram",
    username: "saheed.creates",
    displayName: "Saheed Creates",
    accountType: "Professional",
    initials: "SC",
    status: "connected",
    connectedAt: "2026-03-18T15:30:00.000Z",
    lastSyncedAt: "2026-11-18T09:00:00.000Z",
    followers: 86_420,
    following: 412,
    posts: 328,
    engagementRate: 3.7,
    dailyReach: 24_600,
    dailyEngagement: 910,
    phase: 1.2,
    permissions: instagramInsights,
  }),
  createAccount({
    id: "saheed-growth",
    platform: "tiktok",
    username: "saheedgrowth",
    displayName: "Saheed Growth",
    accountType: "Creator",
    initials: "SG",
    status: "connected",
    connectedAt: "2026-05-09T12:10:00.000Z",
    lastSyncedAt: "2026-11-18T09:00:00.000Z",
    followers: 124_860,
    following: 96,
    posts: 214,
    engagementRate: 4.9,
    dailyReach: 38_200,
    dailyEngagement: 1_872,
    phase: 2.1,
    permissions: tiktokInsights,
  }),
  createAccount({
    id: "northwind-studio",
    platform: "facebook",
    username: "northwindstudio",
    displayName: "Northwind Studio",
    accountType: "Page",
    initials: "NS",
    status: "expired",
    connectedAt: "2026-06-14T08:20:00.000Z",
    lastSyncedAt: "2026-10-02T16:40:00.000Z",
    followers: 12_480,
    posts: 64,
    engagementRate: 1.8,
    dailyReach: 4_200,
    dailyEngagement: 76,
    phase: 0.8,
    permissions: facebookPermissions,
    attentionNote: "The preview connection for this Page has expired.",
  }),
  createAccount({
    id: "acme-digital",
    platform: "instagram",
    username: "acme.digital",
    displayName: "Acme Digital",
    accountType: "Business",
    initials: "AD",
    status: "attention",
    connectedAt: "2026-09-01T11:05:00.000Z",
    lastSyncedAt: "2026-11-10T13:15:00.000Z",
    followers: 22_150,
    following: 180,
    posts: 94,
    phase: 1.7,
    permissions: instagramLimited,
    attentionNote: "Insights are not included for this preview account.",
  }),
  createAccount({
    id: "weekend-cuts",
    platform: "tiktok",
    username: "weekend.cuts",
    displayName: "Weekend Cuts",
    accountType: "Creator",
    initials: "WC",
    status: "disconnected",
    connectedAt: "2026-08-01T09:45:00.000Z",
    lastSyncedAt: "2026-09-12T18:05:00.000Z",
    followers: 9_420,
    following: 40,
    posts: 58,
    engagementRate: 3.1,
    dailyEngagement: 180,
    phase: 2.4,
    permissions: tiktokProfileOnly,
  }),
];

export const seedAccountIds = seedAccounts.map((account) => account.id);

const connectionPresets: Record<
  Platform,
  Omit<AccountInput, "status" | "connectedAt" | "lastSyncedAt" | "id"> & {
    id: string;
  }
> = {
  facebook: {
    id: "harbor-and-co",
    platform: "facebook",
    username: "harborandco",
    displayName: "Harbor & Co.",
    accountType: "Page",
    initials: "HC",
    followers: 18_640,
    posts: 72,
    engagementRate: 2.1,
    dailyReach: 6_400,
    dailyEngagement: 134,
    phase: 0.6,
    permissions: facebookPermissions,
  },
  instagram: {
    id: "harbor-studio",
    platform: "instagram",
    username: "harbor.studio",
    displayName: "Harbor Studio",
    accountType: "Professional",
    initials: "HS",
    followers: 27_310,
    following: 240,
    posts: 118,
    engagementRate: 3.2,
    dailyReach: 9_800,
    dailyEngagement: 314,
    phase: 1.4,
    permissions: instagramInsights,
  },
  tiktok: {
    id: "harbor-creates",
    platform: "tiktok",
    username: "harbor.creates",
    displayName: "Harbor Creates",
    accountType: "Creator",
    initials: "HY",
    followers: 41_280,
    following: 64,
    posts: 86,
    engagementRate: 4.4,
    dailyReach: 15_200,
    dailyEngagement: 668,
    phase: 2.2,
    permissions: tiktokInsights,
  },
};

export function createPreviewAccount(
  platform: Platform,
  copy: number,
): SocialAccount {
  const preset = connectionPresets[platform];
  const suffix = copy > 1 ? ` ${copy}` : "";
  const usernameSuffix = copy > 1 ? `${copy}` : "";

  return createAccount({
    ...preset,
    id: copy > 1 ? `${preset.id}-${copy}` : preset.id,
    username: `${preset.username}${usernameSuffix}`,
    displayName: `${preset.displayName}${suffix}`,
    status: "connected",
    connectedAt: new Date().toISOString(),
    lastSyncedAt: new Date().toISOString(),
  });
}
