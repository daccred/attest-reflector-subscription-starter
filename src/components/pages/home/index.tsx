'use client';
import AdminConsole from '@/components/core/admin-console';
import ChainView from '@/components/core/chain-view';
import SubscriptionList from '@/components/core/subscription-list';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js';
import { useEffect, useState } from 'react';

const Home = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  console.log(connection);

  useEffect(() => {
    // Generate a new keypair when the component mounts
    const newKeyPair = Keypair.generate();
    console.log('Generated keypair:', newKeyPair.publicKey.toBase58());
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL); // Convert lamports to SOL
      } else {
        setBalance(0);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchBalance().catch((error) => {
        console.error('Error fetching balance:', error);
      });
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [connection, publicKey]);

  return (
    <main className="min-h-screen py-24 app-container">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SubscriptionList />
          <AdminConsole />
        </div>
        <ChainView />
      </div>
    </main>
  );
};

export default Home;
