import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { placeholderPages } from "@/constants/pages";

const page = placeholderPages.notifications;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function NotificationsPage() {
  return <PlaceholderPage title={page.title} description={page.description} />;
}
