import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SidebarProvider } from "@patchui/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
});

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
  alternates: { canonical: "/docs" },
  // Favicons resolved via Next.js file-based convention (favicon.ico + icon.svg + apple-icon.png in src/app), so no `icons` key here.
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SidebarProvider defaultOpen>{children}</SidebarProvider>
        <Analytics />
      </body>
    </html>
  );
}
