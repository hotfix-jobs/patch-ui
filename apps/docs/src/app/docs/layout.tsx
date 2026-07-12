import { SidebarInset } from "@patchui/react";
import { Sidebar } from "@/components/sidebar";
import { DocsHeader } from "@/components/docs-header";
import { SearchPalette } from "@/components/docs-search";
import { CloseMobileSidebarOnSearch } from "@/components/close-mobile-sidebar-on-search";
import { OnThisPage } from "@/components/on-this-page";
import { DocsRouteFocus } from "@/components/docs-route-focus";
import { DesktopSidebarTrigger } from "@/components/desktop-sidebar-trigger";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="contents" data-slot="docs-shell">
      <Sidebar />
      <SidebarInset className="flex h-full flex-col">
        <DesktopSidebarTrigger />
        <DocsHeader />
        <div className="min-h-0 flex-1 overflow-y-auto" data-slot="docs-scroll">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-10 xl:grid-cols-[minmax(0,48rem)_12rem]">
            <article className="min-w-0" data-slot="docs-article">
              {children}
            </article>
            <OnThisPage />
          </div>
        </div>
      </SidebarInset>
      <SearchPalette />
      <CloseMobileSidebarOnSearch />
      <DocsRouteFocus />
    </div>
  );
}
