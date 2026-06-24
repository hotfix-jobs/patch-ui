"use client";
import { Compass, Hammer, Send } from "lucide-react";
import { Timeline } from "@patchui/react";

export function TimelineDemo() {
  return (
    <Timeline
      eyebrow="Process"
      heading="Three phases. One outcome."
      steps={[
        {
          n: "01",
          icon: <Compass strokeWidth={1.5} />,
          title: "Discover",
          body: "Map the territory. Interviews, audits, and a clean read of where the product is today versus where it needs to go.",
          meta: "Roughly two weeks",
        },
        {
          n: "02",
          icon: <Hammer strokeWidth={1.5} />,
          title: "Build",
          body: "Tight iterations against the brief. Weekly check-ins, prototypes in hand, and a shared workspace for everything in motion.",
          details: [
            "Design system in lockstep with engineering",
            "Reviewable diffs over slide decks",
            "Demos every Friday, no exceptions",
          ],
          meta: "Four to eight weeks, scoped",
        },
        {
          n: "03",
          icon: <Send strokeWidth={1.5} />,
          title: "Ship",
          body: "Launch readiness check, gradual rollout, and a quiet handoff. Documentation is part of the work, not a postscript.",
          meta: "One week of polish and instrumentation",
        },
      ]}
    />
  );
}
