import {
  createPreviewAccount,
  seedAccounts,
} from "@/features/social-accounts/data/social-account-mock-data";
import type {
  Platform,
  ServiceResult,
  SocialAccount,
} from "@/features/social-accounts/types/social-account";

/**
 * In-memory social account preview.
 *
 * Reads return the current tab's snapshot. Mutations wait briefly so the UI
 * can show a loading state, then update that snapshot. Nothing here contacts
 * Facebook, Instagram, TikTok, or a backend.
 */

const listeners = new Set<() => void>();
let snapshot: readonly SocialAccount[] = seedAccounts;

function wait(ms = 650) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function commit(next: readonly SocialAccount[]) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function failure(message: string): ServiceResult<never> {
  return { ok: false, message };
}

function success(account: SocialAccount): ServiceResult<SocialAccount> {
  return { ok: true, account };
}

function replace(
  id: string,
  updater: (account: SocialAccount) => SocialAccount,
) {
  const current = snapshot.find((account) => account.id === id);
  if (!current) return null;
  const nextAccount = updater(current);
  commit(
    snapshot.map((account) => (account.id === id ? nextAccount : account)),
  );
  return nextAccount;
}

export const socialAccountService = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getAccounts() {
    return snapshot;
  },

  getServerAccounts() {
    return seedAccounts;
  },

  getAccountById(id: string) {
    return snapshot.find((account) => account.id === id) ?? null;
  },

  async connectAccount(
    platform: Platform,
  ): Promise<ServiceResult<SocialAccount>> {
    await wait(800);
    const existing = snapshot.filter(
      (account) => account.platform === platform,
    );
    const copy =
      existing.filter((account) =>
        account.id.startsWith(previewIdPrefix(platform)),
      ).length + 1;
    const account = createPreviewAccount(platform, copy);
    commit([account, ...snapshot]);
    return success(account);
  },

  async disconnectAccount(id: string): Promise<ServiceResult<SocialAccount>> {
    await wait();
    const current = snapshot.find((account) => account.id === id);
    if (!current)
      return failure("That preview account is not in this workspace.");
    if (current.status === "disconnected") {
      return failure("This preview account is already disconnected.");
    }

    const account = replace(id, (item) => ({
      ...item,
      status: "disconnected",
    }));
    return account
      ? success(account)
      : failure("That preview account is not in this workspace.");
  },

  async reconnectAccount(id: string): Promise<ServiceResult<SocialAccount>> {
    await wait();
    const current = snapshot.find((account) => account.id === id);
    if (!current)
      return failure("That preview account is not in this workspace.");
    if (current.status === "connected") {
      return failure("This preview account is already connected.");
    }

    const syncedAt = new Date().toISOString();
    const account = replace(id, (item) => ({
      ...item,
      status: "connected",
      attentionNote: undefined,
      connectedAt: item.connectedAt ?? syncedAt,
      lastSyncedAt: syncedAt,
    }));
    return account
      ? success(account)
      : failure("That preview account is not in this workspace.");
  },

  async refreshAccount(id: string): Promise<ServiceResult<SocialAccount>> {
    await wait();
    const current = snapshot.find((account) => account.id === id);
    if (!current)
      return failure("That preview account is not in this workspace.");

    const syncedAt = new Date().toISOString();
    const account = replace(id, (item) => refreshSnapshot(item, syncedAt));
    return account
      ? success(account)
      : failure("That preview account is not in this workspace.");
  },
};

function previewIdPrefix(platform: Platform) {
  if (platform === "facebook") return "harbor-and-co";
  if (platform === "instagram") return "harbor-studio";
  return "harbor-creates";
}

function refreshSnapshot(
  account: SocialAccount,
  syncedAt: string,
): SocialAccount {
  const canAdjust =
    account.status === "connected" || account.status === "attention";
  const followers =
    canAdjust && account.metrics.followers != null
      ? Math.round(account.metrics.followers * 1.004)
      : account.metrics.followers;
  const history = account.history.map((point, index) =>
    canAdjust && index === account.history.length - 1 && followers != null
      ? { ...point, followers }
      : point,
  );

  return {
    ...account,
    lastSyncedAt: syncedAt,
    metrics: { ...account.metrics, followers },
    history,
  };
}
