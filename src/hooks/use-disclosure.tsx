import { useState } from 'react';

export interface DisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle?: () => void;
}

export function useDisclosure(defaultOpen = false): DisclosureProps {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  const onToggle = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, onToggle };
}
