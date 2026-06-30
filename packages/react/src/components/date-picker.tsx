"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { useCallback, useState } from "react";
import type * as React from "react";
import { Button } from "./button";
import {
  Calendar,
  type CalendarProps,
  type DateRange,
} from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { cn } from "../utils";

function defaultFormat(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRange(range: DateRange, fmt: (d: Date) => string): string {
  if (!range.from && !range.to) return "";
  if (range.from && !range.to) return fmt(range.from);
  if (range.from && range.to) return `${fmt(range.from)} – ${fmt(range.to)}`;
  return "";
}

export interface DatePickerProps {
  /** Selected date (controlled). */
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
  /** Custom format for the trigger label. */
  format?: (date: Date) => string;
  /** Placeholder when no date is selected. Default "Pick a date". */
  placeholder?: React.ReactNode;
  /** Trigger size. */
  size?: "sm" | "md" | "lg";
  /** Disable interaction. */
  disabled?: boolean;
  /** Disable specific dates inside the calendar. */
  disabledDates?: (date: Date) => boolean;
  fromDate?: Date;
  toDate?: Date;
  weekStartsOn?: CalendarProps["weekStartsOn"];
  className?: string;
}

/**
 * DatePicker — Button trigger + Popover + Calendar. Single date selection
 * with formatted label, polymorphic trigger via PopoverTrigger, and the
 * full Popover chrome.
 */
export function DatePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  format = defaultFormat,
  placeholder = "Pick a date",
  size = "md",
  disabled,
  disabledDates,
  fromDate,
  toDate,
  weekStartsOn,
  className,
}: DatePickerProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = useState<Date | null>(
    defaultValue ?? null,
  );
  const [open, setOpen] = useState(false);
  const value = controlledValue ?? uncontrolled;

  const handleChange = useCallback(
    (next: Date | null) => {
      if (controlledValue === undefined) setUncontrolled(next);
      onValueChange?.(next);
      if (next) setOpen(false);
    },
    [controlledValue, onValueChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-start">
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size={size}
            disabled={disabled}
            icon={<CalendarIcon />}
            className={cn(
              "justify-start font-normal",
              !value && "text-patch-text-tertiary",
              className,
            )}
          />
        }
      >
        {value ? format(value) : placeholder}
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          value={value}
          onValueChange={handleChange}
          disabledDates={disabledDates}
          fromDate={fromDate}
          toDate={toDate}
          weekStartsOn={weekStartsOn}
        />
      </PopoverContent>
    </Popover>
  );
}

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange) => void;
  format?: (date: Date) => string;
  placeholder?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  disabledDates?: (date: Date) => boolean;
  fromDate?: Date;
  toDate?: Date;
  weekStartsOn?: CalendarProps["weekStartsOn"];
  className?: string;
}

/**
 * DateRangePicker — Button trigger + Popover + range Calendar. Pick a
 * start and end date; label shows the formatted range.
 */
export function DateRangePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  format = defaultFormat,
  placeholder = "Pick a date range",
  size = "md",
  disabled,
  disabledDates,
  fromDate,
  toDate,
  weekStartsOn,
  className,
}: DateRangePickerProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = useState<DateRange>(
    defaultValue ?? {},
  );
  const [open, setOpen] = useState(false);
  const value = controlledValue ?? uncontrolled;

  const handleChange = useCallback(
    (next: DateRange) => {
      if (controlledValue === undefined) setUncontrolled(next);
      onValueChange?.(next);
      if (next.from && next.to) setOpen(false);
    },
    [controlledValue, onValueChange],
  );

  const label = formatRange(value, format);

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-start">
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size={size}
            disabled={disabled}
            icon={<CalendarIcon />}
            className={cn(
              "justify-start font-normal",
              !label && "text-patch-text-tertiary",
              className,
            )}
          />
        }
      >
        {label || placeholder}
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="range"
          value={value}
          onValueChange={handleChange}
          disabledDates={disabledDates}
          fromDate={fromDate}
          toDate={toDate}
          weekStartsOn={weekStartsOn}
        />
      </PopoverContent>
    </Popover>
  );
}
