import type { ReactNode } from "react";

type ShowcaseSectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function ShowcaseSection({
  id,
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-6 space-y-4"
    >
      <div className="space-y-1">
        <h2 id={headingId} className="text-section-title text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="text-small text-muted-foreground max-w-2xl">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
