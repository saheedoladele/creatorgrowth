"use client";

import { LoaderCircle } from "lucide-react";

import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { platformLabels } from "@/features/social-accounts/lib/summary";
import type { Platform } from "@/features/social-accounts/types/social-account";

type ConnectPhase = "review" | "authorizing" | "ready" | "saving" | "success";

const previewNames: Record<Platform, { name: string; type: string }> = {
  facebook: { name: "Harbor & Co.", type: "Page" },
  instagram: { name: "Harbor Studio", type: "Professional account" },
  tiktok: { name: "Harbor Creates", type: "Creator account" },
};

export function ConnectAccountPanel({
  platform,
  phase,
  onStart,
  onComplete,
  onCancel,
  message,
}: {
  platform: Platform;
  phase: ConnectPhase;
  onStart: () => void;
  onComplete: () => void;
  onCancel: () => void;
  message: string | null;
}) {
  const preview = previewNames[platform];
  const name = platformLabels[platform];

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title text-foreground">
            Demonstration connection for {name}
          </h2>
          <p className="text-small text-muted-foreground max-w-2xl">
            This preview walks through a connection without opening {name},
            without an authorization screen, and without granting permissions.
            The account added at the end is sample data.
          </p>
        </div>
        <ol className="text-small grid gap-2 sm:grid-cols-3">
          <li className="bg-muted rounded-lg px-3 py-2">
            1. Review the preview
          </li>
          <li className="bg-muted rounded-lg px-3 py-2">
            2. Simulated authorization
          </li>
          <li className="bg-muted rounded-lg px-3 py-2">
            3. Add the sample account
          </li>
        </ol>
        {phase === "authorizing" || phase === "saving" ? (
          <LoadingState
            label={
              phase === "authorizing"
                ? "Simulating authorization"
                : "Adding preview account"
            }
          />
        ) : null}
        {phase === "review" ? (
          <div className="flex flex-wrap gap-2">
            <Button onClick={onStart}>Start demonstration</Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        ) : null}
        {phase === "ready" || phase === "success" ? (
          <div className="space-y-3">
            <p className="text-small text-foreground">
              {phase === "success"
                ? `${preview.name} was added as a preview ${preview.type}. Returning to social accounts.`
                : `The next step adds ${preview.name}, a sample ${preview.type}. ${name} is not contacted.`}
            </p>
            {phase === "ready" ? (
              <div className="flex flex-wrap gap-2">
                <Button onClick={onComplete}>Add preview account</Button>
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            ) : (
              <p className="text-small text-muted-foreground inline-flex items-center gap-2">
                <LoaderCircle className="size-4 animate-spin" />
                Opening social accounts
              </p>
            )}
          </div>
        ) : null}
        {message ? (
          <p className="text-small text-destructive" role="status">
            {message}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
