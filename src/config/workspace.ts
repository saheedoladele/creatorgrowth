import type { Workspace, WorkspaceType } from "@/types/workspace";

export const workspaces = [
  {
    id: "personal",
    name: "Saheed's Creator Workspace",
    type: "personal",
  },
  {
    id: "agency",
    name: "Growth Marketing Agency",
    type: "agency",
  },
  {
    id: "business",
    name: "Acme Digital",
    type: "business",
  },
] as const satisfies readonly Workspace[];

export const workspaceTypeLabels: Record<WorkspaceType, string> = {
  personal: "Personal",
  agency: "Agency",
  business: "Business",
};

export const defaultWorkspaceId = workspaces[0].id;
