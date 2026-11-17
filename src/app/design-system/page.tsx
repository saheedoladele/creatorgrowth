import { PageHeader } from "@/components/shared/page-header";

import { ShowcaseNav } from "./showcase-nav";
import { ThemeSwitcher } from "./theme-switcher";
import { ButtonSection } from "./sections/button-section";
import { ColorSection } from "./sections/color-section";
import { DisplaySection } from "./sections/display-section";
import { FeedbackSection } from "./sections/feedback-section";
import { FormsSection } from "./sections/forms-section";
import { OverlaysSection } from "./sections/overlays-section";
import { PatternsSection } from "./sections/patterns-section";
import { TypographySection } from "./sections/typography-section";

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <PageHeader
        title="Design system"
        description="A development reference for type, color, and reusable interface components. This route is not part of the product."
        actions={<ThemeSwitcher />}
      />
      <ShowcaseNav />
      <div className="flex flex-col gap-10">
        <TypographySection />
        <ColorSection />
        <ButtonSection />
        <FormsSection />
        <DisplaySection />
        <FeedbackSection />
        <OverlaysSection />
        <PatternsSection />
      </div>
    </main>
  );
}
