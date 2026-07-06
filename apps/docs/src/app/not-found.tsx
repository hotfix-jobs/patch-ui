import Link from "next/link";
import type { Metadata } from "next";
import { Button, EmptyState } from "@patchui/react";
import { ArrowRight, FileDashed } from "@phosphor-icons/react";
export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-6">
      <EmptyState
        icon={<FileDashed />}
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved. Head back to the docs to keep browsing."
        action={
          <Button
            icon={<ArrowRight className="size-4" />}
            iconPosition="right"
            render={<Link href="/docs" />}
          >
            Docs home
          </Button>
        }
      >
        <Button
          variant="secondary"
          render={<Link href="/docs/components/button" />}
        >
          Browse components
        </Button>
      </EmptyState>
    </main>
  );
}
