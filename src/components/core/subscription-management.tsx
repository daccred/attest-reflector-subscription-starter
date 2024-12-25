'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Subscription,
  getSubscriptions,
  revokeSubscription,
  extendSubscription,
} from '@/lib/mock-reflector';
// import { toast } from '@/components/ui/use-toast';

export default function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    getSubscriptions('ADMIN').then(setSubscriptions);
  }, []);

  const handleRevoke = async (subscriptionId: string) => {
    try {
      await revokeSubscription(null, subscriptionId);
      setSubscriptions(
        subscriptions.filter((sub) => sub.id !== subscriptionId),
      );
      //   toast({
      //     title: 'Subscription Revoked',
      //     description: `Subscription ${subscriptionId} has been revoked.`,
      //   });
    } catch (error) {
      //   toast({
      //     title: 'Error',
      //     description: error.message,
      //     variant: 'destructive',
      //   });
    }
  };

  const handleExtend = async (subscriptionId: string) => {
    try {
      await extendSubscription(null, subscriptionId, 30);
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === subscriptionId
            ? {
                ...sub,
                expiresAt: new Date(
                  new Date(sub.expiresAt).getTime() + 30 * 24 * 60 * 60 * 1000,
                ).toISOString(),
              }
            : sub,
        ),
      );
      //   toast({
      //     title: 'Subscription Extended',
      //     description: `Subscription ${subscriptionId} has been extended by 30 days.`,
      //   });
    } catch (error) {
      //   toast({
      //     title: 'Error',
      //     description: error.message,
      //     variant: 'destructive',
      //   });
    }
  };

  return (
    <Card className="mt-8 py-4 px-2">
      <CardHeader>
        <CardTitle className="mb-4 font-pp-supply-mono text-lg leading-[28.8px] text-foreground sm:text-2xl">
          Subscription Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-sm text-muted-foreground">
              <TableHead className="">User</TableHead>
              <TableHead className="">Package</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Expires</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-medium">
                  {sub.userId}
                </TableCell>
                <TableCell className="">{sub.name}</TableCell>
                <TableCell className="">{sub.status}</TableCell>
                <TableCell className="">
                  {new Date(sub.expiresAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="">
                  <Button
                    onClick={() => handleRevoke(sub.id)}
                    variant="outline"
                    size="sm"
                    className="mr-2 border-[#DC3545] text-[#DC3545] hover:text-[#DC3545]/80"
                  >
                    Revoke
                  </Button>
                  <Button
                    onClick={() => handleExtend(sub.id)}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:text-primary/80"
                  >
                    Extend
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
