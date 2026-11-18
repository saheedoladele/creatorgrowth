"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { EmptyState } from "@/components/shared/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { AccountDetailsHeader } from "@/features/social-accounts/components/account-details-header";
import { AccountInformation } from "@/features/social-accounts/components/account-information";
import { AccountPerformanceChart } from "@/features/social-accounts/components/account-performance-chart";
import { AccountStatistics } from "@/features/social-accounts/components/account-statistics";
import { useSocialAccount } from "@/features/social-accounts/hooks/use-social-accounts";
import { platformLabels } from "@/features/social-accounts/lib/summary";

export function AccountDetailView() {
  const params = useParams<{ accountId: string }>();
  const accountId = params.accountId ?? "";
  const { account } = useSocialAccount(accountId);

  if (!account) {
    return (
      <EmptyState
        title="Account not in this preview"
        description="This workspace does not have a demonstration account with that id."
        action={
          <Link
            href="/social-accounts"
            className={buttonVariants({ variant: "outline" })}
          >
            Back to social accounts
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <AccountDetailsHeader account={account} />
      <p className="text-caption text-muted-foreground">
        Figures on this page are demonstration data. They are not live results
        from {platformLabels[account.platform]}.
      </p>
      <AccountStatistics account={account} />
      <div className="grid gap-4 xl:grid-cols-5">
        <div className="min-w-0 xl:col-span-3">
          <AccountPerformanceChart key={account.id} account={account} />
        </div>
        <div className="min-w-0 xl:col-span-2">
          <AccountInformation account={account} />
        </div>
      </div>
    </div>
  );
}
