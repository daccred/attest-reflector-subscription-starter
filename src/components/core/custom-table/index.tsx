'use client';

import * as React from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './client-pagination';
import { DataTableToolbar } from './table-toolbar';
import TablePulse from './table-pulse';
import { useRouter } from 'next-nprogress-bar';

interface BaseData {
  id: string | number;
}

interface DataTableProps<TData extends BaseData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  showSearchBar?: boolean;
  refetch?: () => void;
  link?: string;
  isPagination?: boolean;
  actionButtons?: (row: TData) => React.ReactNode;
}

export function DataTable<TData extends BaseData, TValue>({
  columns,
  data,
  showSearchBar,
  isLoading,
  isPagination = true,
  link,
  actionButtons,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>('');
  const [openRows, setOpenRows] = React.useState<Record<string, number>>({});

  const tableRef = React.useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableSorting: false,
    enableSortingRemoval: false,
    manualSorting: true,
    enableRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleScroll = React.useCallback(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      const isAtEnd =
        tableElement.scrollLeft + tableElement.clientWidth >=
        tableElement.scrollWidth - 10;

      setOpenRows((prev) => {
        const newOpenRows = { ...prev };
        table.getRowModel().rows.forEach((row) => {
          if (isAtEnd) {
            newOpenRows[row.id] = 96;
          } else {
            delete newOpenRows[row.id];
          }
        });
        return newOpenRows;
      });
    }
  }, [table]);

  const handleInteractionStart = React.useCallback(
    (
      event: React.TouchEvent | React.MouseEvent,
      rowId: string,
      dbId: string,
    ) => {
      let startX: number;
      let isDragging = false;
      const currentOpenState = openRows[rowId] || 0;

      if ('touches' in event) {
        startX = event?.touches[0]?.clientX || 0;
      } else {
        startX = event.clientX;
      }

      const handleMove = (moveEvent: TouchEvent | MouseEvent) => {
        let currentX: number;

        if ('touches' in moveEvent) {
          currentX = moveEvent?.touches[0]?.clientX || 0;
        } else {
          currentX = moveEvent.clientX;
        }

        const deltaX = startX - currentX;

        if (Math.abs(deltaX) > 5) {
          isDragging = true;
        }

        if (isDragging) {
          const openAmount = Math.max(
            0,
            Math.min(96, currentOpenState + deltaX),
          );
          setOpenRows((prev) => {
            const newOpenRows = { ...prev };
            // Close all other rows
            Object.keys(newOpenRows).forEach((key) => {
              if (key !== rowId) {
                delete newOpenRows[key];
              }
            });
            // Set the current row's open amount
            newOpenRows[rowId] = openAmount;
            return newOpenRows;
          });
        }
      };

      const handleEnd = () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchend', handleEnd);

        if (isDragging) {
          setOpenRows((prev) => {
            const newOpenRows = { ...prev };
            const currentOpenAmount = newOpenRows[rowId] || 0;
            if (currentOpenAmount > 48) {
              newOpenRows[rowId] = 96;
            } else {
              delete newOpenRows[rowId];
            }
            return newOpenRows;
          });
        } else if (link) {
          router.push(`${link}/${dbId}`);
        }
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
    },
    [openRows, link, router],
  );

  React.useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="flex flex-col gap-4">
      {showSearchBar && (
        <DataTableToolbar
          table={table}
          globalFilter={globalFilter}
          showSearchBar={!!showSearchBar}
        />
      )}
      <div ref={tableRef} className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="bg-secondary-muted"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
                {actionButtons && (
                  <TableHead className="w-24 bg-secondary-muted"></TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TablePulse arrayLength={6} rows={columns.length + 1} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="group relative cursor-pointer select-none"
                  onTouchStart={(e) =>
                    handleInteractionStart(
                      e,
                      row.id,
                      row?.original?.id as string,
                    )
                  }
                  onMouseDown={(e) =>
                    handleInteractionStart(
                      e,
                      row.id,
                      row?.original?.id as string,
                    )
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        transform: `translateX(-${openRows[row.id] || 0}px)`,
                        transition: 'transform 0.2s ease-out',
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  {actionButtons && (
                    <TableCell
                      className="absolute bottom-0 right-0 top-0 flex w-24 items-center justify-end p-0"
                      style={{
                        opacity: (openRows[row.id] || 0) / 96,
                        transition: 'opacity 0.2s ease-out',
                        pointerEvents:
                          (openRows[row.id] || 0) > 48 ? 'auto' : 'none',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center space-x-2 px-4">
                        {actionButtons(row.original)}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actionButtons ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isPagination && <DataTablePagination table={table} />}
    </div>
  );
}
