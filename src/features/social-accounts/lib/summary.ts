import type {
  AccountStatus,
  Platform,
  PlatformFilter,
  SocialAccount,
  StatusFilter,
} from "@/features/social-accounts/types/social-account";

export type AccountSummary = {
  connectedAccounts: number;
  followers: number;
  averageEngagementRate: number | null;
  activePlatforms: number;
};

export function filterAccounts(
  accounts: readonly SocialAccount[],
  platform: PlatformFilter,
  status: StatusFilter,
) {
  return accounts.filter((account) => {
    const platformMatches = platform === "all" || account.platform === platform;
    const statusMatches = status === "all" || account.status === status;
    return platformMatches && statusMatches;
  });
}

export function summarizeAccounts(
  accounts: readonly SocialAccount[],
): AccountSummary {
  const connected = accounts.filter(
    (account) => account.status === "connected",
  );
  const rates = connected.flatMap((account) =>
    account.metrics.engagementRate == null
      ? []
      : [account.metrics.engagementRate],
  );
  const platforms = new Set<Platform>(
    connected.map((account) => account.platform),
  );

  return {
    connectedAccounts: connected.length,
    followers: connected.reduce(
      (total, account) => total + (account.metrics.followers ?? 0),
      0,
    ),
    averageEngagementRate: rates.length
      ? rates.reduce((total, rate) => total + rate, 0) / rates.length
      : null,
    activePlatforms: platforms.size,
  };
}

export function postsLabel(platform: Platform) {
  return platform === "tiktok" ? "Videos" : "Posts";
}

export const platformLabels: Record<Platform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

export const statusLabels: Record<AccountStatus, string> = {
  connected: "Connected",
  expired: "Expired",
  attention: "Attention Required",
  disconnected: "Disconnected",
};
