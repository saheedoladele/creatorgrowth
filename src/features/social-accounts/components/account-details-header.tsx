"use client";

import { LoaderCircle, RefreshCw, Unplug } from "lucide-react";
import Link from "next/link";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { AccountStatusBadge } from "@/features/social-accounts/components/account-status-badge";
import { PlatformMark } from "@/features/social-accounts/components/platform-mark";
import { useAccountActions } from "@/features/social-accounts/hooks/use-account-actions";
import { formatHandle } from "@/features/social-accounts/lib/format";
import { formatTimestamp } from "@/features/social-accounts/lib/dates";
import { platformLabels } from "@/features/social-accounts/lib/summary";
import type { SocialAccount } from "@/features/social-accounts/types/social-account";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AccountDetailsHeader({ account }: { account: SocialAccount }) {
  const actions = useAccountActions(account);
  const busy = actions.pending !== null;

  return (
    <header className="space-y-4">
      <Link
        href="/social-accounts"
        className="text-small text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm focus-visible:ring-3 focus-visible:outline-none"
      >
        All social accounts
      </Link>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <PlatformMark platform={account.platform} className="size-11" />
          <Avatar size="lg">
            <AvatarFallback>{account.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 space-y-1">
            <h1 className="text-page-title text-foreground truncate">
              {account.displayName}
            </h1>
            <p className="text-small text-muted-foreground">
              {platformLabels[account.platform]} ·{" "}
              {formatHandle(account.platform, account.username)} ·{" "}
              {account.accountType}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <AccountStatusBadge status={account.status} />
              <p className="text-caption text-muted-foreground">
                {account.lastSyncedAt
                  ? `Last synchronized ${formatTimestamp(account.lastSyncedAt)}`
                  : "Not synchronized in this preview"}
              </p>
            </div>
            {account.attentionNote ? (
              <p className="text-small text-muted-foreground">
                {account.attentionNote}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            disabled={busy}
            aria-busy={actions.pending === "refresh"}
            onClick={() => void actions.refresh()}
          >
            {actions.pending === "refresh" ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <RefreshCw />
            )}
            {actions.pending === "refresh" ? "Refreshing" : "Refresh"}
          </Button>
          <Button
            variant="outline"
            disabled={busy}
            aria-busy={actions.pending === "reconnect"}
            onClick={() => void actions.reconnect()}
          >
            {actions.pending === "reconnect" ? "Reconnecting" : "Reconnect"}
          </Button>
          <Button
            variant="destructive"
            disabled={busy || account.status === "disconnected"}
            onClick={actions.requestDisconnect}
          >
            <Unplug />
            Disconnect
          </Button>
        </div>
      </div>
      {actions.message ? (
        <p className="text-small text-muted-foreground" role="status">
          {actions.message}
        </p>
      ) : null}
      <ConfirmDialog
        open={actions.confirmOpen}
        onOpenChange={actions.setConfirmOpen}
        title={`Disconnect ${account.displayName}?`}
        description="This marks the preview account as disconnected in this workspace. Facebook, Instagram, and TikTok are not contacted."
        confirmLabel="Disconnect"
        confirmVariant="destructive"
        onConfirm={() => {
          void actions.disconnect();
        }}
      />
    </header>
  );
}
