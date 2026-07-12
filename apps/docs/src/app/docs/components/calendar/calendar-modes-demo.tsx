"use client";

import { Calendar } from "@patchui/react";

const july = new Date(2026, 6, 1);

export function CalendarModesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Calendar
        mode="range"
        defaultMonth={july}
        defaultValue={{
          from: new Date(2026, 6, 13),
          to: new Date(2026, 6, 17),
        }}
      />
      <Calendar
        mode="multiple"
        defaultMonth={july}
        defaultValue={[
          new Date(2026, 6, 7),
          new Date(2026, 6, 14),
          new Date(2026, 6, 21),
        ]}
      />
    </div>
  );
}
