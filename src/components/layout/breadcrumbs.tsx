"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { getBreadcrumbs } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex min-w-0 items-center gap-1.5">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li
              key={`${crumb.href ?? crumb.label}-${index}`}
              className={cn(
                "flex items-center gap-1.5",
                isLast ? "min-w-0" : "shrink-0",
              )}
            >
              {index > 0 ? (
                <ChevronRight
                  className="text-muted-foreground size-3.5 shrink-0"
                  aria-hidden="true"
                />
              ) : null}
              {isLast || !crumb.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="text-foreground truncate text-sm font-medium"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm text-sm transition-colors outline-none focus-visible:ring-3"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
