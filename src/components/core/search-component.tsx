'use client';
import React, { type FC, useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useHotkeys } from 'react-hotkeys-hook';
import { Icons } from '@/assets/icons';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchComponent: FC<SearchProps> = ({
  onSearch,
  placeholder = 'Search...',
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMac, setIsMac] = useState<boolean>(true);

  useEffect(() => {
    // Use userAgent to detect OS, as it's more reliable than the deprecated platform property
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsMac(userAgent.includes('mac'));
  }, []);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchTerm(query);
      onSearch(query);
    },
    [onSearch],
  );

  const focusSearch = useCallback(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  useHotkeys(
    ['mod+k', 'ctrl+k'],
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      focusSearch();
    },
    { enableOnFormTags: true },
  );

  return (
    <Input
      id="search-input"
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearch}
      className="w-[300px]"
      endContent={
        <span className="pointer-events-none rounded-md border-[0.5px] border-stroke p-1.5 text-xs text-muted-foreground">
          {isMac ? '⌘ K' : 'Ctrl+K'}
        </span>
      }
      startContent={<Icons.Search className="h-4 w-4 text-muted-foreground" />}
    />
  );
};

export default SearchComponent;
