"use client";

import {
  platformLabels,
  statusLabels,
} from "@/features/social-accounts/lib/summary";
import type {
  PlatformFilter,
  StatusFilter,
} from "@/features/social-accounts/types/social-account";
import { cn } from "@/lib/utils";

const platformOptions: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "All Platforms" },
  { value: "facebook", label: platformLabels.facebook },
  { value: "instagram", label: platformLabels.instagram },
  { value: "tiktok", label: platformLabels.tiktok },
];

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "connected", label: statusLabels.connected },
  { value: "expired", label: statusLabels.expired },
  { value: "attention", label: statusLabels.attention },
  { value: "disconnected", label: statusLabels.disconnected },
];

type SocialAccountFiltersProps = {
  platform: PlatformFilter;
  status: StatusFilter;
  onPlatformChange: (platform: PlatformFilter) => void;
  onStatusChange: (status: StatusFilter) => void;
};

export function SocialAccountFilters({
  platform,
  status,
  onPlatformChange,
  onStatusChange,
}: SocialAccountFiltersProps) {
  return (
    <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <FilterGroup
        label="Platform"
        value={platform}
        options={platformOptions}
        onChange={onPlatformChange}
      />
      <FilterGroup
        label="Connection status"
        value={status}
        options={statusOptions}
        onChange={onStatusChange}
      />
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const labelId = `account-filter-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="min-w-0">
      <p id={labelId} className="text-label text-muted-foreground mb-2">
        {label}
      </p>
      <div
        role="group"
        aria-labelledby={labelId}
        className="flex flex-wrap gap-1.5"
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "focus-visible:ring-ring/50 rounded-md px-2.5 py-1 text-xs font-medium focus-visible:ring-3 focus-visible:outline-none",
                selected
                  ? "bg-card text-foreground ring-foreground/10 shadow-sm ring-1"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
