"use client";

import { Button } from "@patchui/react";
import { ArrowRight, ChevronDown, Download, Mail, Plus, Trash2 } from "lucide-react";

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="warning">Warning</Button>
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
        <p className="mb-3 text-label-12 text-gray-800">Icon Only + Shapes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button aria-label="Add" shape="square" size="tiny" icon={<Plus className="h-3 w-3" />} />
          <Button aria-label="Add" shape="square" size="sm" icon={<Plus className="h-4 w-4" />} />
          <Button aria-label="Add" shape="square" icon={<Plus className="h-4 w-4" />} />
          <Button aria-label="Add" shape="square" size="lg" icon={<Plus className="h-5 w-5" />} />
          <Button aria-label="Add" shape="circle" size="sm" icon={<Plus className="h-4 w-4" />} />
          <Button aria-label="Add" shape="circle" icon={<Plus className="h-4 w-4" />} />
          <Button aria-label="Add" shape="circle" size="lg" icon={<Plus className="h-5 w-5" />} />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">With Icons</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<Mail className="h-4 w-4" />}>Send Email</Button>
          <Button icon={<ChevronDown className="h-4 w-4" />} iconPosition="right">
            Menu
          </Button>
          <Button variant="error" icon={<Trash2 className="h-4 w-4" />}>
            Delete
          </Button>
          <Button variant="secondary" icon={<Download className="h-4 w-4" />}>
            Download
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Rounded marketing shape</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            shape="rounded"
            shadow
            variant="primary"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Start Free Trial
          </Button>
          <Button shape="rounded" shadow variant="secondary">
            Learn More
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
