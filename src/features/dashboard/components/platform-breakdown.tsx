import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { PlatformMark } from "@/features/dashboard/components/platform-mark";
import { platformLabel } from "@/features/dashboard/lib/derive-dashboard";
import { formatCompact, formatRate } from "@/features/dashboard/lib/format";
import type { PlatformSummary } from "@/features/dashboard/types/dashboard";

export function PlatformBreakdown({
  platforms,
}: {
  platforms: readonly PlatformSummary[];
}) {
  return (
    <Card className="min-w-0">
      <CardContent className="space-y-4">
        <SectionHeader
          title="Platform breakdown"
          description="How the selected dates split across the preview accounts."
        />
        <ul className="space-y-4">
          {platforms.map((platform) => (
            <li key={platform.platform} className="space-y-2">
              <div className="flex items-center gap-3">
                <PlatformMark platform={platform.platform} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {platformLabel(platform.platform)}
                  </p>
                  <p className="text-caption text-muted-foreground">
                    {formatRate(platform.engagementRate)} engagement rate
                  </p>
                </div>
                <p className="text-sm font-medium tabular-nums">
                  {formatCompact(platform.reach)}
                </p>
              </div>
              <div
                className="bg-muted h-1.5 overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${Math.min(platform.reachShare, 100)}%` }}
                />
              </div>
              <dl className="text-caption text-muted-foreground grid grid-cols-3 gap-2">
                <div>
                  <dt>Reach</dt>
                  <dd className="text-foreground tabular-nums">
                    {formatCompact(platform.reach)}
                  </dd>
                </div>
                <div>
                  <dt>Engagement</dt>
                  <dd className="text-foreground tabular-nums">
                    {formatCompact(platform.engagement)}
                  </dd>
                </div>
                <div>
                  <dt>Followers</dt>
                  <dd className="text-foreground tabular-nums">
                    {formatCompact(platform.followers)}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
