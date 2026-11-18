"use client";

import { Building, ChevronsUpDown, UserRound, Users } from "lucide-react";

import { useWorkspace } from "@/components/layout/workspace-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { workspaceTypeLabels } from "@/config/workspace";
import { cn } from "@/lib/utils";
import type { WorkspaceType } from "@/types/workspace";

const workspaceIcons: Record<WorkspaceType, typeof UserRound> = {
  personal: UserRound,
  agency: Users,
  business: Building,
};

type WorkspaceSwitcherProps = {
  collapsed: boolean;
};

export function WorkspaceSwitcher({ collapsed }: WorkspaceSwitcherProps) {
  const { workspace, workspaces, setWorkspaceId } = useWorkspace();
  const Icon = workspaceIcons[workspace.type];

  return (
    <DropdownMenu>
      <Tooltip disabled={!collapsed}>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              aria-label={`Workspace: ${workspace.name}`}
              className={cn(
                "hover:bg-sidebar-accent focus-visible:ring-ring/50 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors outline-none focus-visible:ring-3",
                collapsed && "justify-center px-0",
              )}
            />
          }
        >
          <span className="bg-muted text-foreground flex size-8 shrink-0 items-center justify-center rounded-md">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <span className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
            <span className="block truncate text-sm font-medium">
              {workspace.name}
            </span>
            <span className="text-muted-foreground block truncate text-xs">
              {workspaceTypeLabels[workspace.type]}
            </span>
          </span>
          <ChevronsUpDown
            className={cn(
              "text-muted-foreground size-4 shrink-0",
              collapsed && "sr-only",
            )}
            aria-hidden="true"
          />
        </TooltipTrigger>
        <TooltipContent side="right">{workspace.name}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        align="start"
        side={collapsed ? "right" : "bottom"}
        className="min-w-64"
      >
        <DropdownMenuRadioGroup
          value={workspace.id}
          onValueChange={setWorkspaceId}
        >
          {workspaces.map((item) => {
            const ItemIcon = workspaceIcons[item.type];

            return (
              <DropdownMenuRadioItem
                key={item.id}
                value={item.id}
                className="items-start py-1.5"
              >
                <ItemIcon className="mt-0.5" aria-hidden="true" />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate">{item.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {workspaceTypeLabels[item.type]}
                  </span>
                </span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
