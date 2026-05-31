"use client";

import { Button } from "@patchui/react";
import { ArrowRight, Download, Mail, Trash2 } from "lucide-react";

/** Showcases Button variants, sizes, icon usage, and loading state. */
export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Variants */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Variants
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          With Icons
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<Mail className="h-4 w-4" />}>Send Email</Button>
          <Button icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
            Next
          </Button>
          <Button variant="danger" icon={<Trash2 className="h-4 w-4" />}>
            Delete
          </Button>
          <Button variant="secondary" icon={<Download className="h-4 w-4" />} />
        </div>
      </div>

      {/* Apply with arrow */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Apply with arrow
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Apply now
          </Button>
        </div>
      </div>

      {/* States */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          States
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
