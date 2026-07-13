"use client";

import { Button, Tooltip, TooltipProvider } from "@patchui/react";

export function TooltipPlacementDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side} content={`Opens on the ${side}`} side={side}>
            <Button variant="secondary">{side}</Button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
