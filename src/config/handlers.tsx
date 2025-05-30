'use server';

import { IOrder } from '@/types/types';
import { cookies } from 'next/headers';

export async function getOrderHistory(flag?: boolean) {
  const cookieStore = await cookies();
  const token = cookieStore.get('2guysAdminToken');
  const superAdminToken = cookieStore.get('superAdminToken');
  let finalToken = token ? token : superAdminToken;

  const headers: any = {
    token: finalToken?.value,
  };
  const paymentStatus = flag ? flag : false;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/Get_orders`,
      { headers },
    );
    const result = await res.json();
    const data = result.filter(
      (order: IOrder) => order.paymentStatus.paymentStatus === paymentStatus,
    );
    return data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    return [];
  }
}
