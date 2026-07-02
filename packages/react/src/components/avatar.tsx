"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { Children, cloneElement, isValidElement } from "react";
import type * as React from "react";
import { cn } from "../utils";

export const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-gray-1000 font-medium text-background-100",
  {
    defaultVariants: { size: "md", shape: "circle" },
    variants: {
      size: {
        xs: "size-6 text-label-12",
        sm: "size-7 text-label-12",
        md: "size-9 text-label-13",
        lg: "size-11 text-copy-14",
        xl: "size-14 text-copy-18",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-[var(--radius-6)]",
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

const ringBySize: Record<AvatarSize, string> = {
  xs: "ring-[1.5px]",
  sm: "ring-2",
  md: "ring-2",
  lg: "ring-[2.5px]",
  xl: "ring-[2.5px]",
};

const offsetBySize: Record<AvatarSize, string> = {
  xs: "-ms-2",
  sm: "-ms-2.5",
  md: "-ms-3",
  lg: "-ms-3.5",
  xl: "-ms-4",
};

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars before collapsing to a "+N" chip. 0 disables the cap. */
  max?: number;
  /** Size applied to every child and the overflow chip. */
  size?: AvatarSize;
  /** Shape applied to every child and the overflow chip. */
  shape?: AvatarShape;
}

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

  const ring = ringBySize[size];
  const offset = offsetBySize[size];

  const decorated = shown.map((child, i) => {
    const childProps = (child as React.ReactElement<AvatarProps>).props;
    return cloneElement(child as React.ReactElement<AvatarProps>, {
      size: childProps.size ?? size,
      shape: childProps.shape ?? shape,
      className: cn(
        ring,
        "ring-background-100",
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
            "ring-background-100",
            offset,
            // Chip reads as a counter, not another person.
            "!bg-gray-100 !text-gray-900",
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

export { AvatarPrimitive };
