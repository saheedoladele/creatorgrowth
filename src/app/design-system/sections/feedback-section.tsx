import { CircleAlert, Info, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { ShowcaseSection } from "../showcase-section";

export function FeedbackSection() {
  return (
    <ShowcaseSection
      id="feedback"
      title="Feedback"
      description="Alerts name the situation in text. Color supports the message and does not replace it."
    >
      <div className="grid gap-3">
        <Alert>
          <Info />
          <AlertTitle>Reference saved</AlertTitle>
          <AlertDescription>
            The latest notes are available to everyone in this workspace.
          </AlertDescription>
        </Alert>
        <Alert className="border-success/30 bg-success/10 text-success">
          <AlertTitle>Check complete</AlertTitle>
          <AlertDescription className="text-success/90">
            All required fields passed the latest review.
          </AlertDescription>
        </Alert>
        <Alert className="border-warning/30 bg-warning/10 text-warning">
          <TriangleAlert />
          <AlertTitle>Needs a second look</AlertTitle>
          <AlertDescription className="text-warning/90">
            One entry is missing a date. Nothing has been removed.
          </AlertDescription>
        </Alert>
        <Alert className="border-info/30 bg-info/10 text-info">
          <Info />
          <AlertTitle>Scheduled for tomorrow</AlertTitle>
          <AlertDescription className="text-info/90">
            The summary will be ready at 08:00 local time.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Could not save</AlertTitle>
          <AlertDescription>
            The connection dropped before the change was stored. Try again.
          </AlertDescription>
        </Alert>
      </div>
      <div className="space-y-2" aria-hidden="true">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-16 w-full" />
      </div>
    </ShowcaseSection>
  );
}
