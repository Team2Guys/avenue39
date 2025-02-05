import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import Container from '@/components/ui/Container';
import { IOrder, IOrderProduct } from '@/types/types';

const ViewOrder = async ({ params }: { params: Promise<{ name: string }> }) => {
  let userDetail: IOrder | null = null;
  let name = (await params).name;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/trackorder/${name}`,
    );
    userDetail = response.data;
    if (!userDetail || Object.keys(userDetail).length === 0) {
      return (
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
          <div className="col-span-2 text-center">
            <h2 className="text-xl font-semibold">Order Not Found</h2>
            <p className="text-gray-500 mt-2">
              We couldn&apos;t find an order matching the provided details.
              Please double-check your order ID or email.
            </p>
            <Link
              href="/new-arrivals"
              className="bg-black text-white px-4 py-2 mt-4 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      );
    }
  } catch (error) {
    console.error(error);
    return (
      <Container className="text-center py-20">
        <h2 className="text-xl font-semibold">Error Fetching Order</h2>
        <p className="text-gray-500 mt-2">
          There was an issue retrieving your order details. Please try again
          later.
        </p>
      </Container>
    );
  }

  const subTotal = userDetail.products.reduce((total, item) => {
    const productPrice =
      item.productData?.discountPrice > 0
        ? item.productData?.discountPrice
        : item.productData?.price;
    return total + item.quantity * productPrice;
  }, 0);
  const Shipping = 0;
  const Total = subTotal + Shipping;

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
      <div>
        <div className="border border-gray p-2 rounded-md">
          <p className="text-18 font-bold">Order Id</p>
          <p className="text-14">{userDetail.orderId}</p>
          <p className="text-18 font-bold">Email</p>
          <p className="text-14">{userDetail.user_email}</p>
        </div>

        <div className="border border-gray p-2 rounded-md mt-10">
          <p className="font-bold text-23">Order Detail</p>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-18 font-medium">Shipping Address</p>
              <p className="text-14">{userDetail.address}</p>
            </div>
            <div>
              <p className="text-18 font-medium">Phone Number</p>
              <p className="text-14">{userDetail.phoneNumber}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-10">
          <p className="text-light font-semibold">
            Need help?{' '}
            <Link className="text-black" href="/contact">
              Contact Us
            </Link>
          </p>
          <Link className="bg-black text-white px-4 py-2" href="/new-arrivals">
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {userDetail.products.map((product: IOrderProduct) => (
          <div key={product.id} className="flex gap-4 mt-1">
            <Image
              className="w-[80px] h-[80px] object-cover rounded-md"
              width={200}
              height={200}
              src={
                product.productData.posterImageUrl ||
                product.productData.hoverImageUrl
              }
              alt={product.productData.name}
            />
            <div>
              <p>{product.productData.name}</p>
              <div className="flex justify-between">
                <p className="font-medium text-lightdark">Price</p>
                <p>
                  AED{' '}
                  <span>
                    {product.productData?.discountPrice > 0
                      ? product.productData?.discountPrice
                      : product.productData?.price}
                  </span>
                </p>
              </div>
              <p className="font-medium">
                Quantity: <span>{product.quantity}</span>
              </p>
            </div>
          </div>
        ))}

        <div className="border border-gray py-4 rounded-md px-4">
          {/* <div className="flex justify-between">
            <p className="text-18 font-semibold">Sub total</p>
            <p>AED {subTotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-18 font-semibold">Shipment Fee</p>
            <p>AED {Shipping}</p>
          </div> */}
          <div className="flex justify-between">
            <p className="text-18 font-semibold">Total</p>
            <p>AED {Total}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ViewOrder;
