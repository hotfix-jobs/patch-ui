"use client";

import { Calendar } from "@patchui/react";

const selectedDate = new Date(2026, 6, 15);

export function CalendarDemo() {
  return (
    <Calendar
      mode="single"
      defaultMonth={selectedDate}
      defaultValue={selectedDate}
    />
  );
}
