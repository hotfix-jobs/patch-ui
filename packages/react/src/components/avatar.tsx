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

type AvatarSizeEnum = NonNullable<VariantProps<typeof avatarVariants>["size"]>;
type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>["shape"]>;
/** Size accepts either a preset (`"xs"–"xl"`) or a pixel number for exact control. */
export type AvatarSize = AvatarSizeEnum | number;

/** Map enum sizes to pixel diameter — the source of truth for AvatarGroup overlap math. */
const sizePx: Record<AvatarSizeEnum, number> = {
  xs: 24,
  sm: 28,
  md: 36,
  lg: 44,
  xl: 56,
};

/** Resolve any AvatarSize (enum or number) to a pixel value. */
function toPx(size: AvatarSize): number {
  return typeof size === "number" ? size : sizePx[size];
}

/** Text size (Tailwind class) that reads well inside an avatar of a given pixel diameter. */
function textClassForPx(px: number): string {
  if (px <= 24) return "text-label-12";
  if (px <= 32) return "text-label-12";
  if (px <= 40) return "text-label-13";
  if (px <= 48) return "text-copy-14";
  return "text-copy-18";
}

export interface AvatarProps
  extends Omit<React.ComponentProps<typeof AvatarPrimitive.Root>, "size"> {
  size?: AvatarSize;
  shape?: AvatarShape;
  /** Shorthand for monogram fallback. Equivalent to `<AvatarFallback>letter</AvatarFallback>`. */
  letter?: string;
  /**
   * When true and no image or letter is provided, renders a generic person icon
   * on a subtle neutral fill. When combined with `letter`, uses the placeholder
   * fill instead of the default dark fill.
   */
  placeholder?: boolean;
  /** Render an icon inside the avatar (status/action pattern). Overrides image/letter. */
  icon?: React.ReactNode;
  /** When `icon` is set, use the subtle neutral fill. Defaults to true. */
  iconBackground?: boolean;
}

export function Avatar({
  className,
  size = "md",
  shape,
  letter,
  placeholder,
  icon,
  iconBackground = true,
  style,
  children,
  ...props
}: AvatarProps): React.ReactElement {
  // Numeric size: apply width/height inline; enum size: use the size variant class.
  const numericSize = typeof size === "number";
  const px = toPx(size);
  const inlineSize = numericSize ? { width: size, height: size } : undefined;

  const fillClass = placeholder
    ? "bg-gray-100 text-gray-800"
    : "bg-gray-1000 text-background-100";

  const baseClass = numericSize
    ? cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium",
        fillClass,
        shape === "square" ? "rounded-[var(--radius-6)]" : "rounded-full",
        textClassForPx(size),
      )
    : cn(
        avatarVariants({ size, shape }),
        placeholder && "!bg-gray-100 !text-gray-800",
      );

  // Main avatar body: children > letter > placeholder icon.
  const body =
    children ??
    (letter ? (
      <AvatarFallback>{letter}</AvatarFallback>
    ) : placeholder ? (
      <PlaceholderIcon />
    ) : null);

  // Badge overlay sits in the bottom-left corner and is roughly 45% of avatar size.
  // Uses `overflow-visible` on the wrapper so the badge can extend past the avatar edge.
  if (icon) {
    const badgePx = Math.max(14, Math.round(px * 0.45));
    return (
      <span
        className={cn("relative inline-flex shrink-0", inlineSize && "")}
        style={inlineSize}
      >
        <AvatarPrimitive.Root
          data-slot="avatar"
          className={cn(baseClass, className)}
          style={{ ...inlineSize, ...style }}
          {...props}
        >
          {body}
        </AvatarPrimitive.Root>
        <span
          data-slot="avatar-badge"
          aria-hidden="true"
          className={cn(
            "absolute -bottom-0.5 -left-0.5 inline-flex items-center justify-center rounded-full",
            "ring-2 ring-background-100",
            iconBackground ? "bg-gray-1000 text-background-100" : "bg-background-100 text-gray-800",
          )}
          style={{ width: badgePx, height: badgePx }}
        >
          {icon}
        </span>
      </span>
    );
  }

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(baseClass, className)}
      style={{ ...inlineSize, ...style }}
      {...props}
    >
      {body}
    </AvatarPrimitive.Root>
  );
}

function PlaceholderIcon(): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-[60%]"
    >
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 1 1 14 0v.5H5V20Z"
        fill="currentColor"
      />
    </svg>
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

/** A member entry for the `members` prop. Provide `image`, `letter`, or both. */
export interface AvatarGroupMember {
  /** Image URL. If omitted, `letter` renders as a fallback monogram. */
  image?: string;
  /** 1–2 character monogram fallback. */
  letter?: string;
  /** Alt text for the image. Defaults to `letter` or "Avatar". */
  alt?: string;
  /** Optional stable key. */
  id?: string | number;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Data-driven mode: pass members as an array. Alternative to nested `<Avatar>` children. */
  members?: AvatarGroupMember[];
  /** Maximum avatars before collapsing to a `+N` chip. 0 disables the cap. Defaults to 5. */
  limit?: number;
  /**
   * Overlap between avatars. `"auto"` scales with size (roughly a third of the avatar);
   * a number sets exact pixel overlap. Defaults to `"auto"`.
   */
  overlap?: "auto" | number;
  /** Reverse the z-stacking so the last member sits on top. Left-to-right order is unchanged. */
  reverse?: boolean;
  /** Size applied to every child and the overflow chip. Accepts enum or number. */
  size?: AvatarSize;
  /** Shape applied to every child and the overflow chip. */
  shape?: AvatarShape;
  /** @deprecated Prefer `limit`. Retained for backwards compatibility. */
  max?: number;
}

/** Auto-overlap heuristic: ~30% of the avatar diameter, capped for very tiny/large sizes. */
function autoOverlapPx(size: AvatarSize): number {
  const px = toPx(size);
  return Math.max(4, Math.round(px * 0.3));
}

export function AvatarGroup({
  className,
  members,
  limit,
  max,
  overlap = "auto",
  reverse = false,
  size = "md",
  shape = "circle",
  children,
  style,
  ...props
}: AvatarGroupProps): React.ReactElement {
  const cap = limit ?? max ?? 5;
  const overlapPx = overlap === "auto" ? autoOverlapPx(size) : overlap;
  const marginStart = -overlapPx;
  const ring = ringWidthForSize(size);

  // Data-driven path (members array).
  if (members) {
    const showChip = cap > 0 && members.length > cap;
    const shown = showChip ? members.slice(0, cap) : members;
    const overflow = showChip ? members.length - cap : 0;

    return (
      <div
        data-slot="avatar-group"
        className={cn("inline-flex items-center", className)}
        style={style}
        {...props}
      >
        {shown.map((m, i) => (
          <Avatar
            key={m.id ?? i}
            size={size}
            shape={shape}
            className={cn(ring, "ring-background-100")}
            style={{
              marginInlineStart: i === 0 ? 0 : marginStart,
              zIndex: reverse ? i : shown.length - i,
            }}
          >
            {m.image && <AvatarImage src={m.image} alt={m.alt ?? m.letter ?? "Avatar"} />}
            <AvatarFallback>{m.letter ?? ""}</AvatarFallback>
          </Avatar>
        ))}
        {showChip && (
          <span
            data-slot="avatar-group-overflow"
            className={cn(
              baseChipClass(size, shape),
              ring,
              "ring-background-100",
              "!bg-gray-100 !text-gray-900",
            )}
            style={{
              marginInlineStart: marginStart,
              zIndex: 0,
              ...(typeof size === "number" ? { width: size, height: size } : {}),
            }}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  }

  // Children path (backwards-compat with the original API).
  const all = Children.toArray(children).filter(isValidElement);
  const showChip = cap > 0 && all.length > cap;
  const shown = showChip ? all.slice(0, cap) : all;
  const overflow = showChip ? all.length - cap : 0;

  const decorated = shown.map((child, i) => {
    const childProps = (child as React.ReactElement<AvatarProps>).props;
    return cloneElement(child as React.ReactElement<AvatarProps>, {
      size: childProps.size ?? size,
      shape: childProps.shape ?? shape,
      className: cn(ring, "ring-background-100", childProps.className),
      style: {
        marginInlineStart: i === 0 ? 0 : marginStart,
        zIndex: reverse ? i : shown.length - i,
        ...childProps.style,
      },
    });
  });

  return (
    <div
      data-slot="avatar-group"
      className={cn("inline-flex items-center", className)}
      style={style}
      {...props}
    >
      {decorated}
      {showChip && (
        <span
          data-slot="avatar-group-overflow"
          className={cn(
            baseChipClass(size, shape),
            ring,
            "ring-background-100",
            "!bg-gray-100 !text-gray-900",
          )}
          style={{
            marginInlineStart: marginStart,
            zIndex: 0,
            ...(typeof size === "number" ? { width: size, height: size } : {}),
          }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

function baseChipClass(size: AvatarSize, shape: AvatarShape): string {
  const numeric = typeof size === "number";
  const textCls = numeric ? textClassForPx(size) : "";
  return numeric
    ? cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium",
        shape === "square" ? "rounded-[var(--radius-6)]" : "rounded-full",
        textCls,
      )
    : avatarVariants({ size: size as AvatarSizeEnum, shape });
}

function ringWidthForSize(size: AvatarSize): string {
  const px = toPx(size);
  if (px <= 20) return "ring-[1.5px]";
  if (px <= 32) return "ring-2";
  return "ring-[2.5px]";
}

export { AvatarPrimitive };
