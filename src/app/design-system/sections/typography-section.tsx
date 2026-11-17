import { ShowcaseSection } from "../showcase-section";

const samples = [
  ["Display", "text-display", "Creator Growth Platform"],
  ["Page heading", "text-page-title", "Campaign performance"],
  ["Section heading", "text-section-title", "Account activity"],
  ["Card heading", "text-card-title", "Weekly summary"],
  [
    "Body",
    "text-body",
    "Track delivery, spend, and collaboration in one workspace.",
  ],
  ["Small", "text-small", "Updated 12 minutes ago by the operations team."],
  ["Label", "text-label", "Workspace name"],
  ["Caption", "text-caption", "Visible to members of this workspace."],
  ["Statistic", "text-stat", "12,480"],
] as const;

export function TypographySection() {
  return (
    <ShowcaseSection
      id="typography"
      title="Typography"
      description="Geist is the interface face. Each role has a fixed size, weight, and line height."
    >
      <div className="divide-border border-border bg-card divide-y rounded-lg border">
        {samples.map(([role, className, sample]) => (
          <div
            key={role}
            className="grid gap-2 px-4 py-3 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6"
          >
            <p className="text-caption text-muted-foreground">{role}</p>
            <p className={`${className} text-foreground`}>{sample}</p>
          </div>
        ))}
      </div>
    </ShowcaseSection>
  );
}
