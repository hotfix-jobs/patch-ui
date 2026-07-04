"use client";

import { useState } from "react";
import {
  Button,
  MobileNavPanel,
  MobileNavPanelBody,
  MobileNavPanelFooter,
  MorphingMenuIcon,
} from "@patchui/react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#jobs", label: "Jobs" },
  { href: "#companies", label: "Companies" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

/**
 * MobileNavPanel portals to `document.body`, so the demo trigger opens
 * the panel over the whole viewport (as it would in production). It
 * anchors below the given `topOffset`; here we hard-code a value so the
 * demo works even if the docs page doesn't expose `--app-header-height`.
 */
export function MobileNavPanelDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <p className="text-copy-14 text-gray-800">
        The trigger doubles as the close affordance: click the morphing icon or
        press Escape to dismiss.
      </p>
      <Button
        variant="secondary"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        icon={<MorphingMenuIcon open={open} />}
      >
        {open ? "Close" : "Open"} nav
      </Button>

      <MobileNavPanel
        open={open}
        onOpenChange={setOpen}
        topOffset="64px"
      >
        <MobileNavPanelBody>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-copy-16 text-gray-1000 hover:text-gray-900"
            >
              {l.label}
            </a>
          ))}
        </MobileNavPanelBody>
        <MobileNavPanelFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Sign in
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Post a job
          </Button>
        </MobileNavPanelFooter>
      </MobileNavPanel>
    </div>
  );
}
