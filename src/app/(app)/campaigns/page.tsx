import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { placeholderPages } from "@/constants/pages";

const page = placeholderPages.campaigns;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function CampaignsPage() {
  return <PlaceholderPage title={page.title} description={page.description} />;
}
