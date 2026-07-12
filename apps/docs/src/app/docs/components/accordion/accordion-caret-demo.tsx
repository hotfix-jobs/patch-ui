"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@patchui/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export function AccordionCaretDemo() {
  return (
    <Accordion className="w-full max-w-md">
      <AccordionItem value="details">
        <AccordionTrigger
          caret={
            <Plus
              aria-hidden
              className="size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] group-data-[panel-open]:rotate-45 group-data-[panel-open]:text-ink group-hover:text-ink"
            />
          }
        >
          Show project details
        </AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            The plus rotates to communicate the panel’s open state.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
