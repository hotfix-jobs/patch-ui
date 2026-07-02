"use client";

import { Button } from "@patchui/react";
import { ArrowRight, Download, Mail, Trash2 } from "lucide-react";

/** Showcases Button variants, sizes, icon usage, and loading state. */
export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="error">Error</Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">With Icons</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<Mail className="h-4 w-4" />}>Send Email</Button>
          <Button icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
            Next
          </Button>
          <Button variant="error" icon={<Trash2 className="h-4 w-4" />}>
            Delete
          </Button>
          <Button variant="secondary" icon={<Download className="h-4 w-4" />} />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Apply with arrow</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Apply Now
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">States</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
