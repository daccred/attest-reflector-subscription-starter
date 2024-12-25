import { useState } from 'react';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 1 second
      },
      (err) => {
        console.error('Could not copy text:', err);
      },
    );
  };

  return { isCopied, copyValue };
};

export default useCopyToClipboard;
