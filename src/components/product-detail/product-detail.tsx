'use client';
import React, { useEffect, useState } from 'react';
import Thumbnail from '../carousel/thumbnail';
import { CiShoppingCart } from 'react-icons/ci';
import { IProduct, IReview, ProductImage, Sizes } from '@/types/types';
import { NormalText, ProductPrice } from '@/styles/typo';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import Image from 'next/image';
import tabbyLogo from '@icons/tabby-logo-charcoal.png';
import tamaraLogo from '@icons/EN0-full-logo-black.png';
import {
  tabbyfeature,
  tabbyhowitwork,
  tabbypayicon,
  tamarafeature,
  tamaralist,
  tamarawhy,
} from '@/data';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/redux/slices/cart';
import { Dispatch } from 'redux';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { CartSize } from '@/redux/slices/cart/types';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/config/fetch';
import {
  calculateRatingsPercentage,
  generateSlug,
  getProductStock,
  renderStars,
} from '@/config';
import { paymentIcons } from '@/data/products';
import { ProductDetailSkeleton } from './skelton';
import { State } from '@/redux/store';
import Icontime from '../../../public/assets/icons/Group2038.svg';
import Icondelivery from '../../../public/assets/icons/Group2037.svg';
import { toast } from 'react-toastify';
import { openDrawer } from '@/redux/slices/drawer';

const ProductDetail = ({
  params,
  isZoom,
  gap,
  swiperGap,
  detailsWidth,
  products,
  filterParam,
  sizeParam,
  uniqueSizes,
  onclickDesc
}: {
  params: IProduct;
  isZoom?: Boolean;
  gap?: String;
  swiperGap?: String;
  detailsWidth?: String;
  products?: IProduct[];
  filterParam?: string;
  sizeParam?: string;
  uniqueSizes?: any;
  onclickDesc?: any
}) => {
  const truncateText = (text: any, limit: any) => {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  };

  const [count, setCount] = useState(1);
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State | any) => state.cart.items);
  const slug = String(params?.name);
  const [timeLeft, setTimeLeft] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });
  const [selectedSize, setSelectedSize] = useState<number | null>(0);
  const [size, setSize] = useState<CartSize | null | undefined>(null);
  const [filter, setFilter] = useState<CartSize | null | undefined>(null);
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscPrice, setProductDiscPrice] = useState(0);
  const [productImage, setProductImage] = useState<ProductImage[]>([]);
  const [customImages, setCustomImages] = useState<any>([]);
  const [isOutStock, setIsOutStock] = useState<boolean>(false);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [availableFilters, setAvailableFilters] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [slugParams, setSlugParams] = useState<{
    filter?: string;
    size?: string;
  }>({ filter: filterParam, size: sizeParam });
  const Navigate = useRouter();
  const product = params
    ? params
    : products?.find(
      (product) => (product.custom_url || product?.name) === slug,
    );
    console.log(product,'product availableFilters', availableFilters ,size)

  const handleColorClick = (index: any, item: CartSize) => {
    setFilter(item);
    const filterName = generateSlug(item.name);

    const sizeName = !slugParams.size ? generateSlug(size?.name || "") : slugParams.size;
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('filter', filterName);
    sizeName && currentUrl.searchParams.set('size', sizeName);
    Navigate.push(currentUrl.pathname + currentUrl.search);
    setSlugParams(() => ({
      filter: filterName,
      size: sizeName,
    }));
  };

  const handleSizeClick = (index: any, size: CartSize) => {
    const filteredImages = product?.productImages.find(
      (img) => img.size === size.name,
    );
    const findFilter = product?.filter?.[0].additionalInformation.find(
      (item) => item.name === filteredImages?.color,
    );
    setFilter(findFilter);
    setSelectedSize(index);
    setSize(size);
    const filterName = generateSlug(findFilter?.name || '');
    const sizeName = generateSlug(size.name);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('filter', filterName);
    currentUrl.searchParams.set('size', sizeName);
    Navigate.push(currentUrl.pathname + currentUrl.search);
    setSlugParams(() => ({
      filter: filterName,
      size: sizeName,
    }));
  };

  useEffect(() => {
    if (!product || !uniqueSizes) return;
    const posterImage = {
      imageUrl: product?.posterImageUrl || '',
      public_id: product?.posterImagePublicId,
      altText: product?.name || 'Default Name',
      imageIndex: 0,
      size: '',
      color: '',
    };
    const hoverImage = {
      imageUrl: product?.hoverImageUrl || '',
      public_id: product?.hoverImagePublicId,
      altText: product?.name || 'Default Name',
      imageIndex: 0,
      size: '',
      color: '',
    };

    const customProductImage = [posterImage, hoverImage, ...(product?.productImages || [])];
    setCustomImages(customProductImage);

    if (slugParams.filter && slugParams.size) {
      const sizeIndex = uniqueSizes?.findIndex(
        (item: Sizes) => generateSlug(item.name) === slugParams.size,
      );
      const selectedSize: any =
        sizeIndex !== -1 ? uniqueSizes[sizeIndex] : uniqueSizes[0];
      setSize(selectedSize);
      const additionalInfo = product?.filter?.[0]?.additionalInformation || [];
      const findFilter = additionalInfo.find(
        (item) => generateSlug(item.name) === slugParams.filter,
      );
      setFilter(findFilter);
      const filteredImages = product?.productImages.filter(
        (img) => img.size === selectedSize?.name,
      );
      const uniqueColors = [
        ...new Set(filteredImages?.map((img) => img.color)),
      ];
      const filters = uniqueColors.map((item) => {
        return additionalInfo?.find((filterItem) => filterItem.name === item);
      });
      setAvailableFilters(filters);
      const variationImages = filteredImages.filter(
        (img) => img.color === findFilter?.name,
      );
      setProductImage(variationImages);
      if (sizeIndex) {
        setSelectedSize(sizeIndex !== -1 ? sizeIndex : 0);
      }
      const filterPrice = filter?.price || 0;
      const sizePrice = size?.price || 0;
      const finalPrice = Number(filterPrice) > 0 ? filterPrice : sizePrice;
      setProductPrice(Number(finalPrice));

      const filterDiscPrice = filter?.discountPrice || 0;
      const sizeDiscPrice = size?.discountPrice || 0;
      const finalDiscPrice =
        Number(filterDiscPrice) > 0 ? filterDiscPrice : sizeDiscPrice;
      setProductDiscPrice(Number(finalDiscPrice));
    } else if (slugParams.filter && !slugParams.size) {

      const additionalInfo = product?.filter?.[0]?.additionalInformation || [];
      setAvailableFilters(additionalInfo);
      const index = additionalInfo.findIndex((item) => generateSlug(item.name) === slugParams.filter);
      setSelectedSize(index)
      const firstColor = index !== -1 ? additionalInfo[index] : additionalInfo[0];
      setFilter(firstColor);
      const variationImages = product.productImages.filter((img) => img.color === firstColor?.name)
      setProductImage(variationImages);
      const filterPrice = filter?.price || 0;
      setProductPrice(Number(filterPrice));
      const filterDiscPrice = filter?.discountPrice || 0;
      setProductDiscPrice(Number(filterDiscPrice));
    } else {
      if (filter === null) {
        setFilter(
          product?.filter
            ? product?.filter?.[0]?.additionalInformation[0]
            : null,
        );
      }
      const additionalInfo = product?.filter
        ? product?.filter?.[0]?.additionalInformation
        : [];
      if (
        additionalInfo &&
        additionalInfo.length > 0 &&
        uniqueSizes.length > 0
      ) {
        const activeSize =
          selectedSize !== null ? uniqueSizes[selectedSize] : null;
        setSize(activeSize);
        setSelectedSize(selectedSize);
        const filteredImages = product?.productImages.filter(
          (img) => img.size === activeSize.name,
        );
        const uniqueColors = [
          ...new Set(filteredImages?.map((img) => img.color)),
        ];
        const filters = uniqueColors.map((item) => {
          return additionalInfo?.find((filterItem) => filterItem.name === item);
        });
        setAvailableFilters(filters);
        const variationImages = filteredImages.filter(
          (img) => img.color === filter?.name,
        );
        setProductImage(variationImages);

        const filterPrice = filter?.price || 0;
        const sizePrice = size?.price || 0;
        const finalPrice = Number(filterPrice) > 0 ? filterPrice : sizePrice;
        setProductPrice(Number(finalPrice));

        const filterDiscPrice = filter?.discountPrice || 0;
        const sizeDiscPrice = size?.discountPrice || 0;
        const finalDiscPrice =
          Number(filterDiscPrice) > 0 ? filterDiscPrice : sizeDiscPrice;
        setProductDiscPrice(Number(finalDiscPrice));
      } else if (
        additionalInfo &&
        additionalInfo.length > 0 &&
        uniqueSizes.length === 0
      ) {
        const uniqueColors = [
          ...new Set(product?.productImages?.map((img) => img.color)),
        ];
        const filters = uniqueColors.map((item) => {
          return additionalInfo?.find((filterItem) => filterItem.name === item);
        });
        setAvailableFilters(filters);
        const variationImages = product?.productImages.filter(
          (img) => img.color === filter?.name,
        );
        setProductImage(variationImages);

        const filterPrice = filter?.price || 0;
        setProductPrice(Number(filterPrice));
        const filterDiscPrice = filter?.discountPrice || 0;
        setProductDiscPrice(Number(filterDiscPrice));
      } else {
        setAvailableFilters([]);
        setProductImage([]);
      }
    }
  }, [product, size, filter, uniqueSizes]);

  function formatPrice(price: any) {
    if (!price) return 0;
    return price > 1000 ? price.toLocaleString('en-US') : price;
  }



  useEffect(() => {
    if (product) {
      const targetDate = product.sale_counter
        ? new Date(product.sale_counter)
        : new Date();

      const updateCountdown = () => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
          setTimeLeft({ day: 0, hour: 0, min: 0, sec: 0 });
          clearInterval(timerId);
          return;
        }

        const day = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hour = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const min = Math.floor((difference / (1000 * 60)) % 60);
        const sec = Math.floor((difference / 1000) % 60);

        setTimeLeft({ day, hour, min, sec });
      };
      const timerId = setInterval(updateCountdown, 1000);
      updateCountdown();

      return () => clearInterval(timerId);
    }
  }, [product]);

  const { data: reviews = [] } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });
  const productId = product?.id;

  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];

  const { averageRating, productReviews } =
    calculateRatingsPercentage(filteredReviews);
  const itemToAdd: any = {
    ...product,
    quantity: count,
    selectedSize: size,
    selectedfilter: filter,
  };

  useEffect(() => {
    if (!itemToAdd) return;
    const findStock = getProductStock({ product: itemToAdd });
    setIsOutStock(findStock > 0 ? false : true);
    setTotalStock(findStock);
  }, [size, filter]);

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  const onDecrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  const onIncrement = () => {
    if (count < totalStock) {
      setCount((prevCount) => prevCount + 1);
    } else {
      toast.error(`Only ${totalStock} items in stock!`);
    }
  };



  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const existingCartItem = cartItems.find(
      (item: any) =>
        item.id === product?.id &&
        item.selectedSize?.name === itemToAdd.selectedSize?.name &&
        item.selectedfilter?.name === itemToAdd.selectedfilter?.name,
    );
    console.log(existingCartItem, 'cartItems');
    if (!existingCartItem) {
      dispatch(addItem(itemToAdd));
      dispatch(openDrawer());
      return;
    }

    const currentQuantity = existingCartItem?.quantity || 0;
    const newQuantity = currentQuantity + count;
    if (newQuantity > totalStock) {
      toast.error(
        `Only ${totalStock} items are in stock. You cannot add more than that.`,
      );
      return;
    }
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };

  // const handleBuyNow = (e: React.MouseEvent<HTMLElement>) => {
  //   e.stopPropagation();
  //   const existingCartItem = cartItems.find(
  //     (item: any) =>
  //       item.id === product?.id &&
  //       item.selectedSize?.name === itemToAdd.selectedSize?.name &&
  //       item.selectedfilter?.name === itemToAdd.selectedfilter?.name,
  //   );
  //   console.log(existingCartItem, 'cartItems');
  //   if (!existingCartItem) {
  //     dispatch(addItem(itemToAdd));
  //     dispatch(openDrawer());
  //     Navigate.push('/checkout');
  //     return;
  //   }

  //   const currentQuantity = existingCartItem?.quantity || 0;
  //   const newQuantity = currentQuantity + count;
  //   if (newQuantity > totalStock) {
  //     toast.error(
  //       `Only ${totalStock} items are in stock. You cannot add more than that.`,
  //     );
  //     return;
  //   }
  //   dispatch(addItem(itemToAdd));
  //   Navigate.push('/checkout');
  // };

  const handleBuyNow = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    let existingProduct = JSON.parse(localStorage.getItem('buyNowProduct') || 'null');

    if (existingProduct) {
      localStorage.setItem('buyNowProduct', JSON.stringify(itemToAdd));
    } else {
      localStorage.setItem('buyNowProduct', JSON.stringify(itemToAdd));
    }
    Navigate.push('/checkout');
  };


  const handleAddToWishlist = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // console.log("Wishlist:", itemToAdd);
    let existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!Array.isArray(existingWishlist)) {
      existingWishlist = [];
    }

    const existingWishlistItem = existingWishlist.find(
      (item: any) =>
        item.id === itemToAdd.id &&
        item.selectedSize?.name === itemToAdd.selectedSize?.name &&
        item.selectedfilter?.name === itemToAdd.selectedfilter?.name,
    );

    if (!existingWishlistItem) {
      existingWishlist.push(itemToAdd);
      localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
      // console.log('Added to wishlist:', itemToAdd);
      window.dispatchEvent(new Event('WishlistChanged'));
      toast.success('Product added to Wishlist successfully!');
    } else {
      const variationQuantity =
        itemToAdd.selectedSize?.stock ||
        itemToAdd.selectedfilter?.stock ||
        itemToAdd.stock;
      const addedQuantity = existingWishlistItem.quantity + count;
      console.log(
        'Item already exists in wishlist:',
        variationQuantity,
        addedQuantity,
        size,
        itemToAdd.selectedSize,
        existingWishlistItem,
      );
      if (addedQuantity > totalStock) {
        toast.error(
          `Only ${totalStock} items are in stock. You cannot add more than that.`,
        );
        return;
      }
      existingWishlist = existingWishlist.map((item: any) =>
        item.id === existingWishlistItem.id &&
          item.selectedSize?.name === existingWishlistItem.selectedSize?.name &&
          item.selectedfilter?.name === existingWishlistItem.selectedfilter?.name
          ? { ...item, quantity: item.quantity + (count || 1) }
          : item,
      );

      localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
      window.dispatchEvent(new Event('WishlistChanged'));
      // console.log('Item already exists in wishlist:', variationQuantity, addedQuantity ,count );
      toast.success('Product quantity updated in Wishlist.');
    }
  };

  const paymentLabels = ['Today', 'In 1 month', 'In 2 months', 'In 3 months'];

  const installmentAmount =
    productPrice > 0 || productDiscPrice > 0
      ? productDiscPrice > 0
        ? productDiscPrice / 4
        : productPrice / 4
      : (product?.discountPrice ? product?.discountPrice : product?.price) / 4;

  return (
    <div
      className={`flex flex-col md:flex-row w-full justify-between font-helvetica ${gap} mb-6 relative`}
    >
      <div className="flex-grow  md:w-1/2 lg:w-7/12 2xl:w-[55%] w-full no-select">
        <Thumbnail
          thumbs={productImage.length > 0 ? productImage : customImages}
          isZoom={isZoom}
          swiperGap={swiperGap}
          isLoading={false}
          activeIndex={0}
        />
      </div>
      <div className="hidden 2xl:block 2xl:w-[1%]"></div>
      <div className={`${detailsWidth} flex flex-col gap-2 2xl:w-[39%] pt-8`}>
        <div className="flex gap-2">
          {!isOutStock ? (
            <div className="bg-[#56B400] p-2 rounded-sm text-white text-xs font-helvetica">
              IN STOCK { }
            </div>
          ) : (
            <div className="bg-[#EE1C25] p-2 rounded-sm text-white text-xs font-helvetica">
              OUT OF STOCK
            </div>
          )}

          {productDiscPrice > 0 ? (
            <div className="bg-[#EE1C25] p-2 rounded-sm text-white text-xs font-helvetica">
              {Math.round(
                ((productPrice - productDiscPrice) / productPrice) * 100,
              )}
              % OFF
            </div>
          ) : (
            product.discountPrice > 0 && (
              <div className="bg-[#EE1C25] p-2 rounded-sm text-white text-xs font-helvetica">
                {Math.round(
                  ((product.price - product.discountPrice) / product.price) *
                  100,
                )}
                % OFF
              </div>
            )
          )}
          {product.createdAt &&
            (() => {
              const productDate = new Date(product.createdAt);
              const twoWeeksAgo = new Date();
              twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

              return productDate >= twoWeeksAgo ? (
                <div className="bg-[#00AEEF] uppercase p-2 rounded-sm text-white text-xs font-helvetica">
                  New
                </div>
              ) : null;
            })()}
        </div>
        <h1 className="font-helvetica text-bold text-[26px] text-primary">
          {product?.name}
        </h1>
        {averageRating > 1 && (
          <>
            <div className="flex gap-2 items-center font-helvetica">
              <span className="flex items-center">
                {renderStars({ star: averageRating })}
              </span>
              <span className="text-[#999999] text-11 font-medium text-nowrap">
                {productReviews.length} reviews
              </span>
            </div>
          </>
        )}

        {product?.discountPrice > 0 || productDiscPrice > 0 ? (
          <ProductPrice className="flex items-center gap-2">
            <NormalText className="font-normal text-base text-slate-400 line-through">
              AED{' '}
              {productPrice > 0
                ? formatPrice(productPrice)
                : `${formatPrice(product?.price)}`}
            </NormalText>
            AED{' '}
            {productDiscPrice > 0
              ? productDiscPrice > 1000
                ? productDiscPrice.toLocaleString()
                : formatPrice(productDiscPrice)
              : product?.discountPrice > 1000
                ? product?.discountPrice.toLocaleString()
                : product?.discountPrice}
          </ProductPrice>
        ) : (
          <ProductPrice className="flex items-center gap-2">
            AED{' '}
            {productPrice > 0
              ? formatPrice(productPrice)
              : formatPrice(product?.price)}
          </ProductPrice>
        )}

        <p className="text-lightdark text-14 tracking-wide leading-6 font-helvetica">
          {isZoom ? <>{truncateText(product?.description, 120)}<span className='underline font-medium cursor-pointer text-nowrap' onClick={onclickDesc}>View More</span></> :
            <>{isExpanded ? (
              <>
                {product.description}
                <span
                  className="underline font-medium cursor-pointer text-nowrap"
                  onClick={() => setIsExpanded(false)}
                >
                  View Less
                </span>
              </>
            ) : (
              <>
                {truncateText(product.description, 120)}
                <span
                  className="underline font-medium cursor-pointer text-nowrap"
                  onClick={() => setIsExpanded(true)}
                >
                  View More
                </span>
              </>
            )}</>}
        </p>

        <div>
          {uniqueSizes && uniqueSizes.length > 0 && (
            <div className="py-1">
              <h2 className="font-semibold text-[16px] font-sans capitalize">
                Size:
              </h2>
              <div className="flex space-x-4 mt-1">
                {uniqueSizes.map(
                  (size: { name: string; price: string }, index: number) => {
                    const [sizeName, sizeType] = size.name.split(' ');
                    return (
                      <div
                        key={index}
                        onClick={() => handleSizeClick(index, size)}
                        className={`cursor-pointer border rounded-lg bg-[#F5F5F5] p-4 flex flex-col items-center justify-center h-[60px] w-[60px] transition ${selectedSize === index ? 'border-black shadow-md' : 'hover:shadow-lg'}`}
                      >
                        <span className="block text-[#666666] text-[14px] uppercase font-sans">
                          {sizeName}
                        </span>
                        {sizeType && (
                          <span className="block text-[10px] uppercase font-sans">
                            {sizeType}
                          </span>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {product?.filter &&
            product?.filter.length > 0 &&
            product?.filter[0]?.additionalInformation && (
              <div className="py-2">
                <h2 className="font-semibold text-[16px] font-sans Capitalize">
                  {product?.filter[0]?.heading}{' '}
                  <span className="capitalize">{filter?.name}</span>
                </h2>
                <div className="flex space-x-4 mt-2">
                  {availableFilters.map((item, index: number) => {
                    const image = product.productImages.find(
                      (img) => img?.color === item?.name && (
                        img.size === (size?.name || '') ||
                        img.size === undefined
                      )                      
                    );
                    if (!image) return null;
                    return (
                      <div
                        key={index}
                        onClick={() => handleColorClick(index, item)}
                        className={`cursor-pointer border rounded-lg p-1 flex items-center justify-center transition ${filter?.name === image.color ? 'border-black font-bold shadow-md' : 'hover:shadow-lg'}`}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={image.altText || 'product image'}
                          height={50}
                          width={50}
                          className="h-[50px] w-[50px] object-cover rounded"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </div>

        {product.sale_counter &&
          Object.values(timeLeft).some((value) => value > 0) && (
            <>
              <NormalText className="font-helvetica">
                Hurry Up! Sale ends in:
              </NormalText>
              <div className="flex gap-2 mb-3 mt-2">
                {Object.entries(timeLeft).map(([label, value], index) => (
                  <div
                    key={index}
                    className="bg-[#F5F5F5] p-2 rounded-md w-14 text-center font-normal text-14 text-lightdark flex flex-col"
                  >
                    <span>{value}</span>
                    <span className="text-10">{label?.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        {
          <>
            <div className="flex items-center gap-4 justify-between mb-2">
              <div className="flex items-center border border-gray-300 rounded py-1 md:p-2 md:py-3">
                <button
                  onClick={onDecrement}
                  className="px-2 text-gray-600  "
                  disabled={count <= 1}
                >
                  <HiMinusSm size={20} />
                </button>
                <span className="mx-2">{count}</span>
                <button
                  onClick={onIncrement}
                  className="px-2 text-gray-600 disabled:text-gray-300"
                >
                  <HiPlusSm size={20} />
                </button>
              </div>
            </div>
            {isOutStock ? null : (
              <Button
                className="bg-primary text-white font-helvetica flex gap-3 justify-center items-center w-full h-12 rounded-2xl mb-3 font-light "
                onClick={(e: any) => handleBuyNow(e)}
              >
                <CiShoppingCart size={20} /> BUY IT NOW
              </Button>
            )}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-5 xs:gap-2 mb-4 w-full">
              <Button
                variant={'main'}
                className="font-helvetica w-full h-12 rounded-2xl flex gap-3 uppercase"
                onClick={(e: any) =>
                  isOutStock ? () => { } : handleAddToCard(e)
                }
                disable={isOutStock}
              >
                {isOutStock ? 'Out of Stock' : 'Add to cart'}
              </Button>
              <Button
                variant="outline"
                className="font-helvetica w-full h-12 rounded-2xl flex gap-3 uppercase"
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  handleAddToWishlist(e)
                }
              >
                Add to Wishlist
              </Button>
            </div>
          </>
        }

        <div className="flex items-center justify-center relative mb-2">
          <span className="absolute left-0 w-1/6 border-t border-gray-300"></span>
          <p className="text-center px-3 w-4/6 font-helvetica whitespace-nowrap font-semibold text-sm xs:text-base lg:text-xs xl:text-base">
            Guaranteed Safe Checkout
          </p>
          <span className="absolute right-0 w-1/6 border-t border-gray-300"></span>
        </div>

        <div className="flex gap-2 mb-2 ">
          <div className="relative w-1/2 border-4 border-[#00FFBC] p-2 py-4 rounded-lg shadow">
            <span className="font-helvetica absolute -top-3 left-2 bg-[#00FFBC] text-primary px-2 py-1 rounded-lg text-xs font-extrabold">
              tabby
            </span>
            <p className="text-12 font-helvetica">
              Pay 4 interest-free payments of AED { }
              {productPrice > 0 || productDiscPrice > 0
                ? productDiscPrice > 0
                  ? productDiscPrice / 4
                  : productPrice / 4
                : (
                  (product?.discountPrice
                    ? product?.discountPrice
                    : product?.price) / 4
                ).toFixed(1)}{' '}
              <Dialog>
                <DialogTrigger asChild>
                  <span className="text-red-600 underline cursor-pointer">
                    Learn more
                  </span>
                </DialogTrigger>

                <DialogOverlay className="bg-white/80" />
                <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
                  <DialogHeader>
                    <DialogTitle className="text-xl xs:text-xl font-helvetica sm:text-2xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                      Easy Monthly Installments
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-4 ps-5 xs:ps-10 md:ps-20 pe-4 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                    <Image src={tabbyLogo} alt="tabby logo" />
                    <h2 className="text-2xl xs:text-3xl  font-bold mt-8 leading-10 xs:leading-tight font-helvetica">
                      <span className="rounded-full bg-[#3BFFC1] px-4 py-0 text-nowrap">
                        Shop now,
                      </span>
                      <br />
                      <span className="text-[#3BFFC1] text-outline-border text-4xl  tracking-wider">
                        pay over time.
                      </span>
                    </h2>
                    <ul className='mt-5 font-bold font-helvetica text-lg sm:text-xl md:text-2xl list-["–"] list-inside leading-normal md:leading-normal'>
                      {tabbyfeature.map((item) => (
                        <li key={item.id}>{item.para}</li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <h3 className="font-bold text-2xl sm:text-4xl font-helvetica">
                        How it works
                      </h3>
                      <ul className="font-medium text-base xs:text-lg md:text-xl mt-8 md:leading-relaxed">
                        {tabbyhowitwork.map((item) => (
                          <li
                            className="flex items-center gap-2 font-helvetica"
                            key={item.id}
                          >
                            <span className="rounded-full bg-lightbackground min-w-10 h-10 flex items-center justify-center">
                              {item.id}
                            </span>
                            <span className="w-full">{item.para}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end gap-2 mt-10 px-6">
                      {tabbypayicon.map((item, index) => (
                        <Image
                          src={item.imageUrl}
                          alt="master"
                          className="w-20 h-20 object-contain"
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </p>

            <div className="flex flex-wrap borderjustify-evenly gap-2 lg:gap-1 xl:gap-2 mt-2">
              {paymentLabels.map((label, index) => (
                <div
                  key={index}
                  className="text-black font-medium 2xl:font-semibold pb-1 text-center border-b-2 border-[#00FFBC]"
                >
                  <p className="text-[8px] xl:text-10 2xl:text-12">AED {installmentAmount}</p>
                  <p className="text-[7px] xltext-[8px] 2xl:text-10 text-nowrap">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-1/2 border-4 border-[#D47C84] p-2 py-4 rounded-lg shadow">
            <span className="font-helvetica absolute -top-3 left-2 bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300 text-primary font-extrabold px-2 py-1 rounded-lg text-xs">
              tamara
            </span>
            <p className="text-12 font-helvetica">
              Pay 4 interest-free payments of AED{' '}
              {productPrice > 0 || productDiscPrice > 0
                ? productDiscPrice > 0
                  ? productDiscPrice / 4
                  : productPrice / 4
                : (
                  (product?.discountPrice
                    ? product?.discountPrice
                    : product?.price) / 4
                ).toFixed(1)}{' '}
              <Dialog>
                <DialogTrigger asChild>
                  <span className="text-red-600 underline cursor-pointer">
                    Learn more
                  </span>
                </DialogTrigger>

                <DialogOverlay className="bg-white/80" />
                <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
                  <DialogHeader>
                    <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                      Easy Monthly Installments
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-8 px-5 xs:px-10 md:px-20 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                    <div className="text-center">
                      <Image
                        src={tamaraLogo}
                        alt="tamara logo"
                        className="mx-auto"
                      />
                    </div>
                    <h2 className="text-center font-bold text-4xl mt-8">
                      Pay easier with Tamara
                    </h2>
                    <div className="px-4 py-2 bg-gradient-to-r from-orange-300 via-blue-300 to-pink-300 mt-8 rounded-[70px]">
                      <div className="bg-gradient-to-r from-orange-100 via-blue-100 to-pink-100 pb-4 pt-2 px-8 rounded-[70px] flex flex-col gap-4">
                        <div className="w-10/12 mx-auto">
                          {tamarafeature.map((item) => (
                            <div
                              className="flex justify-between items-center py-2"
                              key={item.id}
                            >
                              <div>
                                <h3 className="font-bold text-xl">
                                  {item.title}
                                </h3>
                                <p className="text-md font-light mt-2 text-nowrap">
                                  {item.para}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 px-5 xs:px-10 2xl:px-20">
                      <h3 className="font-bold text-2xl">Why Tamara?</h3>
                      <div className="flex items-center flex-wrap 2xl:flex-nowrap justify-center 2xl:justify-between gap-4 pt-6">
                        {tamarawhy.map((item) => (
                          <div
                            className="w-48 h-9 rounded-2xl bg-primary text-white flex items-center justify-center text-20 font-semibold"
                            key={item.id}
                          >
                            {item.para}
                          </div>
                        ))}
                      </div>
                      <div className="mt-5">
                        <ul className="font-16 font-normal">
                          {tamaralist.map((item) => (
                            <li
                              className="flex items-center gap-2"
                              key={item.id}
                            >
                              <span>({item.id})</span>
                              <span>{item.para}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </p>
            <div className="flex flex-wrap  justify-evenly gap-2 lg:gap-1 xl:gap-2 mt-2">
              {paymentLabels.map((label, index) => (
                <div
                  key={index}
                  className="text-black font-medium 2xl:font-semibold pb-1 text-center border-b-2 border-[#00FFBC]"
                >
                  <p className="text-[8px] xl:text-10 2xl:text-12">AED {installmentAmount}</p>
                  <p className="text-[7px] xltext-[8px] 2xl:text-10">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          {paymentIcons.map((icon, index) => (
            <div key={index} className="w-14 h-auto p-1">
              <Image
                src={icon.src}
                alt={icon.alt}
                width={64}
                height={60}
                className="object-contain shadow "
              />
            </div>
          ))}
        </div>
        <div className='flex gap-2 items-center'>
          <Image src={Icontime} alt='time icon' width={40} height={40} />
          <p className='font-helvetica mt-2 mb-0'>Try before you buy- 20 minutes to decide after assembly, or get a full refund.</p>
        </div>
        <div className='flex gap-2 items-center'>
          <Image src={Icondelivery} alt='time icon' width={40} height={40} />
          <p className='font-helvetica'>Free delivery on orders above AED 1000 in Dubai- no hidden charges, just doorstep convenience.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
