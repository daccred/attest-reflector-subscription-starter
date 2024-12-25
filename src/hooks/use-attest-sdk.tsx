import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, type Transaction } from '@solana/web3.js';
import { AttestSDK } from '@peke65/attest-sdk';

export interface CreateSchemaProps {
  name: string;
  fields: Field[];
  resolverAddress: string | null;
  revocable: boolean;
}

export interface Field {
  name: string;
  type: string;
  isArray: boolean;
}

export function useAttestSDK() {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const client = new AttestSDK({
    wallet: anchorWallet as any,
    network: 2,
  });

  const signTransaction = async (transaction: Transaction) => {
    if (!anchorWallet) {
      throw new Error('Wallet not connected');
    }

    const signedTransaction = await anchorWallet.signTransaction(transaction);

    const rawTransaction = signedTransaction.serialize();
    const signature = await connection.sendRawTransaction(rawTransaction);
    return signature;
  };

  const createSchema = async (props: CreateSchemaProps) => {
    if (!anchorWallet) {
      throw new Error('Wallet not connected');
    }

    const { resolverAddress, revocable, fields, name } = props;

    const content = {
      name: name,
      type: 'object',
      properties: fields,
    };

    const { data, error } = await client.schema.generate({
      schemaName: name,
      schemaContent: JSON.stringify(content),
      resolverAddress: resolverAddress
        ? new PublicKey(resolverAddress)
        : undefined,
      revocable,
    });

    if (error) {
      throw new Error(error as string);
    }

    const signature = await signTransaction(data!.tx);

    return {
      schemaUID: data!.uid.toBase58(),
      signature: signature,
    };
  };

  const fetchSchema = async (uid: string, signature: string) => {
    const { data, error } = await client.schema.fetch(uid);

    const res = await connection.getTransaction(signature);

    console.log({ res });

    if (error || !data) {
      throw new Error(error as string);
    }

    return {
      schemaData: data,
      transaction: res,
    };
  };

  return { client, signTransaction, createSchema, fetchSchema };
}
