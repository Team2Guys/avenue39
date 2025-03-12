import { get_all_records } from "@/config/fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import dynamic from 'next/dynamic';
const DashboardMain = dynamic(() => import('./DashboardMain'))
const Loader = dynamic(() => import('@/components/Loader/Loader'))

async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('2guysAdminToken');
  const superAdminToken = cookieStore.get('superAdminToken');
  let finalToken = token ? token.value : superAdminToken?.value;
  if (!finalToken) {
    redirect('/dashboard/Admin-login');
  }
  const headers = {
    token: finalToken,
  };
  const records = await get_all_records(headers);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <DashboardMain records={records} />
      </Suspense>
    </>
  );
}

export default Home;
