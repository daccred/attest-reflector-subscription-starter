'use client';

import React from 'react';
import Header from '@/components/core/header';

type Props = {
  children: React.ReactNode;
};

const AppLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      {/* <!-- ===== Header Start ===== --> */}
      <Header />
      {/* <!-- ===== Header end ===== --> */}
      {/* <!-- ===== Main Content Start ===== --> */}
      <div className="app-container mt-20 w-full pb-20">{children}</div>
      {/* <!-- ===== Main Content End ===== --> */}
    </div>
  );
};

export default AppLayout;
