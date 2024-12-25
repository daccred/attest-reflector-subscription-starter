// Mock functions to represent Reflector package functionality
'use server';

import { IAttestation } from '@/const/types';
import { api } from '@/trpc/server';

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  status: 'active' | 'expired' | 'revoked';
  expiresAt: string;
}

export interface Attestation {
  id: string;
  subscriptionId: string;
  userId: string;
  timestamp: string;
  metadata: SubscriptionMeta;
}

export interface SubscriptionMeta {
  packageId: string;
  packageName: string;
  price: number;
  duration: number;
  startDate: string;
  endDate: string;
}

let subscriptions: Subscription[] = [
  {
    id: '1',
    userId: 'USER1',
    name: 'Basic Plan',
    status: 'active',
    expiresAt: '2024-12-31T23:59:59Z',
  },
  {
    id: '2',
    userId: 'USER2',
    name: 'Premium Plan',
    status: 'active',
    expiresAt: '2024-06-30T23:59:59Z',
  },
];

let attestations: Attestation[] = [];

export async function getSubscriptions(
  publicKey: string,
): Promise<Subscription[]> {
  return subscriptions;
}

export async function revokeSubscription(
  wallet: any,
  subscriptionId: string,
): Promise<void> {
  subscriptions = subscriptions.map((sub) =>
    sub.id === subscriptionId ? { ...sub, status: 'revoked' } : sub,
  );
}

export async function extendSubscription(
  wallet: any,
  subscriptionId: string,
  days: number,
): Promise<void> {
  subscriptions = subscriptions.map((sub) =>
    sub.id === subscriptionId
      ? {
          ...sub,
          expiresAt: new Date(
            new Date(sub.expiresAt).getTime() + days * 24 * 60 * 60 * 1000,
          ).toISOString(),
        }
      : sub,
  );
}

export async function createSubscription(
  userId: string,
  packageId: string,
  packageName: string,
  price: number,
  duration: number,
): Promise<string> {
  const subscriptionId = `SUB${Math.random().toString(36).substr(2, 9)}`;
  const startDate = new Date();
  const endDate = new Date(
    startDate.getTime() + duration * 24 * 60 * 60 * 1000,
  );

  subscriptions.push({
    id: subscriptionId,
    userId,
    name: packageName,
    status: 'active',
    expiresAt: endDate.toISOString(),
  });

  await createAttestation(subscriptionId, userId, {
    packageId,
    packageName,
    price,
    duration,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  return subscriptionId;
}

export async function createAttestation(
  subscriptionId: string,
  userId: string,
  metadata: SubscriptionMeta,
): Promise<void> {
  const attestationId = `ATT${Math.random().toString(36).substr(2, 9)}`;
  attestations.push({
    id: attestationId,
    subscriptionId,
    userId,
    timestamp: new Date().toISOString(),
    metadata,
  });
}

export async function getAttestations(
  address: string,
): Promise<IAttestation[]> {
  const attQuery = api.attestation.list();

  return await attQuery.catch((e: any) => {
    console.error(e);
    return [];
  });
}

export async function streamPayment(
  from: string,
  to: string,
  amount: number,
  duration: number,
): Promise<void> {
  // Simulate payment streaming
  const interval = setInterval(() => {
    console.log(`Streamed ${amount / duration} XLM from ${from} to ${to}`);
  }, 1000);

  // Stop streaming after the specified duration
  setTimeout(() => {
    clearInterval(interval);
    console.log(`Completed streaming ${amount} XLM from ${from} to ${to}`);
  }, duration * 1000);
}
