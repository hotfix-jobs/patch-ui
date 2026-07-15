import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppHeaderDemo } from "@/app/docs/blocks/app-header/app-header-demo";
import { AppHeaderMarketingDemo } from "@/app/docs/blocks/app-header/app-header-marketing-demo";
import { SearchSuggestionsDemo } from "@/app/docs/blocks/search-suggestions/search-suggestions-demo";

const previews = {
  "app-header": { component: AppHeaderDemo, edgeToEdge: true },
  "app-header-marketing": {
    component: AppHeaderMarketingDemo,
    edgeToEdge: true,
  },
  "search-suggestions": {
    component: SearchSuggestionsDemo,
    edgeToEdge: false,
  },
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.keys(previews).map((slug) => ({ slug }));
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const preview = previews[slug as keyof typeof previews];
  if (!preview) notFound();
  const { component: Preview, edgeToEdge } = preview;

  return (
    <main
      className={
        edgeToEdge
          ? "min-h-dvh w-full min-w-0 bg-base"
          : "min-h-dvh w-full min-w-0 bg-base p-3 sm:p-5"
      }
    >
      <Preview />
    </main>
  );
}
