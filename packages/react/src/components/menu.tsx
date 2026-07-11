"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CaretRight, Check } from "@phosphor-icons/react/dist/ssr";
import { RemoveScroll } from "react-remove-scroll";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import {
  iconMuted,
  itemGroupLabel,
  itemRow,
  popupDivider,
  popupSurface,
} from "../recipes";
import { Checkbox } from "./checkbox";
import {
  MOBILE_MEDIA_QUERY,
  useMediaQuery,
} from "../hooks/use-media-query";

type Density = "compact" | "comfortable";

const MenuDensityContext = createContext<Density>("comfortable");

/* --------------------------------- Root -------------------------------- */

export interface MenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
  children: React.ReactNode;
}

export function Menu({
  open,
  onOpenChange,
  defaultOpen,
  modal = false,
  children,
}: MenuProps): React.ReactElement {
  return (
    <MenuPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      {children}
    </MenuPrimitive.Root>
  );
}

/* ------------------------------- Trigger ------------------------------- */

export type MenuTriggerProps = React.ComponentProps<
  typeof MenuPrimitive.Trigger
>;

export function MenuTrigger(props: MenuTriggerProps): React.ReactElement {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />;
}

/* -------------------------------- Popup -------------------------------- */

export interface MenuPopupProps
  extends Omit<
    React.ComponentProps<typeof MenuPrimitive.Popup>,
    "children"
  > {
  density?: Density;
  side?: "top" | "bottom" | "left" | "right" | "inline-start" | "inline-end";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  /** Internal: sub-menus opt out of the mobile bottom-drawer treatment. */
  sub?: boolean;
  children?: React.ReactNode;
}

export function MenuPopup({
  density = "comfortable",
  side = "bottom",
  align = "start",
  sideOffset = 4,
  sub = false,
  className,
  children,
  ...props
}: MenuPopupProps): React.ReactElement {
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);

  if (isMobile && !sub) {
    return (
      <MenuPrimitive.Portal>
        <RemoveScroll>
        <MenuPrimitive.Backdrop
          data-slot="menu-backdrop"
          className={cn(
            "fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm",
            "transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <MenuPrimitive.Positioner className="contents">
        <MenuPrimitive.Popup
          data-slot="menu-popup"
          data-mobile="true"
          className={cn(
            // Centered on mobile: fixed at viewport center via
            // top-1/2 / left-1/2 + translate. Full width minus 8px
            // gutters left/right.
            "fixed left-1/2 top-1/2 z-[80] w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden outline-none",
            "rounded-[var(--radius-12)] bg-layer-1 border border-hairline shadow-modal",
            "max-h-[calc(100dvh-2rem)] p-1",
            // Fade + slight upward drift on enter. Starts 8px below
            // final center, animates up. translate-x-1/2 stays put.
            "transition-[opacity,translate] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-starting-style:translate-y-[calc(-50%+8px)]",
            "data-ending-style:opacity-0 data-ending-style:translate-y-[calc(-50%+8px)]",
            className,
          )}
          {...props}
        >
          <div className="min-h-0 flex-1 overflow-y-auto">
            <MenuDensityContext.Provider value="comfortable">
              {children}
            </MenuDensityContext.Provider>
          </div>
        </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
        </RemoveScroll>
      </MenuPrimitive.Portal>
    );
  }

  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-[80] outline-none"
      >
        <MenuPrimitive.Popup
          data-slot="menu-popup"
          className={cn(
            popupSurface,
            "min-w-32 p-1 outline-none",
            "transition-[opacity,scale] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-starting-style:scale-95",
            "data-ending-style:opacity-0 data-ending-style:scale-95",
            className,
          )}
          {...props}
        >
          <MenuDensityContext.Provider value={density}>
            {children}
          </MenuDensityContext.Provider>
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

/* --------------------------------- Item -------------------------------- */

export interface MenuItemProps {
  className?: string;
  /** `error` renders in red for destructive actions. */
  type?: "default" | "error";
  /** @deprecated Use `type="error"`. */
  variant?: "default" | "destructive";
  inset?: boolean;
  /** Show a trailing check for single-select patterns. */
  selected?: boolean;
  description?: React.ReactNode;
  disabled?: boolean;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** When set, renders as an anchor tag. */
  href?: string;
  target?: string;
  rel?: string;
  closeOnClick?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

function useItemRowClass({
  className,
  isError,
  inset,
}: {
  className?: string;
  isError: boolean;
  inset?: boolean;
}) {
  const density = useContext(MenuDensityContext);
  return cn(
    itemRow.base,
    "no-underline [&_svg]:pointer-events-none [&_svg]:shrink-0",
    iconMuted,
    density === "compact"
      ? itemRow.compact
      : cn(itemRow.comfortable, "[&_svg:not([class*='size-'])]:size-[18px]"),
    isError &&
      "text-error data-highlighted:bg-error/10 data-highlighted:text-error [&_svg]:!text-error",
    inset && "ps-8",
    className,
  );
}

function MenuItemContent({
  prefix,
  suffix,
  selected,
  description,
  children,
}: {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  selected?: boolean;
  description?: React.ReactNode;
  children?: React.ReactNode;
}): React.ReactElement {
  const trailingCheck = selected && (
    <Check className="ms-auto size-3.5 shrink-0 text-ink-muted" aria-hidden />
  );
  if (description != null) {
    return (
      <span className="flex w-full flex-col">
        <span className="flex w-full items-center gap-2">
          {prefix}
          {children}
          {suffix && <span className="ms-auto flex items-center">{suffix}</span>}
          {trailingCheck}
        </span>
        <span className="mt-0.5 truncate text-mini text-ink-muted">
          {description}
        </span>
      </span>
    );
  }
  return (
    <span className="flex w-full items-center gap-2">
      {prefix}
      {children}
      {suffix && <span className="ms-auto flex items-center">{suffix}</span>}
      {trailingCheck}
    </span>
  );
}

export function MenuItem({
  className,
  type,
  variant,
  inset,
  selected,
  description,
  disabled,
  label,
  prefix,
  suffix,
  href,
  target,
  rel,
  closeOnClick,
  onClick,
  children,
}: MenuItemProps): React.ReactElement {
  const isError = type === "error" || variant === "destructive";
  const rowClass = useItemRowClass({ className, isError, inset });
  const content = (
    <MenuItemContent
      prefix={prefix}
      suffix={suffix}
      selected={selected}
      description={description}
    >
      {children}
    </MenuItemContent>
  );

  if (href) {
    return (
      <MenuPrimitive.Item
        render={
          <a
            href={href}
            target={target}
            rel={rel}
          />
        }
        data-slot="menu-item"
        data-selected={selected ? "" : undefined}
        data-type={isError ? "error" : "default"}
        disabled={disabled}
        label={label}
        closeOnClick={closeOnClick}
        onClick={onClick}
        className={rowClass}
      >
        {content}
      </MenuPrimitive.Item>
    );
  }

  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      data-selected={selected ? "" : undefined}
      data-type={isError ? "error" : "default"}
      disabled={disabled}
      label={label}
      closeOnClick={closeOnClick}
      onClick={onClick}
      className={rowClass}
    >
      {content}
    </MenuPrimitive.Item>
  );
}

/* ---------------------------- CheckboxItem ---------------------------- */

export interface MenuCheckboxItemProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
}

export function MenuCheckboxItem({
  className,
  checked = false,
  onCheckedChange,
  disabled,
  label,
  prefix,
  suffix,
  children,
}: MenuCheckboxItemProps): React.ReactElement {
  const density = useContext(MenuDensityContext);
  return (
    <MenuPrimitive.CheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      label={label}
      closeOnClick={false}
      data-slot="menu-checkbox-item"
      data-selected={checked ? "" : undefined}
      className={cn(
        itemRow.base,
        "gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        iconMuted,
        density === "compact" ? itemRow.compact : itemRow.comfortable,
        className,
      )}
    >
      <Checkbox
        checked={checked}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none"
      />
      {prefix}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {suffix && <span className="ms-auto flex items-center">{suffix}</span>}
    </MenuPrimitive.CheckboxItem>
  );
}

/* ------------------------- RadioGroup + RadioItem ---------------------- */

export interface MenuRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function MenuRadioGroup({
  value,
  defaultValue,
  onValueChange,
  children,
}: MenuRadioGroupProps): React.ReactElement {
  return (
    <MenuPrimitive.RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {children}
    </MenuPrimitive.RadioGroup>
  );
}

export interface MenuRadioItemProps {
  className?: string;
  value: string;
  disabled?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export function MenuRadioItem({
  className,
  value,
  disabled,
  label,
  children,
}: MenuRadioItemProps): React.ReactElement {
  const density = useContext(MenuDensityContext);
  return (
    <MenuPrimitive.RadioItem
      value={value}
      disabled={disabled}
      label={label}
      closeOnClick
      data-slot="menu-radio-item"
      className={cn(
        itemRow.base,
        "w-full gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        density === "compact" ? itemRow.compact : itemRow.comfortable,
        className,
      )}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <MenuPrimitive.RadioItemIndicator className="ms-auto flex items-center">
        <Check className="size-3.5 shrink-0 text-ink-muted" aria-hidden />
      </MenuPrimitive.RadioItemIndicator>
    </MenuPrimitive.RadioItem>
  );
}

/* ---------------------- Group / Section / Label ---------------------- */

export function MenuGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <MenuPrimitive.Group
      data-slot="menu-group"
      className={className}
      {...props}
    >
      {children}
    </MenuPrimitive.Group>
  );
}

export function MenuSection({
  title,
  label,
  className,
  children,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> & {
  title?: React.ReactNode;
  /** @deprecated Use `title`. */
  label?: React.ReactNode;
  children: React.ReactNode;
}): React.ReactElement {
  const heading = title ?? label;
  return (
    <MenuPrimitive.Group
      data-slot="menu-section"
      className={cn("py-1 first:pt-0 last:pb-0", className)}
      {...props}
    >
      {heading != null && <MenuGroupLabel>{heading}</MenuGroupLabel>}
      {children}
    </MenuPrimitive.Group>
  );
}

export function MenuGroupLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
}): React.ReactElement {
  const density = useContext(MenuDensityContext);
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-label"
      className={cn(
        itemGroupLabel.base,
        density === "compact"
          ? itemGroupLabel.compact
          : itemGroupLabel.comfortable,
        inset && "ps-8",
        className,
      )}
      {...props}
    />
  );
}

export function MenuDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <MenuPrimitive.Separator
      data-slot="menu-divider"
      className={cn(popupDivider, className)}
      {...props}
    />
  );
}

export function MenuShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn(
        "ms-auto font-medium font-sans text-ink-muted text-xs tracking-widest",
        className,
      )}
      data-slot="menu-shortcut"
      {...props}
    />
  );
}

/* ------------------------------ Submenu ------------------------------ */

export function MenuSub({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <MenuPrimitive.SubmenuRoot>{children}</MenuPrimitive.SubmenuRoot>;
}

export interface MenuSubTriggerProps {
  className?: string;
  inset?: boolean;
  disabled?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export function MenuSubTrigger({
  className,
  inset,
  disabled,
  label,
  children,
}: MenuSubTriggerProps): React.ReactElement {
  const density = useContext(MenuDensityContext);
  return (
    <MenuPrimitive.SubmenuTrigger
      disabled={disabled}
      label={label}
      data-slot="menu-sub-trigger"
      className={cn(
        itemRow.base,
        "gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] [&_svg]:pointer-events-none",
        iconMuted,
        density === "compact"
          ? cn(itemRow.compact, "[&_svg:not([class*='size-'])]:size-4")
          : cn(itemRow.comfortable, "[&_svg:not([class*='size-'])]:size-[18px]"),
        inset && "ps-8",
        className,
      )}
    >
      {children}
      <CaretRight
        aria-hidden
        className="ms-auto -me-0.5 size-4 opacity-80"
      />
    </MenuPrimitive.SubmenuTrigger>
  );
}

export function MenuSubPopup(
  props: Omit<MenuPopupProps, "side" | "align" | "sub">,
): React.ReactElement {
  return <MenuPopup side="right" align="start" sub {...props} />;
}

export const MenuPortal = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <>{children}</>;

export { MenuPrimitive };
