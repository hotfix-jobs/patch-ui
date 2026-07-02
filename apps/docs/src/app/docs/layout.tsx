import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {/* Sidebar is position: fixed on desktop, so main needs lg:pl-64 to
          reserve the left column. See sidebar.tsx for why fixed vs sticky. */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
      </main>
    </>
  );
}
