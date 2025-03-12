import { getOrderHistory } from '@/config/handlers';  
import { IOrder } from '@/types/types';
import dynamic from 'next/dynamic';
const AbundantOrder = dynamic(() => import('./AbundantOrder'))

const Abandoned= async () => {
  const orderHistory: IOrder[] = await getOrderHistory();
  return <AbundantOrder abundantOrderData={orderHistory} />;
};

export default Abandoned;
