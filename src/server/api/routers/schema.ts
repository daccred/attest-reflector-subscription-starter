import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

import AttestSDK from '@peke65/attest-sdk';

type Field = {
  name: string;
  type: string;
  isArray: boolean;
};

export type Schema = {
  uid: string;
  content: {
    name?: string;
    type: string;

    properties: Field[];
  };
  resolverAddress: string | null;
  revocable: boolean;
};

const client = new AttestSDK({
  heliusAPIKey: process.env.HELIUS_KEY,
  network: 2,
  wallet: {} as any,
});

export const schemaRouter = createTRPCRouter({
  // Read: Retrieve data from Redis
  read: publicProcedure
    .input(z.object({ uid: z.string() }))
    .query(async ({ input }) => {
      const { data, error } = await client.schema.fetch(input.uid);

      if (error || !data) {
        throw new Error(error as string);
      }

      return data;
    }),

  // List: List all keys in Redis
  list: publicProcedure.query(async () => {
    const { data, error } = await client.schema.getAllSchemaRecords();

    if (error || !data) {
      throw new Error(error as string);
    }

    return data;
  }),
});
