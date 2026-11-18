"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function SearchDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground hidden w-56 justify-start px-2.5 font-normal md:inline-flex"
        onClick={() => setOpen(true)}
      >
        <Search />
        Search
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground md:hidden"
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <Search />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Global search is not available yet.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Input
              aria-label="Search"
              placeholder="Search campaigns, orders, accounts…"
              disabled
            />
          </form>
          <p className="text-muted-foreground text-sm">Coming soon.</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
