"use client";

import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@patchui/react";

export function PopoverPlacementDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>
        View Details
      </PopoverTrigger>
      <PopoverContent side="right" align="start" arrow className="p-4 md:w-64">
        <p className="text-small font-medium text-ink">Project access</p>
        <p className="mt-1 text-small text-ink-muted">
          Workspace members can view this project.
        </p>
        <PopoverClose render={<Button size="sm" className="mt-4" />}>
          Done
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
