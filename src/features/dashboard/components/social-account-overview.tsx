import Link from "next/link";

import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlatformMark } from "@/features/dashboard/components/platform-mark";
import { platformLabel } from "@/features/dashboard/lib/derive-dashboard";
import { formatCompact, formatRate } from "@/features/dashboard/lib/format";
import type {
  PlatformSummary,
  SocialAccount,
} from "@/features/dashboard/types/dashboard";
import { cn } from "@/lib/utils";

export function SocialAccountOverview({
  accounts,
  platforms,
}: {
  accounts: readonly SocialAccount[];
  platforms: readonly PlatformSummary[];
}) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Social accounts"
        description="Preview accounts only. Facebook, Instagram, and TikTok have not authorized this workspace."
        actions={
          <Link
            href="/social-accounts"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Manage social accounts
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {accounts.map((account) => {
          const summary = platforms.find(
            (platform) => platform.platform === account.platform,
          );
          return (
            <Card key={account.id} size="sm">
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <PlatformMark platform={account.platform} />
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">
                      {account.name}
                    </h3>
                    <p className="text-caption text-muted-foreground truncate">
                      {platformLabel(account.platform)} · {account.handle}
                    </p>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-caption text-muted-foreground">Type</dt>
                    <dd>{account.accountType}</dd>
                  </div>
                  <div>
                    <dt className="text-caption text-muted-foreground">
                      Followers
                    </dt>
                    <dd className="tabular-nums">
                      {formatCompact(account.followers)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-caption text-muted-foreground">
                      Engagement rate
                    </dt>
                    <dd className="tabular-nums">
                      {formatRate(summary?.engagementRate ?? 0)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-caption text-muted-foreground">
                      Status
                    </dt>
                    <dd>
                      <StatusBadge status="info">Preview</StatusBadge>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
