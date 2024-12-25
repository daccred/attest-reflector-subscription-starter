import nacl from 'tweetnacl';
import bs58 from 'bs58';
import Redis from 'ioredis';
import { env } from '@/env';

/**
 * Generates a Solana-like transaction signature.
 *
 * @param {Uint8Array} privateKey - The sender's private key (64 bytes).
 * @param {string} message - The message (transaction data) to be signed.
 * @returns {string} - The Base58-encoded transaction signature.
 */
export function generateSolanaSignature(
  privateKey: Uint8Array,
  message: string,
): string {
  // Convert the message to Uint8Array (for signing)
  const messageUint8 = new TextEncoder().encode(message);

  // Sign the message using the private key
  const signature = nacl.sign.detached(messageUint8, privateKey);

  // Encode the signature in Base58 (Solana-style)
  const base58Signature = bs58.encode(signature);

  return base58Signature;
}

/**
 * Generates a Solana-like ed25519 keypair and returns the Base58-encoded public and private keys.
 */
export function generateKeyPair(): {
  publicKey: string;
  privateKey: Uint8Array;
} {
  // Generate the key pair
  const keyPair = nacl.sign.keyPair();

  // Encode the public key in Base58 (Solana-style)
  const publicKeyBase58 = bs58.encode(keyPair.publicKey);

  // Return the public key (Base58) and private key (raw Uint8Array)
  return {
    publicKey: publicKeyBase58,
    privateKey: keyPair.secretKey, // private key (64 bytes)
  };
}

/**
 * Generates a Solana-like public key
 */
export function generateSolanaBase58Id(): string {
  // Generate an Ed25519 keypair
  const keyPair = nacl.sign.keyPair();

  // Encode the public key to Base58 (similar to Solana addresses)
  const base58Id = bs58.encode(keyPair.publicKey);

  return base58Id;
}
