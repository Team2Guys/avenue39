'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoBagOutline, IoEyeOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { CartItem } from '@/redux/slices/cart/types';
import { addItem } from '@/redux/slices/cart';
import { openDrawer } from '@/redux/slices/drawer';
import ProductDetail from '../product-detail/product-detail';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust the path as necessary
import { IProduct, IReview } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { ChangeUrlHandler, fetchReviews } from '@/config/fetch';
import { calculateRatingsPercentage, renderStars } from '@/config';
import { IoIosHeartEmpty } from 'react-icons/io';
import { message } from 'antd';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { State } from '@/redux/store';
import Link from 'next/link';

interface CardProps {
  card: IProduct;
  isModel?: boolean;
  isLoading?: boolean;
  cardHeight?: string;
}

const FeatureCard: React.FC<CardProps> = ({
  card,
  isModel,
  isLoading,
  cardHeight,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading == false) {
      setLoading(false);
    }
  }, [isLoading]);

  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const itemToAdd: CartItem = {
    ...card,
    quantity: 1,
  };

  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const existingCartItem = cartItems.find((item) => item.id === card?.id);
    const currentQuantity = existingCartItem?.quantity || 0;
    const newQuantity = currentQuantity + itemToAdd.quantity;
    if (newQuantity > (card?.stock || 0)) {
      message.error(
        `Only ${card?.stock} items are in stock. You cannot add more than that.`,
      );
      return;
    }
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };

  const { data: reviews = [] } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });
  const productId = card?.id;
  // const filteredReviews = reviews.filter(
  //   (review) => review.productId === productId,
  // );

  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];
  const { averageRating } = calculateRatingsPercentage(filteredReviews);


  const handleAddToWishlist = (product: IProduct) => {
    const newWishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      posterImageUrl: product.posterImageUrl,
      discountPrice: product.discountPrice,
      count: 1,
      stock: product.stock,
      totalPrice: product.discountPrice ? product.discountPrice : product.price,
      categories: product.categories,
      subcategories: product.subcategories, 
    };
    let existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const existingItemIndex = existingWishlist.findIndex(
      (item: any) => item.id === newWishlistItem.id,
    );
    if (existingItemIndex !== -1) {
      const currentCount = existingWishlist[existingItemIndex].count;
      if (product.stock && currentCount + 1 > product.stock) {
        message.error(
          `Only ${product.stock} items are in stock. You cannot add more to your wishlist.`,
        );
        return;
      }
      existingWishlist[existingItemIndex].count += 1;
      existingWishlist[existingItemIndex].totalPrice =
        existingWishlist[existingItemIndex].count *
        (existingWishlist[existingItemIndex].discountPrice ||
          existingWishlist[existingItemIndex].price);
    } else {
      if (product.stock && newWishlistItem.count > product.stock) {
        message.error(
          `Only ${product.stock} items are in stock. You cannot add more to your wishlist.`,
        );
        return;
      }
      existingWishlist.push(newWishlistItem);
    }
    localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
    message.success('Product added to Wishlist successfully!');
    window.dispatchEvent(new Event('WishlistChanged'));
    console.log(existingWishlist, 'existingWishlist');
  };

  return (
    <div className="space-y-3 px-4 relative">
      {loading ? (
        <Skeleton className={cardHeight} />
      ) : (
        <div className="relative group overflow-hidden rounded-2xl">
          <div
            onClick={handleAddToCard}
            className=" w-10 h-10 absolute right-4 top-4 rounded-xl  flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer"
          >
            <IoBagOutline size={20} />
          </div>
          <div className="flex flex-col gap-4 opacity-100 md:opacity-0 group-hover:opacity-100 duration-300 transition-all absolute top-[75px] right-4 md:-right-10 group-hover:right-4">
            <div
              onClick={() => handleAddToWishlist(card)}
              className=" w-10 h-10 rounded-xl  flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer duration-300 transition-all"
            >
              <IoIosHeartEmpty size={20} />
            </div>
            {!isModel && (
              <Dialog>
                <DialogTrigger>
                  <div className=" py-3 z-20 w-10 h-10 rounded-xl flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white cursor-pointer duration-300 transition-all">
                    <IoEyeOutline size={20} />
                  </div>
                </DialogTrigger>
                <DialogOverlay />
                <DialogContent className="max-w-[1400px] w-11/12 bg-white px-0 sm:rounded-3xl border border-black shadow-none gap-0 pb-0">
                  <VisuallyHidden>
                    <DialogTitle>Product Detail</DialogTitle>
                  </VisuallyHidden>
                  <div className="pb-6 px-5 xs:px-10 me-4 xs:me-7 mt-6 max-h-[80vh] overflow-y-auto custom-scroll">
                    <ProductDetail
                      params={card}
                      isZoom={false}
                      gap="gap-10 md:gap-20"
                      swiperGap="gap-5"
                      detailsWidth="w-full md:w-1/2 lg:w-2/5"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          {card.discountPrice > 0 && (
            <div className="absolute -top-1 -left-[56px] px-7 transform -rotate-45 bg-[#FF0000] text-white text-14 font-bold w-[150px] h-[45px] flex justify-center items-center">
              {Math.round(
                ((card.price - card.discountPrice) / card.price) * 100,
              )}
              %
            </div>
          )}

          <Link
            href={ChangeUrlHandler(card)}
            className="cursor-pointer"
          >
            <Image
              width={400}
              height={400}
              src={card.posterImageUrl}
              alt={card.posterImageAltText || card.name}
              className={`z-10 rounded-2xl ${cardHeight}`}
            />
          </Link>
          <div className="flex justify-between px-1 mt-3">
            <p className="text-15">{card.displayName ?card.displayName :card.name}</p>
            <div className="flex">
              {' '}
              {averageRating > 1 && renderStars({ star: averageRating })}
            </div>
          </div>

          {card.discountPrice > 0 ? (
            <div className="border-t flex gap-5 pt-3 px-1">
              <p className="text-12">
                AED <span>{card.discountPrice}</span>
              </p>
              <p className="text-12 line-through text-[#A5A5A5] font-semibold">
                AED <span>{card.price}</span>
              </p>
            </div>
          ) : (
            <div className="border-t flex gap-5 pt-3 px-1">
              <p className="text-12 font-semibold">
                AED <span>{card.price}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
