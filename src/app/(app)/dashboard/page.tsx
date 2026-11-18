import type { Metadata } from "next";

import { DashboardView } from "@/features/dashboard/components/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Here's an overview of your social media performance.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
