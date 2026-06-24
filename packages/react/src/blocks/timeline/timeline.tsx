"use client";

import {
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { DisplayHeading } from "../../components/display-heading";
import { SectionLabel } from "../../components/section-label";
import { cn } from "../../utils";

export type TimelineStepBg =
  | { type: "color"; value: string }
  | { type: "image"; src: string };

export interface TimelineStep {
  /**
   * Step index or label (e.g. "01", "2022", "First"). Rendered prominently
   * on the left as the row's visual anchor.
   */
  n: string;
  /** Step headline. */
  title: string;
  /** Optional supporting copy under the title. */
  body?: string;
  /**
   * Optional decorative icon (typically a Lucide icon). Rendered in the
   * index column above the number; Timeline standardizes the visual size
   * (~28px) so the rhythm stays consistent across steps.
   */
  icon?: ReactNode;
  /**
   * Optional short list rendered after the body as hairline-divided rows.
   * Use for concrete sub-points (integrations, stats, technical detail).
   */
  details?: string[];
  /**
   * Optional small footer line below the details. Renders uppercase
   * with letter-spacing tracking.
   */
  meta?: string;
  /**
   * Optional background for the row. Renders as an absolute layer behind
   * the content with a subtle dim overlay so text stays readable.
   */
  bg?: TimelineStepBg;
}

export interface TimelineProps extends HTMLAttributes<HTMLElement> {
  steps: TimelineStep[];
  /** Optional section heading shown above the rows. */
  heading?: string;
  /** Optional small eyebrow label above the heading. */
  eyebrow?: string;
}

/**
 * Timeline — a vertical sequence of numbered steps, editorial style.
 *
 * Each step is a full-width row separated by hairline borders. The left
 * column carries the step number and optional icon; the right column
 * holds the title, body, optional details list, and meta line. Per-step
 * background images render subtly behind the row with a dim overlay.
 *
 * Intended for marketing surfaces: process explanations, brand chronicles,
 * "how it works" sections, founder's notes — any ordered narrative
 * content. For at-a-glance summaries with 3-4 items where all steps need
 * to be visible at once, prefer a grid layout instead.
 */
export function Timeline({
  steps,
  heading,
  eyebrow,
  className,
  ...rest
}: TimelineProps) {
  const baseId = useId();

  return (
    <section
      className={cn("px-6 md:px-10 py-12 md:py-20", className)}
      aria-roledescription="timeline"
      {...rest}
    >
      <div className="mx-auto max-w-[1280px]">
        {(eyebrow || heading) && (
          <header className="mb-12 md:mb-16">
            {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
            {heading && (
              <DisplayHeading size="md" render={<h2 />}>
                {heading}
              </DisplayHeading>
            )}
          </header>
        )}

        <ol className="border-y-[0.5px] border-patch-border">
          {steps.map((step, i) => (
            <li
              key={`${baseId}-step-${i}`}
              className={cn(
                "relative",
                i > 0 && "border-t-[0.5px] border-patch-border",
              )}
            >
              <TimelineRow step={step} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineRow({ step }: { step: TimelineStep }) {
  const bgStyle = bgToStyle(step.bg);
  const hasBg = step.bg != null;

  return (
    <article
      className={cn(
        "relative grid grid-cols-1 gap-6 py-12 md:grid-cols-[120px_1fr] md:gap-10 md:py-20 lg:grid-cols-[160px_1fr] lg:gap-14 lg:py-24",
      )}
    >
      {hasBg && (
        <>
          {/* Per-row background + subtle overlay so content stays readable. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -mx-6 md:-mx-10"
            style={bgStyle}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -mx-6 md:-mx-10 bg-patch-bg/55"
          />
        </>
      )}

      {/* Index column */}
      <div className="relative flex flex-col items-start gap-3 md:gap-5">
        {step.icon && (
          <div
            aria-hidden="true"
            className="text-patch-text [&_svg]:size-7"
          >
            {step.icon}
          </div>
        )}
        <div className="font-medium tabular-nums tracking-[var(--tracking-patch-section)] text-patch-text-secondary text-[length:var(--text-patch-section)] leading-none">
          {step.n}
        </div>
      </div>

      {/* Content column */}
      <div className="relative max-w-2xl">
        <h3 className="text-balance text-[28px] md:text-[36px] lg:text-[44px] leading-[1.05] font-medium tracking-[-0.025em] text-patch-text">
          {step.title}
        </h3>

        {step.body && (
          <p className="mt-4 md:mt-5 max-w-[40rem] text-[15px] md:text-[17px] leading-relaxed text-patch-text-secondary">
            {step.body}
          </p>
        )}

        {step.details && step.details.length > 0 && (
          <ul className="mt-6 md:mt-8 max-w-[40rem] border-t-[0.5px] border-patch-border">
            {step.details.map((detail, di) => (
              <li
                key={di}
                className="border-b-[0.5px] border-patch-border py-2.5 text-[14px] leading-relaxed text-patch-text"
              >
                {detail}
              </li>
            ))}
          </ul>
        )}

        {step.meta && (
          <p className="mt-6 md:mt-8 text-[length:var(--text-patch-micro)] font-medium uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary">
            {step.meta}
          </p>
        )}
      </div>
    </article>
  );
}

function bgToStyle(bg: TimelineStepBg | undefined): CSSProperties {
  if (!bg) return {};
  if (bg.type === "color") return { background: bg.value };
  return {
    backgroundImage: `url(${bg.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
