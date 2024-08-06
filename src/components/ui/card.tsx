import React, { useState } from 'react';
import Image from 'next/image';
import { ICard } from '@/types/types';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { PiEyeThin } from 'react-icons/pi';

import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store'; // Adjust according to your path
import { addItem, removeItem, updateItemQuantity } from '@cartSlice/index'; // Adjust according to your path
import { CartItem } from '@cartSlice/types'; // Adjust according to your path
import { SheetTrigger } from './sheet';
import CartItems from '../cart/items';
import { openDrawer } from '@/redux/slices/drawer';
import { useRouter } from 'next/navigation';

interface CardProps {
  card: ICard;
  isModel?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isModel }) => {
  const Navigate = useRouter();
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const itemToAdd: CartItem = {
    ...card,
    quantity: 1,
  };
  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= (card.reviews || 0)) {
        stars.push(<MdStar key={i} size={20} className="text-yellow-400" />);
      } else {
        stars.push(
          <MdStarBorder key={i} size={20} className="text-yellow-400" />,
        );
      }
    }
    return stars;
  };

  const productId = 5;

  const handleNavigation = (e: any) => {
    Navigate.push(`/product/${productId}`);
  };
  return (
    <div
      className="rounded-2xl text-center relative product-card mx-2 group hover:shadow-md hover:cursor-pointer hover:bg-white mb-2"
      onClick={(e) => handleNavigation(e)}
    >
      <div className="relative w-fit mx-auto">
        <div className="bg-white rounded-full absolute top-4 right-6 flex flex-col gap-2 py-2 px-1 product-hover-icons z-[1] opacity-0 group-hover:opacity-100 transition-opacity">
          <PiEyeThin size={17} className="cursor-pointer" />
          <CiHeart size={18} className="cursor-pointer" />
        </div>
        <span className="absolute top-4 left-4 text-white text-xs font-light bg-red-500 rounded-full w-14 h-6 flex justify-center items-center">
          {card.sale}
        </span>
        <Image
          src={card.image}
          alt={card.name}
          width={320}
          height={200}
          className="object-cover rounded-t-lg mx-auto"
        />
      </div>
      <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
      <p className="text-md font-semibold mt-1">
        AED{card.price}
        <span className="line-through text-secondary-foreground ms-2">
          {card.discount}
        </span>
      </p>
      <div className="flex gap-1 mt-2 items-center justify-center h-8">
        {card.reviews != 0 ? renderStars() : ''}
      </div>

      {isModel ? null : (
        <div className="text-center flex flex-none justify-center gap-3">
          <button
            className="my-4 w-32 h-8 text-primary border border-primary  rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
            onClick={(e) => handleAddToCard(e)}
          >
            <HiOutlineShoppingBag />
            <span className="text-10 font-medium">Add to Cart</span>
          </button>
          <button className="my-4 w-32 h-8 text-secondary border border-primary bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary">
            <span className="text-10 font-medium">Quick View</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
