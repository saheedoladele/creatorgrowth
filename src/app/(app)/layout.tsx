import { Suspense, type ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { LoadingState } from "@/components/shared/loading-state";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingState label="Loading workspace" lines={4} />}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
