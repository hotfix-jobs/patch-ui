"use client";
import { EmptyState, Button } from "@patchui/react";
import { BarChart3, ExternalLink, Inbox, SearchX } from "lucide-react";

export function EmptyStateDemo() {
  return (
    <div className="flex flex-col gap-14">
      <EmptyState
        title="Title"
        description="This should detail the actions you can take on this screen, as well as why it's valuable."
        icon={<BarChart3 />}
        action={
          <Button variant="secondary" size="md">
            Primary Action
          </Button>
        }
      >
        <a
          href="#"
          className="inline-flex items-center gap-1 text-body-14 text-ink-muted hover:text-ink"
        >
          Learn more
          <ExternalLink className="size-3.5" />
        </a>
      </EmptyState>

      <EmptyState
        title="No results match those filters"
        description="Try removing a filter, or clear all to see every result."
        icon={<SearchX />}
        action={
          <Button variant="secondary" size="md">
            Clear Filters
          </Button>
        }
      />

      <EmptyState
        title="Your watchlist is empty"
        description="Save items here to keep track of the things you care about."
        icon={<Inbox />}
        action={<Button size="md">Browse items</Button>}
      />
    </div>
  );
}
