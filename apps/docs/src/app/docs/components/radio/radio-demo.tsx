"use client";

import { Radio, RadioGroup } from "@patchui/react";
import { useState } from "react";

/** Showcases RadioGroup with controlled, uncontrolled, and disabled states. */
export function RadioDemo() {
  const [plan, setPlan] = useState<string>("standard");

  return (
    <div className="flex flex-col gap-8">
      {/* Controlled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Controlled
        </p>
        <RadioGroup
          value={plan}
          onValueChange={(v) => setPlan(v as string)}
        >
          {[
            { value: "starter", label: "Starter" },
            { value: "standard", label: "Standard" },
            { value: "pro", label: "Pro" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-patch-text"
            >
              <Radio value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Default Value */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Default Value
        </p>
        <RadioGroup defaultValue="weekly">
          {[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-patch-text"
            >
              <Radio value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Disabled
        </p>
        <RadioGroup defaultValue="yes" disabled>
          {[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-sm text-patch-text"
            >
              <Radio value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
