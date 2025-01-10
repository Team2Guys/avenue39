import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { IProduct, IReview } from '@/types/types';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@redux/store';
import { addItem } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import { useRouter } from 'next/navigation';
import ProductDetail from '../product-detail/product-detail';
import { cn } from '@/lib/utils';
import {
  calculateRatingsPercentage,
  generateSlug,
  renderStars,
} from '@/config';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/config/fetch';
import CardSkeleton from '../cardSkelton';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Skeleton } from '../ui/skeleton';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
interface CardProps {
  card?: IProduct;
  isModel?: boolean;
  className?: string;
  skeletonHeight?: string;
  isLoading?: boolean;
  category?: boolean;
  cardImageHeight?: string;
  slider?: boolean;
}

const Card: React.FC<CardProps> = ({
  card,
  isModel,
  className,
  skeletonHeight,
  isLoading,
  cardImageHeight,
  slider
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<Dispatch>();
  const Navigate = useRouter();
  useEffect(() => {
    if (isLoading == false) {
      setLoading(false);
    }
  }, [isLoading]);

  const handleEventProbation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  //@ts-ignore
  const itemToAdd: CartItem = {
    ...card,
    quantity: 1,
  };
  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };

  const {
    data: reviews = [],
  } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });
  const productId = card?.id;
  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];

  const { averageRating } = calculateRatingsPercentage(filteredReviews);
  const handleNavigation = () => {
    Navigate.push(`/product/${generateSlug(card?.name || '')}`);
  };

  if (!card) {
    return <CardSkeleton skeletonHeight={skeletonHeight} />;
  }
  return (
    <div className={`text-center relative product-card  hover:cursor-pointer mb-2  ${slider ? '':'flex flex-col justify-between'} h-full  p-1 rounded-[35px]`}>
      <div className="relative w-full overflow-hidden rounded-[35px]">
        {loading ? (
          <CardSkeleton skeletonHeight={skeletonHeight} />
        ) : (
          <>
          {
            slider ? (
              <Swiper className="mySwiper overflow-hidden w-full" pagination={true} modules={[Pagination]}>
              {card.productImages.map((array, index) => (
                <SwiperSlide key={index} className='w-full'>
                  <Image
                    src={array.imageUrl}
                    alt={array.altText || 'image'}
                    onClick={() => handleNavigation()}
                    width={600}
                    height={600}
                    className={cn(
                      'object-cover rounded-[35px] w-full',
                      className,
                      skeletonHeight,
                      cardImageHeight,
                    )}
                  />
                  {card.discountPrice > 1 && (
                    <span className="absolute top-[3px] -right-[29px] px-7 bg-[#FF0000] text-white font-bold rounded-t-full rounded-tl-full rounded-br-lg rotate-45 w-[105px] h-[40px] flex justify-center items-center">
                      {Math.round(
                        ((card.price - card.discountPrice) / card.price) * 100,
                      )}
                      %
                    </span>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            ):
            (
                <>
                {card.discountPrice > 0 && (
                  <span className="absolute top-[2px] -right-[30px] px-7 bg-[#FF0000] text-white font-bold rotate-45 w-[105px] h-[40px] flex justify-center items-center">
                     {(Math.round(((card.price - card.discountPrice) / card.price) * 100))}%
                  </span>
                )}
                <Image
                  src={card.posterImageUrl}
                  alt={card.posterImageAltText || card.name}
                  onClick={() => handleNavigation()}
                  width={600}
                  height={600}
                  className={cn(
                    'object-cover rounded-[35px] w-full',
                    className,
                    skeletonHeight,
                    cardImageHeight,
                  )}
                />
                </>
            )
          }
          </>
        )}
              {loading ? (
        <>
          <Skeleton className="h-5 w-52 mx-auto mt-3" />
          <Skeleton className="h-3 w-40 mx-auto mt-2" />
          <div className="flex gap-1 items-center justify-center h-4 mt-2">
            {Array.from({ length: 5  }).map((_, index) => (
              <Skeleton key={index} className="h-3 w-3 rounded-full" />
            ))}
          </div>
        </>
      ) : (
        <div className='space-y-3' onClick={() => handleNavigation()}>
          <h3 className="text-sm md:text-[22px] text-gray-600 font-Helveticalight mt-2">{card.name}</h3>
         <div>
         {card.discountPrice > 0 ? (
             <div className="flex gap-2 justify-center">
             <p className="text-sm md:text-18 font-bold line-through font-Helveticalight">
               AED<span>{card.price}</span>
             </p>
             <p className="text-sm md:text-18 font-bold text-[#FF0000]">
               AED<span>{card.discountPrice}</span>
             </p>
           </div>
          ) : (
            <span className="text-sm md:text-18 font-bold ">
              AED {card.price}
            </span>
          )}
         </div>
          {
            averageRating > 0 &&
            <div className="flex gap-1 items-center justify-center mt-1 h-5">
            {renderStars({ star: averageRating })}
          </div>
          }
          
        </div>
      )}
      </div>

      {loading ? (
        <div className="flex gap-2 justify-center mt-2">
          <Skeleton className="w-32 h-8 rounded-full" />
          <Skeleton className="w-32 h-8 rounded-full" />
        </div>
      ) : isModel ? null : (
        <div
          className={`text-center flex flex-wrap md:flex-nowrap justify-center gap-1 md:space-y-0 mb-4 ${slider ?"w-fit mx-auto pt-3":"w-full"}`}
          onClick={(e) => handleEventProbation(e)}
        >
          <button
            className={` my-1 w-full h-8 text-primary border border-primary group rounded-full flex items-center justify-center whitespace-nowrap gap-2 hover:bg-primary hover:text-white ${slider ? "px-6":"px-2"}`}
            onClick={(e) => handleAddToCard(e)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14.481" height="14.536" viewBox="0 0 14.481 14.536" className='group-hover:fill-white'>
              <path id="Path_424" data-name="Path 424" d="M11.8,1.49H.768c-.722,0-.683.292-.62,1.037L.558,7.76c.07.834.011.632.894.758L9.57,9.551,9.14,10.8H.4c-.118.442-.279,1.163-.4,1.656H1.453l.14-.5H8.578c1.6-.027,1.442.407,1.826-.978L13.159.959h1.322V0h-2.32c-.108.4-.257,1.082-.357,1.49ZM8.13,12.293a1.121,1.121,0,1,0,1.121,1.121A1.122,1.122,0,0,0,8.13,12.293Zm-4.625,0a1.121,1.121,0,1,0,1.121,1.121A1.122,1.122,0,0,0,3.5,12.293Zm7.333-7.2H9.052L9.7,2.385h1.884l-.218.811h-.007l-.522,1.9ZM8.766,2.386,8.118,5.095H6.4l.651-2.706,1.718,0Zm-2.653,0L5.463,5.095H3.817l.648-2.7,1.648,0Zm-2.583,0L2.882,5.1H1.235L1.053,2.924C1,2.319.9,2.4,1.482,2.4l2.048,0ZM1.293,5.783H2.717l-.47,1.959-.116-.015c-.718-.1-.671.062-.727-.616L1.293,5.783Zm1.86,2.083.5-2.083H5.3l-.552,2.3L3.152,7.866Zm2.5.339.583-2.424H7.954L7.319,8.433,5.65,8.206Zm2.574.351.664-2.774h1.761L9.825,8.776l-1.6-.219Z" fill-rule="evenodd"/>
            </svg>
            <span className="text-12 font-medium">Add to Cart</span>
          </button>

          <Dialog>
            <DialogTrigger className='w-full'>
            <button
            className={`my-1 w-full h-8 whitespace-nowrap text-secondary border border-primary group bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary ${slider ? "px-6":"px-2"}`} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17.41" height="9.475" viewBox="0 0 17.41 9.475" className='fill-white group-hover:fill-black group-hover:text-black'>
              <g id="eye-svgrepo-com_1_" data-name="eye-svgrepo-com (1)" transform="translate(0 -100.736)">
                <g id="Group_1742" data-name="Group 1742" transform="translate(0 100.736)">
                  <path id="Path_428" data-name="Path 428" d="M8.705,110.211A10.685,10.685,0,0,1,2.612,108,15.425,15.425,0,0,1,.12,105.8a.492.492,0,0,1,0-.645,15.426,15.426,0,0,1,2.492-2.2,10.686,10.686,0,0,1,6.093-2.214A10.686,10.686,0,0,1,14.8,102.95a15.427,15.427,0,0,1,2.492,2.2.492.492,0,0,1,0,.645A15.428,15.428,0,0,1,14.8,108,10.685,10.685,0,0,1,8.705,110.211Zm-7.538-4.737A15.54,15.54,0,0,0,3.2,107.209a9.9,9.9,0,0,0,5.5,2.017,9.9,9.9,0,0,0,5.5-2.017,15.54,15.54,0,0,0,2.036-1.736,15.535,15.535,0,0,0-2.036-1.736,9.9,9.9,0,0,0-5.5-2.017,9.9,9.9,0,0,0-5.5,2.017A15.533,15.533,0,0,0,1.167,105.474Z" transform="translate(0 -100.736)" />
                </g>
                <g id="Group_1743" data-name="Group 1743" transform="translate(5.653 102.421)">
                  <path id="Path_429" data-name="Path 429" d="M146.572,149.626a3.052,3.052,0,1,1,2.011-5.349.492.492,0,0,1-.649.741,2.068,2.068,0,1,0,.706,1.556.492.492,0,1,1,.985,0A3.056,3.056,0,0,1,146.572,149.626Z" transform="translate(-143.52 -143.521)" />
                </g>
                <g id="Group_1744" data-name="Group 1744" transform="translate(7.72 104.489)">
                  <path id="Path_430" data-name="Path 430" d="M197,197.99a.985.985,0,1,1,.985-.985A.986.986,0,0,1,197,197.99Z" transform="translate(-196.02 -196.021)" />
                </g>
              </g>
            </svg>
            <span className="text-12 font-medium">Quick View</span>
          </button>
           
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
        </div>
      )}
    </div>
  );
};

export default Card;
