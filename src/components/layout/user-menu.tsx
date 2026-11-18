"use client";

import Link from "next/link";
import { LogOut, Shield, UserRound, Users } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { currentUser } from "@/config/user";
import { cn } from "@/lib/utils";

type UserMenuProps = {
  variant?: "header" | "sidebar";
  collapsed?: boolean;
  onNavigate?: () => void;
};

function UserAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
        {currentUser.initials}
      </AvatarFallback>
    </Avatar>
  );
}

function AccountLinks({
  onNavigate,
  onSignOut,
}: {
  onNavigate?: () => void;
  onSignOut: () => void;
}) {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="font-normal">
          <span className="flex items-center gap-2 px-0.5 py-1">
            <UserAvatar />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                {currentUser.name}
              </span>
              <span className="text-muted-foreground block truncate text-xs">
                {currentUser.email}
              </span>
            </span>
          </span>
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          nativeButton={false}
          render={<Link href="/settings/profile" onClick={onNavigate} />}
        >
          <UserRound />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          nativeButton={false}
          render={<Link href="/settings/team" onClick={onNavigate} />}
        >
          <Users />
          Team settings
        </DropdownMenuItem>
        <DropdownMenuItem
          nativeButton={false}
          render={<Link href="/settings/security" onClick={onNavigate} />}
        >
          <Shield />
          Security settings
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => {
          onNavigate?.();
          onSignOut();
        }}
      >
        <LogOut />
        Sign out
      </DropdownMenuItem>
    </>
  );
}

function SignOutDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign out</DialogTitle>
          <DialogDescription>
            Signing out is not available yet. Authentication will be added in a
            later release.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function MenuShell({
  trigger,
  side,
  align,
  onNavigate,
}: {
  trigger: ReactNode;
  side: "top" | "bottom" | "right";
  align: "start" | "end";
  onNavigate?: () => void;
}) {
  const [signOutOpen, setSignOutOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        {trigger}
        <DropdownMenuContent align={align} side={side} className="min-w-56">
          <AccountLinks
            onNavigate={onNavigate}
            onSignOut={() => setSignOutOpen(true)}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </>
  );
}

export function UserMenu({
  variant = "header",
  collapsed = false,
  onNavigate,
}: UserMenuProps) {
  if (variant === "sidebar") {
    return (
      <MenuShell
        side={collapsed ? "right" : "top"}
        align="start"
        onNavigate={onNavigate}
        trigger={
          <Tooltip disabled={!collapsed}>
            <TooltipTrigger
              render={
                <DropdownMenuTrigger
                  aria-label={collapsed ? currentUser.name : undefined}
                  className={cn(
                    "hover:bg-sidebar-accent focus-visible:ring-ring/50 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors outline-none focus-visible:ring-3",
                    collapsed && "justify-center px-0",
                  )}
                />
              }
            >
              <UserAvatar />
              <span className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
                <span className="block truncate text-sm font-medium">
                  {currentUser.name}
                </span>
                <span className="text-muted-foreground block truncate text-xs">
                  {currentUser.email}
                </span>
              </span>
            </TooltipTrigger>
            <TooltipContent side="right">{currentUser.name}</TooltipContent>
          </Tooltip>
        }
      />
    );
  }

  return (
    <MenuShell
      side="bottom"
      align="end"
      trigger={
        <DropdownMenuTrigger
          aria-label={`Account menu for ${currentUser.name}`}
          className="focus-visible:ring-ring/50 rounded-full outline-none focus-visible:ring-3"
        >
          <UserAvatar />
        </DropdownMenuTrigger>
      }
    />
  );
}
