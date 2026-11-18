"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { SocialAccountFilters } from "@/features/social-accounts/components/social-account-filters";
import { SocialAccountGrid } from "@/features/social-accounts/components/social-account-grid";
import { SocialAccountSummary } from "@/features/social-accounts/components/social-account-summary";
import { useSocialAccounts } from "@/features/social-accounts/hooks/use-social-accounts";
import {
  filterAccounts,
  summarizeAccounts,
} from "@/features/social-accounts/lib/summary";
import type {
  PlatformFilter,
  StatusFilter,
} from "@/features/social-accounts/types/social-account";

export function SocialAccountsView() {
  const { accounts } = useSocialAccounts();
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const summary = useMemo(() => summarizeAccounts(accounts), [accounts]);
  const visible = useMemo(
    () => filterAccounts(accounts, platform, status),
    [accounts, platform, status],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Social Accounts"
        description="Manage your connected social media accounts in one place."
        actions={
          <Link href="/social-accounts/connect" className={buttonVariants()}>
            <Plus />
            Connect Account
          </Link>
        }
      />
      <p className="text-caption text-muted-foreground">
        Demonstration records for this workspace. A Connected status here is
        simulated and is not a platform authorization.
      </p>
      <SocialAccountSummary summary={summary} />
      <SocialAccountFilters
        platform={platform}
        status={status}
        onPlatformChange={setPlatform}
        onStatusChange={setStatus}
      />
      <SocialAccountGrid
        accounts={visible}
        filtered={platform !== "all" || status !== "all"}
        emptyAction={
          platform !== "all" || status !== "all" ? (
            <Button
              variant="outline"
              onClick={() => {
                setPlatform("all");
                setStatus("all");
              }}
            >
              Clear filters
            </Button>
          ) : (
            <Link
              href="/social-accounts/connect"
              className={buttonVariants({ variant: "outline" })}
            >
              Connect account
            </Link>
          )
        }
      />
    </div>
  );
}
