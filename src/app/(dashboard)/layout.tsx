import AppLayout from '@/components/layout';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
