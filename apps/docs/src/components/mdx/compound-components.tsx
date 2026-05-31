interface CompoundComponentDef {
  name: string;
  description: string;
  element?: string;
}

interface CompoundComponentsProps {
  components: CompoundComponentDef[];
}

export function CompoundComponents({ components }: CompoundComponentsProps) {
  if (!components || components.length === 0) return null;

  const hasElement = components.some((c) => c.element);

  return (
    <div className="compound-components my-6 overflow-x-auto rounded-[4px] border border-patch-border">
      <table className="w-full text-sm">
        <thead className="bg-patch-surface-hover">
          <tr>
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary">
              Component
            </th>
            {hasElement && (
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary">
                Element
              </th>
            )}
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {components.map((comp) => (
            <tr key={comp.name} className="border-t border-patch-border">
              <td className="px-4 py-3 font-mono text-xs font-medium text-patch-text align-top">
                {comp.name}
              </td>
              {hasElement && (
                <td className="px-4 py-3 font-mono text-xs text-patch-text-secondary align-top">
                  {comp.element ?? "-"}
                </td>
              )}
              <td className="px-4 py-3 text-patch-text-secondary align-top">
                {comp.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
