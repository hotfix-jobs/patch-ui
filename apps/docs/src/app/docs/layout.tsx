import { SidebarInset } from "@patchui/react";
import { Sidebar } from "@/components/sidebar";
import { DocsHeader } from "@/components/docs-header";
import { SearchPalette } from "@/components/docs-search";
import { CloseMobileSidebarOnSearch } from "@/components/close-mobile-sidebar-on-search";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <SidebarInset className="flex h-full flex-col">
        <DocsHeader />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
        </div>
      </SidebarInset>
      <SearchPalette />
      <CloseMobileSidebarOnSearch />
    </>
  );
}
