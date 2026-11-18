"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavItemActive, navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SidebarNavigationProps = {
  collapsed: boolean;
  onNavigate?: () => void;
};

function navItemClassName(active: boolean, collapsed: boolean) {
  return cn(
    "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground focus-visible:ring-ring/50 relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors outline-none focus-visible:ring-3",
    collapsed && "justify-center px-2",
    active &&
      "bg-sidebar-accent text-sidebar-accent-foreground font-medium before:bg-sidebar-primary before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full",
  );
}

function SidebarNavLink({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Tooltip disabled={!collapsed}>
      <TooltipTrigger
        render={
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={navItemClassName(active, collapsed)}
          />
        }
      >
        <Icon className="size-4 shrink-0" aria-hidden="true" />
        <span className={cn("truncate", collapsed && "sr-only")}>
          {item.title}
        </span>
      </TooltipTrigger>
      <TooltipContent side="right">{item.title}</TooltipContent>
    </Tooltip>
  );
}

export function SidebarNavigation({
  collapsed,
  onNavigate,
}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <div className="flex flex-col">
        {navigation.map((group, index) => (
          <section key={group.label} aria-label={group.label}>
            {collapsed ? (
              index > 0 ? (
                <Separator className="bg-sidebar-border my-2" />
              ) : (
                <div className="h-2" />
              )
            ) : (
              <p className="text-label text-muted-foreground px-2.5 pt-4 pb-1 uppercase">
                {group.label}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <SidebarNavLink
                    item={item}
                    collapsed={collapsed}
                    active={isNavItemActive(pathname, item.href)}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
