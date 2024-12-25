import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next-nprogress-bar';

interface NavigationBarProps {
  onButtonClick?: () => void;
  currentPage?: string;
  previousText?: string;
}

export default function NavigationBar({
  onButtonClick,
  currentPage,
  previousText,
}: NavigationBarProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-start gap-4 py-2 font-pp-supply-mono text-sm font-normal text-muted-foreground">
      <Button variant="ghost" onClick={handleClick} className="p-0 uppercase">
        <ChevronLeft className="mr-2 h-4 w-4" />
        {previousText ? previousText : 'BACK'}
      </Button>
      <div className="flex items-center uppercase">
        <ChevronRight className="mr-2 h-4 w-4" />
        <span className="uppercase">{currentPage}</span>
      </div>
    </div>
  );
}
