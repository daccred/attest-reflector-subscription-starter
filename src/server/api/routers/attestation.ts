import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import {
  generateKeyPair,
  generateSolanaBase58Id,
  generateSolanaSignature,
} from '../mock-utils';
import { IAttestation } from '@/const/types';

type Attestation = {
  uid: string;
  schemaUID: string;
  attesterAddress: string;
  transactionSignature: string;
  type: string;
  message: string;
};

const dummyAttestations: IAttestation[] = [
  {
    uid: 'e3f2c5b1e29a1f76927f72e2c4f1e8377268b2f1d9c4a7d8e5b7c9a4d8f7b123',
    schema: {
      id: 'e3',
      name: 'Identity Verification',
    },
    from: 'GAB7U7N4D3F3NSXH4BQ5PM3HTZVOYXRDAB5QXWQDB4JGAKFBQ75ECKOG',
    to: 'GCH4IMHFLWZXCXULFFP54EBMGWWDOLIFZNGOTKBEUJWGCUUGDUEYTACD',
    type: 'Verification',
    age: 'a couple seconds',
    id: '12345-67890',
  },
  {
    uid: 'd7b5a3e4c1f2a7d6e8b4f3c2a9b6e1d4c7a9f2e3b4d6a7c5e9f3b2d1a8c6e7f4',
    schema: {
      id: 'd7',
      name: 'Ownership Certificate',
    },
    from: 'GD3KHQZWYIUSFEA7PK2N4YFXAKN4KP2NZYXMCEDRXXSLB7MM32G5H3T3',
    to: 'GB4T4D5B7L4ZHEHEE25MKDYXYX3COTUEESY7RIGHDHZJAZQ7XT2FKRJZ',
    type: 'Ownership',
    age: 'a couple seconds',
    id: '54321-98760',
  },
  {
    uid: 'c2f5e8d3a9b6c7e1d4f2b7a4e9c3b6d1f7a8c5e4b2d6f1e3a7c9d8f2b4e6a9c3',
    schema: {
      id: 'c2',
      name: 'Employment History',
    },
    from: 'GDE3JL4UBDZZG6OG5GNAOYDGZ3UCSOXNZPZ6MMIKHDG5T4V6P32QOWJJ',
    to: 'GCF5T5K7O6M4F72N7PY2X25MKM7RIX3RCVOZX5BZZ72RW6MGKHODXF3O',
    type: 'Employment',
    age: 'a couple seconds',
    id: '67890-12345',
  },
  {
    uid: 'b4d2a7f5e3c9d6b8a9c7e2f1d4b3e6a5c8f7b2d1e4c9a3b6f8e2a7c5d9f1b3e4',
    schema: {
      id: 'b4',
      name: 'Educational Qualification',
    },
    from: 'GAB8D7N4R3G6SF8XHD5XM7YPZRWS5HCHZQPOZ5KRDG3USJFJ3J6OBCQE',
    to: 'GBD7X2O3P7C4V6R8LMN6OP2Z6YWX7IDH7HXQFJ7T3CZWSRYG7P3YUBMM',
    type: 'Qualification',
    age: 'a couple seconds',
    id: '09876-54321',
  },
  {
    uid: 'e7a3c5f1b4d6e2a9f8c7b2d1e3a6c9f5b8d4a7c2f1e6a3b9d8c5f7a4e2b1c6f9',
    schema: {
      id: 'e7',
      name: 'Health Record',
    },
    from: 'GBC7D8N9X2G5SF7XD5XM7YPZRWS5JCHZQPOZ5KRDG3USJFJ3J6OBCQE',
    to: 'GAD3X5O6N7R8C6F4LMN6OP5X2YWX4IDH4HXQFJ6T7CZWQRYH7P2YUCMM',
    type: 'Medical',
    age: 'a couple seconds',
    id: '34567-89012',
  },
];

export const attestationRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        schemaUID: z.string().min(32),
        userPublicKey: z.string().min(32).optional(),
        type: z.string().min(1),
        message: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const { schemaUID, type, message, userPublicKey } = input;
      const uid = generateSolanaBase58Id();

      const { privateKey, publicKey } = generateKeyPair();

      const transactionSignature = generateSolanaSignature(privateKey, message);

      const attestation: Attestation = {
        uid,
        schemaUID,
        attesterAddress: userPublicKey ?? publicKey,
        transactionSignature,
        type,
        message,
      };

      return {
        attestation,
      };
    }),

  // Read: Retrieve data from Redis
  read: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      // const value = await redis.get('attestation_' + input.key);
      // if (!value) {
      //   throw new Error(`Key "${input.key}" not found`);
      // }
      return { key: input.key };
    }),

  // Update: Update data in Redis
  update: publicProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      return {
        success: true,
        message: `Key "${input.key}" updated successfully`,
      };
    }),

  // Delete: Delete data from Redis
  delete: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input }) => {
      return {
        success: true,
        message: `Key "${input.key}" deleted successfully`,
      };
    }),

  // List: List all keys in Redis
  list: publicProcedure.query(async () => {
    // const data = (await Promise.all(
    //   keys.map(async (key: string) => {
    //     const value = await redis.get(key);
    //     return value ? JSON.parse(value) : null; // Handle null case
    //   }),
    // )) as (Attestation | null)[];
    // return data.filter((item) => item !== null) as Attestation[];

    // Filter out null values and ensure type is correctly inferred
    return dummyAttestations;
  }),

  empty: publicProcedure.query(async () => {
    return {};
  }),
});
