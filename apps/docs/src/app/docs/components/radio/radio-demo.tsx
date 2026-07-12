"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@patchui/react";

export function RadioDemo() {
  const [plan, setPlan] = useState("standard");

  return (
    <div className="flex flex-col gap-3">
      <p id="radio-plan-label" className="text-small font-medium text-ink">
        Plan
      </p>
      <RadioGroup
        aria-labelledby="radio-plan-label"
        value={plan}
        onValueChange={(value) => setPlan(value as string)}
      >
        <Radio value="starter">Starter</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="pro">Professional</Radio>
      </RadioGroup>
    </div>
  );
}
