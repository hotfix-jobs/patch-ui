import { CopyPage } from "./copy-page";
import { MobileOnThisPage } from "@/components/on-this-page";

interface PageHeaderProps {
  title: string;
  description: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-6" data-slot="docs-page-header">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 id={slugify(title)} tabIndex={-1} className="text-title1 text-ink outline-none">
          {title}
        </h1>
        <CopyPage />
      </div>
      <p className="mt-2 max-w-2xl text-regular text-ink">{description}</p>
      <MobileOnThisPage />
    </header>
  );
}
