import { IOrder } from '@/types/types';
import { getOrderHistory } from '@/config/handlers';
import dynamic from 'next/dynamic';
const Orders = dynamic(() => import('./Orders'))

const OrdersPage = async () => {
  const orderHistory: IOrder[] = await getOrderHistory(true);
  return <Orders orderData={orderHistory} />;
};

export default OrdersPage;
