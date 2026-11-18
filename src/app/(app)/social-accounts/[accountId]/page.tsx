import type { Metadata } from "next";
import { Suspense } from "react";

import { LoadingState } from "@/components/shared/loading-state";
import { AccountDetailView } from "@/features/social-accounts/components/account-detail-view";
import { seedAccountIds } from "@/features/social-accounts/data/social-account-mock-data";

export const metadata: Metadata = {
  title: "Social account",
  description: "Demonstration details for a preview social account.",
};

export function generateStaticParams() {
  return seedAccountIds.map((accountId) => ({ accountId }));
}

export default function SocialAccountDetailPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading account" lines={4} />}>
      <AccountDetailView />
    </Suspense>
  );
}
