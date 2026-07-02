import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('patch-ui-theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

// JSON-LD structured data: describes Patch UI as SoftwareApplication so
// search engines pick up the library metadata (name, description, category)
// alongside the standard OpenGraph card.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Patch UI",
  description:
    "A React component library built on Base UI and Tailwind CSS v4. Copy-in via the shadcn CLI.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: "https://ui.hotfix.jobs",
  license: "https://opensource.org/licenses/MIT",
  softwareRequirements: "React 19, Tailwind CSS v4",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "Hotfix",
    url: "https://hotfix.jobs",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.hotfix.jobs"),
  title: {
    default: "Patch UI: accessible React components, copy-in",
    template: "%s - Patch UI",
  },
  description:
    "A React component library built on Base UI and Tailwind CSS v4. Copy components into your repo with the shadcn CLI: crisp, accessible, token-driven, light and dark.",
  keywords: [
    "react",
    "components",
    "ui",
    "tailwind",
    "base-ui",
    "design system",
    "shadcn registry",
    "accessible",
  ],
  alternates: { canonical: "/" },
  // Favicons use Next.js App Router's file-based convention:
  // src/app/favicon.ico + src/app/icon.svg + src/app/apple-icon.png
  // are auto-detected. No `icons` metadata needed.
  openGraph: {
    type: "website",
    title: "Patch UI: accessible React components, copy-in",
    description:
      "Copy accessible, token-driven React components into your repo. Built on Base UI and Tailwind CSS v4.",
    url: "https://ui.hotfix.jobs",
    siteName: "Patch UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patch UI",
    description:
      "Accessible, token-driven React components. Copy-in via the shadcn CLI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
