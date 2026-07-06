"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, iconMuted } from "../recipes";

type ToggleGroupSize = "sm" | "md" | "lg";

const ToggleGroupSizeContext = createContext<ToggleGroupSize>("md");

export interface ToggleGroupProps
  extends Omit<
    React.ComponentProps<typeof ToggleGroupPrimitive<string>>,
    "value" | "defaultValue" | "onValueChange" | "multiple"
  > {
  /** Active item value (single-select). */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: ToggleGroupSize;
}

/** Compact segmented radio-style control. Single-select toggle group. */
export function ToggleGroup({
  value,
  defaultValue,
  onValueChange,
  size = "md",
  className,
  children,
  ...props
}: ToggleGroupProps): React.ReactElement {
  return (
    <ToggleGroupSizeContext.Provider value={size}>
      <ToggleGroupPrimitive<string>
        value={value !== undefined ? [value] : undefined}
        defaultValue={defaultValue !== undefined ? [defaultValue] : undefined}
        onValueChange={
          onValueChange
            ? (next: string[]) => onValueChange(next[0] ?? "")
            : undefined
        }
        data-slot="toggle-group"
        data-size={size}
        className={cn(
          "inline-flex w-fit self-start items-center rounded-[var(--radius-6)] border border-hairline bg-surface-1 p-0.5",
          className,
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive>
    </ToggleGroupSizeContext.Provider>
  );
}

export interface ToggleGroupItemProps
  extends Omit<React.ComponentProps<typeof TogglePrimitive>, "value"> {
  value: string;
}

export function ToggleGroupItem({
  value,
  className,
  children,
  ...props
}: ToggleGroupItemProps): React.ReactElement {
  const size = useContext(ToggleGroupSizeContext);
  return (
    <TogglePrimitive
      value={value}
      data-slot="toggle-group-item"
      className={cn(
        "relative inline-flex items-center justify-center rounded-[var(--radius-6)] transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-50",
        "text-ink-muted hover:text-ink data-[pressed]:text-ink",
        "not-data-[pressed]:hover:bg-surface-elevated-hover",
        "data-[pressed]:bg-surface-elevated",
        iconMuted,
        size === "sm" && "h-6 min-w-6 px-1.5 gap-1.5 text-caption-12 [&_svg]:size-3.5",
        size === "md" && "h-7 min-w-7 px-2 gap-2 text-body-13 [&_svg]:size-4",
        size === "lg" && "h-9 min-w-9 px-3 gap-2 text-body-14 [&_svg]:size-4",
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroupPrimitive };
