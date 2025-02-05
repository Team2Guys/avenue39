'use client';
import dynamic from 'next/dynamic';
import ProtectedRoute from '@/hooks/AuthHookAdmin';

const ECommerce = dynamic(() => import('@/components/Dashboard/E-commerce'), {
  ssr: false,
});
import DefaultLayout from '@/components/Dashboard/Layouts/DefaultLayout';
import { RECORDS } from '@/types/types';


function DashboardMain({records}:{records: RECORDS}) {
  return (
    <>
      <DefaultLayout>
        <ECommerce records={records} />
      </DefaultLayout>
    </>
  );
}

export default ProtectedRoute(DashboardMain);
