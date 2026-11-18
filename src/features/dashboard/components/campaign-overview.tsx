import { Megaphone } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import {
  StatusBadge,
  type StatusBadgeStatus,
} from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlatformMark } from "@/features/dashboard/components/platform-mark";
import { formatDateSpan } from "@/features/dashboard/lib/dates";
import {
  campaignStatusLabels,
  campaignTypeLabels,
  platformLabel,
} from "@/features/dashboard/lib/derive-dashboard";
import { formatCompact } from "@/features/dashboard/lib/format";
import type {
  CampaignRecord,
  CampaignStatus,
} from "@/features/dashboard/types/dashboard";
import { cn } from "@/lib/utils";

const statusTone: Record<CampaignStatus, StatusBadgeStatus> = {
  active: "success",
  scheduled: "info",
  completed: "neutral",
  paused: "warning",
};

export function CampaignOverview({
  campaigns,
}: {
  campaigns: readonly CampaignRecord[];
}) {
  return (
    <Card className="min-w-0">
      <CardContent className="space-y-4">
        <SectionHeader
          title="Recent campaigns"
          description="Campaign delivery for this preview. These totals are separate from account reach above."
          actions={
            <Link
              href="/campaigns"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              View all campaigns
            </Link>
          }
        />
        {campaigns.length === 0 ? (
          <EmptyState
            title="No campaigns in this range"
            description="Sample campaigns will appear when their dates overlap the range you select."
            icon={Megaphone}
            action={
              <Link href="/campaigns/new" className={cn(buttonVariants())}>
                Create Campaign
              </Link>
            }
          />
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Demonstration campaigns for the selected dates
                </caption>
                <thead className="text-caption text-muted-foreground border-border border-b">
                  <tr>
                    <th scope="col" className="py-2 pr-3 font-medium">
                      Campaign
                    </th>
                    <th scope="col" className="px-3 py-2 font-medium">
                      Platform
                    </th>
                    <th scope="col" className="px-3 py-2 font-medium">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-2 font-medium">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-right font-medium"
                    >
                      Reach
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-right font-medium"
                    >
                      Engagement
                    </th>
                    <th scope="col" className="py-2 pl-3 font-medium">
                      Dates
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="border-border border-b last:border-0"
                    >
                      <th scope="row" className="py-3 pr-3 font-medium">
                        <Link
                          href="/campaigns"
                          className="hover:text-primary focus-visible:ring-ring/50 rounded-sm underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:outline-none"
                        >
                          {campaign.name}
                        </Link>
                      </th>
                      <td className="px-3 py-3">
                        {platformLabel(campaign.platform)}
                      </td>
                      <td className="px-3 py-3">
                        {campaignTypeLabels[campaign.type]}
                      </td>
                      <td className="px-3 py-3">
                        <CampaignStatusBadge status={campaign.status} />
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums">
                        {formatCompact(campaign.reach)}
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums">
                        {formatCompact(campaign.engagement)}
                      </td>
                      <td className="py-3 pl-3 whitespace-nowrap">
                        {formatDateSpan(campaign.startDate, campaign.endDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="space-y-3 lg:hidden">
              {campaigns.map((campaign) => (
                <li
                  key={campaign.id}
                  className="border-border rounded-lg border p-3"
                >
                  <div className="flex items-start gap-3">
                    <PlatformMark platform={campaign.platform} />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href="/campaigns"
                          className="text-sm font-medium underline-offset-4 hover:underline"
                        >
                          {campaign.name}
                        </Link>
                        <CampaignStatusBadge status={campaign.status} />
                      </div>
                      <p className="text-caption text-muted-foreground">
                        {platformLabel(campaign.platform)} ·{" "}
                        {campaignTypeLabels[campaign.type]}
                      </p>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <dt className="text-caption text-muted-foreground">
                            Reach
                          </dt>
                          <dd className="tabular-nums">
                            {formatCompact(campaign.reach)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-caption text-muted-foreground">
                            Engagement
                          </dt>
                          <dd className="tabular-nums">
                            {formatCompact(campaign.engagement)}
                          </dd>
                        </div>
                      </dl>
                      <p className="text-caption text-muted-foreground">
                        {formatDateSpan(campaign.startDate, campaign.endDate)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <StatusBadge status={statusTone[status]}>
      {campaignStatusLabels[status]}
    </StatusBadge>
  );
}
