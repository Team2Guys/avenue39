'use client';
import Image from 'next/image';
import React from 'react';
import StarRating from '../ui/star';
import Link from 'next/link';
interface Product {
  link: string;
  image: any;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
}

interface SideCardProps {
  data: Product[];
}
const SideCard: React.FC<SideCardProps> = ({ data }) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {data.map((item: any, index: any) => (
        <Link href={'/product/5'} key={index} className="flex gap-4 ">
          <Image width={170} height={170} src={item.image} alt={item.name} />
          <div className="gap-2 space-y-4 mt-3">
            <p className="text-[13px] font-semibold">{item.name}</p>
            <hr />
            <p className="text-[12px] font-semibold">
              Dhs. {item.price.toFixed(2)}
            </p>
            {item.originalPrice && (
              <p className="text-9 font-semibold line-through text-[#A5A5A5]">
                Dhs. {item.originalPrice.toFixed(2)}
              </p>
            )}
            {item.discount && (
              <div className="bg-[#FF0000] w-10 h-5 text-[8px] rounded-3xl text-white flex justify-center items-center">
                {item.discount}
              </div>
            )}
            <StarRating defaultValue={item.rating} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideCard;
