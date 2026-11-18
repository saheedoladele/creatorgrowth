"use client";

import { LoaderCircle, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dateRangeOptions } from "@/features/dashboard/lib/derive-dashboard";
import { formatDateSpan } from "@/features/dashboard/lib/dates";
import type { DateRangePreset } from "@/features/dashboard/types/dashboard";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  range: DateRangePreset;
  onRangeChange: (range: DateRangePreset) => void;
  customStart: string;
  customEnd: string;
  onCustomStartChange: (value: string) => void;
  onCustomEndChange: (value: string) => void;
  rangeValid: boolean;
  startDate: string;
  endDate: string;
  refreshing: boolean;
  updatedAt: Date | null;
  onRefresh: () => void;
};

function isDateRange(value: string): value is DateRangePreset {
  return dateRangeOptions.some((option) => option.value === value);
}

export function DashboardHeader({
  range,
  onRangeChange,
  customStart,
  customEnd,
  onCustomStartChange,
  onCustomEndChange,
  rangeValid,
  startDate,
  endDate,
  refreshing,
  updatedAt,
  onRefresh,
}: DashboardHeaderProps) {
  const updatedLabel = updatedAt
    ? `Sample series reloaded at ${updatedAt.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })}.`
    : "Demonstration data for this preview. These figures are not live platform results.";

  return (
    <div className="space-y-4">
      <PageHeader
        title="Dashboard"
        description="Here's an overview of your social media performance."
        actions={
          <>
            <Select
              value={range}
              onValueChange={(value) => {
                if (typeof value === "string" && isDateRange(value)) {
                  onRangeChange(value);
                }
              }}
            >
              <SelectTrigger aria-label="Date range" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              onClick={onRefresh}
              disabled={refreshing}
              aria-busy={refreshing}
            >
              {refreshing ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <RefreshCw />
              )}
              {refreshing ? "Refreshing" : "Refresh"}
            </Button>
            <Link href="/campaigns/new" className={cn(buttonVariants())}>
              <Plus />
              Create Campaign
            </Link>
          </>
        }
      />
      {range === "custom" ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="space-y-1" htmlFor="dashboard-start">
            <span className="text-label text-muted-foreground">Start</span>
            <Input
              id="dashboard-start"
              type="date"
              value={customStart}
              max={customEnd || undefined}
              onChange={(event) => onCustomStartChange(event.target.value)}
            />
          </label>
          <label className="space-y-1" htmlFor="dashboard-end">
            <span className="text-label text-muted-foreground">End</span>
            <Input
              id="dashboard-end"
              type="date"
              value={customEnd}
              min={customStart || undefined}
              onChange={(event) => onCustomEndChange(event.target.value)}
            />
          </label>
        </div>
      ) : null}
      <p className="text-caption text-muted-foreground" aria-live="polite">
        {rangeValid && startDate && endDate
          ? `${formatDateSpan(startDate, endDate)}. ${updatedLabel}`
          : "Choose an end date on or after the start date."}
      </p>
    </div>
  );
}
