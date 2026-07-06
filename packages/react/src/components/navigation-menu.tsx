"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import type * as React from "react";
import { cn } from "../utils";
import { colorTransition, iconMuted, popupSurface } from "../recipes";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
/** Horizontal menu bar with morphing dropdown panels sharing one portalled popup. */
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
              popupSurface,
              "relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden text-ink",
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

const chevron = <CaretDown aria-hidden="true" className="size-3.5" />;

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-14 text-ink-muted hover:bg-surface-1 hover:text-ink data-[popup-open]:bg-surface-1 data-[popup-open]:text-ink outline-none",
        colorTransition,
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] group-data-[popup-open]:rotate-180">
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
        "block rounded-[var(--radius-6)] px-3 py-2 text-body-13 text-ink-muted hover:bg-surface-2 hover:text-ink outline-none",
        iconMuted,
        colorTransition,
        className,
      )}
      {...props}
    />
  );
}

export { NavigationMenuPrimitive };
