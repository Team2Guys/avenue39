'use client';
import React, { useState } from 'react';
import Breadcrumb from '@/components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Dashboard/Layouts/DefaultLayout';
import { formatDate } from '@/config';
import { LuView } from 'react-icons/lu';
import { IOrder} from '@/types/types';
import dynamic from 'next/dynamic';
import { IProduct } from '@/types/prod';
const OrderList = dynamic(() => import('@/components/Orders/orders'))

const Orders = ({ orderData }: { orderData: IOrder[] }) => {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [visible, setVisible] = useState(false);

  const orderColumns = [
    { title: 'OrderId', dataIndex: 'orderId', key: 'orderId' },
    { title: 'Email', dataIndex: 'user_email', key: 'user_email' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => formatDate(createdAt),
    },
    {
      title: 'View Products',
      dataIndex: 'view',
      key: 'view',
      render: (_: any, record: any) => (
        <span className="flex justify-center">
          <LuView
            onClick={() => handleViewProducts(record.products)}
            className="cursor-pointer text-green-500"
            size={30}
          />
        </span>
      ),
    },
  ];

  const handleViewProducts = (products: IProduct[]) => {
    setSelectedProducts(products);
    setVisible(true);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="View Orders" />
      <OrderList
        orderData={orderData}
        orderColumns={orderColumns}
        visible={visible}
        setVisible={setVisible}
        selectedProducts={selectedProducts}
      />
    </DefaultLayout>
  );
};

export default Orders;
