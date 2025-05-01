'use client';
import { MouseEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '@redux/store';
import { CartItem, CartSize } from '@cartSlice/types';
import {
  getProductStock,
  variationName,
} from '@/config';
import CardSkeleton from '../cardSkelton';
import { cardProductTags } from '@/data/products';
import { Sizes } from '@/types/prod';
import { CardProps } from '@/types/interfaces';
import { handleAddToCartCard, handleAddToWishlistCard } from '@/utils/productActions';
import { generateFinalUrl } from '@/config/HelperFunctions';

// Lazy load cards
const PortraitCard = dynamic(() => import('./portraitCard'), {
  ssr: false
});



const Card = ({
  card,
  isModel,
  className,
  skeletonHeight,
  cardImageHeight,
  slider,
  isHomepage,
  calculateHeight,
  portSpace,
  SubcategoryName,
  mainCatgory,
  cardLayout,
  accessoriesSlider,
  fill,
  isAccessory
}: CardProps) => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State | any) => state.cart.items);
  const [itemToAdd, setItemToAdd] = useState<CartItem | null>(null);
  // Memoized values to prevent unnecessary calculations
  const [displayInfo, setDisplayInfo] = useState<{ displayName: string | undefined, displayTag: { name: string; tagPara: string; displayName: string; } | undefined, uniqueSizes: Sizes[] }>({ displayName: '', displayTag: undefined, uniqueSizes: [] });
  const [totalStock, setTotalStock] = useState<number>(0);
  const [isOutStock, setIsOutStock] = useState<boolean>(false);
  useEffect(() => {
    if (!card) return;
    const displayName = variationName({ product: card });
    const displayTag = cardProductTags.find((item) => item.name === card?.name);
    const uniqueSizes = [...new Map(card.sizes?.map((size: Sizes) => [size.name, size])).values()];
    setDisplayInfo({ displayName, displayTag, uniqueSizes });
  }, [card]);


  useEffect(() => {
    if (!card) return;

    const sizes = card?.sizes?.find(
      (size) => size.name === card.sizeName
    ) ?? ((isHomepage || slider) ? card?.sizes?.[0] : undefined);

    const selectedSize = sizes as CartSize | undefined;
    const selectedfilter = card?.filter?.[0]?.additionalInformation?.find(
      (f) => f.name === card.colorName
    ) ?? ((isHomepage || slider) ? card?.filter?.[0]?.additionalInformation?.[0] : undefined);

    const selectedShipping = card?.shippingOptions?.[0] || undefined;

    setItemToAdd({
      ...card,
      quantity: 1,
      selectedSize,
      selectedfilter,
      selectedShipping
    });
  }, [ isHomepage, slider]);



  useEffect(() => {
    if (!itemToAdd) return;
  
    const total = getProductStock({ product: itemToAdd as CartItem });
    setTotalStock(total);
    setIsOutStock(total <= 0);
  }, [itemToAdd]);
  


  
  // const [averageRating, setAverageRating] = useState<number>();
  // useEffect(() => {
  //   if (card?.reviews?.length) {
  //     const { averageRating } = calculateRatingsPercentage(card.reviews);
  //     setAverageRating(averageRating);
  //   }
  // }, [card?.reviews]);

  // const baseUrl = useMemo(() => ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory), [
  //   card,
  //   SubcategoryName?.name,
  //   mainCatgory,
  // ]);


  const handleAddToCard = (e: MouseEvent<HTMLElement>) =>
    handleAddToCartCard(e, card, itemToAdd, cartItems, totalStock, dispatch);

  const handleAddToWishlist = (e: MouseEvent<HTMLElement>) =>
    handleAddToWishlistCard(e, card, itemToAdd, totalStock)

  if (!card) {
    return <CardSkeleton skeletonHeight={skeletonHeight} />;
  }

  return itemToAdd ? (
    <PortraitCard
      accessoriesSlider={accessoriesSlider}
      averageRating={0}
      calculateHeight={calculateHeight}
      card={card}
      cardImageHeight={cardImageHeight}
      className={className}
      displayName={displayInfo.displayName}
      displayTag={displayInfo.displayTag}
      finalUrl={generateFinalUrl(itemToAdd, card, SubcategoryName, mainCatgory)}
      handleAddToCard={handleAddToCard}
      handleAddToWishlist={handleAddToWishlist}
      handleEventProbation={(e: any) => e.stopPropagation()}
      isHomepage={isHomepage}
      isLandscape={cardLayout === 'list'}
      isModel={isModel}
      isOutStock={isOutStock}
      itemToAdd={itemToAdd}
      portSpace={portSpace}
      skeletonHeight={skeletonHeight}
      slider={slider}
      uniqueSizes={displayInfo.uniqueSizes}
      fill={fill}
      isAccessory={isAccessory}
    />
  ) : <CardSkeleton skeletonHeight={skeletonHeight} />
};

export default Card;
