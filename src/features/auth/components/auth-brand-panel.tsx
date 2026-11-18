import { Megaphone, TrendingUp, Users } from "lucide-react";

import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-md",
        inverted
          ? "bg-primary-foreground text-primary"
          : "bg-primary text-primary-foreground",
        className,
      )}
    >
      <TrendingUp className="size-4" aria-hidden="true" />
    </span>
  );
}

const points = [
  {
    icon: Megaphone,
    title: "Campaigns in one place",
    description: "Plan promotions across Facebook, Instagram, and TikTok.",
  },
  {
    icon: Users,
    title: "Creators and clients",
    description: "Keep collaborations and paid work with the right workspace.",
  },
  {
    icon: TrendingUp,
    title: "Performance you can review",
    description: "Follow results without leaving the platform.",
  },
];

export function AuthBrandPanel() {
  return (
    <aside className="bg-primary text-primary-foreground relative hidden overflow-hidden lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-between lg:p-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-primary-foreground/10 absolute -top-20 -right-16 size-72 rounded-full" />
        <div className="bg-primary-foreground/5 absolute bottom-8 -left-24 size-80 rounded-full" />
        <div className="border-primary-foreground/20 absolute top-1/3 left-12 size-28 rounded-2xl border" />
      </div>
      <div className="relative flex items-center gap-2.5">
        <BrandMark inverted />
        <span className="text-sm font-semibold tracking-tight">
          Creator Growth
        </span>
      </div>
      <div className="relative max-w-md space-y-8">
        <div className="space-y-3">
          <p className="text-primary-foreground/70 text-sm font-medium">
            For creators, businesses, and agencies
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Run legitimate social growth from one workspace.
          </h2>
        </div>
        <ul className="space-y-5">
          {points.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-3">
              <span className="bg-primary-foreground/10 flex size-9 shrink-0 items-center justify-center rounded-md">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-medium">{title}</span>
                <span className="text-primary-foreground/75 mt-0.5 block text-sm leading-5">
                  {description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-primary-foreground/70 relative text-sm">
        Facebook, Instagram, and TikTok campaigns, collaborations, and
        reporting.
      </p>
    </aside>
  );
}
