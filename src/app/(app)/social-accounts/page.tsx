import type { Metadata } from "next";

import { SocialAccountsView } from "@/features/social-accounts/components/social-accounts-view";

export const metadata: Metadata = {
  title: "Social Accounts",
  description: "Manage your connected social media accounts in one place.",
};

export default function SocialAccountsPage() {
  return <SocialAccountsView />;
}
