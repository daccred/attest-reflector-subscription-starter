import { DataTableColumnHeader } from '@/components/core/custom-table/table-column-header';
import { Badge } from '@/components/ui/badge';
import { schemaColors } from '@/utils/status';
import { type Row, type ColumnDef } from '@tanstack/react-table';
import { Link } from 'lucide-react';

export interface IAttestation {
  uid: string;
  schema: {
    id: string;
    name: string;
  };
  from: string;
  to: string;
  type: string;
  age: string;
  id: string;
}

const defaultColor = { border: '#000', text: '#000' };

// Utility function to convert hex to RGBA
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const AttestationsColumn: ColumnDef<IAttestation, unknown>[] = [
  {
    accessorKey: 'uid',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UID" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px] truncate font-pp-supply-mono font-medium">
        {row.getValue('uid')}
      </div>
    ),
  },
  // {
  //   accessorKey: 'schema',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="SCHEMA" />
  //   ),
  //   cell: ({ row }: { row: Row<IAttestation> }) => {
  //     function isValidSchema(
  //       schema: unknown,
  //     ): schema is { id: string; name: string } {
  //       return (
  //         typeof schema === 'object' &&
  //         schema !== null &&
  //         'id' in schema &&
  //         'name' in schema
  //       );
  //     }
  //     const schema = row.getValue('schema');

  //     if (!isValidSchema(schema)) {
  //       return '--';
  //     }
  //     const color =
  //       schema.name in schemaColors
  //         ? schemaColors[schema.name as keyof typeof schemaColors]
  //         : defaultColor;
  //     return (
  //       <div className="font-pp-supply-mono flex items-center space-x-2">
  //         <span className="rounded-md border-[0.5px] border-primary bg-primary/10 p-1 text-primary">
  //           #{schema.id}
  //         </span>
  //         <Badge
  //           variant="outline"
  //           className="flex-shrink-0 rounded-md border-[0.5px] p-1 font-normal"
  //           style={{
  //             borderColor: color.border,
  //             color: color.text,
  //             backgroundColor: hexToRgba(color.text, 0.1),
  //           }} // Use utility function for RGBA
  //         >
  //           {schema.name}
  //         </Badge>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: 'from',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FROM" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px] truncate font-pp-supply-mono">
        {row.getValue('from')}
      </div>
    ),
  },
  // {
  //   accessorKey: 'to',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="TO" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="font-pp-supply-mono w-[200px] truncate">
  //       {row.getValue('to')}
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TYPE" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Link className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">{row.getValue('type')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AGE" />
    ),
    cell: ({ row }) => (
      <span className="flex-shrink-0 text-muted-foreground">
        {row.getValue('age')}
      </span>
    ),
  },
];
