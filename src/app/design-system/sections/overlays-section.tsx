"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ShowcaseSection } from "../showcase-section";

export function OverlaysSection() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <ShowcaseSection
      id="overlays"
      title="Overlays"
      description="Dialogs, menus, and tabs keep focus visible and can be dismissed from the keyboard."
    >
      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Open dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit details</DialogTitle>
              <DialogDescription>
                Changes stay in this preview until you confirm them.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button variant="outline" onClick={() => setConfirmOpen(true)}>
          Open confirm dialog
        </Button>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            Open sheet
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Side panel</SheetTitle>
              <SheetDescription>
                Use panels for secondary details without leaving the page.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Open menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Open popover
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Reference</PopoverTitle>
              <PopoverDescription>
                Short context that does not need a full dialog.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Tooltip
          </TooltipTrigger>
          <TooltipContent>More context on hover or focus.</TooltipContent>
        </Tooltip>
      </div>
      {confirmed ? (
        <p role="status" className="text-small text-muted-foreground">
          Confirmation received.
        </p>
      ) : null}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove this item?"
        description="This sample action only updates the message below."
        confirmLabel="Remove"
        confirmVariant="destructive"
        onConfirm={() => setConfirmed(true)}
      />
      <Tabs defaultValue="overview" className="max-w-xl">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          className="text-body text-muted-foreground"
        >
          A quiet summary of the current record.
        </TabsContent>
        <TabsContent
          value="activity"
          className="text-body text-muted-foreground"
        >
          Two updates were recorded this morning.
        </TabsContent>
        <TabsContent value="notes" className="text-body text-muted-foreground">
          Notes stay with the record and are visible to members.
        </TabsContent>
      </Tabs>
    </ShowcaseSection>
  );
}
