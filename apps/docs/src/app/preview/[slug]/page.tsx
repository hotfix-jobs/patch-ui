import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppHeaderDemo } from "@/app/docs/blocks/app-header/app-header-demo";
import { AppHeaderMarketingDemo } from "@/app/docs/blocks/app-header/app-header-marketing-demo";
import { SearchSuggestionsDemo } from "@/app/docs/blocks/search-suggestions/search-suggestions-demo";

const previews = {
  "app-header": AppHeaderDemo,
  "app-header-marketing": AppHeaderMarketingDemo,
  "search-suggestions": SearchSuggestionsDemo,
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.keys(previews).map((slug) => ({ slug }));
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Preview = previews[slug as keyof typeof previews];
  if (!Preview) notFound();

  return (
    <main className="min-h-dvh bg-base p-3 sm:p-5">
      <Preview />
    </main>
  );
}
