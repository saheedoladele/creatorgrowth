import {
  formatInteger,
  formatMetric,
} from "@/features/social-accounts/lib/format";
import { postsLabel } from "@/features/social-accounts/lib/summary";
import type { SocialAccount } from "@/features/social-accounts/types/social-account";

export function AccountStatistics({ account }: { account: SocialAccount }) {
  const items = [
    {
      label: "Followers",
      value: formatMetric(account.metrics.followers, "count"),
    },
    ...(account.metrics.following == null
      ? []
      : [
          {
            label: "Following",
            value: formatInteger(account.metrics.following),
          },
        ]),
    ...(account.metrics.posts == null
      ? []
      : [
          {
            label: postsLabel(account.platform),
            value: formatInteger(account.metrics.posts),
          },
        ]),
    {
      label: "Engagement rate",
      value: formatMetric(account.metrics.engagementRate, "rate"),
    },
    {
      label: "Average reach",
      value: formatMetric(account.metrics.averageReach, "count"),
    },
  ];

  return (
    <section aria-label="Account statistics">
      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-card ring-foreground/10 rounded-xl px-4 py-3 ring-1"
          >
            <dt className="text-label text-muted-foreground">{item.label}</dt>
            <dd className="text-foreground mt-1 text-lg font-medium tabular-nums">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
