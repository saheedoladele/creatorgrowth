import {
  ChartColumn,
  CreditCard,
  Layers,
  LayoutDashboard,
  Megaphone,
  Settings,
  Share2,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";

import type { Breadcrumb, NavGroup } from "@/types/navigation";

export const navigation = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Social Accounts", href: "/social-accounts", icon: Share2 },
      { title: "Campaigns", href: "/campaigns", icon: Megaphone },
      { title: "Services", href: "/services", icon: Layers },
      { title: "Orders", href: "/orders", icon: ShoppingBag },
    ],
  },
  {
    label: "Insights",
    items: [{ title: "Analytics", href: "/analytics", icon: ChartColumn }],
  },
  {
    label: "Finance",
    items: [
      { title: "Wallet", href: "/wallet", icon: Wallet },
      { title: "Billing", href: "/billing", icon: CreditCard },
    ],
  },
  {
    label: "Workspace",
    items: [
      { title: "Team", href: "/settings/team", icon: Users },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
] as const satisfies readonly NavGroup[];

const navigationHrefs = navigation.flatMap((group) =>
  group.items.map((item) => item.href),
);

/**
 * Labels for path segments that should not be shown as raw URL text.
 * Whole-path entries in `breadcrumbOverrides` take precedence.
 */
const routeSegmentLabels: Record<string, string> = {
  dashboard: "Dashboard",
  "social-accounts": "Social Accounts",
  campaigns: "Campaigns",
  new: "New",
  services: "Services",
  orders: "Orders",
  analytics: "Analytics",
  wallet: "Wallet",
  billing: "Billing",
  notifications: "Notifications",
  settings: "Settings",
  profile: "Profile",
  team: "Team",
  security: "Security",
};

const breadcrumbOverrides: Record<string, readonly Breadcrumb[]> = {
  "/campaigns": [
    { label: "Campaigns", href: "/campaigns" },
    { label: "All Campaigns" },
  ],
  "/campaigns/new": [
    { label: "Campaigns", href: "/campaigns" },
    { label: "Create Campaign" },
  ],
};

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function humanizeSegment(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function isNavItemActive(pathname: string, href: string) {
  const current = normalizePathname(pathname);
  const matches = (candidate: string) =>
    current === candidate || current.startsWith(`${candidate}/`);

  if (!matches(href)) {
    return false;
  }

  return !navigationHrefs.some(
    (other) =>
      other !== href &&
      other.length > href.length &&
      other.startsWith(`${href}/`) &&
      matches(other),
  );
}

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const current = normalizePathname(pathname);
  const override = breadcrumbOverrides[current];

  if (override) {
    return [...override];
  }

  const segments = current.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = routeSegmentLabels[segment] ?? humanizeSegment(segment);
    const isLast = index === segments.length - 1;

    return isLast ? { label } : { label, href };
  });
}
