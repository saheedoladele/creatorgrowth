import {
  ChartColumn,
  Plus,
  Share2,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { SectionHeader } from "@/components/shared/section-header";

const actions: readonly {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/campaigns/new",
    title: "Create Campaign",
    description: "Start a promotion or collaboration.",
    icon: Plus,
  },
  {
    href: "/social-accounts",
    title: "Connect Social Account",
    description: "Open account management. Authorization is not available yet.",
    icon: Share2,
  },
  {
    href: "/analytics",
    title: "View Analytics",
    description: "Open the analytics workspace.",
    icon: ChartColumn,
  },
  {
    href: "/wallet",
    title: "Manage Wallet",
    description: "Review balance and funds for this workspace.",
    icon: Wallet,
  },
];

export function QuickActions() {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Quick actions"
        description="Shortcuts into the rest of the workspace."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="border-border bg-card hover:bg-muted/40 focus-visible:ring-ring/50 flex items-start gap-3 rounded-xl border p-4 transition-colors focus-visible:ring-3 focus-visible:outline-none"
            >
              <span className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {action.title}
                </span>
                <span className="text-caption text-muted-foreground mt-0.5 block">
                  {action.description}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
