export const isActiveLink = (
  currentLink: string,
  currentPathname: string,
): boolean => {
  // Get the segments of the current link and current pathname
  const linkSegments = currentLink
    .split('/')
    .filter((segment) => segment !== '');
  const pathnameSegments = currentPathname
    .split('/')
    .filter((segment) => segment !== '');

  // Compare each segment of the current link with the corresponding segment of the current pathname
  for (let i = 0; i < linkSegments.length; i++) {
    if (pathnameSegments[i] !== linkSegments[i]) {
      return false; // Sub-page doesn't match, link is not active
    }
  }

  return true; // All segments match, link is active
};

// Debounce utility function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function maskPublicKey(publicKey: string): string {
  const firstPart = publicKey.slice(0, 6); // First 6 characters
  const lastPart = publicKey.slice(-6); // Last 4 characters
  const maskedPart = publicKey.slice(6, -6).replace(/./g, 'x'); // Middle part masked with *

  return `${firstPart}${maskedPart}${lastPart}`;
}
