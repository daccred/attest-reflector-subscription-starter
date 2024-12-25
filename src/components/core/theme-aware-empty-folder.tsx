'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { EmptyFolder, EmptyFolderDark } from '@/assets/empty-folder';

export default function ThemeAwareEmptyFolder() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder or fallback during SSR and initial client-side render
  if (!mounted) {
    return (
      <div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
    );
  }

  if (resolvedTheme === 'dark') {
    return <EmptyFolderDark />;
  }

  return <EmptyFolder />;
}
