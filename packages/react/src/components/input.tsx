"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";
import { cn } from "../utils";

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "sm" | "md" | "lg" | number;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  unstyled?: boolean;
  nativeInput?: boolean;
};

export function Input({
  className,
  size = "md",
  icon,
  prefix,
  suffix,
  unstyled = false,
  nativeInput = false,
  ...props
}: InputProps): React.ReactElement {
  const inputClassName = cn(
    "h-10 w-full min-w-0 rounded-[inherit] border-none bg-transparent px-3.5 text-[length:var(--text-patch-control)] tracking-[-0.005em] shadow-none outline-none ring-0 placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-0",
    icon && "ps-0",
    prefix && "ps-0",
    suffix && "pe-0",
    size === "sm" && "h-8 text-[length:var(--text-patch-mini)]",
    size === "lg" && "h-11",
    props.type === "search" &&
      "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
  );

  const inputEl = nativeInput ? (
    <input
      className={inputClassName}
      data-slot="input"
      size={typeof size === "number" ? size : undefined}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  ) : (
    <InputPrimitive
      className={inputClassName}
      data-slot="input"
      size={typeof size === "number" ? size : undefined}
      {...props}
    />
  );

  return (
    <span
      className={
        cn(
          !unstyled &&
            "relative inline-flex w-full items-center rounded-[var(--radius-patch-sm)] bg-patch-surface text-[length:var(--text-patch-control)] text-patch-text border-[0.5px] border-[var(--input-border)] transition-[color,background-color,border-color,outline-color] duration-[var(--duration-patch-normal)] ease-[var(--ease-patch-out)] has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--patch-focus-ring)] has-focus-visible:outline-offset-[var(--patch-focus-ring-offset)] has-focus-visible:border-[var(--input-border-focus)] has-focus-visible:bg-[var(--input-bg-focus)] has-disabled:opacity-50",
          className,
        ) || undefined
      }
      data-size={size}
      data-slot="input-control"
    >
      {icon && (
        <span className="flex shrink-0 items-center ps-3 pe-1.5 text-patch-text-tertiary [&_svg]:size-4">
          {icon}
        </span>
      )}
      {prefix && (
        <span className="flex shrink-0 items-center ps-3 text-patch-text-tertiary text-sm">
          {prefix}
        </span>
      )}
      {inputEl}
      {suffix && (
        <span className="flex shrink-0 items-center pe-3 ps-2 ml-2 my-2 text-patch-text-tertiary text-[length:var(--text-patch-micro)] tracking-[-0.01em] border-l-[0.5px] border-[var(--input-border)]">
          {suffix}
        </span>
      )}
    </span>
  );
}

export { InputPrimitive };
