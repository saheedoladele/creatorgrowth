import type { Metadata } from "next";

import { ConnectAccountView } from "@/features/social-accounts/components/connect-account-view";

export const metadata: Metadata = {
  title: "Connect account",
  description:
    "Add a demonstration Facebook, Instagram, or TikTok account to this workspace.",
};

export default function ConnectSocialAccountPage() {
  return <ConnectAccountView />;
}
