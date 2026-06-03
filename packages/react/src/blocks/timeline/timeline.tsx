"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { DisplayHeading } from "../../components/display-heading";
import { SectionLabel } from "../../components/section-label";
import { cn } from "../../utils";

export type TimelineStepBg =
  | { type: "color"; value: string }
  | { type: "image"; src: string };

export interface TimelineStep {
  /** Small label rendered on the step Badge. e.g. "01" or "2022". */
  eyebrow: string;
  /** Step headline. */
  title: string;
  /** Optional supporting copy under the title. */
  body?: string;
  /** Optional decorative icon — typically a Lucide icon — rendered above
   *  the eyebrow Badge inside a small bordered square. Caller controls
   *  size via the icon's own className. */
  icon?: ReactNode;
  /** Optional small footer line below the body. Renders uppercase tracking. */
  meta?: string;
  /** Optional background for the frame while this step is active. */
  bg?: TimelineStepBg;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLElement> {
  steps: TimelineStep[];
  /** Optional section heading shown above the frame. */
  heading?: string;
  /** Optional small eyebrow label above the heading. */
  eyebrow?: string;
}

/**
 * Timeline – horizontally paginated sequential content block.
 *
 * One step visible at a time in a full-width frame. Real Back/Next
 * Buttons at the bottom corners, a step counter and progress bar
 * between them, content left-aligned with a comfortable max-width.
 * Touch swipe + keyboard arrows work via scroll-snap; all steps stay
 * in the DOM for SEO + screen readers. Per-step `bg` (color or image)
 * crossfades on advance.
 *
 * Intended for marketing surfaces: process explanations, brand
 * chronicles, and similar ordered content.
 */
export function Timeline({
  steps,
  heading,
  eyebrow,
  className,
  ...rest
}: TimelineProps) {
  const baseId = useId();
  const trackRef = useRef<HTMLOListElement | null>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync activeIndex from scroll position. IntersectionObserver fires when
  // a step crosses the 60% visibility threshold inside the track – higher
  // than 50% so mid-scroll states don't flicker the active index.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = stepRefs.current.indexOf(entry.target as HTMLLIElement);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      { root: track, threshold: 0.6 },
    );
    for (const el of stepRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [steps.length]);

  const scrollTo = useCallback((idx: number) => {
    const target = stepRefs.current[idx];
    const track = trackRef.current;
    if (!target || !track) return;
    track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, []);

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < steps.length - 1;
  const progressPct = ((activeIndex + 1) / steps.length) * 100;
  // 2-digit step counter when the total step count itself fits in 2 digits;
  // otherwise pad to match. "01 / 03" reads cleaner than "1 / 3".
  const totalDigits = String(steps.length).length;
  const counter = `${String(activeIndex + 1).padStart(totalDigits, "0")} / ${String(steps.length).padStart(totalDigits, "0")}`;

  return (
    <section
      className={cn("px-6 md:px-10 py-12 md:py-20", className)}
      aria-roledescription="timeline"
      {...rest}
    >
      <div className="mx-auto max-w-[1280px]">
        {(eyebrow || heading) && (
          <header className="mb-8 md:mb-12">
            {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
            {heading && (
              <DisplayHeading size="md" render={<h2 />}>
                {heading}
              </DisplayHeading>
            )}
          </header>
        )}

        <div className="relative overflow-hidden rounded-[var(--radius-patch-md)] border-[0.5px] border-patch-border bg-patch-surface">
          {/* Per-step background layers, cross-fade on active change. */}
          {steps.some((s) => s.bg) && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {steps.map((step, i) => (
                <div
                  key={`${baseId}-bg-${i}`}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-[var(--duration-patch-spring)] ease-[var(--ease-patch-out)]",
                    i === activeIndex ? "opacity-100" : "opacity-0",
                  )}
                  style={bgToStyle(step.bg)}
                />
              ))}
            </div>
          )}

          {/* Scroll-snap track. The `<ol>` is the semantic spine — all steps
              live in the DOM and are crawlable / readable regardless of which
              one is on screen. `tabIndex=0` lets keyboard users focus the
              track and use Arrow Left/Right (native scroll behavior). */}
          <ol
            ref={trackRef}
            tabIndex={0}
            className={cn(
              "relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth",
              "outline-none focus-visible:ring-1 focus-visible:ring-[var(--patch-focus-ring)]",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
            aria-label="Timeline steps"
          >
            {steps.map((step, i) => (
              <li
                key={`${baseId}-step-${i}`}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative shrink-0 snap-center w-full"
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <TimelineStepContent step={step} />
              </li>
            ))}
          </ol>

          {/* Footer: progress bar + counter + nav buttons. Sits inside the
              frame at the bottom with its own hairline divider so it reads
              as one continuous card. */}
          <div className="relative border-t-[0.5px] border-patch-border bg-patch-surface/80 backdrop-blur-sm">
            {/* Thin progress bar across the very top of the footer row. */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-patch-border-subtle">
              <div
                className="h-full bg-patch-text transition-[width] duration-[var(--duration-patch-spring)] ease-[var(--ease-patch-out)]"
                style={{ width: `${progressPct}%` }}
                aria-hidden="true"
              />
            </div>

            <div className="flex items-center justify-between gap-3 px-5 md:px-8 py-3 md:py-4">
              <Button
                variant="outline"
                size="sm"
                icon={<ChevronLeft className="size-3.5" />}
                iconPosition="left"
                onClick={() => scrollTo(activeIndex - 1)}
                disabled={!hasPrev}
                aria-label="Previous step"
              >
                Back
              </Button>

              <span
                className="text-[12px] tabular-nums tracking-[0.08em] uppercase font-medium text-patch-text-tertiary"
                aria-live="polite"
                aria-atomic="true"
              >
                {counter}
              </span>

              <Button
                variant="outline"
                size="sm"
                icon={<ChevronRight className="size-3.5" />}
                iconPosition="right"
                onClick={() => scrollTo(activeIndex + 1)}
                disabled={!hasNext}
                aria-label="Next step"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStepContent({ step }: { step: TimelineStep }) {
  return (
    <div className="relative flex min-h-[420px] md:min-h-[520px] flex-col justify-center p-8 md:p-14">
      <div className="max-w-[44rem]">
        {step.icon && (
          <div className="mb-6 inline-flex size-12 items-center justify-center rounded-[var(--radius-patch-sm)] border-[0.5px] border-patch-border bg-patch-bg text-patch-text">
            {step.icon}
          </div>
        )}

        <Badge variant="ghost" size="lg" shape="pill" className="mb-5">
          {step.eyebrow}
        </Badge>

        <h3 className="text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] font-medium text-patch-text">
          {step.title}
        </h3>

        {step.body && (
          <p className="mt-4 text-[15px] md:text-[16px] leading-relaxed text-patch-text-secondary max-w-[36rem]">
            {step.body}
          </p>
        )}

        {step.meta && (
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.12em] text-patch-text-tertiary">
            {step.meta}
          </p>
        )}
      </div>
    </div>
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
