'use client';
import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '@redux/store';
import { addItem } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import {
  calculateRatingsPercentage,
  generateSlug,
  getProductStock,
  variationName,
} from '@/config';
import CardSkeleton from '../cardSkelton';
import { toast } from 'react-toastify';
import { cardProductTags } from '@/data/products';
import { Sizes } from '@/types/prod';
import { ChangeUrlHandler } from '@/config/fetch';
import { CardProps } from '@/types/interfaces';

// Lazy load cards
const LandScapeCard = dynamic(() => import('./landScapeCard'), { ssr: false });
const PortraitCard = dynamic(() => import('./portraitCard'), { ssr: false });


const Card: React.FC<CardProps> = ({
  card,
  isModel,
  className,
  skeletonHeight,
  cardImageHeight,
  slider,
  isHomepage,
  isLandscape,
  calculateHeight,
  portSpace,
  productImages,
  SubcategoryName,
  mainCatgory,
  cardLayout,
  accessoriesSlider,
}) => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State | any) => state.cart.items);

  // Memoized values to prevent unnecessary calculations
  const displayTag = useMemo(() => cardProductTags.find((item) => item.name === card?.name), [card?.name]);

  const uniqueSizes = useMemo(() => {
    if (!card?.sizes?.length) return [];
    return [...new Map(card.sizes.map((size: Sizes) => [size.name, size])).values()];
  }, [card?.sizes]);

  const displayName = useMemo(() => (card ? variationName({ product: card }) : ''), [card]);

  const itemToAdd: CartItem | any = useMemo(() => ({
    ...card,
    quantity: 1,
    selectedSize: card?.sizes?.find((size) => size.name === card.sizeName)
      ?? ((isHomepage || slider) ? card?.sizes?.[0] : undefined),
    selectedfilter: card?.filter?.[0]?.additionalInformation?.find((f) => f.name === card.colorName)
      ?? ((isHomepage || slider) ? card?.filter?.[0]?.additionalInformation?.[0] : undefined),
    selectedShipping: card?.shippingOptions?.[0] || null,
  }), [card, isHomepage, slider]);

  const totalStock = useMemo(() => getProductStock({ product: itemToAdd }), [itemToAdd]);
  const isOutStock = totalStock <= 0;

  const [averageRating, setAverageRating] = useState<number>();
  const cardStaticData = useMemo(
    () => productImages?.find((item) => item.name === card?.name),
    [productImages, card?.name]
  );

  useEffect(() => {
    if (card?.reviews?.length) {
      const { averageRating } = calculateRatingsPercentage(card.reviews);
      setAverageRating(averageRating);
    }
  }, [card?.reviews]);

  const baseUrl = useMemo(() => ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory), [
    card,
    SubcategoryName?.name,
    mainCatgory,
  ]);

  const finalUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (itemToAdd.selectedfilter?.name) {
      params.set('variant', generateSlug(itemToAdd.selectedfilter.name));
    }
    if (itemToAdd.selectedSize?.name) {
      params.set('size', generateSlug(itemToAdd.selectedSize.name));
    }
    return `${baseUrl}${params.toString() ? `?${params.toString()}` : ''}`;
  }, [itemToAdd, baseUrl]);

  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    localStorage.removeItem('buyNowProduct');

    const exists = cartItems.find((item: any) =>
      item.id === card?.id &&
      item.selectedSize?.name === itemToAdd.selectedSize?.name &&
      item.selectedfilter?.name === itemToAdd.selectedfilter?.name
    );

    if (!exists) {
      dispatch(addItem(itemToAdd));
      dispatch(openDrawer());
      return;
    }

    const newQty = (exists.quantity || 0) + 1;
    if (newQty > totalStock) {
      toast.error(`Only ${card?.stock} items are in stock. You cannot add more than that.`);
      return;
    }
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };

  const handleAddToWishlist = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!Array.isArray(wishlist)) wishlist = [];

    const existing = wishlist.find(
      (item: any) =>
        item.id === itemToAdd.id &&
        item.selectedSize?.name === itemToAdd.selectedSize?.name &&
        item.selectedfilter?.name === itemToAdd.selectedfilter?.name
    );

    if (!existing) {
      wishlist.push(itemToAdd);
      toast.success('Product added to Wishlist!');
    } else {
      const newQty = existing.quantity + 1;
      if (newQty > totalStock) {
        toast.error(`Only ${card?.stock} items are in stock.`);
        return;
      }
      wishlist = wishlist.map((item: any) =>
        item.id === existing.id &&
        item.selectedSize?.name === existing.selectedSize?.name &&
        item.selectedfilter?.name === existing.selectedfilter?.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      toast.success('Product quantity updated in Wishlist.');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('WishlistChanged'));
  };

  if (!card) {
    return <CardSkeleton skeletonHeight={skeletonHeight} />;
  }

  return cardLayout === 'grid' ? (
    <PortraitCard
      accessoriesSlider={accessoriesSlider}
      averageRating={averageRating}
      calculateHeight={calculateHeight}
      card={card}
      cardImageHeight={cardImageHeight}
      cardStaticData={cardStaticData}
      className={className}
      displayName={displayName}
      displayTag={displayTag}
      finalUrl={finalUrl}
      handleAddToCard={handleAddToCard}
      handleAddToWishlist={handleAddToWishlist}
      handleEventProbation={(e : any) => e.stopPropagation()}
      isHomepage={isHomepage}
      isLandscape={isLandscape}
      isModel={isModel}
      isOutStock={isOutStock}
      itemToAdd={itemToAdd}
      portSpace={portSpace}
      skeletonHeight={skeletonHeight}
      slider={slider}
      uniqueSizes={uniqueSizes}
    />
  ) : (
    <LandScapeCard
      card={card}
      finalUrl={finalUrl}
      handleAddToWishlist={handleAddToWishlist}
      averageRating={averageRating}
      displayName={displayName}
      handleAddToCard={handleAddToCard}
      handleEventProbation={(e: any) => e.stopPropagation()}
      itemToAdd={itemToAdd}
      uniqueSizes={uniqueSizes}
    />
  );
};

export default React.memo(Card);
