'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import WalletInteraction from '../wallet-interaction';
import { AppLogo } from './app-logo';
import { routes } from '@/utils/routes';
import { cn } from '@/lib/utils';
import { isActiveLink } from '@/utils/helpers';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { Icons } from '@/assets/icons';
import SearchComponent from './search-component';
import { useAccount } from '@/hooks/use-account';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = useMemo(
    () => [
      { path: routes.SCHEMAS, name: 'SCHEMAS' },
      { path: routes.attestations, name: 'ATTESTATIONS' },
      { path: routes.authorities, name: 'AUTHORITIES' },
      { path: routes.docs, name: 'DOCS' },
    ],
    [],
  );

  const isParentRoute = useMemo(() => {
    return navLinks.some((link) => pathname === link.path);
  }, [navLinks, pathname]);
  const account = useAccount();

  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <header>
      <nav className="fixed inset-x-0 z-50 border-b border-stroke bg-background py-4">
        <div className="app-container mx-auto flex w-full items-center justify-between gap-6">
          <div className="flex items-center justify-start gap-5">
            <AppLogo />
            {isParentRoute && (
              <div className="hidden items-center justify-between gap-4 lg:order-1 lg:flex">
                {navLinks.map((link, index: number) => (
                  <NavLink key={index} href={link.path} onClick={closeMenu}>
                    {link.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 lg:order-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <span className="hidden rounded-md border p-2 text-sm font-medium text-white">
              Stellar
            </span>
            <WalletInteraction className="hidden md:block" />
            {/* Mobile Menu Button */}
            <Button
              size="icon"
              className="w-12 bg-secondary hover:bg-secondary/80 md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          {isParentRoute && (
            <div className="hidden xl:block">
              <SearchComponent
                placeholder="Search by UID, status..."
                onSearch={function (query: string): void {
                  console.log('Function not implemented.', query);
                }}
              />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && isParentRoute && (
        <div className="absolute top-20 z-50 flex h-fit w-full flex-col items-center justify-center gap-5 rounded-xl bg-secondary-muted/80 px-[15px] py-[50px] backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center gap-5">
            {navLinks?.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn('text-base font-medium text-muted-foreground', {
                  'text-white': isActiveLink(link?.path, pathname),
                })}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <WalletInteraction />
        </div>
      )}
    </header>
  );
}

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = isActiveLink(href, pathname);

  return (
    <Link
      href={href}
      className={cn('font-pp-supply-mono text-xs text-muted-foreground', {
        'font-medium text-foreground': isActive,
      })}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
