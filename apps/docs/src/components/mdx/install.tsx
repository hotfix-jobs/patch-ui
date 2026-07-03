/** Per-component install command. Usage in MDX: <Install name="button" /> */
export function Install({ name }: { name: string }) {
  return (
    <div
      className="my-6 flex items-center gap-2 overflow-x-auto rounded-[var(--radius-6)] border-[0.5px] border-gray-alpha-400 bg-background-100 px-4 py-2.5 font-mono text-label-12 text-gray-1000"
      data-slot="install"
    >
      <span className="shrink-0 text-gray-800">$</span>
      <span className="whitespace-nowrap">npx shadcn add @patchui/{name}</span>
    </div>
  );
}
