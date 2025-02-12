'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { ICategory, IProduct } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '@redux/store';
import { addItem } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import ProductDetail from '../product-detail/product-detail';
import { cn } from '@/lib/utils';
import { calculateRatingsPercentage, renderStars } from '@/config';
import { ChangeUrlHandler } from '@/config/fetch';
import CardSkeleton from '../cardSkelton';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '../ui/dialog';
import { message } from 'antd';
import Link from 'next/link';
import { IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
interface CardProps {
  card?: IProduct;
  isModel?: boolean;
  className?: string;
  skeletonHeight?: string;
  isLoading?: boolean;
  category?: boolean;
  cardImageHeight?: string;
  slider?: boolean;
  isHomepage?: boolean;
  isLandscape?: boolean;
  calculateHeight?: string;
  portSpace?: string;
  productImages?: IProduct[];
  redirect?: string;
  SubcategoryName?: ICategory
  mainCatgory?: string
}

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
  mainCatgory
}) => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State | any) => state.cart.items);
  const [cardStaticData, setCardStaticData] = useState<IProduct | undefined>(undefined,);
  const [averageRating, setaverageRating] = useState<any>()
  const [isHoverImage, setIsHoverImage] = useState<boolean>(false)
  const [isOutStock, setIsOutStock] = useState<boolean>(false)
  const [productPrice, setProductPrice] = useState<number>()
  const [productDiscountPrice, setProductDiscountPrice] = useState<number>()

  const handleEventProbation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const itemToAdd: CartItem | any = {
    ...card,
    quantity: 1,
    selectedSize: (card && card?.sizes) && card?.sizes[0],
    selectedfilter: (card && card?.filter) && card?.filter[0]?.additionalInformation[0],
  };
  useEffect(() => {
    const price =
      card?.sizes?.[0]?.price ??
      card?.filter?.[0]?.additionalInformation?.[0]?.price ??
      card?.price;
    setProductPrice(Number(price))
    const discountPrice =
      card?.sizes?.[0]?.discountPrice ??
      card?.filter?.[0]?.additionalInformation?.[0]?.discountPrice ??
      card?.discountPrice;
    setProductDiscountPrice(Number(discountPrice))

  }, []);

  useEffect(() => {
    const cardImage = productImages?.find(
      (item: IProduct) => item.name === card?.name,
    );
    setCardStaticData(cardImage);

  }, [productImages]);

  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    console.log(itemToAdd, 'itemToAdd')
    e.stopPropagation();
    const existingCartItem = cartItems.find((item: any) => item.id === card?.id && item.selectedSize?.name === itemToAdd.selectedSize?.name &&
      item.selectedfilter?.name === itemToAdd.selectedfilter?.name)
    console.log(existingCartItem, "cartItems")
    if (!existingCartItem) {
      dispatch(addItem(itemToAdd));
      dispatch(openDrawer());
      return
    }
    let sizesStock = itemToAdd && itemToAdd.sizes?.reduce((accum: any, value: any) => {
      if (value.stock) {
        return accum += Number(value.stock)
      }
      return 0;
    }, 0)
    let colorsStock = itemToAdd && itemToAdd.filter?.reduce((parentAccume: number, parentvalue: any) => {
      const countedStock = parentvalue.additionalInformation.reduce((accum: number, value: any) => {

        if (value.stock) {
          return accum + Number(value.stock);
        }
        return accum;
      }, 0);
      return parentAccume + countedStock;
    }, 0);

    const totalStock = sizesStock && sizesStock > 0 ? sizesStock : colorsStock && colorsStock > 0 ? colorsStock : itemToAdd?.stock || 0;

    const currentQuantity = existingCartItem?.quantity || 0;
    const newQuantity = currentQuantity + 1;
    const variationQuantity = totalStock
    if (newQuantity > totalStock) {
      toast.error(`Only ${card?.stock} items are in stock. You cannot add more than that.`);
      return;
    } else if (newQuantity > variationQuantity) {
      toast.error(`Only ${variationQuantity} items are in stock for selected variation. You cannot add more than that in Cart.`);
      return;
    }
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };

  const handleAddToWishlist = (product: IProduct) => {
 
     console.log("Wishlist:", itemToAdd);
     let existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
     const existingItemIndex = existingWishlist.findIndex(
       (item: any) => item.id === itemToAdd.id,
     );
     if (existingItemIndex !== -1) {
       const currentCount = existingWishlist[existingItemIndex].count;
       if (product.stock && currentCount + 1 > product.stock) {
         toast.error(
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
       if (product.stock && itemToAdd.quantity > product.stock) {
         toast.error(
           `Only ${product.stock} items are in stock. You cannot add more to your wishlist.`,
         );
         return;
       }
       existingWishlist.push(itemToAdd);
     }
     localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
     toast.success('Product added to Wishlist successfully!');
     window.dispatchEvent(new Event('WishlistChanged'));
   };

  if (!card) {
    return <CardSkeleton skeletonHeight={skeletonHeight} />;
  }
  const imgIndex = card.productImages.slice(-1)[0];
  const stockhandler = () => {
    if (card?.reviews) {
      const { averageRating } = calculateRatingsPercentage(card?.reviews);
      setaverageRating(averageRating)
    }

    let sizesStock = card.sizes?.reduce((accum, value: any) => {
      if (value.stock) {
        return accum += Number(value.stock)
      }
      return 0;
    }, 0)
    let colorsStock = card.filter?.reduce((parentAccume: number, parentvalue: any) => {
      const countedStock = parentvalue.additionalInformation.reduce((accum: number, value: any) => {

        if (value.stock) {
          return accum + Number(value.stock);
        }
        return accum;
      }, 0);
      return parentAccume + countedStock;
    }, 0);

    const totalStock = sizesStock && sizesStock > 0 ? sizesStock : colorsStock && colorsStock > 0 ? colorsStock : card.stock;

    if (!(totalStock > 0)) {

      setIsOutStock(true)
    }
  }

  /* eslint-disable */

  useEffect(() => {

    stockhandler()

  }, [card])

  /* eslint-enable */



  return (
    <div
      className={`text-center product-card mb-2 flex flex-col ${slider ? '' : ' justify-between'} h-auto  p-1 rounded-[35px] w-full`}>
      <div className="relative w-full overflow-hidden rounded-t-[35px] group">
        
      <div
                    onClick={() => handleAddToWishlist(card)}
                    onMouseEnter={() => setIsHoverImage(true)}
                    onMouseLeave={() => setIsHoverImage(false)}
                    className="absolute z-50 top-4 right-4 md:-right-10 group-hover:right-4 md:opacity-0 group-hover:opacity-100 w-10 h-10 rounded-xl flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer  duration-300 transition-all"
                  >
                    <IoIosHeartEmpty size={20} />
                  </div>
        {slider ? (
          <Swiper
            className="mySwiper card-slider-home w-full"
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Pagination]}
          >
            <SwiperSlide className="w-full">
              {isLandscape ? (
                <div className="overflow-hidden bg-[#E3E4E6] rounded-[35px]">
                  <Link
                    href={ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory)}
                    className={`${cardImageHeight} flex justify-center items-center p-2`}
                  >
                    <Image
                      src={
                        cardStaticData?.posterImageUrl || card.posterImageUrl
                      }
                      alt={card.posterImageAltText || 'image'}
                      width={600}
                      height={600}
                      className={cn(
                        'object-contain rounded-[35px] w-full h-full',
                        className,
                      )}
                    />
                  </Link>
                </div>
              ) : (
                <div
                  className={`${cardImageHeight} bg-[#E3E4E6] flex justify-center overflow-hidden items-center rounded-[35px] ${portSpace ? portSpace : 'px-2'}`}
                >
                  <Link href={ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory)}
                    style={{
                      height: calculateHeight
                        ? calculateHeight
                        : 'calc(100% - 20px)',
                    }}>
                    <Image
                      src={
                        cardStaticData?.posterImageUrl || card.posterImageUrl
                      }
                      alt={card?.posterImageAltText || 'image'}
                      width={600}
                      height={600}
                      className={cn(
                        'object-contain rounded-[35px] w-full h-full',
                        className,
                      )}
                    />
                  </Link>
                </div>
              )}

              {card.discountPrice > 1 && (
                <p className="absolute top-1 -left-9 px-7 transform -rotate-45 bg-[#FF0000] text-white text-14 font-bold w-[120px] h-[40px] flex justify-center items-center">
                  {Math.round(
                    ((card.price - card.discountPrice) / card.price) * 100,
                  )}
                  %
                </p>
              )}
              <div className="space-y-3">
                <h3 className="text-sm md:text-[22px] h-9 text-gray-600 font-Helveticalight mt-2 group-hover:font-bold group-hover:text-black">
                  <Link
                    className="cursor-pointer"
                    href={ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory)}
                  >
                    {' '}
                    {card.displayName ? card.displayName : card.name}
                  </Link>
                </h3>
                <div>
                  {card.discountPrice > 0 ? (
                    <div className="flex gap-2 justify-center">
                      <p className="text-sm md:text-18 font-bold line-through font-Helveticalight">
                        AED {new Intl.NumberFormat().format(card.price)}
                      </p>
                      <p className="text-sm md:text-18 font-bold text-[#FF0000]">
                        AED {new Intl.NumberFormat().format(card.discountPrice)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm md:text-18 font-bold">
                      AED {new Intl.NumberFormat().format(card.price)}
                    </p>
                  )}
                </div>
                {averageRating > 0 && (
                  <div className="flex gap-1 items-center justify-center mt-1 h-5">
                    {renderStars({ star: averageRating })}
                  </div>
                )}
                {isModel ? null : isOutStock ? "Out of stock" : (
                  <div
                    className={`text-center flex flex-wrap md:flex-nowrap justify-center gap-1 md:space-y-0 ${slider ? 'w-fit mx-auto' : 'w-full'}`}
                    onClick={(e) => handleEventProbation(e)}
                  >
                    <button
                      className={` my-1 w-full h-8 text-primary border text-12 font-medium border-primary cardBtn-addToCart rounded-full flex items-center justify-center whitespace-nowrap gap-2 hover:bg-primary hover:text-white ${slider ? 'px-6' : 'px-2'}`}
                      onClick={(e) => handleAddToCard(e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14.481"
                        height="14.536"
                        viewBox="0 0 14.481 14.536"
                        className="fill-black"
                      >
                        <path
                          id="Path_424"
                          data-name="Path 424"
                          d="M11.8,1.49H.768c-.722,0-.683.292-.62,1.037L.558,7.76c.07.834.011.632.894.758L9.57,9.551,9.14,10.8H.4c-.118.442-.279,1.163-.4,1.656H1.453l.14-.5H8.578c1.6-.027,1.442.407,1.826-.978L13.159.959h1.322V0h-2.32c-.108.4-.257,1.082-.357,1.49ZM8.13,12.293a1.121,1.121,0,1,0,1.121,1.121A1.122,1.122,0,0,0,8.13,12.293Zm-4.625,0a1.121,1.121,0,1,0,1.121,1.121A1.122,1.122,0,0,0,3.5,12.293Zm7.333-7.2H9.052L9.7,2.385h1.884l-.218.811h-.007l-.522,1.9ZM8.766,2.386,8.118,5.095H6.4l.651-2.706,1.718,0Zm-2.653,0L5.463,5.095H3.817l.648-2.7,1.648,0Zm-2.583,0L2.882,5.1H1.235L1.053,2.924C1,2.319.9,2.4,1.482,2.4l2.048,0ZM1.293,5.783H2.717l-.47,1.959-.116-.015c-.718-.1-.671.062-.727-.616L1.293,5.783Zm1.86,2.083.5-2.083H5.3l-.552,2.3L3.152,7.866Zm2.5.339.583-2.424H7.954L7.319,8.433,5.65,8.206Zm2.574.351.664-2.774h1.761L9.825,8.776l-1.6-.219Z"
                          fillRule="evenodd"
                        />
                      </svg>
                      Add to Cart
                    </button>

                    <Dialog>
                      <DialogTrigger className="w-full">
                        <button
                          className={`my-1 w-full h-8 whitespace-nowrap text-12 font-medium text-secondary border border-primary cardBtn-quick-view bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary ${slider ? 'px-6' : 'px-2'}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17.41"
                            height="9.475"
                            viewBox="0 0 17.41 9.475"
                            className="fill-white"
                          >
                            <g
                              id="eye-svgrepo-com_1_"
                              data-name="eye-svgrepo-com (1)"
                              transform="translate(0 -100.736)"
                            >
                              <g
                                id="Group_1742"
                                data-name="Group 1742"
                                transform="translate(0 100.736)"
                              >
                                <path
                                  id="Path_428"
                                  data-name="Path 428"
                                  d="M8.705,110.211A10.685,10.685,0,0,1,2.612,108,15.425,15.425,0,0,1,.12,105.8a.492.492,0,0,1,0-.645,15.426,15.426,0,0,1,2.492-2.2,10.686,10.686,0,0,1,6.093-2.214A10.686,10.686,0,0,1,14.8,102.95a15.427,15.427,0,0,1,2.492,2.2.492.492,0,0,1,0,.645A15.428,15.428,0,0,1,14.8,108,10.685,10.685,0,0,1,8.705,110.211Zm-7.538-4.737A15.54,15.54,0,0,0,3.2,107.209a9.9,9.9,0,0,0,5.5,2.017,9.9,9.9,0,0,0,5.5-2.017,15.54,15.54,0,0,0,2.036-1.736,15.535,15.535,0,0,0-2.036-1.736,9.9,9.9,0,0,0-5.5-2.017,9.9,9.9,0,0,0-5.5,2.017A15.533,15.533,0,0,0,1.167,105.474Z"
                                  transform="translate(0 -100.736)"
                                />
                              </g>
                              <g
                                id="Group_1743"
                                data-name="Group 1743"
                                transform="translate(5.653 102.421)"
                              >
                                <path
                                  id="Path_429"
                                  data-name="Path 429"
                                  d="M146.572,149.626a3.052,3.052,0,1,1,2.011-5.349.492.492,0,0,1-.649.741,2.068,2.068,0,1,0,.706,1.556.492.492,0,1,1,.985,0A3.056,3.056,0,0,1,146.572,149.626Z"
                                  transform="translate(-143.52 -143.521)"
                                />
                              </g>
                              <g
                                id="Group_1744"
                                data-name="Group 1744"
                                transform="translate(7.72 104.489)"
                              >
                                <path
                                  id="Path_430"
                                  data-name="Path 430"
                                  d="M197,197.99a.985.985,0,1,1,.985-.985A.986.986,0,0,1,197,197.99Z"
                                  transform="translate(-196.02 -196.021)"
                                />
                              </g>
                            </g>
                          </svg>
                          Quick View
                        </button>
                      </DialogTrigger>
                      <DialogOverlay />
                      <DialogContent className="max-w-[1400px] w-11/12 bg-white px-0 sm:rounded-3xl border border-black shadow-none gap-0 pb-0">

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
                  </div>
                )}
              </div>
            </SwiperSlide>
          </Swiper>
        ) : (
          <>
            <div className="bg-[#E3E4E6] rounded-[35px]">
              {/* <span className='pb-10'>{card.subcategories?.map((item) => item.name)}</span> */}
              {card.discountPrice > 0 && (
                <p className="z-[1] absolute top-1 -left-9 px-7 transform -rotate-45 bg-[#FF0000] text-white text-14 font-bold w-[120px] h-[40px] flex justify-center items-center">
                  {Math.round(
                    ((card.price - card.discountPrice) / card.price) * 100,
                  )}
                  %
                </p>
              )}
              {isHomepage ? (
                <div
                  className={` ${cardImageHeight} flex justify-center items-center`}
                >
                  <Link
                    href={ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory)}
                    style={{
                      height: calculateHeight
                        ? calculateHeight
                        : 'calc(100% - 20px)',
                    }}
                  >
                    <Image
                      src={cardStaticData?.posterImageUrl || imgIndex.imageUrl}
                      alt={card.posterImageAltText || card.name}
                      width={600}
                      height={600}
                      className={
                        'rounded-[35px] h-full w-full px-4 xs:px-6 object-contain cursor-pointer'
                      }
                    />
                  </Link>
                </div>
              ) : (
                <div className="relative">
                 
                  <Link href={ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory)}>
                    <Image
                      src={isHoverImage ? card.hoverImageUrl : card.posterImageUrl}
                      alt={card.posterImageAltText || card.name}
                      // onClick={() => handleNavigation()}
                      width={600}
                      height={600}
                      className={cn(
                        'rounded-[35px] w-full min-h-[300px]',
                        className,
                        skeletonHeight,
                        cardImageHeight,
                        !isHomepage && !slider && 'border border-main'
                      )}
                      onMouseEnter={() => setIsHoverImage(true)}
                      onMouseLeave={() => setIsHoverImage(false)}
                    />
                  </Link>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <h3 className="text-sm md:text-[22px] h-9 text-gray-600 font-Helveticalight mt-2 group-hover:font-bold group-hover:text-black">
                <Link className="cursor-pointer" href={ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory)}>
                  {' '}
                  {card.displayName ? card.displayName : card.name}
                </Link>
              </h3>
              <div>
                {productDiscountPrice && productDiscountPrice > 0 ? (
                  <div className="flex gap-2 justify-center">
                    <p className="text-sm md:text-18 font-bold line-through font-Helveticalight">
                      AED {productPrice}
                    </p>
                    <p className="text-sm md:text-18 font-bold text-[#FF0000]">
                      AED {productDiscountPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm md:text-18 font-bold">
                    AED {productPrice}
                  </p>
                )}
                <p>{}</p>
              </div>
              {averageRating > 0 && (
                <div className="flex gap-1 items-center justify-center mt-1 h-5">
                  {renderStars({ star: averageRating })}
                </div>
              )}
              {isModel ? null : isOutStock ? <button className='text-red-500 font-bold uppercase w-full bg-main border cursor-default rounded-full h-8'>Out of Stock</button> : (
                <div
                  className={`text-center flex flex-wrap md:flex-nowrap justify-center gap-1 md:space-y-0 ${slider ? 'w-fit mx-auto' : 'w-full mb-4'}`}
                  onClick={(e) => handleEventProbation(e)}
                >
                  <button
                    className={` my-1 w-full h-8 text-primary border text-12 font-medium border-primary cardBtn-addToCart rounded-full flex items-center justify-center whitespace-nowrap gap-2 hover:bg-primary hover:text-white ${slider ? 'px-6' : 'px-2'}`}
                    onClick={(e) => handleAddToCard(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14.481"
                      height="14.536"
                      viewBox="0 0 14.481 14.536"
                      className="fill-black"
                    >
                      <path
                        id="Path_424"
                        data-name="Path 424"
                        d="M11.8,1.49H.768c-.722,0-.683.292-.62,1.037L.558,7.76c.07.834.011.632.894.758L9.57,9.551,9.14,10.8H.4c-.118.442-.279,1.163-.4,1.656H1.453l.14-.5H8.578c1.6-.027,1.442.407,1.826-.978L13.159.959h1.322V0h-2.32c-.108.4-.257,1.082-.357,1.49ZM8.13,12.293a1.121,1.121,0,1,0,1.121,1.121A1.122,1.122,0,0,0,8.13,12.293Zm-4.625,0a1.121,1.121,0,1,0,1.121,1.121A1.122,1.122,0,0,0,3.5,12.293Zm7.333-7.2H9.052L9.7,2.385h1.884l-.218.811h-.007l-.522,1.9ZM8.766,2.386,8.118,5.095H6.4l.651-2.706,1.718,0Zm-2.653,0L5.463,5.095H3.817l.648-2.7,1.648,0Zm-2.583,0L2.882,5.1H1.235L1.053,2.924C1,2.319.9,2.4,1.482,2.4l2.048,0ZM1.293,5.783H2.717l-.47,1.959-.116-.015c-.718-.1-.671.062-.727-.616L1.293,5.783Zm1.86,2.083.5-2.083H5.3l-.552,2.3L3.152,7.866Zm2.5.339.583-2.424H7.954L7.319,8.433,5.65,8.206Zm2.574.351.664-2.774h1.761L9.825,8.776l-1.6-.219Z"
                        fillRule="evenodd"
                      />
                    </svg>
                    Add to Cart
                  </button>

                  <Dialog>
                    <DialogTrigger className="w-full">
                      <button
                        className={`my-1 w-full h-8 whitespace-nowrap text-12 font-medium text-secondary border border-primary cardBtn-quick-view bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary ${slider ? 'px-6' : 'px-2'}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17.41"
                          height="9.475"
                          viewBox="0 0 17.41 9.475"
                          className="fill-white"
                        >
                          <g
                            id="eye-svgrepo-com_1_"
                            data-name="eye-svgrepo-com (1)"
                            transform="translate(0 -100.736)"
                          >
                            <g
                              id="Group_1742"
                              data-name="Group 1742"
                              transform="translate(0 100.736)"
                            >
                              <path
                                id="Path_428"
                                data-name="Path 428"
                                d="M8.705,110.211A10.685,10.685,0,0,1,2.612,108,15.425,15.425,0,0,1,.12,105.8a.492.492,0,0,1,0-.645,15.426,15.426,0,0,1,2.492-2.2,10.686,10.686,0,0,1,6.093-2.214A10.686,10.686,0,0,1,14.8,102.95a15.427,15.427,0,0,1,2.492,2.2.492.492,0,0,1,0,.645A15.428,15.428,0,0,1,14.8,108,10.685,10.685,0,0,1,8.705,110.211Zm-7.538-4.737A15.54,15.54,0,0,0,3.2,107.209a9.9,9.9,0,0,0,5.5,2.017,9.9,9.9,0,0,0,5.5-2.017,15.54,15.54,0,0,0,2.036-1.736,15.535,15.535,0,0,0-2.036-1.736,9.9,9.9,0,0,0-5.5-2.017,9.9,9.9,0,0,0-5.5,2.017A15.533,15.533,0,0,0,1.167,105.474Z"
                                transform="translate(0 -100.736)"
                              />
                            </g>
                            <g
                              id="Group_1743"
                              data-name="Group 1743"
                              transform="translate(5.653 102.421)"
                            >
                              <path
                                id="Path_429"
                                data-name="Path 429"
                                d="M146.572,149.626a3.052,3.052,0,1,1,2.011-5.349.492.492,0,0,1-.649.741,2.068,2.068,0,1,0,.706,1.556.492.492,0,1,1,.985,0A3.056,3.056,0,0,1,146.572,149.626Z"
                                transform="translate(-143.52 -143.521)"
                              />
                            </g>
                            <g
                              id="Group_1744"
                              data-name="Group 1744"
                              transform="translate(7.72 104.489)"
                            >
                              <path
                                id="Path_430"
                                data-name="Path 430"
                                d="M197,197.99a.985.985,0,1,1,.985-.985A.986.986,0,0,1,197,197.99Z"
                                transform="translate(-196.02 -196.021)"
                              />
                            </g>
                          </g>
                        </svg>
                        Quick View
                      </button>
                    </DialogTrigger>
                    <DialogOverlay />


                    <DialogContent className="max-w-[1400px] w-11/12 bg-white px-0 sm:rounded-3xl border border-black shadow-none gap-0 pb-0">

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
                </div>
              )}
            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default Card;
