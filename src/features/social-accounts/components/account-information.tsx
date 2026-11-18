import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { formatHandle } from "@/features/social-accounts/lib/format";
import { formatTimestamp } from "@/features/social-accounts/lib/dates";
import { platformLabels } from "@/features/social-accounts/lib/summary";
import type { SocialAccount } from "@/features/social-accounts/types/social-account";

export function AccountInformation({ account }: { account: SocialAccount }) {
  const rows = [
    { label: "Platform", value: platformLabels[account.platform] },
    {
      label: "Username",
      value: formatHandle(account.platform, account.username),
    },
    { label: "Account type", value: account.accountType },
    {
      label: "Connection date",
      value: account.connectedAt
        ? formatTimestamp(account.connectedAt)
        : "Not recorded in this preview",
    },
    {
      label: "Last synchronization",
      value: account.lastSyncedAt
        ? formatTimestamp(account.lastSyncedAt)
        : "Not synchronized in this preview",
    },
  ];

  return (
    <Card className="min-w-0">
      <CardContent className="space-y-4">
        <SectionHeader
          title="Account information"
          description="Sample profile details and the permission summary for this preview."
        />
        <dl className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4"
            >
              <dt className="text-small text-muted-foreground">{row.label}</dt>
              <dd className="text-foreground text-right text-sm">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="space-y-2">
          <h3 className="text-card-title text-foreground">
            Permission summary
          </h3>
          <p className="text-caption text-muted-foreground">
            These labels describe the demonstration. They are not permissions
            granted by {platformLabels[account.platform]}.
          </p>
          <ul className="space-y-2">
            {account.permissions.map((permission) => (
              <li key={permission.key} className="min-w-0">
                <p className="text-small text-foreground">
                  {permission.label}
                  <span className="text-muted-foreground">
                    {" "}
                    · {permission.included ? "Included" : "Not included"}
                  </span>
                </p>
                <p className="text-caption text-muted-foreground">
                  {permission.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
