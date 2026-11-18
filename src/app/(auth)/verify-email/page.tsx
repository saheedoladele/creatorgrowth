import type { Metadata } from "next";

import { VerifyEmailPanel } from "@/features/auth/components/verify-email-panel";

export const metadata: Metadata = {
  title: "Verify email",
};

export default function VerifyEmailPage() {
  return <VerifyEmailPanel />;
}
