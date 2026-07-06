"use client";
import { EmptyState, Button } from "@patchui/react";
import { ArrowSquareOut, ChartBar, MagnifyingGlassMinus, Tray } from "@phosphor-icons/react/dist/ssr";
export function EmptyStateDemo() {
  return (
    <div className="flex flex-col gap-14">
      <EmptyState
        title="Title"
        description="This should detail the actions you can take on this screen, as well as why it's valuable."
        icon={<ChartBar />}
        action={
          <Button variant="secondary" size="md">
            Primary Action
          </Button>
        }
      >
        <a
          href="#"
          className="inline-flex items-center gap-1 text-small text-ink-muted hover:text-ink"
        >
          Learn more
          <ArrowSquareOut className="size-3.5" />
        </a>
      </EmptyState>

      <EmptyState
        title="No results match those filters"
        description="Try removing a filter, or clear all to see every result."
        icon={<MagnifyingGlassMinus />}
        action={
          <Button variant="secondary" size="md">
            Clear Filters
          </Button>
        }
      />

      <EmptyState
        title="Your watchlist is empty"
        description="Save items here to keep track of the things you care about."
        icon={<Tray />}
        action={<Button size="md">Browse items</Button>}
      />
    </div>
  );
}
