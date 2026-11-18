"use client";

import { Menu } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HelpMenu } from "@/components/layout/help-menu";
import { NotificationButton } from "@/components/layout/notification-button";
import { SearchDialog } from "@/components/layout/search-dialog";
import { useSidebar } from "@/components/layout/sidebar-provider";
import { UserMenu } from "@/components/layout/user-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/80 border-border sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground lg:hidden"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </Button>
        <Breadcrumbs />
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <SearchDialog />
        <NotificationButton />
        <HelpMenu />
        <ThemeSwitcher variant="menu" />
        <UserMenu />
      </div>
    </header>
  );
}
