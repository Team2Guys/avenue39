'use client';

import FilterTable from '@/components/Dashboard/Tables/FilterTable';
import TopHero from '@/components/top-hero';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { Orderbreadcrumbs } from '@/data/data';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { Modal, Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { State } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { generateSlug } from '@/config';
import axios from 'axios';
import { IOrder, IPaymentStatus } from '@/types/types';

interface Product {
  key: string;
  title: string;
  quantity: number;
  price: number;
  date: string;
  image: string;
}

interface Order {
  key: string;
  OrderId: string;
  Name: string;
  Address: string;
  Country: string;
  Email: string;
  PhoneNumber: string;
  products: Product[];
}

const OrderHistory: React.FC = () => {
  const router = useRouter();
  const { loggedInUser } = useSelector((state: State) => state.usrSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [ordersHistory, setOrdersHistory] = useState<IOrder[]>([]);
  const [ordersHistoryLoading, setOrdersHistoryLoading] = useState<boolean>(true);
  const [userToken, setuserToken] = useState<string>('');
  const skeletonArray = new Array(14).fill(0);
  useEffect(() => {
    const token = Cookies.get('user_token');
    if (!token) {
      router.push('/login');
    }
    else {
      setuserToken(token);
    }
  }, [router]);

  useEffect(() => {
    const fetchOrdersHistroy = async (token: string) => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/order_history`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (res) {
          setOrdersHistory(res.data);
          console.log(res.data, "ordersHistoryLoading")

        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setOrdersHistoryLoading(false);
      }
    };
    if (userToken) {
      fetchOrdersHistroy(userToken);
    }

  }, [userToken]);

  const showModal = (record: IOrder) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<IOrder> = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: '15%',
    },
    {
      title: 'User Email',
      dataIndex: 'user_email',
      key: 'user_email',
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '25%',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '15%',
      render: (phone) => phone,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: '15%',
      render: (paymentStatus: IPaymentStatus) => {
        if (!paymentStatus.checkoutStatus && !paymentStatus.paymentStatus) {
          return <span className="text-red-600">Unpaid</span>;
        } else if (paymentStatus.checkoutStatus && !paymentStatus.paymentStatus) {
          return <span className="text-main">Pending</span>;
        } else if (paymentStatus.checkoutStatus && paymentStatus.paymentStatus) {
          return <span className="text-green-600">Paid</span>;
        }
        return <span className="text-gray-500">Unknown</span>;
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '10%',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className='flex items-center gap-4'>
          <div className='cursor-pointer' onClick={() => showModal(record)}>
            <MdOutlineProductionQuantityLimits size={30} />
          </div>
          <Link
            href={`/track-order/${generateSlug(record.orderId)}`}
            className='cursor-pointer whitespace-nowrap bg-main p-2 rounded-md text-white hover:text-white'
          >
            Track order
          </Link>
        </div>
      ),
    }

  ];


  return (
    <>
      <TopHero breadcrumbs={Orderbreadcrumbs} />
      <Container className="py-10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-medium mb-4">Order history</h1>
          {ordersHistoryLoading ? (<div className="overflow-x-auto custom-table grid grid-cols-7">
            {skeletonArray.map((_, index) => (
              <div className="w-full p-4 animate-pulse" key={index}>
                <div className="bg-gray-200 h-5 rounded-lg"></div>
              </div>
            ))}
          </div>) : (
            <Table columns={columns} dataSource={ordersHistory} rowKey="key" pagination={false} className='overflow-x-auto custom-table' />
          )}
        </div>
      </Container>
      <Modal
        title={<p><strong>Order ID:</strong> {selectedOrder?.orderId}</p>}
        width={600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        {selectedOrder ? (
          <div className="mt-5 space-y-4">
            {selectedOrder.products.length > 0 ? (
              selectedOrder.products.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 border rounded-md p-3 hover:border-main transition duration-200"
                >
                  <div>
                    {product.productData ? (
                      <Image
                        className="rounded-md"
                        width={80}
                        height={80}
                        src={
                          product.productData.posterImageUrl ||
                          product.productData.hoverImageUrl
                        }
                        alt={product.productData.name}
                      />
                    ) : (
                      <p>Image not available</p>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold md:text-14">
                      Title: {product.productData?.name}
                    </p>
                    <p className="font-semibold md:text-14">
                      Qt: <span>{product.quantity}</span>
                    </p>
                    <p className="font-semibold md:text-14">
                      Price: AED <span>{product.productData?.discountPrice > 0 ? product.productData?.discountPrice : product.productData?.price}</span>
                    </p>
                    <p className="font-semibold md:text-14">
                      Date: <span>{product.createdAt}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available for this order.</p>
            )}
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>

    </>
  );
};

export default OrderHistory;
