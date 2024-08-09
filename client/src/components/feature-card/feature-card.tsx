// feature-card.tsx
import React from 'react';
import Image from 'next/image';
import { IoEyeOutline } from 'react-icons/io5';
import StarRating from '../ui/star';
import { Feature } from '@/types/types';

const FeatureCard: React.FC<Feature> = ({
  image,
  title,
  rating,
  currentPrice,
  originalPrice,
  discount,
}) => {
  return (
    <div className="space-y-3 px-4">
      <div className="relative group ">
        <div className="bg-white h-auto py-3 w-10 rounded-3xl absolute top-3 right-2 flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 duration-300 transition-all">
          <IoEyeOutline size={25} />
        </div>
        <div className="bg-[#FF0000] h-auto py-2 px-4 rounded-3xl absolute top-3 left-2 flex justify-center items-center cursor-pointer">
          <p className="text-15 text-white">
            {discount}
            <span>%</span>
          </p>
        </div>
        <Image width={400} height={400} src={image} alt={title} />
      </div>
      <div className="flex justify-between px-1">
        <p className="text-15">{title}</p>
        <StarRating defaultValue={rating} />
      </div>
      <div className="border-t flex gap-5 pt-3 px-1">
        <p className="text-12">
          Dhs.<span>{currentPrice}</span>.00
        </p>
        <p className="text-12 line-through text-[#A5A5A5] font-semibold">
          Dhs.<span>{originalPrice}</span>.00
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
