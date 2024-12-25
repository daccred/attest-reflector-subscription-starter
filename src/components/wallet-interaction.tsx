'use client';

import { useStellarWallet } from '@/hooks/use-connect-button';
import { useIsServerSide } from '@/hooks/use-is-server-side';
import { cn } from '@/lib/utils';

const WalletInteraction: React.FC<{ className?: string }> = ({ className }) => {
  const { publicKey, ConnectButton, DisconnectButton } = useStellarWallet();
  const isServerSide = useIsServerSide();

  if (isServerSide) {
    return null;
  }
  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      {publicKey ? <DisconnectButton /> : <ConnectButton />}
    </div>
  );
};

export default WalletInteraction;
