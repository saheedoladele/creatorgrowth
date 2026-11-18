"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function subscribeToNothing() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function useIsClient() {
  return useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot,
  );
}

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

type ThemeValue = (typeof themes)[number]["value"];

function isThemeValue(value: unknown): value is ThemeValue {
  return themes.some((theme) => theme.value === value);
}

type ThemeSwitcherProps = {
  variant?: "segmented" | "menu";
  className?: string;
};

export function ThemeSwitcher({
  variant = "segmented",
  className,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  if (variant === "menu") {
    const ActiveIcon = !isClient
      ? Monitor
      : (themes.find((item) => item.value === theme)?.icon ?? Monitor);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Color theme"
          render={
            <Button
              variant="ghost"
              size="icon"
              className={cn("text-muted-foreground", className)}
            />
          }
        >
          <ActiveIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          <DropdownMenuRadioGroup
            value={isClient ? theme : ""}
            onValueChange={(value) => {
              if (isThemeValue(value)) {
                setTheme(value);
              }
            }}
          >
            {themes.map(({ value, label, icon: Icon }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <Icon />
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "border-border bg-card inline-flex rounded-md border p-0.5",
        className,
      )}
    >
      {themes.map(({ value, label, icon: Icon }) => {
        const selected = isClient && theme === value;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            onClick={() => setTheme(value)}
            className="text-label text-muted-foreground hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-checked:bg-muted aria-checked:text-foreground inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 focus-visible:ring-3 focus-visible:outline-none"
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
