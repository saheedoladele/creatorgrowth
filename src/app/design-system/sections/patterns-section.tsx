import { Inbox, Users } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { SectionHeader } from "@/components/shared/section-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

import { ShowcaseSection } from "../showcase-section";

export function PatternsSection() {
  return (
    <ShowcaseSection
      id="patterns"
      title="Patterns"
      description="Shared components accept content through props. They do not assume a product workflow."
    >
      <SectionHeader
        level={3}
        title="Record summary"
        description="A section heading with an optional action."
        actions={<Button variant="outline">Export</Button>}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Open items"
          value="128"
          description="Across every active workspace."
          icon={Inbox}
          trend={{
            value: "+12 this period",
            direction: "up",
            tone: "positive",
          }}
        />
        <StatCard
          title="Awaiting review"
          value="7"
          description="Waiting on a member."
          icon={Users}
          trend={{ value: "No change", direction: "neutral" }}
        />
        <StatCard
          title="Failed checks"
          value="3"
          description="Stored for a later retry."
          trend={{ value: "2 fewer", direction: "down", tone: "negative" }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <StatusBadge status="neutral">Draft</StatusBadge>
        <StatusBadge status="info">In review</StatusBadge>
        <StatusBadge status="success">Completed</StatusBadge>
        <StatusBadge status="warning">Needs attention</StatusBadge>
        <StatusBadge status="danger">Blocked</StatusBadge>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <EmptyState
          icon={Inbox}
          title="Nothing here yet"
          description="New items will show up in this view."
          action={<Button variant="outline">Add item</Button>}
        />
        <div className="border-border bg-card rounded-lg border p-4">
          <LoadingState label="Loading records" lines={4} />
        </div>
      </div>
    </ShowcaseSection>
  );
}
