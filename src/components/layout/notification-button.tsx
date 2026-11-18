"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { unreadNotificationCount } from "@/config/user";
import { cn } from "@/lib/utils";

export function NotificationButton() {
  const pathname = usePathname();
  const active =
    pathname === "/notifications" || pathname.startsWith("/notifications/");
  const label =
    unreadNotificationCount > 0
      ? `Notifications, ${unreadNotificationCount} unread`
      : "Notifications";

  return (
    <Link
      href="/notifications"
      aria-current={active ? "page" : undefined}
      aria-label={label}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "text-muted-foreground relative",
        active && "bg-muted text-foreground",
      )}
    >
      <Bell />
      {unreadNotificationCount > 0 ? (
        <span
          className="bg-primary ring-background absolute top-1.5 right-1.5 size-1.5 rounded-full ring-2"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}
