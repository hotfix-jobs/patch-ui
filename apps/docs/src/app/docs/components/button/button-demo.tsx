"use client";

import { Button } from "@patchui/react";
import { CaretDown, Download, Envelope, Plus, Trash } from "@phosphor-icons/react/dist/ssr";

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-mini text-ink-muted">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Icon only</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" aria-label="Add" size="sm" icon={<Plus className="h-4 w-4" />} />
          <Button variant="secondary" aria-label="Add" icon={<Plus className="h-4 w-4" />} />
          <Button variant="secondary" aria-label="Add" size="lg" icon={<Plus className="h-5 w-5" />} />
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Shapes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button shape="rounded">Rounded</Button>
          <Button shape="pill">Pill</Button>
          <Button shape="pill" variant="secondary">Filter items</Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">With Icons</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<Envelope className="h-4 w-4" />}>Send Email</Button>
          <Button icon={<CaretDown className="h-4 w-4" />} iconPosition="right">
            Menu
          </Button>
          <Button variant="destructive" icon={<Trash className="h-4 w-4" />}>
            Delete
          </Button>
          <Button variant="secondary" icon={<Download className="h-4 w-4" />}>
            Download
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">States</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
