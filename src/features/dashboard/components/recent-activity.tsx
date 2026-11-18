import {
  Banknote,
  CircleCheck,
  FileText,
  Link2,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimestamp } from "@/features/dashboard/lib/dates";
import type {
  ActivityKind,
  ActivityRecord,
} from "@/features/dashboard/types/dashboard";

const activityIcons: Record<ActivityKind, LucideIcon> = {
  "campaign-created": Megaphone,
  "campaign-completed": CircleCheck,
  "account-preview": Link2,
  "report-generated": FileText,
  "payment-received": Banknote,
};

export function RecentActivity({
  activities,
}: {
  activities: readonly ActivityRecord[];
}) {
  return (
    <Card className="min-w-0">
      <CardContent className="space-y-4">
        <SectionHeader
          title="Recent activity"
          description="Sample workspace events, including preview account activity."
        />
        <ol className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.kind];
            return (
              <li key={activity.id} className="flex gap-3">
                <span className="bg-muted text-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm">{activity.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <time
                      className="text-caption text-muted-foreground"
                      dateTime={activity.occurredAt}
                    >
                      {formatTimestamp(activity.occurredAt)}
                    </time>
                    {activity.status ? (
                      <StatusBadge status="neutral">
                        {activity.status}
                      </StatusBadge>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
