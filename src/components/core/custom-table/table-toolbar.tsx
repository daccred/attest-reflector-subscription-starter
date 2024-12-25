'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type SetStateAction, useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <Input
      {...props}
      placeholder="Search..."
      value={value}
      onChange={(e: { target: { value: SetStateAction<string | number> } }) =>
        setValue(e.target.value)
      }
      className="h-11 w-full sm:w-64"
      startContent={
        <SearchIcon className="pointer-events-none text-slate-400" />
      }
    />
  );
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  showSearchBar: boolean;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  showSearchBar,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {showSearchBar && (
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => table.setGlobalFilter(String(value))}
            className="p-2 shadow"
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
