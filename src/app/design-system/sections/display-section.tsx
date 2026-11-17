import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

import { ShowcaseSection } from "../showcase-section";

const people = [
  ["Amina Cole", "AC"],
  ["Leo Martins", "LM"],
  ["Priya Shah", "PS"],
] as const;

export function DisplaySection() {
  return (
    <ShowcaseSection
      id="display"
      title="Display"
      description="Cards, badges, avatars, and progress stay flat. Separation comes from borders and spacing."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-card-title">Workspace summary</CardTitle>
          </CardHeader>
          <CardContent className="text-body text-muted-foreground space-y-3">
            <p>Three members can review the latest numbers.</p>
            <Separator />
            <p className="text-small">Last reviewed Tuesday at 09:40.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-card-title">Completion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={68}>
              <ProgressLabel className="text-small">
                Review progress
              </ProgressLabel>
              <ProgressValue />
            </Progress>
            <Progress value={24}>
              <ProgressLabel className="text-small">
                Setup remaining
              </ProgressLabel>
              <ProgressValue />
            </Progress>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {people.map(([name, initials]) => (
          <div key={name} className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="text-small text-foreground">{name}</span>
          </div>
        ))}
        <AvatarGroup>
          {people.map(([name, initials]) => (
            <Avatar key={name}>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
      </div>
    </ShowcaseSection>
  );
}
