"use client";

import { Grid, GridCell } from "@patchui/react";
import { SectionLabel } from "@patchui/react";

export function GridDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic 3-column grid</SectionLabel>
        <Grid columns={3}>
          <Cell>Auto</Cell>
          <Cell>Auto</Cell>
          <Cell>Auto</Cell>
          <Cell>Auto</Cell>
          <Cell>Auto</Cell>
          <Cell>Auto</Cell>
        </Grid>
      </div>

      <div className="space-y-3">
        <SectionLabel>Responsive columns (resize the viewport)</SectionLabel>
        <p className="mb-3 text-copy-13 text-gray-800">
          1 column below sm, 2 columns at md, 3 columns at lg.
        </p>
        <Grid columns={{ sm: 1, md: 2, lg: 3 }}>
          <Cell>Buttons</Cell>
          <Cell>Inputs</Cell>
          <Cell>Cards</Cell>
          <Cell>Menus</Cell>
          <Cell>Modals</Cell>
          <Cell>Tables</Cell>
        </Grid>
      </div>

      <div className="space-y-3">
        <SectionLabel>Cell spanning two columns</SectionLabel>
        <Grid columns={3}>
          <GridCell column="1 / 3" className="p-6">
            <div className="text-button-14 text-gray-1000">Wide cell</div>
            <div className="text-copy-13 text-gray-800">columns 1 through 2 via <code>column=&quot;1 / 3&quot;</code></div>
          </GridCell>
          <Cell>Third</Cell>
          <Cell>Fourth</Cell>
          <Cell>Fifth</Cell>
          <Cell>Sixth</Cell>
        </Grid>
      </div>

      <div className="space-y-3">
        <SectionLabel>Guides off</SectionLabel>
        <p className="mb-3 text-copy-13 text-gray-800">
          Plain grid without hairlines. Useful when you just want the responsive columns.
        </p>
        <Grid columns={3} guides={false} className="gap-3">
          <Cell bordered>First</Cell>
          <Cell bordered>Second</Cell>
          <Cell bordered>Third</Cell>
        </Grid>
      </div>
    </div>
  );
}

function Cell({
  children,
  bordered,
}: {
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <GridCell
      className={
        "flex min-h-[80px] items-center justify-center p-4 text-copy-14 text-gray-1000 " +
        (bordered
          ? "rounded-[var(--radius-6)] border-[0.5px] border-gray-alpha-400"
          : "")
      }
    >
      {children}
    </GridCell>
  );
}
