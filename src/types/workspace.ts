export type WorkspaceType = "personal" | "agency" | "business";

export type Workspace = {
  id: string;
  name: string;
  type: WorkspaceType;
};
