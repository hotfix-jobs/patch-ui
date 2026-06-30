"use client";
import { DisplayHeading } from "@patchui/react";

export function DisplayHeadingDemo() {
  return (
    <div className="space-y-10">
      <DisplayHeading size="md">Subsection title</DisplayHeading>
      <DisplayHeading size="lg">Section title</DisplayHeading>
      <DisplayHeading size="xl">
        Build something
        <br />
        people love.
      </DisplayHeading>

      <DisplayHeading size="lg" eyebrow="Hiring">
        Sr. Engineer in NYC
      </DisplayHeading>

      <DisplayHeading size="md" eyebrow="New release">
        v0.24 ships with refined defaults across every component.
      </DisplayHeading>
    </div>
  );
}
