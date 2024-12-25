import { AttestFullIcon, Logo } from '@/assets/logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const AppLogo = ({
  isLogoOnly = false,
  className,
}: {
  isLogoOnly?: boolean;
  className?: string;
}) => {
  return (
    <Link href="/" className={cn('fill-black dark:fill-white', className)}>
      {isLogoOnly ? <Logo /> : <AttestFullIcon />}
    </Link>
  );
};
