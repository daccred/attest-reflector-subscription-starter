import { useEffect, useState } from 'react';
import {
  isConnected,
  requestAccess,
  setAllowed,
  getAddress,
} from '@stellar/freighter-api';

/**
 * Returns an object containing `address` and `displayName` properties, with
 * the address fetched from Freighter's `getPublicKey` method in a
 * render-friendly way.
 *
 * Before the address is fetched, returns null.
 *
 * Caches the result so that the Freighter lookup only happens once, no matter
 * how many times this hook is called.
 *
 * NOTE: This does not update the return value if the user changes their
 * Freighter settings; they will need to refresh the page.
 */
export function useAccount(): {
  address: string | null;
  displayName: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
} {
  const [address, setAddress] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addressLookup = async () => {
    setLoading(true);
    await setAllowed();
    if (await isConnected()) {
      const user = await getAddress();
      if (user) {
        setAddress(user.address);
        setDisplayName(
          `${user.address.slice(0, 4)}...${user.address.slice(-4)}`,
        );
      }
    }
    setLoading(false);
  };

  const connect = async () => {
    if (address !== null) return;

    await addressLookup();
  };

  const disconnect = async () => {
    // await setAllowed();
    setAddress(null);
    setDisplayName(null);
  };

  if (loading) return { address: null, displayName: null, connect, disconnect };

  return { address, displayName, connect, disconnect };
}
