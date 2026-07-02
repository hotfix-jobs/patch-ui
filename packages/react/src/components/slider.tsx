"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";
import { cn } from "../utils";
import { Input } from "./input";

export interface SliderProps extends SliderPrimitive.Root.Props {
  /** Show a small numeric Input to the left, wired to values[0]. Range mode only. */
  showStartInput?: boolean;
  /** Show a small numeric Input to the right, wired to values[1]. Range mode only. */
  showEndInput?: boolean;
}

export function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  showStartInput,
  showEndInput,
  onValueChange,
  ...props
}: SliderProps): React.ReactElement {
  // Normalize value to an array for internal use
  const arrayFrom = React.useCallback((v: number | readonly number[] | undefined): number[] => {
    if (v === undefined) return [min];
    return Array.isArray(v) ? [...v] : [v as number];
  }, [min]);

  const [uncontrolled, setUncontrolled] = React.useState<number[]>(() =>
    arrayFrom(defaultValue),
  );
  const isControlled = value !== undefined;
  const values = isControlled ? arrayFrom(value) : uncontrolled;
  const isRange = values.length >= 2;

  const updateAt = React.useCallback(
    (index: number, next: number) => {
      const clamped = Math.max(min, Math.min(max, next));
      const nextValues = values.slice();
      nextValues[index] = clamped;
      // Prevent thumbs from crossing in range mode.
      if (isRange) {
        if (index === 0 && nextValues[0] > nextValues[1]) nextValues[0] = nextValues[1];
        if (index === 1 && nextValues[1] < nextValues[0]) nextValues[1] = nextValues[0];
      }
      if (!isControlled) setUncontrolled(nextValues);
      onValueChange?.(isRange ? nextValues : nextValues[0], {} as never);
    },
    [values, min, max, isRange, isControlled, onValueChange],
  );

  const slider = (
    <SliderPrimitive.Root
      className={cn("data-[orientation=horizontal]:w-full flex-1", className)}
      defaultValue={defaultValue}
      max={max}
      min={min}
      step={step}
      thumbAlignment="edge"
      value={value}
      disabled={disabled}
      onValueChange={onValueChange}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        className="flex touch-none select-none data-disabled:pointer-events-none data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-disabled:opacity-50 items-center"
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className="relative grow select-none rounded-full bg-gray-alpha-300 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full"
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator
            className="select-none rounded-full bg-gray-1000"
            data-slot="slider-indicator"
          />
          {Array.from({ length: values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              className={cn(
                "block h-4 w-[6px] shrink-0 select-none rounded-[3px]",
                "border border-gray-alpha-500 bg-background-100 shadow-[var(--shadow-card)]",
                "outline-none",
                "transition-[height,width] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
                "hover:h-[18px] hover:w-2 data-dragging:h-[18px] data-dragging:w-2",
                "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-2",
              )}
              data-slot="slider-thumb"
              index={index}
              key={String(index)}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );

  const showAnyInput = isRange && (showStartInput || showEndInput);
  if (!showAnyInput) return slider;

  return (
    <div className="flex items-center gap-3 w-full" data-slot="slider-with-inputs">
      {showStartInput && (
        <div className="w-16 shrink-0">
          <Input
            size="sm"
            type="number"
            value={values[0]}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(e) => {
              const n = Number((e.target as HTMLInputElement).value);
              if (!Number.isNaN(n)) updateAt(0, n);
            }}
            aria-label="Start value"
          />
        </div>
      )}
      {slider}
      {showEndInput && (
        <div className="w-16 shrink-0">
          <Input
            size="sm"
            type="number"
            value={values[1]}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(e) => {
              const n = Number((e.target as HTMLInputElement).value);
              if (!Number.isNaN(n)) updateAt(1, n);
            }}
            aria-label="End value"
          />
        </div>
      )}
    </div>
  );
}

export function SliderValue({
  className,
  ...props
}: SliderPrimitive.Value.Props): React.ReactElement {
  return (
    <SliderPrimitive.Value
      className={cn("flex justify-end text-label-13 tabular-nums", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

export { SliderPrimitive };
