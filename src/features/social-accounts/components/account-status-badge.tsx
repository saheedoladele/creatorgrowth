import {
  StatusBadge,
  type StatusBadgeStatus,
} from "@/components/shared/status-badge";
import { statusLabels } from "@/features/social-accounts/lib/summary";
import type { AccountStatus } from "@/features/social-accounts/types/social-account";

const tones: Record<AccountStatus, StatusBadgeStatus> = {
  connected: "success",
  expired: "warning",
  attention: "danger",
  disconnected: "neutral",
};

export function AccountStatusBadge({ status }: { status: AccountStatus }) {
  return (
    <StatusBadge status={tones[status]}>{statusLabels[status]}</StatusBadge>
  );
}
