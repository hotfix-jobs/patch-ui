import Link from "next/link";

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-[var(--gray-1000)]">
        Patch UI
      </h1>
      <p className="mt-3 text-lg text-[var(--gray-900)]">
        A modern React component library built for speed and accessibility.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/docs/getting-started"
          className="group rounded-lg border border-[var(--gray-alpha-400)] p-5 transition-colors hover:border-[var(--gray-alpha-600)] hover:bg-[var(--gray-100)]"
        >
          <h2 className="text-lg font-semibold text-[var(--gray-1000)] group-hover:text-[var(--blue-700)]">
            Getting Started →
          </h2>
          <p className="mt-1 text-sm text-[var(--gray-900)]">
            Install Patch UI and start building.
          </p>
        </Link>

        <Link
          href="/docs/components/button"
          className="group rounded-lg border border-[var(--gray-alpha-400)] p-5 transition-colors hover:border-[var(--gray-alpha-600)] hover:bg-[var(--gray-100)]"
        >
          <h2 className="text-lg font-semibold text-[var(--gray-1000)] group-hover:text-[var(--blue-700)]">
            Components →
          </h2>
          <p className="mt-1 text-sm text-[var(--gray-900)]">
            Explore the component library.
          </p>
        </Link>
      </div>
    </div>
  );
}
