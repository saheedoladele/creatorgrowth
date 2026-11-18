"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { AccountStatusBadge } from "@/features/social-accounts/components/account-status-badge";
import { PlatformMark } from "@/features/social-accounts/components/platform-mark";
import { useAccountActions } from "@/features/social-accounts/hooks/use-account-actions";
import {
  formatHandle,
  formatMetric,
} from "@/features/social-accounts/lib/format";
import { formatTimestamp } from "@/features/social-accounts/lib/dates";
import { platformLabels } from "@/features/social-accounts/lib/summary";
import type { SocialAccount } from "@/features/social-accounts/types/social-account";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SocialAccountCard({ account }: { account: SocialAccount }) {
  const router = useRouter();
  const actions = useAccountActions(account);
  const href = `/social-accounts/${account.id}`;
  const busy = actions.pending !== null;
  const showReconnect = account.status !== "connected";

  return (
    <Card className="h-full" aria-busy={busy}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <PlatformMark platform={account.platform} />
          <div className="min-w-0">
            <p className="text-card-title text-foreground truncate">
              {platformLabels[account.platform]}
            </p>
            <p className="text-caption text-muted-foreground">
              Preview account
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AccountStatusBadge status={account.status} />
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={`More actions for ${account.displayName}`}
              className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-44">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push(href)}>
                  View account details
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={busy}
                  onClick={() => void actions.refresh()}
                >
                  Refresh account data
                </DropdownMenuItem>
                {showReconnect ? (
                  <DropdownMenuItem
                    disabled={busy}
                    onClick={() => void actions.reconnect()}
                  >
                    Reconnect account
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuGroup>
              {account.status !== "disconnected" ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={busy}
                    onClick={actions.requestDisconnect}
                  >
                    Disconnect account
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>{account.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <Link
              href={href}
              className="text-card-title text-foreground focus-visible:ring-ring/50 block truncate rounded-sm hover:underline focus-visible:ring-3 focus-visible:outline-none"
            >
              {account.displayName}
            </Link>
            <p className="text-small text-muted-foreground truncate">
              {formatHandle(account.platform, account.username)}
            </p>
          </div>
        </div>
        <p className="text-small text-muted-foreground">
          {account.accountType}
        </p>
        {account.attentionNote ? (
          <p className="text-caption text-muted-foreground">
            {account.attentionNote}
          </p>
        ) : null}
        <dl className="grid grid-cols-2 gap-3">
          <div>
            <dt className="text-caption text-muted-foreground">Followers</dt>
            <dd className="text-foreground text-sm font-medium tabular-nums">
              {formatMetric(account.metrics.followers, "count")}
            </dd>
          </div>
          <div>
            <dt className="text-caption text-muted-foreground">
              Engagement rate
            </dt>
            <dd className="text-foreground text-sm font-medium tabular-nums">
              {formatMetric(account.metrics.engagementRate, "rate")}
            </dd>
          </div>
        </dl>
        {actions.message ? (
          <p className="text-caption text-muted-foreground" role="status">
            {actions.message}
          </p>
        ) : null}
      </CardContent>
      <CardFooter>
        <p className="text-caption text-muted-foreground">
          {account.lastSyncedAt
            ? `Last synchronized ${formatTimestamp(account.lastSyncedAt)}`
            : "Not synchronized in this preview"}
        </p>
      </CardFooter>
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
    </Card>
  );
}
