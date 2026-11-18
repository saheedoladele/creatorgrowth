import type { ReactNode } from "react";

import {
  AuthBrandPanel,
  BrandMark,
} from "@/features/auth/components/auth-brand-panel";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background grid min-h-svh lg:grid-cols-2">
      <AuthBrandPanel />
      <div className="flex min-h-svh flex-col">
        <header className="flex items-center gap-2.5 px-6 py-5 lg:hidden">
          <BrandMark />
          <span className="text-sm font-semibold tracking-tight">
            Creator Growth
          </span>
        </header>
        <div className="flex flex-1 items-center justify-center px-6 py-8 sm:py-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
