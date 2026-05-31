"use client";

import { Button, Tooltip, TooltipProvider } from "@patchui/react";
import { Plus, Save, Trash2 } from "lucide-react";

/** Showcases Tooltip with different sides and arrow. */
export function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-8">
        {/* Basic */}
        <div>
          <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
            Basic
          </p>
          <Tooltip content="This is a tooltip">
            <Button variant="secondary">Hover me</Button>
          </Tooltip>
        </div>

        {/* Sides */}
        <div>
          <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
            Sides
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
                <Button variant="secondary">
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* With Arrow */}
        <div>
          <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
            With Arrow
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip content="Save changes" arrow>
              <Button variant="secondary" icon={<Save className="size-4" />} />
            </Tooltip>
            <Tooltip content="Add new item" arrow>
              <Button variant="secondary" icon={<Plus className="size-4" />} />
            </Tooltip>
            <Tooltip content="Delete item" arrow side="bottom">
              <Button variant="danger" icon={<Trash2 className="size-4" />} />
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
