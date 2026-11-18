"use client";

import { PlatformMark } from "@/features/social-accounts/components/platform-mark";
import type { PlatformCatalogEntry } from "@/features/social-accounts/types/social-account";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PlatformConnectCard({
  entry,
  selected,
  onSelect,
}: {
  entry: PlatformCatalogEntry;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card className={cn("h-full", selected && "ring-foreground/20")}>
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <PlatformMark platform={entry.platform} />
          <h2 className="text-card-title text-foreground">{entry.name}</h2>
        </div>
        <p className="text-small text-muted-foreground">{entry.description}</p>
        <div>
          <p className="text-label text-muted-foreground">
            Supported account types
          </p>
          <p className="text-small text-foreground mt-1">
            {entry.accountTypes.join(", ")}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-label text-muted-foreground">
            Connection requirements
          </p>
          <ul className="mt-1 space-y-1">
            {entry.requirements.map((requirement) => (
              <li key={requirement} className="text-small text-foreground">
                {requirement}
              </li>
            ))}
          </ul>
        </div>
        <Button
          variant={selected ? "default" : "outline"}
          onClick={onSelect}
          aria-pressed={selected}
        >
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}
