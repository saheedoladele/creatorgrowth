const sections = [
  ["typography", "Typography"],
  ["color", "Color"],
  ["buttons", "Buttons"],
  ["forms", "Forms"],
  ["display", "Display"],
  ["feedback", "Feedback"],
  ["overlays", "Overlays"],
  ["patterns", "Patterns"],
] as const;

export function ShowcaseNav() {
  return (
    <nav aria-label="Design system sections">
      <ul className="flex gap-2 overflow-x-auto pb-1">
        {sections.map(([id, label]) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              className="text-label border-border text-foreground hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-7 items-center rounded-md border px-2.5 focus-visible:ring-3 focus-visible:outline-none"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
