"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type * as React from "react";
import { cn } from "../utils";
import { Button } from "./button";

export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Zero-indexed current step. Used as the AnimatePresence key, so a
   * step change triggers exit-then-enter slide.
   */
  step: number;
  /** Total step count. Drives the dot progress indicator. */
  totalSteps: number;
  /**
   * Top-right close handler. Omit to hide the dismiss control entirely.
   * Same skip semantics as a sheet or dialog close.
   */
  onDismiss?: () => void;
  /**
   * Step content. Parent decides which step to render. Wizard re-runs
   * the slide transition every time `step` changes.
   */
  children: React.ReactNode;
}

/**
 * Wizard — chrome for a sequential multi-step flow (onboarding, employer
 * signup, claim flow). Owns: a top bar with a dot progress indicator
 * and an optional dismiss button, a centered max-width container, and
 * a slide-from-right transition between steps.
 *
 * Does NOT own step state, validation, API calls, or step titles. The
 * parent drives the `step` prop. Each step component renders its own
 * heading, fields, and continue button.
 */
export function Wizard({
  step,
  totalSteps,
  onDismiss,
  className,
  children,
  ...props
}: WizardProps): React.ReactElement {
  const reduceMotion = useReducedMotion();

  return (
    <div
      data-slot="wizard"
      data-step={step}
      className={cn(
        "mx-auto w-full max-w-md px-6 py-8 sm:py-12",
        className,
      )}
      {...props}
    >
      <div
        data-slot="wizard-bar"
        className="mb-8 flex items-center justify-between"
      >
        <WizardProgress current={step} total={totalSteps} />
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            icon={<X className="size-4" />}
            onClick={onDismiss}
            aria-label="Close"
            data-slot="wizard-dismiss"
          />
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          data-slot="wizard-step"
          initial={reduceMotion ? { opacity: 0 } : { x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { x: -24, opacity: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
          }
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface WizardProgressProps {
  current: number;
  total: number;
}

/**
 * Dot indicator. Past and current dots render filled (patch-text);
 * future dots render outlined (patch-border). Small footprint so it
 * stays out of the way of step content.
 */
function WizardProgress({ current, total }: WizardProgressProps): React.ReactElement {
  return (
    <div
      data-slot="wizard-progress"
      role="progressbar"
      aria-valuemin={1}
      aria-valuenow={Math.min(current + 1, total)}
      aria-valuemax={total}
      aria-label={`Step ${Math.min(current + 1, total)} of ${total}`}
      className="flex items-center gap-1.5"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          aria-hidden
          data-state={i < current ? "past" : i === current ? "current" : "future"}
          className={cn(
            "size-2 rounded-full",
            "transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)]",
            i <= current ? "bg-patch-text" : "bg-patch-border",
          )}
        />
      ))}
    </div>
  );
}
