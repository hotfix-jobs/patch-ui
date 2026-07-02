import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.hotfix.jobs"),
  title: {
    default: "Patch UI - accessible React components, copy-in",
    template: "%s - Patch UI",
  },
  description:
    "A React component library built on Base UI and Tailwind CSS v4. Copy components into your repo with the shadcn CLI - crisp, accessible, token-driven, light/dark.",
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
  openGraph: {
    type: "website",
    title: "Patch UI - accessible React components, copy-in",
    description:
      "Copy accessible, token-driven React components into your repo. Built on Base UI + Tailwind CSS v4.",
    url: "https://ui.hotfix.jobs",
    siteName: "Patch UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patch UI",
    description:
      "Accessible, token-driven React components - copy-in via the shadcn CLI.",
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
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
