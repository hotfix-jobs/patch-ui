import Link from "next/link";

/**
 * SiteFooter: the shared footer markup. Placement (which route it appears
 * on, which column) is decided by the parent. On docs routes, DocsLayout
 * renders it inside the right column so it sits alongside the sidebar
 * visually. On marketing routes, the root layout renders it at the bottom.
 */
export function SiteFooter() {
  return (
    <footer className="border-t-[0.5px] border-gray-alpha-400 px-6 py-8 md:px-12 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 text-label-12 text-gray-800">
        <span>MIT licensed. Copyright © Hotfix.</span>
        <div className="flex items-center gap-5">
          <Link href="/docs" className="font-medium hover:text-gray-1000">
            Docs
          </Link>
          <Link
            href="/docs/components/button"
            className="font-medium hover:text-gray-1000"
          >
            Components
          </Link>
          <Link
            href="/docs/credits"
            className="font-medium hover:text-gray-1000"
          >
            Credits
          </Link>
          <a
            href="https://github.com/hotfix-jobs/patch-ui"
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:text-gray-1000"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
