import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@patchui/react";

interface CompoundComponentDef {
  name: string;
  description: string;
  element?: string;
}

interface CompoundComponentsProps {
  components: CompoundComponentDef[];
}

/**
 * MDX shortcode for listing the sub-components of a compound primitive
 * (Menu.Root / Menu.Trigger / Menu.Positioner / ...). Renders through
 * the Patch UI Table primitives so it dogfoods the same chrome the
 * PropsTable uses.
 */
export function CompoundComponents({ components }: CompoundComponentsProps) {
  if (!components || components.length === 0) return null;

  const hasElement = components.some((c) => c.element);

  return (
    <div className="my-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            {hasElement && <TableHead>Element</TableHead>}
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {components.map((comp) => (
            <TableRow key={comp.name}>
              <TableCell className="align-top text-body-13">{comp.name}</TableCell>
              {hasElement && (
                <TableCell className="align-top text-body-13">
                  {comp.element ?? (
                    <span className="text-ink-subtle">None</span>
                  )}
                </TableCell>
              )}
              <TableCell className="align-top text-body-13">
                {comp.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
