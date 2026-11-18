"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { defaultWorkspaceId, workspaces } from "@/config/workspace";
import type { Workspace } from "@/types/workspace";

type WorkspaceContextValue = {
  workspace: Workspace;
  workspaces: readonly Workspace[];
  setWorkspaceId: (id: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

/**
 * Holds the selected mock workspace. Swap this provider for an API-backed
 * source later; switcher call sites stay the same.
 */
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaceId, setWorkspaceId] = useState<string>(defaultWorkspaceId);

  const value = useMemo<WorkspaceContextValue>(() => {
    const workspace =
      workspaces.find((item) => item.id === workspaceId) ?? workspaces[0];

    return {
      workspace,
      workspaces,
      setWorkspaceId,
    };
  }, [workspaceId]);

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }

  return context;
}
