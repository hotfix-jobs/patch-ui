"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { Children, cloneElement, isValidElement } from "react";
import type * as React from "react";
import { cn } from "../utils";

export const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-patch-text font-medium text-patch-bg",
  {
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
    variants: {
      size: {
        xs: "size-6 text-[length:var(--text-patch-micro)]",
        sm: "size-7 text-[length:var(--text-patch-mini)]",
        md: "size-9 text-[length:var(--text-patch-control)]",
        lg: "size-11 text-[length:var(--text-patch-body)]",
        xl: "size-14 text-[length:var(--text-patch-lead)]",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-[var(--radius-patch-sm)]",
      },
    },
  },
);

type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>;
type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>["shape"]>;

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
  shape?: AvatarShape;
}

export function Avatar({
  className,
  size,
  shape,
  ...props
}: AvatarProps): React.ReactElement {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-shape={shape}
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center", className)}
      {...props}
    />
  );
}

/* --------------------------- AvatarGroup --------------------------- */

const RING_BY_SIZE: Record<AvatarSize, string> = {
  xs: "ring-[1.5px]",
  sm: "ring-2",
  md: "ring-2",
  lg: "ring-[2.5px]",
  xl: "ring-[2.5px]",
};

const OFFSET_BY_SIZE: Record<AvatarSize, string> = {
  xs: "-ms-2",
  sm: "-ms-2.5",
  md: "-ms-3",
  lg: "-ms-3.5",
  xl: "-ms-4",
};

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to show before collapsing to a "+N" chip.
   * Defaults to 5. Set 0 to disable the cap.
   */
  max?: number;
  /**
   * Size applied to every child Avatar and the overflow chip. Override on
   * individual children if needed.
   */
  size?: AvatarSize;
  /**
   * Shape applied to every child Avatar and the overflow chip.
   */
  shape?: AvatarShape;
}

/**
 * AvatarGroup — overlapping row of avatars with an optional "+N" overflow
 * chip. Use for team rosters, collaborators, attendees, "people involved"
 * patterns.
 *
 * Children are expected to be `<Avatar>` elements; AvatarGroup applies the
 * size/shape and a hairline ring against the background to keep them
 * visually separated despite overlap.
 *
 * Usage:
 *   <AvatarGroup size="sm" max={4}>
 *     <Avatar><AvatarImage src="..." /></Avatar>
 *     <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
 *     ...
 *   </AvatarGroup>
 */
export function AvatarGroup({
  className,
  max = 5,
  size = "md",
  shape = "circle",
  children,
  ...props
}: AvatarGroupProps): React.ReactElement {
  const all = Children.toArray(children).filter(isValidElement);
  const showChip = max > 0 && all.length > max;
  const shown = showChip ? all.slice(0, max) : all;
  const overflow = showChip ? all.length - max : 0;

  const ring = RING_BY_SIZE[size];
  const offset = OFFSET_BY_SIZE[size];

  // Apply size/shape + first-child resets to each Avatar so consumers
  // don't have to repeat them on every child.
  const decorated = shown.map((child, i) => {
    const childProps = (child as React.ReactElement<AvatarProps>).props;
    return cloneElement(child as React.ReactElement<AvatarProps>, {
      size: childProps.size ?? size,
      shape: childProps.shape ?? shape,
      className: cn(
        ring,
        "ring-patch-bg",
        i > 0 && offset,
        childProps.className,
      ),
    });
  });

  return (
    <div
      data-slot="avatar-group"
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      {decorated}
      {showChip && (
        <span
          data-slot="avatar-group-overflow"
          className={cn(
            avatarVariants({ size, shape }),
            ring,
            "ring-patch-bg",
            offset,
            // Distinct fill so the chip reads as a counter, not an avatar.
            "!bg-patch-surface-2 !text-patch-text-secondary",
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

export { AvatarPrimitive };
