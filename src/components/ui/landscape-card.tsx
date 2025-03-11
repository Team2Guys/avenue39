import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IProduct, IReview } from '@/types/types';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Skeleton } from '@/components/ui/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/config/fetch';
import {
  calculateRatingsPercentage,
  generateSlug,
  renderStars,
} from '@/config';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import ProductDetail from '../product-detail/product-detail';
import { CartItem } from '@/redux/slices/cart/types';
import { addItem } from '@/redux/slices/cart';
import { openDrawer } from '@/redux/slices/drawer';
import { IoIosHeartEmpty } from 'react-icons/io';
import { message } from 'antd';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { toast } from 'react-toastify';
interface CardProps {
  card: IProduct;
  isLoading?: boolean;
}

const LandscapeCard: React.FC<CardProps> = ({ card, isLoading }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const Navigate = useRouter();

  useEffect(() => {
    if (isLoading == false) {
      setLoading(false);
    }
  }, [isLoading]);

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
    localStorage.removeItem('buyNowProduct')
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
  const filteredReviews = reviews.filter(
    (review) => review.productId === productId,
  );
  const { averageRating } = calculateRatingsPercentage(filteredReviews);
  const handleNavigation = () => {
    Navigate.push(`/product/${generateSlug(card.name)}`);
  };

  return (
    <div
      className="rounded-2xl text-center relative product-card mx-2 group flex gap-4 items-center flex-col sm:flex-row cursor-pointer w-full"
      onClick={() => handleNavigation()}
    >
      <div className="relative w-fit mx-auto sm:w-5/12 md:w-4/12 lg:w-5/12 overflow-hidden rounded-xl">
        <div
          onClick={() => handleAddToWishlist(card)}
          className=" w-10 h-12 absolute right-2 top-2 rounded-xl  flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer"
        >
          <IoIosHeartEmpty size={25} />
        </div>
        {loading ? (
          <Skeleton className="rounded-t-lg mx-auto w-full h-[250px] sm:h-[300px] xl:h-[400px]" />
        ) : (
          <Image
            src={card.posterImageUrl}
            alt={card.posterImageAltText || card.name}
            width={320}
            height={200}
            className="object-contain rounded-xl mx-auto w-full h-[250px] sm:h-[300px] xl:h-[400px]"
          />
        )}
        {card.discountPrice > 0 && !loading && (
          <span className="absolute -top-1 -left-11 px-7 transform -rotate-45 bg-[#FF0000] text-white text-14 font-bold w-[120px] h-[40px] flex justify-center items-center">
            {Math.round(((card.price - card.discountPrice) / card.price) * 100)}
            %
          </span>
        )}
      </div>
      <div className="w-full sm:w-7/12 md:w-8/12 lg:w-7/12 text-center sm:text-start px-4 sm:px-0">
        {loading ? (
          <>
            <Skeleton className="h-6 w-3/4 mx-auto sm:mx-0 mt-2 rounded-md" />
            <Skeleton className="h-4 w-full mx-auto sm:mx-0 mt-2 rounded-md" />
            <Skeleton className="h-4 w-1/2 mx-auto sm:mx-0 mt-2 rounded-md" />
            <Skeleton className="h-8 w-1/4 mx-auto sm:mx-0 mt-2 rounded-md" />
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
            <p className="mt-2 font-normal text-sm max-h-10 text-ellipsis line-clamp-2">
              {card.description}
            </p>
            {card.discountPrice > 0 ? (
              <p className="text-md font-semibold mt-2">
                AED{card.discountPrice}
                <span className="line-through text-secondary-foreground ms-2">
                  AED{card.price}
                </span>
              </p>
            ) : (
              <p className="text-md font-semibold  pt-2">AED{card.price}</p>
            )}
          </>
        )}
        <div className="flex gap-1 mt-2 items-center justify-center sm:justify-start h-8">
          {averageRating > 1 && renderStars({ star: averageRating })}
        </div>
        <div
          className="text-center flex flex-none justify-center sm:justify-start gap-3"
          onClick={(e) => handleEventProbation(e)}
        >
          {loading ? (
            <>
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-8 w-32 rounded-full" />
            </>
          ) : (
            <>
              <button
                className="my-4 w-32 h-8 text-primary border border-primary rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
                onClick={(e) => handleAddToCard(e)}
              >
                <HiOutlineShoppingBag />
                <span className="text-10 font-medium">Add to Cart</span>
              </button>
              <Dialog>
                <DialogTrigger>
                  <button className="my-4 w-32 h-8 text-secondary border border-primary bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary">
                    <span className="text-10 font-medium">Quick View</span>
                  </button>
                </DialogTrigger>
                <DialogOverlay />
                <DialogContent className="max-w-[1400px] w-11/12 bg-white px-0 sm:rounded-3xl border border-black shadow-none gap-0 pb-0">
                  <VisuallyHidden>
                    <DialogTitle>Product detail</DialogTitle>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandscapeCard;
