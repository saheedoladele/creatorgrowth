"use client";

import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { SidebarProvider } from "@/components/layout/sidebar-provider";
import { WorkspaceProvider } from "@/components/layout/workspace-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <TooltipProvider delay={300}>
      <WorkspaceProvider>
        <SidebarProvider>
          <div className="bg-background flex min-h-svh w-full">
            <AppSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <AppHeader />
              <main className="flex-1">
                <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <MobileNavigation />
        </SidebarProvider>
      </WorkspaceProvider>
    </TooltipProvider>
  );
}
