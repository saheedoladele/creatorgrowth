import { ShowcaseSection } from "../showcase-section";

const swatches = [
  ["Primary", "bg-primary", "text-primary-foreground"],
  ["Secondary", "bg-secondary", "text-secondary-foreground"],
  ["Accent", "bg-accent", "text-accent-foreground"],
  ["Muted", "bg-muted", "text-muted-foreground"],
  ["Success", "bg-success", "text-success-foreground"],
  ["Warning", "bg-warning", "text-warning-foreground"],
  ["Info", "bg-info", "text-info-foreground"],
  ["Destructive", "bg-destructive", "text-destructive-foreground"],
] as const;

const textRoles = [
  ["Foreground", "text-foreground"],
  ["Muted", "text-muted-foreground"],
  ["Primary", "text-primary"],
  ["Accent", "text-accent-foreground"],
  ["Success", "text-success"],
  ["Warning", "text-warning"],
  ["Info", "text-info"],
  ["Destructive", "text-destructive"],
] as const;

export function ColorSection() {
  return (
    <ShowcaseSection
      id="color"
      title="Color"
      description="Navy indigo is reserved for primary actions. Violet appears only as a quiet accent. Status colors stay separate from the brand."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map(([name, background, foreground]) => (
          <div
            key={name}
            className={`${background} ${foreground} border-border flex h-20 flex-col justify-between rounded-lg border p-3`}
          >
            <span className="text-label">{name}</span>
            <span className="text-small">Aa</span>
          </div>
        ))}
      </div>
      <div className="border-border bg-background grid gap-3 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
        {textRoles.map(([name, className]) => (
          <p key={name} className={`text-small ${className}`}>
            {name} text on the page surface
          </p>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="border-border bg-card rounded-lg border p-4">
          <p className="text-label text-card-foreground">Card</p>
          <p className="text-caption text-muted-foreground mt-1">
            Raised surface
          </p>
        </div>
        <div className="border-border bg-background rounded-lg border p-4">
          <p className="text-label text-foreground">Border</p>
          <p className="text-caption text-muted-foreground mt-1">
            1px hairline
          </p>
        </div>
        <div className="bg-background ring-ring/50 rounded-lg p-4 ring-3">
          <p className="text-label text-foreground">Focus ring</p>
          <p className="text-caption text-muted-foreground mt-1">
            3px at 50% strength
          </p>
        </div>
      </div>
    </ShowcaseSection>
  );
}
