"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "@patchui/react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-label-12 font-medium text-gray-800">{children}</p>
  );
}

export function AccordionDemo() {
  return (
    <div className="flex flex-col gap-10">
      {/* Bordered — the common case */}
      <div className="w-full max-w-md">
        <SectionLabel>Bordered (hairline row pattern)</SectionLabel>
        <Accordion bordered defaultValue={["item-0"]}>
          <AccordionItem value="item-0">
            <AccordionTrigger>What is Patch UI?</AccordionTrigger>
            <AccordionPanel>
              A React component library built on Base UI primitives with
              Tailwind CSS v4 and a design-token system.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
            <AccordionPanel>
              Yes. Tokens are defined for both light and dark via the `dark`
              class, with no JavaScript theme switching required.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I open multiple panels?</AccordionTrigger>
            <AccordionPanel>
              Yes. Pass `multiple` to allow more than one item open at once,
              matching Vercel Geist's CollapseGroup.multiple behavior.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Multiple open */}
      <div className="w-full max-w-md">
        <SectionLabel>Multiple panels open at once</SectionLabel>
        <Accordion bordered multiple defaultValue={["a", "b"]}>
          <AccordionItem value="a">
            <AccordionTrigger>Panel A</AccordionTrigger>
            <AccordionPanel>Both panels are open by default.</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Panel B</AccordionTrigger>
            <AccordionPanel>
              Toggle each independently; they don't collapse each other.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Unstyled — consumer supplies chrome */}
      <div className="w-full max-w-md">
        <SectionLabel>Unstyled (compose your own chrome)</SectionLabel>
        <Accordion>
          <AccordionItem
            value="q-1"
            className="rounded-[var(--radius-12)] border border-gray-alpha-400 mb-2 px-4"
          >
            <AccordionTrigger>Card-styled item</AccordionTrigger>
            <AccordionPanel>
              Skip `bordered` on the root and give each item its own chrome for
              a card look.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            value="q-2"
            className="rounded-[var(--radius-12)] border border-gray-alpha-400 mb-2 px-4"
          >
            <AccordionTrigger>Second card</AccordionTrigger>
            <AccordionPanel>
              Each item is its own contained card in this layout.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
