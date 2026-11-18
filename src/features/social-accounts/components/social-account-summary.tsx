import { Percent, Share2, Users, Waypoints } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import {
  formatCompact,
  formatRate,
} from "@/features/social-accounts/lib/format";
import type { AccountSummary } from "@/features/social-accounts/lib/summary";

export function SocialAccountSummary({ summary }: { summary: AccountSummary }) {
  return (
    <section
      aria-label="Account summary"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <StatCard
        title="Total Connected Accounts"
        value={formatCompact(summary.connectedAccounts)}
        description="Preview accounts with status Connected."
        icon={Share2}
      />
      <StatCard
        title="Total Followers"
        value={formatCompact(summary.followers)}
        description="Followers on connected preview accounts."
        icon={Users}
      />
      <StatCard
        title="Average Engagement Rate"
        value={
          summary.averageEngagementRate == null
            ? "—"
            : formatRate(summary.averageEngagementRate)
        }
        description="Mean rate across connected preview accounts."
        icon={Percent}
      />
      <StatCard
        title="Active Platforms"
        value={String(summary.activePlatforms)}
        description="Platforms with a connected preview account."
        icon={Waypoints}
      />
    </section>
  );
}
