"use client";

import { Button, Tooltip, TooltipProvider } from "@patchui/react";

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip content="Creates a new project">
        <Button variant="secondary">New project</Button>
      </Tooltip>
    </TooltipProvider>
  );
}
