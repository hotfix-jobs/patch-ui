"use client";

import { Radio, RadioGroup , SectionLabel } from "@patchui/react";
import { useState } from "react";


export function RadioDemo() {
  const [plan, setPlan] = useState<string>("standard");
  const [cycle, setCycle] = useState<string>("monthly");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Controlled with children labels</SectionLabel>
        <RadioGroup value={plan} onValueChange={(v) => setPlan(v as string)}>
          <Radio value="starter">Starter</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="pro">Pro</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <SectionLabel>Uncontrolled with defaultValue</SectionLabel>
        <RadioGroup defaultValue="weekly">
          <Radio value="daily">Daily</Radio>
          <Radio value="weekly">Weekly</Radio>
          <Radio value="monthly">Monthly</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <SectionLabel>Billing cycle (2-option pattern)</SectionLabel>
        <RadioGroup value={cycle} onValueChange={(v) => setCycle(v as string)}>
          <Radio value="monthly">Monthly</Radio>
          <Radio value="yearly">Yearly</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled group</SectionLabel>
        <RadioGroup defaultValue="yes" disabled>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <SectionLabel>Bare radios (custom layout)</SectionLabel>
        <RadioGroup defaultValue="a">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-small text-ink">
              <Radio value="a" aria-label="A" />
              <span>A</span>
            </div>
            <div className="flex items-center gap-2 text-small text-ink">
              <Radio value="b" aria-label="B" />
              <span>B</span>
            </div>
            <div className="flex items-center gap-2 text-small text-ink">
              <Radio value="c" aria-label="C" />
              <span>C</span>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
