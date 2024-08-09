import React from 'react';
import Image from 'next/image';
import { ICard, IProduct } from '@/types/types';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { PiEyeThin } from 'react-icons/pi';

interface CardProps {
  card: IProduct;
}

const LandscapeCard: React.FC<CardProps> = ({ card }) => {
  const renderStars = () => {
    const stars = [];
    // for (let i = 1; i <= 5; i++) {
    //   if (i <= (card.reviews || 0)) {
    //     stars.push(<MdStar key={i} size={20} className="text-yellow-400" />);
    //   } else {
    //     stars.push(
    //       <MdStarBorder key={i} size={20} className="text-yellow-400" />,
    //     );
    //   }
    // }
    // return stars;
  };
  return (
    <div className="rounded-2xl text-center relative product-card mx-2 group flex gap-4 items-center flex-col sm:flex-row">
      <div className="relative w-fit mx-auto sm:w-3/12">
        <div className="bg-white rounded-full absolute top-4 right-6 flex flex-col gap-2 py-2 px-1 product-hover-icons z-[1] opacity-0 group-hover:opacity-100 transition-opacity">
          <PiEyeThin size={17} className="cursor-pointer" />
          <CiHeart size={18} className="cursor-pointer" />
        </div>
        {card.sale !== '0' && (
          <span className="absolute top-4 left-4 text-white text-xs font-light bg-red-500 rounded-full w-14 h-6 flex justify-center items-center">
            {card.sale}%
          </span>
        )}
        <Image
          src={card.posterImageUrl}
          alt={card.name}
          width={320}
          height={200}
          className="object-cover rounded-t-lg mx-auto"
        />
      </div>
      <div className="w-full sm:w-9/12 text-center sm:text-start px-4 sm:px-0">
        <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
        <p className="mt-2 font-normal text-sm max-h-10 text-ellipsis line-clamp-2">
          {card.description}
        </p>
        <p className="text-md font-semibold mt-2">
          AED{card.discountPrice}
          <span className="line-through text-secondary-foreground ms-2">
            {card.price}
          </span>
        </p>
        <div className="flex gap-1 mt-2 items-center justify-center sm:justify-start h-8">
          {/* {card.reviews != 0 ? renderStars() : ''} */}
        </div>
        <div className="text-center flex flex-none justify-center sm:justify-start gap-3">
          <button className="my-4 w-32 h-8 text-primary border border-primary  rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white">
            <HiOutlineShoppingBag />
            <span className="text-10 font-medium">Add to Cart</span>
          </button>
          <button className="my-4 w-32 h-8 text-secondary border border-primary bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary">
            <span className="text-10 font-medium">Quick View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandscapeCard;
