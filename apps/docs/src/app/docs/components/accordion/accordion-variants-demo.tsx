"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@patchui/react";

function Example({ variant }: { variant: "bordered" | "card" }) {
  return (
    <Accordion variant={variant} defaultValue={[`${variant}-1`]}>
      <AccordionItem value={`${variant}-1`}>
        <AccordionTrigger>Workspace access</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Members can view projects shared with their workspace.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value={`${variant}-2`}>
        <AccordionTrigger>Project permissions</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Project owners manage editing and sharing permissions.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionVariantsDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-8 md:grid-cols-2">
      <Example variant="bordered" />
      <Example variant="card" />
    </div>
  );
}
