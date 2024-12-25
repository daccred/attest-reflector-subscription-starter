'use client';

import { useState, useEffect } from 'react';
// import { useWallet } from './WalletProvider';
// import { getSubscriptions, Subscription } from '../lib/mockReflector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSubscriptions, Subscription } from '@/lib/mock-reflector';

export default function SubscriptionList() {
  //   const wallet = useWallet();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    if ('wallet') {
      getSubscriptions('wallet.publicKey').then(setSubscriptions);
    }
  }, ['wallet']);

  return (
    <Card className="py-4 px-2">
      <CardHeader>
        <CardTitle className="mb-4 font-pp-supply-mono text-lg leading-[28.8px] text-foreground sm:text-2xl">
          Your Subscriptions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subscriptions.map((sub) => (
          <div key={sub.id} className="mb-4 rounded-lg p-4">
            <h3 className="text-lg font-semibold ">{sub.name}</h3>
            <div className="mt-2 flex items-center justify-between text-black">
              <Badge
                variant={sub.status === 'active' ? 'default' : 'destructive'}
              >
                {sub.status}
              </Badge>
              <span className="text-sm text-gray-400">
                Expires: {new Date(sub.expiresAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
