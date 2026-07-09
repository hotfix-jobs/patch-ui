"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  SectionLabel,
} from "@patchui/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export function AccordionDemo() {
  return (
    <div className="flex flex-col gap-10">
      {/* Flush (default): borderless, tight, no chrome */}
      <div className="w-full max-w-md space-y-3">
        <SectionLabel>Flush (default)</SectionLabel>
        <Accordion defaultValue={["item-0"]}>
          <AccordionItem value="item-0">
            <AccordionTrigger>What is Patch UI?</AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                A React component library built on Base UI primitives with
                Tailwind CSS v4 and a design-token system.
              </p>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                Yes. Tokens are defined for both light and dark via the `dark`
                class, with no JavaScript theme switching required.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Bordered: hairline row separators */}
      <div className="w-full max-w-md space-y-3">
        <SectionLabel>Bordered (hairline row pattern)</SectionLabel>
        <Accordion variant="bordered" defaultValue={["item-0"]}>
          <AccordionItem value="item-0">
            <AccordionTrigger>What is Patch UI?</AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                A React component library built on Base UI primitives with
                Tailwind CSS v4 and a design-token system.
              </p>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I open multiple panels?</AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                Pass `openMultiple` to allow more than one item open at once.
              </p>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Are components accessible?</AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                Base UI ships the WAI-ARIA accordion pattern; roving focus,
                arrow-key navigation, Home / End, and Space / Enter are handled.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Card: each item is its own bordered card */}
      <div className="w-full max-w-md space-y-3">
        <SectionLabel>Card (each item is its own surface)</SectionLabel>
        <Accordion variant="card" defaultValue={["a"]}>
          <AccordionItem value="a">
            <AccordionTrigger>Team plan</AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                Ideal for teams of 5 to 50. Includes shared workspaces, admin
                controls, and priority support.
              </p>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Enterprise plan</AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                Custom seats, SSO, audit logs, dedicated support, and an
                enterprise SLA. Contact sales for pricing.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Single item = show more reveal */}
      <div className="w-full max-w-md space-y-3">
        <SectionLabel>Single-item reveal</SectionLabel>
        <Accordion>
          <AccordionItem value="details">
            <AccordionTrigger>Show more details</AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                One item with the flush variant covers any inline "show
                more" pattern.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Custom caret + no caret */}
      <div className="w-full max-w-md space-y-3">
        <SectionLabel>Custom caret and no caret</SectionLabel>
        <Accordion variant="bordered">
          <AccordionItem value="q-1">
            <AccordionTrigger
              caret={
                <Plus
                  aria-hidden
                  className="size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] group-data-[panel-open]:rotate-45 group-data-[panel-open]:text-ink group-hover:text-ink"
                />
              }
            >
              Plus icon that rotates into an X
            </AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                Pass any node as `caret`. Use `group-data-[panel-open]:*`
                classes to react to the open state (rotation, color, swap).
              </p>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="q-2">
            <AccordionTrigger caret={null}>
              Trigger without any chevron
            </AccordionTrigger>
            <AccordionPanel>
              <p className="pb-3 text-small text-ink-muted">
                Pass `caret={"{null}"}` to hide the indicator entirely.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
