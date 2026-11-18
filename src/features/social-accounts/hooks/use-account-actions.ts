"use client";

import { useState } from "react";

import { useSocialAccounts } from "@/features/social-accounts/hooks/use-social-accounts";
import type { SocialAccount } from "@/features/social-accounts/types/social-account";

type PendingAction = "refresh" | "reconnect" | "disconnect" | null;

export function useAccountActions(account: SocialAccount) {
  const { refreshAccount, reconnectAccount, disconnectAccount } =
    useSocialAccounts();
  const [pending, setPending] = useState<PendingAction>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function run(
    action: PendingAction,
    work: () => Promise<
      { ok: true; account: SocialAccount } | { ok: false; message: string }
    >,
    success: string,
    progress: string,
  ) {
    setPending(action);
    setMessage(progress);
    const result = await work();
    setPending(null);
    setMessage(result.ok ? success : result.message);
  }

  function refresh() {
    return run(
      "refresh",
      () => refreshAccount(account.id),
      "Preview data refreshed. No platform was contacted.",
      "Refreshing preview data…",
    );
  }

  function reconnect() {
    return run(
      "reconnect",
      () => reconnectAccount(account.id),
      "Preview connection restored. This is not a platform authorization.",
      "Restoring the preview connection…",
    );
  }

  function disconnect() {
    return run(
      "disconnect",
      () => disconnectAccount(account.id),
      "Preview account marked disconnected.",
      "Updating the preview account…",
    );
  }

  return {
    pending,
    message,
    confirmOpen,
    setConfirmOpen,
    refresh,
    reconnect,
    disconnect,
    requestDisconnect: () => setConfirmOpen(true),
  };
}
