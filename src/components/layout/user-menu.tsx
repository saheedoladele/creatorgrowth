"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Shield, UserRound, Users } from "lucide-react";
import type { ReactNode } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useAuth } from "@/features/auth/components/auth-provider";
import { initialsFromName } from "@/features/auth/types";
import { cn } from "@/lib/utils";

type UserMenuProps = {
  variant?: "header" | "sidebar";
  collapsed?: boolean;
  onNavigate?: () => void;
};

type Profile = {
  name: string;
  email: string;
  initials: string;
};

function UserAvatar({ initials }: { initials: string }) {
  return (
    <Avatar>
      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

function AccountLinks({
  profile,
  onNavigate,
  onSignOut,
}: {
  profile: Profile;
  onNavigate?: () => void;
  onSignOut: () => void;
}) {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="font-normal">
          <span className="flex items-center gap-2 px-0.5 py-1">
            <UserAvatar initials={profile.initials} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                {profile.name}
              </span>
              <span className="text-muted-foreground block truncate text-xs">
                {profile.email}
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

function MenuShell({
  trigger,
  side,
  align,
  profile,
  onNavigate,
  onSignOut,
}: {
  trigger: ReactNode;
  side: "top" | "bottom" | "right";
  align: "start" | "end";
  profile: Profile;
  onNavigate?: () => void;
  onSignOut: () => void;
}) {
  return (
    <DropdownMenu>
      {trigger}
      <DropdownMenuContent align={align} side={side} className="min-w-56">
        <AccountLinks
          profile={profile}
          onNavigate={onNavigate}
          onSignOut={onSignOut}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserMenu({
  variant = "header",
  collapsed = false,
  onNavigate,
}: UserMenuProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const profile: Profile = user
    ? {
        name: user.name,
        email: user.email,
        initials: initialsFromName(user.name),
      }
    : {
        name: currentUser.name,
        email: currentUser.email,
        initials: currentUser.initials,
      };

  const signOut = () => {
    logout();
    router.push("/login");
  };

  if (variant === "sidebar") {
    return (
      <MenuShell
        side={collapsed ? "right" : "top"}
        align="start"
        profile={profile}
        onNavigate={onNavigate}
        onSignOut={signOut}
        trigger={
          <Tooltip disabled={!collapsed}>
            <TooltipTrigger
              render={
                <DropdownMenuTrigger
                  aria-label={collapsed ? profile.name : undefined}
                  className={cn(
                    "hover:bg-sidebar-accent focus-visible:ring-ring/50 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors outline-none focus-visible:ring-3",
                    collapsed && "justify-center px-0",
                  )}
                />
              }
            >
              <UserAvatar initials={profile.initials} />
              <span className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
                <span className="block truncate text-sm font-medium">
                  {profile.name}
                </span>
                <span className="text-muted-foreground block truncate text-xs">
                  {profile.email}
                </span>
              </span>
            </TooltipTrigger>
            <TooltipContent side="right">{profile.name}</TooltipContent>
          </Tooltip>
        }
      />
    );
  }

  return (
    <MenuShell
      side="bottom"
      align="end"
      profile={profile}
      onSignOut={signOut}
      trigger={
        <DropdownMenuTrigger
          aria-label={`Account menu for ${profile.name}`}
          className="focus-visible:ring-ring/50 rounded-full outline-none focus-visible:ring-3"
        >
          <UserAvatar initials={profile.initials} />
        </DropdownMenuTrigger>
      }
    />
  );
}
