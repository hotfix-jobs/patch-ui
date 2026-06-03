"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
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
  /** Small label rendered above the title and on the nav pills. e.g. "01" or "2022". */
  eyebrow: string;
  /** Step headline. */
  title: string;
  /** Optional supporting copy under the title. */
  body?: string;
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
 * One step visible at a time in a full-width frame. Prev/next pill chips
 * carry the adjacent step's eyebrow and advance via scroll-snap, which gives
 * touch swipe + keyboard arrows for free. All steps stay in the DOM so SEO
 * crawlers and screen readers see the full content regardless of which step
 * is on screen. Per-step `bg` (color or image) crossfades on advance.
 *
 * Intended for marketing surfaces: process explanations ("how it works"),
 * brand chronicles ("our story"), and similar ordered content.
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

  const prev = activeIndex > 0 ? steps[activeIndex - 1] : null;
  const next = activeIndex < steps.length - 1 ? steps[activeIndex + 1] : null;

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
          {/* Per-step backgrounds, cross-fade on active change. Each layer is
              absolutely positioned and toggles opacity – the underlying
              surface stays visible during transitions so there is no flash. */}
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

          {/* Nav pills. Bottom-left = prev, top-right = next. Hidden when no
              adjacent step exists. The pills carry the adjacent eyebrow so
              the user can preview where they're going. */}
          {prev && (
            <NavPill
              direction="prev"
              label={prev.eyebrow}
              onClick={() => scrollTo(activeIndex - 1)}
            />
          )}
          {next && (
            <NavPill
              direction="next"
              label={next.eyebrow}
              onClick={() => scrollTo(activeIndex + 1)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function TimelineStepContent({ step }: { step: TimelineStep }) {
  return (
    <div className="relative flex min-h-[420px] md:min-h-[520px] flex-col justify-end p-8 md:p-14">
      {/* Marker dot + connecting line. Anchored to the eyebrow row of the
          active content. Pure decoration, behind the text. */}
      <div className="md:absolute md:right-14 md:top-14 md:bottom-14 md:left-[55%] flex flex-col">
        <div className="hidden md:block relative h-full">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 block size-2 rounded-full bg-[var(--patch-text)]"
          />
          <span
            aria-hidden="true"
            className="absolute left-[3.5px] top-2 bottom-[40%] w-[0.5px] bg-[var(--patch-border)]"
          />
          <div className="absolute left-6 right-0 bottom-0 max-w-[28rem]">
            <Badge variant="ghost" size="sm" shape="pill" className="mb-3">
              {step.eyebrow}
            </Badge>
            <h3 className="text-[22px] md:text-[28px] leading-[1.15] tracking-[-0.02em] font-medium text-patch-text">
              {step.title}
            </h3>
            {step.body && (
              <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-patch-text-secondary">
                {step.body}
              </p>
            )}
          </div>
        </div>

        {/* Mobile: stacked, no rail. The dot/line metaphor doesn't earn its
            keep on narrow viewports — just show the content cleanly. */}
        <div className="md:hidden">
          <Badge variant="ghost" size="sm" shape="pill" className="mb-3">
            {step.eyebrow}
          </Badge>
          <h3 className="text-[22px] leading-[1.2] tracking-[-0.02em] font-medium text-patch-text">
            {step.title}
          </h3>
          {step.body && (
            <p className="mt-3 text-[14px] leading-relaxed text-patch-text-secondary">
              {step.body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function NavPill({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <Button
      variant="outline"
      size="sm"
      icon={isPrev ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
      iconPosition={isPrev ? "left" : "right"}
      onClick={onClick}
      aria-label={`Go to ${isPrev ? "previous" : "next"} step (${label})`}
      className={cn(
        "absolute z-10 !rounded-full bg-patch-bg/80 backdrop-blur-sm",
        isPrev ? "bottom-6 left-6" : "top-6 right-6",
      )}
    >
      {label}
    </Button>
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
