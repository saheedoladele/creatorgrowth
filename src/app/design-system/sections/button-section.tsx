import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ShowcaseSection } from "../showcase-section";

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

const sizes = ["xs", "sm", "default", "lg"] as const;

export function ButtonSection() {
  return (
    <ShowcaseSection
      id="buttons"
      title="Buttons"
      description="One height scale, one focus ring, and no extra motion beyond the color change."
    >
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size) => (
          <Button key={size} size={size} variant="outline">
            {size}
          </Button>
        ))}
        <Button size="icon" variant="outline" aria-label="Add item">
          <Plus />
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </ShowcaseSection>
  );
}
