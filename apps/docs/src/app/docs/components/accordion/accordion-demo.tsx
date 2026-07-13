"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@patchui/react";

export function AccordionDemo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Can multiple sections be open?</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Yes. Accordion allows multiple open items by default.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does collapsed content stay mounted?</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Yes. Collapsed panels remain available to find-in-page search.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can the indicator be changed?</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Pass a custom node to the trigger’s caret prop.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
