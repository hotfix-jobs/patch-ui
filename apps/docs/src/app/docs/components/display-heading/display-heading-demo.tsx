"use client";
import { DisplayHeading } from "@patchui/react";

export function DisplayHeadingDemo() {
  return (
    <div className="space-y-8">
      <DisplayHeading size="md">Subsection title</DisplayHeading>
      <DisplayHeading size="lg">Section title</DisplayHeading>
      <DisplayHeading size="xl">
        Build something
        <br />
        people love.
      </DisplayHeading>
    </div>
  );
}
