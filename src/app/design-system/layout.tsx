import type { Metadata } from "next";
import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Development reference for Creator Growth Platform colors, type, and components.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <TooltipProvider delay={300}>{children}</TooltipProvider>;
}
