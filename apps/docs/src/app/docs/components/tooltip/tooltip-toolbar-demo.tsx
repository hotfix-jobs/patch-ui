"use client";

import { Button, Tooltip, TooltipProvider } from "@patchui/react";
import { FloppyDisk, Plus, Trash } from "@phosphor-icons/react/dist/ssr";

export function TooltipToolbarDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2" aria-label="Project actions">
        <Tooltip content="Save changes">
          <Button variant="secondary" icon={<FloppyDisk />} aria-label="Save changes" />
        </Tooltip>
        <Tooltip content="Add item">
          <Button variant="secondary" icon={<Plus />} aria-label="Add item" />
        </Tooltip>
        <Tooltip content="Delete project">
          <Button variant="destructive" icon={<Trash />} aria-label="Delete project" />
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
