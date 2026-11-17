"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

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

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="border-border bg-card inline-flex rounded-md border p-0.5"
    >
      {themes.map(({ value, label, icon: Icon }) => {
        const selected = isClient && theme === value;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
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
