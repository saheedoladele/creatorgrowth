"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PageHeader } from "@/components/shared/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConnectAccountPanel } from "@/features/social-accounts/components/connect-account-panel";
import { PlatformConnectCard } from "@/features/social-accounts/components/platform-connect-card";
import { platformCatalog } from "@/features/social-accounts/data/social-account-mock-data";
import { useSocialAccounts } from "@/features/social-accounts/hooks/use-social-accounts";
import type { Platform } from "@/features/social-accounts/types/social-account";

type Phase = "review" | "authorizing" | "ready" | "saving" | "success";

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function ConnectAccountView() {
  const router = useRouter();
  const { connectAccount } = useSocialAccounts();
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [phase, setPhase] = useState<Phase>("review");
  const [message, setMessage] = useState<string | null>(null);

  function selectPlatform(next: Platform) {
    setPlatform(next);
    setPhase("review");
    setMessage(null);
  }

  async function start() {
    setMessage(null);
    setPhase("authorizing");
    await wait(800);
    setPhase("ready");
  }

  async function complete() {
    if (!platform) return;
    setMessage(null);
    setPhase("saving");
    const result = await connectAccount(platform);
    if (!result.ok) {
      setPhase("ready");
      setMessage(result.message);
      return;
    }
    setPhase("success");
    await wait(700);
    router.push("/social-accounts");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Connect account"
        description="Choose a platform to add a demonstration account."
        actions={
          <Link
            href="/social-accounts"
            className="text-small text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm focus-visible:ring-3 focus-visible:outline-none"
          >
            Back to social accounts
          </Link>
        }
      />
      <Alert>
        <AlertTitle>Demonstration connection</AlertTitle>
        <AlertDescription>
          This flow does not open Facebook, Instagram, or TikTok, and it does
          not grant permissions. The account it adds is sample data in this
          workspace.
        </AlertDescription>
      </Alert>
      <div className="grid gap-4 lg:grid-cols-3">
        {platformCatalog.map((entry) => (
          <PlatformConnectCard
            key={entry.platform}
            entry={entry}
            selected={platform === entry.platform}
            onSelect={() => selectPlatform(entry.platform)}
          />
        ))}
      </div>
      {platform ? (
        <ConnectAccountPanel
          platform={platform}
          phase={phase}
          message={message}
          onStart={() => void start()}
          onComplete={() => void complete()}
          onCancel={() => {
            setPlatform(null);
            setPhase("review");
            setMessage(null);
          }}
        />
      ) : null}
    </div>
  );
}
