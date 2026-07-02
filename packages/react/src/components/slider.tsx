"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";
import { cn } from "../utils";

export function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props): React.ReactElement {
  const _values = React.useMemo(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);

  return (
    <SliderPrimitive.Root
      className={cn("data-[orientation=horizontal]:w-full", className)}
      defaultValue={defaultValue}
      max={max}
      min={min}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        className="flex touch-none select-none data-disabled:pointer-events-none data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-disabled:opacity-50"
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className="relative grow select-none rounded-[var(--radius-6)] bg-gray-alpha-400 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full"
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator
            className="select-none rounded-[var(--radius-6)] bg-gray-1000"
            data-slot="slider-indicator"
          />
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              className="block size-4 shrink-0 select-none rounded-full border-2 border-gray-1000 bg-background-100 outline-none transition-[scale] duration-[var(--duration-state)] has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-2 data-dragging:scale-110"
              data-slot="slider-thumb"
              index={index}
              key={String(index)}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export function SliderValue({
  className,
  ...props
}: SliderPrimitive.Value.Props): React.ReactElement {
  return (
    <SliderPrimitive.Value
      className={cn("flex justify-end text-label-13", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

export { SliderPrimitive };
