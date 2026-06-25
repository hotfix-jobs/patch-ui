"use client";

import { useState } from "react";
import { Wizard, Button, Input, Label, Field } from "@patchui/react";

const TOTAL = 4;

export function WizardDemo() {
  const [step, setStep] = useState(0);
  const completed = step >= TOTAL;

  if (completed) {
    return (
      <div className="rounded-[var(--radius-patch-sm)] border-[0.5px] border-patch-border bg-patch-surface p-6 text-center">
        <p className="text-[length:var(--text-patch-body)] text-patch-text-secondary">
          Flow complete.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3"
          onClick={() => setStep(0)}
        >
          Reset
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-patch-sm)] border-[0.5px] border-patch-border bg-patch-surface">
      <Wizard step={step} totalSteps={TOTAL}>
        {step === 0 && (
          <StepFrame
            title="Welcome"
            body="A four-step example flow. Advance with the button below."
          >
            <Button onClick={() => setStep(1)} className="w-full">
              Get started
            </Button>
          </StepFrame>
        )}
        {step === 1 && (
          <StepFrame
            title="Tell us about you"
            body="Form fields, inputs, anything you want lives inside the step."
          >
            <Field>
              <Label htmlFor="wizard-demo-name">Name</Label>
              <Input id="wizard-demo-name" placeholder="Alex" />
            </Field>
            <Button onClick={() => setStep(2)} className="mt-2 w-full">
              Continue
            </Button>
          </StepFrame>
        )}
        {step === 2 && (
          <StepFrame
            title="Pick a preference"
            body="Step state lives in the parent. Wizard just slides between renders."
          >
            <Field>
              <Label htmlFor="wizard-demo-pref">Favorite color</Label>
              <Input id="wizard-demo-pref" placeholder="Blue" />
            </Field>
            <Button onClick={() => setStep(3)} className="mt-2 w-full">
              Continue
            </Button>
          </StepFrame>
        )}
        {step === 3 && (
          <StepFrame
            title="All set"
            body="Last step. Each step component renders its own continue or finish button."
          >
            <Button onClick={() => setStep(TOTAL)} className="w-full">
              Finish
            </Button>
          </StepFrame>
        )}
      </Wizard>
    </div>
  );
}

function StepFrame({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-[length:var(--text-patch-lead)] font-semibold leading-tight text-patch-text">
          {title}
        </h2>
        <p className="mt-1 text-[length:var(--text-patch-body)] text-patch-text-secondary">
          {body}
        </p>
      </div>
      {children}
    </div>
  );
}
