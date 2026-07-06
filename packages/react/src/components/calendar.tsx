"use client";

import { useCallback, useMemo, useState } from "react";
import type * as React from "react";
import { Button } from "./button";
import { cn } from "../utils";
import { focusRing } from "../recipes";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
type Mode = "single" | "range" | "multiple";

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface BaseProps {
  /** First day of the week (0 = Sunday). Default 0. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Disable interaction. */
  disabled?: boolean;
  /** Disable specific dates. */
  disabledDates?: (date: Date) => boolean;
  /** Earliest selectable date. */
  fromDate?: Date;
  /** Latest selectable date. */
  toDate?: Date;
  /** Initial month to display (defaults to today or the selected value). */
  defaultMonth?: Date;
  className?: string;
}

type SingleCalendarProps = BaseProps & {
  mode?: "single";
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
};

type RangeCalendarProps = BaseProps & {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange) => void;
};

type MultipleCalendarProps = BaseProps & {
  mode: "multiple";
  value?: Date[];
  defaultValue?: Date[];
  onValueChange?: (value: Date[]) => void;
};

export type CalendarProps =
  | SingleCalendarProps
  | RangeCalendarProps
  | MultipleCalendarProps;

const DAY_MS = 24 * 60 * 60 * 1000;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function addMonths(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(1);
  x.setMonth(x.getMonth() + n);
  return x;
}
function isBefore(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}
function isAfter(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}
function inRange(d: Date, from: Date, to: Date): boolean {
  const t = startOfDay(d).getTime();
  return t >= startOfDay(from).getTime() && t <= startOfDay(to).getTime();
}

function buildMonthGrid(month: Date, weekStartsOn: number): Date[][] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - startOffset);

  const weeks: Date[][] = [];
  const cursor = new Date(start);
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(cursor));
      cursor.setTime(cursor.getTime() + DAY_MS);
    }
    weeks.push(row);
  }
  return weeks;
}

/** Month grid with single, range, or multiple date selection. For an input-triggered popup, use `DatePicker`. */
export function Calendar(props: CalendarProps): React.ReactElement {
  const {
    mode = "single",
    weekStartsOn = 0,
    disabled,
    disabledDates,
    fromDate,
    toDate,
    defaultMonth,
    className,
  } = props as BaseProps & { mode: Mode };

  const initialMonth = useMemo(() => {
    if (defaultMonth) return startOfDay(defaultMonth);
    if (mode === "single") {
      const v =
        (props as SingleCalendarProps).value ??
        (props as SingleCalendarProps).defaultValue;
      if (v) return startOfDay(v);
    }
    if (mode === "range") {
      const v =
        (props as RangeCalendarProps).value ??
        (props as RangeCalendarProps).defaultValue;
      if (v?.from) return startOfDay(v.from);
    }
    if (mode === "multiple") {
      const v =
        (props as MultipleCalendarProps).value ??
        (props as MultipleCalendarProps).defaultValue;
      if (v && v[0]) return startOfDay(v[0]);
    }
    return startOfDay(new Date());
  }, [defaultMonth, mode, props]);

  const [viewMonth, setViewMonth] = useState<Date>(initialMonth);
  const today = startOfDay(new Date());

  const [singleUncontrolled, setSingleUncontrolled] = useState<Date | null>(
    mode === "single"
      ? ((props as SingleCalendarProps).defaultValue ?? null)
      : null,
  );
  const [rangeUncontrolled, setRangeUncontrolled] = useState<DateRange>(
    mode === "range"
      ? ((props as RangeCalendarProps).defaultValue ?? {})
      : {},
  );
  const [multipleUncontrolled, setMultipleUncontrolled] = useState<Date[]>(
    mode === "multiple"
      ? ((props as MultipleCalendarProps).defaultValue ?? [])
      : [],
  );

  const singleValue =
    mode === "single"
      ? ((props as SingleCalendarProps).value ?? singleUncontrolled)
      : null;
  const rangeValue = useMemo(
    () =>
      mode === "range"
        ? ((props as RangeCalendarProps).value ?? rangeUncontrolled)
        : ({} as DateRange),
    [mode, props, rangeUncontrolled],
  );
  const multipleValue = useMemo(
    () =>
      mode === "multiple"
        ? ((props as MultipleCalendarProps).value ?? multipleUncontrolled)
        : [],
    [mode, props, multipleUncontrolled],
  );

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (disabled) return true;
      if (fromDate && isBefore(date, fromDate)) return true;
      if (toDate && isAfter(date, toDate)) return true;
      if (disabledDates?.(date)) return true;
      return false;
    },
    [disabled, fromDate, toDate, disabledDates],
  );

  const onDayClick = useCallback(
    (date: Date) => {
      if (isDateDisabled(date)) return;
      const d = startOfDay(date);

      if (mode === "single") {
        const next = singleValue && isSameDay(singleValue, d) ? null : d;
        if ((props as SingleCalendarProps).value === undefined) {
          setSingleUncontrolled(next);
        }
        (props as SingleCalendarProps).onValueChange?.(next);
        return;
      }

      if (mode === "range") {
        const { from, to } = rangeValue;
        let next: DateRange;
        if (!from || (from && to)) {
          next = { from: d, to: undefined };
        } else if (from && !to) {
          if (isBefore(d, from)) {
            next = { from: d, to: from };
          } else if (isSameDay(d, from)) {
            next = {};
          } else {
            next = { from, to: d };
          }
        } else {
          next = { from: d };
        }
        if ((props as RangeCalendarProps).value === undefined) {
          setRangeUncontrolled(next);
        }
        (props as RangeCalendarProps).onValueChange?.(next);
        return;
      }

      // multiple
      const exists = multipleValue.some((m) => isSameDay(m, d));
      const next = exists
        ? multipleValue.filter((m) => !isSameDay(m, d))
        : [...multipleValue, d];
      if ((props as MultipleCalendarProps).value === undefined) {
        setMultipleUncontrolled(next);
      }
      (props as MultipleCalendarProps).onValueChange?.(next);
    },
    [
      isDateDisabled,
      mode,
      singleValue,
      rangeValue,
      multipleValue,
      props,
    ],
  );

  const weeks = useMemo(
    () => buildMonthGrid(viewMonth, weekStartsOn),
    [viewMonth, weekStartsOn],
  );
  const dayNames = useMemo(() => {
    const start = weekStartsOn;
    return [...Array(7)].map((_, i) => DAY_NAMES_SHORT[(start + i) % 7]);
  }, [weekStartsOn]);

  const monthLabel = `${MONTH_NAMES[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`;

  const isSelected = (d: Date): boolean => {
    if (mode === "single") return !!singleValue && isSameDay(d, singleValue);
    if (mode === "range") {
      const { from, to } = rangeValue;
      if (from && isSameDay(d, from)) return true;
      if (to && isSameDay(d, to)) return true;
      return false;
    }
    return multipleValue.some((m) => isSameDay(d, m));
  };

  const isInRange = (d: Date): boolean => {
    if (mode !== "range") return false;
    const { from, to } = rangeValue;
    if (!from || !to) return false;
    return inRange(d, from, to);
  };

  return (
    <div
      data-slot="calendar"
      data-mode={mode}
      className={cn(
        "w-fit select-none rounded-[var(--radius-12)] border border-hairline bg-canvas p-3 text-ink",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <Button
          variant="tertiary"
          size="sm"
          icon={<CaretLeft className="size-4" />}
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          aria-label="Previous month"
        />
        <div className="text-button-14 tabular-nums text-ink">
          {monthLabel}
        </div>
        <Button
          variant="tertiary"
          size="sm"
          icon={<CaretRight className="size-4" />}
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          aria-label="Next month"
        />
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 px-1 pb-1">
        {dayNames.map((d, i) => (
          <div
            key={i}
            className="text-center text-caption-11 text-ink-muted"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-0.5">
        {weeks.flat().map((d, i) => {
          const outside = !isSameMonth(d, viewMonth);
          const disabledDay = isDateDisabled(d);
          const selected = isSelected(d);
          const inSelectedRange = isInRange(d);
          const isToday = isSameDay(d, today);

          return (
            <button
              key={i}
              type="button"
              disabled={disabledDay}
              onClick={() => onDayClick(d)}
              aria-pressed={selected}
              aria-label={d.toDateString()}
              data-outside={outside || undefined}
              data-today={isToday || undefined}
              data-selected={selected || undefined}
              data-in-range={inSelectedRange || undefined}
              className={cn(
                "relative inline-flex size-9 items-center justify-center tabular-nums text-body-14 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
                "rounded-[var(--radius-6)]",
                outside && "text-ink-subtle",
                !outside && !selected && "text-ink",
                !selected && !disabledDay && "hover:bg-surface-1",
                isToday &&
                  !selected &&
                  "text-button-14 ring-1 ring-inset ring-hairline-strong",
                selected &&
                  "bg-primary text-on-primary text-button-14 hover:bg-primary-hover",
                inSelectedRange && !selected && "bg-surface-1",
                disabledDay && "pointer-events-none opacity-30",
                focusRing,
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
