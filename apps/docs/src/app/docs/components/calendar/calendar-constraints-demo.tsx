"use client";

import { Calendar } from "@patchui/react";

export function CalendarConstraintsDemo() {
  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 6, 1)}
      fromDate={new Date(2026, 6, 6)}
      toDate={new Date(2026, 6, 24)}
      disabledDates={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  );
}
