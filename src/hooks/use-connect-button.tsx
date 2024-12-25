'use client';

import { useState, useCallback } from 'react';
import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { useAccount } from './use-account';
import { toast } from 'sonner';

export function useStellarWallet() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { address, connect, disconnect } = useAccount();

  const getShortAddress = (addr: string | null, length = 6): string => {
    if (!addr || addr.length <= length) return addr || '';
    return `${addr.substring(0, length)}...${addr.substring(addr.length - length)}`;
  };

  const handleConnect = useCallback(async () => {
    try {
      await connect();
    } catch (error) {
      console.error(error);
      toast.error('Failed to connect to Freighter. Please try again.');
    }
    // }
  }, [address]);

  const handleDisconnect = useCallback(async () => {
    await disconnect();
  }, [address]);

  const ConnectButton = useCallback(() => {
    return (
      <Button
        onClick={() => handleConnect()}
        className="h-11 gap-2 font-pp-supply-mono text-sm font-normal uppercase text-black"
      >
        Connect Wallet
      </Button>
    );
  }, []);

  const DisconnectButton = useCallback(() => {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-11 gap-2 border-stroke px-3 font-pp-supply-mono text-sm uppercase text-foreground focus:ring-2 focus:ring-black"
          >
            <Icons.Profile />
            {getShortAddress(address?.toString() || null, 4)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[238px] bg-background p-0"
          align="end"
        >
          <div className="space-y-2 border-b p-4">
            <div className="flex items-start justify-between">
              <h2 className="text-xs font-medium text-muted-foreground">
                Account
              </h2>
              <div className="flex items-center gap-2">
                <button className="flex h-5 w-5 items-center justify-center rounded-md border">
                  <Icons.Copy className="h-[10px] w-[10px] text-muted-foreground" />
                </button>
                <button className="flex h-5 w-5 items-center justify-center rounded-md border">
                  <Icons.ShareBox className="h-[10px] w-[10px] text-muted-foreground" />
                </button>
              </div>
            </div>
            <p className="font-pp-supply-mono text-sm uppercase text-foreground">
              {getShortAddress(address?.toString() || null, 4)}
            </p>
            <p className="text-[11px] text-muted-foreground">Stellar</p>
          </div>
          <div className="space-y-2 p-4">
            <DropdownMenuItem className="flex cursor-pointer items-center justify-between text-xs">
              <span className="font-normal text-foreground">My Profile</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="h-[30px] cursor-pointer justify-center rounded-lg border border-primary text-center text-xs text-primary"
              onClick={handleDisconnect}
            >
              DISCONNECT
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [address, isOpen, handleDisconnect]);

  return {
    publicKey: address,
    ConnectButton,
    DisconnectButton,
  };
}
