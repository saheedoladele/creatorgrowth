"use client";

import { useSyncExternalStore } from "react";

import { socialAccountService } from "@/features/social-accounts/services/social-account-service";

export function useSocialAccounts() {
  const accounts = useSyncExternalStore(
    socialAccountService.subscribe,
    socialAccountService.getAccounts,
    socialAccountService.getServerAccounts,
  );

  return {
    accounts,
    connectAccount: socialAccountService.connectAccount,
    disconnectAccount: socialAccountService.disconnectAccount,
    reconnectAccount: socialAccountService.reconnectAccount,
    refreshAccount: socialAccountService.refreshAccount,
  };
}

export function useSocialAccount(accountId: string) {
  const { accounts, ...actions } = useSocialAccounts();
  const account = accounts.find((item) => item.id === accountId) ?? null;
  return { account, ...actions };
}
