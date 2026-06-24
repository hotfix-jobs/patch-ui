"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

/**
 * NavigationMenu - compound navigation built on Base UI NavigationMenu.
 *
 * A horizontal menu bar (List + Items). An item is either a plain Link or a
 * Trigger + Content dropdown whose panels morph inside one shared popup. The
 * popup scaffold (Portal / Positioner / Popup / Viewport) is rendered for you,
 * so you only provide the List - it drops straight into a header (e.g. inside
 * AppHeader).
 *
 * Usage:
 *   <NavigationMenu>
 *     <NavigationMenuList>
 *       <NavigationMenuItem>
 *         <NavigationMenuTrigger>Product</NavigationMenuTrigger>
 *         <NavigationMenuContent>
 *           <NavigationMenuLink href="/features">Features</NavigationMenuLink>
 *           <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
 *         </NavigationMenuContent>
 *       </NavigationMenuItem>
 *       <NavigationMenuItem>
 *         <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
 *       </NavigationMenuItem>
 *     </NavigationMenuList>
 *   </NavigationMenu>
 */

export function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn("relative", className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner
          data-slot="navigation-menu-positioner"
          className="z-[80] box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration-patch-normal)] ease-[var(--ease-patch-out)]"
          sideOffset={8}
          collisionPadding={12}
        >
          <NavigationMenuPrimitive.Popup
            data-slot="navigation-menu-popup"
            className={cn(
              "relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden rounded-[var(--radius-patch-sm)] border-[0.5px] border-patch-border bg-patch-surface text-patch-text shadow-patch-popup",
              "transition-[opacity,transform,width,height] duration-[var(--duration-patch-normal)] ease-[var(--ease-patch-out)]",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.97]",
            )}
          >
            <NavigationMenuPrimitive.Viewport className="relative h-full w-full" />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

export function NavigationMenuItem(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Item>,
): React.ReactElement {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />;
}

const chevron = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group inline-flex items-center gap-1 rounded-[var(--radius-patch-sm)] px-3 py-1.5 text-[length:var(--text-patch-control)] font-medium text-patch-text-secondary hover:bg-[var(--menu-item-hover)] hover:text-patch-text data-[popup-open]:bg-[var(--menu-item-hover)] data-[popup-open]:text-patch-text",
        colorTransition,
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="text-patch-text-tertiary transition-transform duration-[var(--duration-patch-normal)] ease-[var(--ease-patch-out)] group-data-[popup-open]:rotate-180">
        {chevron}
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "w-max p-2 transition-[opacity,transform] duration-[var(--duration-patch-normal)] ease-[var(--ease-patch-out)]",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        "data-[activation-direction=left]:data-[starting-style]:translate-x-3",
        "data-[activation-direction=right]:data-[starting-style]:-translate-x-3",
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuLink({
  className,
  closeOnClick = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      closeOnClick={closeOnClick}
      className={cn(
        "block rounded-[var(--radius-patch-xs)] px-3 py-2 text-[length:var(--text-patch-control)] text-patch-text-secondary hover:bg-[var(--menu-item-hover)] hover:text-patch-text",
        colorTransition,
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export { NavigationMenuPrimitive };
