"use client";

import { Button, EmptyState } from "@patchui/react";
import { FolderPlus } from "@phosphor-icons/react/dist/ssr";

export function EmptyStateCreateDemo() {
  return (
    <EmptyState
      title="No projects yet"
      description="Create a project to organize files and invite collaborators."
      icon={<FolderPlus />}
      action={<Button>Create Project</Button>}
    />
  );
}
