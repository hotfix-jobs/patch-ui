import Link from "next/link";

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-[var(--patch-text)]">
        Patch UI
      </h1>
      <p className="mt-3 text-lg text-[var(--patch-text-secondary)]">
        A modern React component library built for speed and accessibility.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/docs/getting-started"
          className="group rounded-lg border border-[var(--patch-border)] p-5 transition-colors hover:border-[var(--patch-primary)] hover:bg-[var(--patch-bg-secondary)]"
        >
          <h2 className="text-lg font-semibold text-[var(--patch-text)] group-hover:text-[var(--patch-primary)]">
            Getting Started →
          </h2>
          <p className="mt-1 text-sm text-[var(--patch-text-secondary)]">
            Install Patch UI and start building.
          </p>
        </Link>

        <Link
          href="/docs/components/button"
          className="group rounded-lg border border-[var(--patch-border)] p-5 transition-colors hover:border-[var(--patch-primary)] hover:bg-[var(--patch-bg-secondary)]"
        >
          <h2 className="text-lg font-semibold text-[var(--patch-text)] group-hover:text-[var(--patch-primary)]">
            Components →
          </h2>
          <p className="mt-1 text-sm text-[var(--patch-text-secondary)]">
            Explore the component library.
          </p>
        </Link>
      </div>
    </div>
  );
}
