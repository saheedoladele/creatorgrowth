import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { placeholderPages } from "@/constants/pages";

const page = placeholderPages.profile;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function ProfileSettingsPage() {
  return <PlaceholderPage title={page.title} description={page.description} />;
}
