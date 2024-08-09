'use client';
import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Counter from '../counter';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: any;
}

interface OrderItemProps {
  product: Product;
}

const OrderPlace: React.FC<OrderItemProps> = ({ product }) => {
  const pathname = usePathname();
  const isCartPage = pathname === '/cart';

  return (
    <div className="shadow rounded-md w-full p-2 bg-white flex flex-wrap md:flex-nowrap justify-between items-center">
      <div className="flex items-center gap-4">
        <Image
          width={100}
          height={100}
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="">
          <p className="text-16 xl:text-18">{product.name}</p>
          <div className="flex flex-wrap md:flex-nowrap lg:hidden justify-between items-center gap-2 md:gap-6 pr-4">
            <p className="text-[18px] font-bold">
              Dhs.<span>{product.price.toFixed(2)}</span>
            </p>
            <p className="text-14 font-normal line-through text-[#A5A5A5]">
              Dhs.<span>{product.originalPrice.toFixed(2)}</span>
            </p>
            <IoCloseSharp className="cursor-pointer" size={20} />
            <div>{/* <Counter /> */}</div>
          </div>
        </div>
      </div>
      {isCartPage && <div className="hidden lg:block">{/* <Counter /> */}</div>}
      <div className="hidden lg:flex items-center gap-6 pr-4">
        <p className="text-16 xl:text-[22px] font-bold">
          Dhs.<span>{product.price.toFixed(2)}</span>
        </p>
        <p className="text-12 xl:text-16 font-normal line-through text-[#A5A5A5]">
          Dhs.<span>{product.originalPrice.toFixed(2)}</span>
        </p>
        <IoCloseSharp className="cursor-pointer" size={25} />
      </div>
    </div>
  );
};

export default OrderPlace;
