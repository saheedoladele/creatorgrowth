import type { ReactNode } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { SocialAccountCard } from "@/features/social-accounts/components/social-account-card";
import type { SocialAccount } from "@/features/social-accounts/types/social-account";

export function SocialAccountGrid({
  accounts,
  filtered,
  emptyAction,
}: {
  accounts: readonly SocialAccount[];
  filtered: boolean;
  emptyAction?: ReactNode;
}) {
  if (accounts.length === 0) {
    return (
      <EmptyState
        title={
          filtered
            ? "No accounts match these filters"
            : "No preview accounts yet"
        }
        description={
          filtered
            ? "Try another platform or connection status."
            : "Add a demonstration account to see it in this workspace."
        }
        action={emptyAction}
      />
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {accounts.map((account) => (
        <li key={account.id} className="min-w-0">
          <SocialAccountCard account={account} />
        </li>
      ))}
    </ul>
  );
}
