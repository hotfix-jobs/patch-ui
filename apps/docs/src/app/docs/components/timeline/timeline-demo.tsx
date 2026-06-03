"use client";
import { Timeline } from "@patchui/react";

export function TimelineDemo() {
  return (
    <Timeline
      eyebrow="History"
      heading="Our story"
      steps={[
        {
          eyebrow: "2021",
          title: "Founded in Toronto",
          body: "Two engineers, one office, a thesis about retrofitting clean tech onto existing buildings.",
        },
        {
          eyebrow: "2022",
          title: "First product line",
          body: "Launched the original SolaRail, Solar Glass, and PVNB modules for architectural integration.",
        },
        {
          eyebrow: "2024",
          title: "International rollout",
          body: "Shipping in twelve countries with a partner network spanning architects, GCs, and developers.",
        },
      ]}
    />
  );
}
