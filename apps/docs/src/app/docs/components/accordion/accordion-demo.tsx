"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "@patchui/react";

export function AccordionDemo() {
  return (
    <div className="w-full max-w-md">
      <Accordion defaultValue={["item-0"]}>
        <AccordionItem value="item-0">
          <AccordionTrigger>What is Patch UI?</AccordionTrigger>
          <AccordionPanel>
            A React component library built on Base UI primitives with Tailwind
            CSS v4 and a design-token system.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
          <AccordionPanel>
            Yes. Tokens are defined for both light and dark via the `dark` class,
            with no JavaScript theme switching required.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I open multiple panels?</AccordionTrigger>
          <AccordionPanel>
            Yes. Accordion allows multiple open panels by default; pass a single
            value to enforce one-at-a-time behavior.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
