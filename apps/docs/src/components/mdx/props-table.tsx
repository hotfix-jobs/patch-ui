import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@patchui/react";

interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props || props.length === 0) return null;

  return (
    <div className="props-table my-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="text-label-13 text-gray-1000 align-top">
                {prop.name}
              </TableCell>
              <TableCell className="text-label-13 text-gray-900 align-top">
                {prop.type}
              </TableCell>
              <TableCell className="text-label-13 text-gray-900 align-top">
                {prop.default ?? "-"}
              </TableCell>
              <TableCell className="text-gray-900 align-top">
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
