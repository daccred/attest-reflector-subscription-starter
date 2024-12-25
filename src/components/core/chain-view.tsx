'use client';

import { useState, useEffect } from 'react';

import { getAttestations } from '@/lib/mock-reflector';
import { DataTable } from './custom-table';
import { SectionHeader } from './section-header';
import { Icons } from '@/assets/icons';
import { IAttestation } from '@/const/types';

import { AttestationsColumn } from './attestation-columns';
import { useAccount } from '@/hooks/use-account';

export default function ChainView() {
  const [attestations, setAttestations] = useState<IAttestation[]>([]);

  const { address } = useAccount();

  useEffect(() => {
    getAttestations(address ?? '').then(setAttestations);
  }, []);

  return (
    <div className="">
      <SectionHeader
        title={'Chain View (Attestations)'}
        description="Showing the most recent attestations."
        onActionClick={() => {
          // router.push(routes.CREATE_SCHEMAS);
        }}
        icon={<Icons.Plus className="text-primary" />}
      />
      <DataTable
        isLoading={false}
        columns={AttestationsColumn}
        data={attestations}
        actionButtons={(row: any) => <></>}
        link={''}
      />
    </div>
  );
}
