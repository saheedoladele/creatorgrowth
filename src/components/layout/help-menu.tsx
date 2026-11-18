"use client";

import { CircleQuestionMark } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function HelpMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Help"
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
          />
        }
      >
        <CircleQuestionMark />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Help center is coming soon</DropdownMenuLabel>
          <DropdownMenuItem disabled>Documentation</DropdownMenuItem>
          <DropdownMenuItem disabled>Contact support</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
