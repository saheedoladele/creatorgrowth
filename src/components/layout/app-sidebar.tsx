"use client";

import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, TrendingUp } from "lucide-react";

import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { useSidebar } from "@/components/layout/sidebar-provider";
import { UserMenu } from "@/components/layout/user-menu";
import { WorkspaceSwitcher } from "@/components/layout/workspace-switcher";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type SidebarPanelProps = {
  collapsed: boolean;
  onNavigate?: () => void;
  reserveCloseSpace?: boolean;
  showCollapseToggle?: boolean;
};

function SidebarCollapseControl({ collapsed }: { collapsed: boolean }) {
  const { toggleCollapsed } = useSidebar();
  const label = collapsed ? "Expand sidebar" : "Collapse sidebar";
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <Tooltip disabled={!collapsed}>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            aria-expanded={!collapsed}
            aria-controls="app-sidebar"
            onClick={toggleCollapsed}
            className={cn(
              "text-muted-foreground w-full",
              collapsed ? "justify-center px-0" : "justify-start px-2.5",
            )}
          />
        }
      >
        <Icon />
        <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function SidebarPanel({
  collapsed,
  onNavigate,
  reserveCloseSpace = false,
  showCollapseToggle = false,
}: SidebarPanelProps) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
      <div
        className={cn(
          "flex h-14 shrink-0 items-center px-3",
          reserveCloseSpace && "pr-12",
          collapsed && "justify-center px-2",
        )}
      >
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="focus-visible:ring-ring/50 flex min-w-0 items-center gap-2 rounded-md outline-none focus-visible:ring-3"
        >
          <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-md">
            <TrendingUp className="size-4" aria-hidden="true" />
          </span>
          <span
            className={cn(
              "min-w-0 text-left leading-tight",
              collapsed && "sr-only",
            )}
          >
            <span className="block truncate text-sm font-semibold tracking-tight">
              Creator Growth
            </span>
            <span className="text-muted-foreground block text-xs">
              Platform
            </span>
          </span>
        </Link>
      </div>
      <div className={cn("shrink-0 px-2 pb-2", collapsed && "px-2")}>
        <WorkspaceSwitcher collapsed={collapsed} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        <SidebarNavigation collapsed={collapsed} onNavigate={onNavigate} />
      </div>
      <div className="border-sidebar-border shrink-0 space-y-1 border-t p-2">
        {showCollapseToggle ? (
          <SidebarCollapseControl collapsed={collapsed} />
        ) : null}
        <UserMenu
          variant="sidebar"
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}

export function AppSidebar() {
  const { collapsed } = useSidebar();

  return (
    <aside
      id="app-sidebar"
      className={cn(
        "bg-sidebar text-sidebar-foreground border-sidebar-border sticky top-0 z-30 hidden h-svh shrink-0 border-r lg:flex",
        "transition-[width] duration-200 ease-out motion-reduce:transition-none",
        collapsed ? "w-[4.5rem]" : "w-64",
      )}
    >
      <SidebarPanel collapsed={collapsed} showCollapseToggle />
    </aside>
  );
}
