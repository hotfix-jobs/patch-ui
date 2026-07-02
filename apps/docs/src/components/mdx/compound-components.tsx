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
    <div className="compound-components my-6 overflow-x-auto rounded-[4px] border border-gray-alpha-400">
      <table className="w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2.5 text-left text-label-11 text-gray-800">
              Component
            </th>
            {hasElement && (
              <th className="px-4 py-2.5 text-left text-label-11 text-gray-800">
                Element
              </th>
            )}
            <th className="px-4 py-2.5 text-left text-label-11 text-gray-800">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {components.map((comp) => (
            <tr key={comp.name} className="border-t border-gray-alpha-400">
              <td className="px-4 py-3 font-mono text-xs font-medium text-gray-1000 align-top">
                {comp.name}
              </td>
              {hasElement && (
                <td className="px-4 py-3 font-mono text-xs text-gray-900 align-top">
                  {comp.element ?? "-"}
                </td>
              )}
              <td className="px-4 py-3 text-gray-900 align-top">
                {comp.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
