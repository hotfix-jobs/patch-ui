import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@patchui/react";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <p className="text-label-13 text-gray-800">404</p>
        <h1 className="text-heading-40 text-gray-1000">
          Page not found
        </h1>
        <p className="max-w-md text-copy-16 leading-relaxed text-gray-900">
          The page you are looking for does not exist or has been moved.
          Head back to the docs to keep browsing.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          icon={<ArrowRight className="size-4" />}
          iconPosition="right"
          render={<Link href="/docs" />}
        >
          Docs home
        </Button>
        <Button
          variant="secondary"
          render={<Link href="/docs/components/button" />}
        >
          Browse components
        </Button>
      </div>
    </main>
  );
}
