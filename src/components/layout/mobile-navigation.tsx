"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { SidebarPanel } from "@/components/layout/app-sidebar";
import { useSidebar } from "@/components/layout/sidebar-provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function MobileNavigation() {
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen } = useSidebar();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent
        side="left"
        className="bg-sidebar text-sidebar-foreground gap-0 p-0 data-[side=left]:w-72 data-[side=left]:sm:max-w-72"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Primary application sections</SheetDescription>
        </SheetHeader>
        <SidebarPanel
          collapsed={false}
          reserveCloseSpace
          onNavigate={() => setMobileOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
