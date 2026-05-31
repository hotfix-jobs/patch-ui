/** Per-component install command. Usage in MDX: <Install name="button" /> */
export function Install({ name }: { name: string }) {
  return (
    <div
      className="my-6 flex items-center gap-2 overflow-x-auto rounded-[var(--radius-patch-sm)] border-[0.5px] border-patch-border bg-patch-surface px-4 py-2.5 font-mono text-[length:var(--text-patch-mini)] text-patch-text"
      data-slot="install"
    >
      <span className="shrink-0 text-patch-text-tertiary">$</span>
      <span className="whitespace-nowrap">npx shadcn add @patchui/{name}</span>
    </div>
  );
}
