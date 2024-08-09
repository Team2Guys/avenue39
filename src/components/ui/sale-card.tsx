'use client';
import { ISaleItems } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import { Button } from './button';
import { useRouter } from 'next/navigation';

interface CardProps {
  cards: ISaleItems;
}

const Salecard: React.FC<CardProps> = ({ cards }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/products');
  };

  return (
    <div className="px-6 lg:w-2/4 py-4 rounded-lg border-2 border-primary-foreground bg-white text-center">
      <Image
        src={cards.imageUrl}
        alt="sa"
        width={100}
        className="h-8 object-contain mx-auto"
      />
      <p className="text-[10px] font-semibold">{cards.para}</p>
      <Button
        className="rounded-full text-white text-[10px] h-7 mt-4 border"
        onClick={handleButtonClick}
      >
        {cards.btnText}
      </Button>
    </div>
  );
};

export default Salecard;
