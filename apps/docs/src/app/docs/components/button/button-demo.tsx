"use client";

import { useState } from "react";
import { Button } from "@patchui/react";
import { ArrowRight, CaretDown, Download, Envelope, Hash, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
const INITIAL_FILTERS = ["design", "engineering", "billing"];

export function ButtonDemo() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
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
        <p className="mb-3 text-mini text-ink-muted">Icon Only + Shapes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" aria-label="Add" shape="square" size="sm" icon={<Plus className="h-4 w-4" />} />
          <Button variant="secondary" aria-label="Add" shape="square" icon={<Plus className="h-4 w-4" />} />
          <Button variant="secondary" aria-label="Add" shape="square" size="lg" icon={<Plus className="h-5 w-5" />} />
          <Button variant="secondary" aria-label="Add" shape="circle" size="sm" icon={<Plus className="h-4 w-4" />} />
          <Button variant="secondary" aria-label="Add" shape="circle" icon={<Plus className="h-4 w-4" />} />
          <Button variant="secondary" aria-label="Add" shape="circle" size="lg" icon={<Plus className="h-5 w-5" />} />
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
        <p className="mb-3 text-mini text-ink-muted">Muted (chip / filter chrome)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" muted icon={<Envelope className="h-4 w-4" />}>
            Visit site
          </Button>
          <Button variant="secondary" muted icon={<Download className="h-4 w-4" />}>
            Download
          </Button>
          <Button variant="tertiary" muted icon={<CaretDown className="h-4 w-4" />} iconPosition="right">
            Filter
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Marketing pill shape</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            shape="pill"
            shadow
            variant="primary"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Start Free Trial
          </Button>
          <Button shape="pill" shadow variant="secondary">
            Learn More
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Dismissible filter chip</p>
        <div className="flex min-h-9 flex-wrap items-center gap-2">
          {filters.length === 0 ? (
            <Button
              size="sm"
              variant="tertiary"
              onClick={() => setFilters(INITIAL_FILTERS)}
            >
              Reset
            </Button>
          ) : (
            filters.map((f) => (
              <Button
                key={f}
                size="sm"
                shape="pill"
                variant="secondary"
                icon={<Hash className="h-4 w-4" />}
                onClick={() => alert(`Focus ${f} filter`)}
                onRemove={() => setFilters((prev) => prev.filter((x) => x !== f))}
                removeLabel={`Remove ${f}`}
              >
                {f}
              </Button>
            ))
          )}
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
