'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDarkTheme = theme === 'dark';
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render a placeholder until the theme is determined
  if (!isMounted) {
    return (
      <motion.button
        className={cn(
          'border-stroke relative h-11 w-20 rounded-lg border-[0.89px] p-1',
        )}
      >
        {/* Placeholder content */}
        <div className="flex justify-between px-1.5">
          <Moon className={cn('ml-[2px] h-4 w-4')} />
          <Sun className={cn('ml-[2px] h-4 w-4')} />
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      className={cn(
        'border-stroke relative h-11 w-20 rounded-lg border-[0.89px] p-1',
      )}
      onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
    >
      <motion.div
        className="absolute left-1 top-1 flex h-[34px] w-[34px] items-center justify-center rounded-md border border-primary p-1"
        animate={{
          x: isDarkTheme ? 0 : 38,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <div className="relative flex w-full justify-between px-1.5">
        <motion.div
          animate={{
            scale: isDarkTheme ? 1 : 0.9,
          }}
        >
          <Moon
            className={cn(
              'ml-[2px] h-4 w-4',
              isDarkTheme ? 'text-primary' : 'text-muted-foreground',
            )}
          />
        </motion.div>
        <motion.div
          animate={{
            scale: isDarkTheme ? 0.9 : 1,
          }}
        >
          <Sun
            className={cn(
              'mr-[2px] h-4 w-4',
              isDarkTheme ? 'text-muted-foreground' : 'text-primary',
            )}
          />
        </motion.div>
      </div>
    </motion.button>
  );
};
