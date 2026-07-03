"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

/**
 * NavigationMenu: horizontal menu bar with morphing dropdown panels.
 *
 * A patch-ui extension (Vercel Geist doesn't ship a NavigationMenu: they
 * expect consumers to compose their own top-nav from Menu / links). Built
 * on Base UI's NavigationMenu primitive with our token surface: the
 * List + Items live inline, and the dropdown panels morph inside one
 * shared portalled popup so switching between triggers slides horizontally
 * with size interpolation. Drop it straight into a header (AppHeader).
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
          className="z-[80] box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration-state)] ease-[var(--ease-standard)]"
          sideOffset={8}
          collisionPadding={12}
        >
          <NavigationMenuPrimitive.Popup
            data-slot="navigation-menu-popup"
            className={cn(
              "relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden rounded-[var(--radius-12)] bg-background-100 text-gray-1000 border border-gray-alpha-400 shadow-menu",
              "transition-[opacity,transform,width,height] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
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

const chevron = <ChevronDown aria-hidden="true" className="size-3.5" />;

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group inline-flex items-center gap-1 rounded-[var(--radius-6)] px-3 py-1.5 text-button-14 text-gray-1000 hover:bg-gray-alpha-100 hover:text-gray-1000 data-[popup-open]:bg-gray-alpha-100 data-[popup-open]:text-gray-1000",
        colorTransition,
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="text-gray-800 transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] group-data-[popup-open]:rotate-180">
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
        "w-max p-2 transition-[opacity,transform] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
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
        "block rounded-[var(--radius-6)] px-3 py-2 text-label-13 text-gray-1000 hover:bg-gray-alpha-100 hover:text-gray-1000",
        colorTransition,
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export { NavigationMenuPrimitive };
