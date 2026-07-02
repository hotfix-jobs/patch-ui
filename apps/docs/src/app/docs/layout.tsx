import { SidebarInset } from "@patchui/react";
import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <SidebarInset className="flex flex-col">
        <SiteHeader />
        <div className="flex-1">
          <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
        </div>
        <SiteFooter />
      </SidebarInset>
    </>
  );
}
