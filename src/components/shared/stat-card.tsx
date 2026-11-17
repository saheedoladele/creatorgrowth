import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatTrend = {
  value: string;
  direction?: "up" | "down" | "neutral";
  tone?: "positive" | "negative" | "neutral";
};

type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  icon?: LucideIcon;
  trend?: StatTrend;
};

const trendToneClassName = {
  positive: "text-success",
  negative: "text-destructive",
  neutral: "text-muted-foreground",
} as const;

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
} as const;

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatCardProps) {
  const tone = trend?.tone ?? "neutral";
  const TrendIcon = trend?.direction ? trendIcon[trend.direction] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-label text-muted-foreground">
          {title}
        </CardTitle>
        {Icon ? (
          <CardAction>
            <Icon className="text-muted-foreground size-4" aria-hidden="true" />
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-stat text-foreground">{value}</p>
        {trend ? (
          <p
            className={cn(
              "text-small flex items-center gap-1",
              trendToneClassName[tone],
            )}
          >
            {TrendIcon ? (
              <TrendIcon className="size-3.5" aria-hidden="true" />
            ) : null}
            <span>{trend.value}</span>
          </p>
        ) : null}
        {description ? (
          <p className="text-caption text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
