'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Toaster } from 'sonner';

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Toaster
            richColors
            closeButton
            visibleToasts={3}
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '14px',
                fontSize: '12px',
              },
            }}
          />
          <ProgressBar
            options={{ showSpinner: false }}
            shallowRouting
            color="#FD8901"
            height="3px"
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
