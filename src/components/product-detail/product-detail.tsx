'use client';
import React, { useEffect, useState } from 'react';
import Thumbnail from '../carousel/thumbnail';
import { CiShoppingCart } from 'react-icons/ci';
import { IProduct, ProductImage, Shipping, Sizes } from '@/types/types';
import { NormalText, ProductPrice } from '@/styles/typo';
import { Button } from '../ui/button';

import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/redux/slices/cart';
import { Dispatch } from 'redux';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { CartSize } from '@/redux/slices/cart/types';
import { useRouter } from 'next/navigation';
import {
  generateSlug,
  getProductStock,
} from '@/config';
import { paymentIcons } from '@/data/products';
import { ProductDetailSkeleton } from './skelton';
import { State } from '@/redux/store';
import Icontime from '../../../public/assets/icons/Group2038.svg';
import Icondelivery from '../../../public/assets/icons/Group2037.svg';
import { toast } from 'react-toastify';
import { openDrawer } from '@/redux/slices/drawer';
import dynamic from 'next/dynamic';
import { formatPrice } from '@/config/HelperFunctions';
import { Collapse } from 'antd';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const TabyTamra = dynamic(() => import('./TabyTamra'))


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
    variant?: string;
    size?: string;
  }>({ variant: filterParam, size: sizeParam });
  const [selectedShipping, setSelectedShipping] = useState<Shipping | undefined>();
  const [activeKey, setActiveKey] = useState<string | string[]>('0');
  const Navigate = useRouter();
  const product = params ? params : products?.find((product) => (product.custom_url || product?.name) === slug);


  const handleCollapseChange = (key: string | string[]) => {
    setActiveKey(key);
    const selected = product?.shippingOptions?.[Number(key)];
      setSelectedShipping(selected);
  };
  useEffect(() => {
    if (product?.shippingOptions && product?.shippingOptions?.length > 0) {
      setSelectedShipping(product.shippingOptions[Number(activeKey)]);
    }
  }, [product?.shippingOptions]);


  const handleColorClick = (index: any, item: CartSize) => {
    setFilter(item);
    const filterName = generateSlug(item.name);

    const sizeName = !slugParams.size ? generateSlug(size?.name || "") : slugParams.size;
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('variant', filterName);
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
    currentUrl.searchParams.set('variant', filterName);
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

    if (slugParams.variant && slugParams.size) {
      const sizeIndex = uniqueSizes?.findIndex(
        (item: Sizes) => generateSlug(item.name) === slugParams.size,
      );
      const selectedSize: any =
        sizeIndex !== -1 ? uniqueSizes[sizeIndex] : uniqueSizes[0];
      setSize(selectedSize);
      const additionalInfo = product?.filter?.[0]?.additionalInformation || [];
      const findFilter = additionalInfo.find(
        (item) => generateSlug(item.name) === slugParams.variant,
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
    } else if (slugParams.variant && !slugParams.size) {

      const additionalInfo = product?.filter?.[0]?.additionalInformation || [];
      setAvailableFilters(additionalInfo);
      const index = additionalInfo.findIndex((item) => generateSlug(item.name) === slugParams.variant);
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

  const itemsCollapse = product?.shippingOptions?.map((shipping, index) => ({
    key: index.toString(),
    label: <span className={`font-helvetica ${selectedShipping?.name === shipping.name ? 'font-bold custom-collapse-active text-main' : 'font-normal'}`}>{shipping.name}</span>,
    children: (
      <div className="bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center">
        <Image src={shipping.icon} width={50} height={50} alt="icon" className="size-12 xs:size-16" />
        <div className='font-helvetica'>
          <strong className="text-14 xs:text-18">{shipping.name}</strong>
          <p className="text-11 xs:text-15">{shipping.description}</p>
          <p className="text-11 xs:text-15">
            <span>Delivery Cost: </span>
            {shipping.shippingFee > 0 ? (
              <>
                <span>In Dubai </span><strong>AED {shipping.shippingFee}</strong>
              </>
            ) : (
              <strong>Free of charge for all orders.</strong>
            )}
            {shipping.otherEmiratesFee && (
              <>, <span>All Other Emirates</span> <strong>AED {shipping.otherEmiratesFee}</strong>.</>
            )}
            {shipping.freeShippingFee && (
                    <div><span>Free shipping for all orders above</span> <strong>AED {shipping.freeShippingFee}</strong>.</div>
                  )}
          </p>
        </div>
      </div>
    ),
  }));


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

  // const { data: reviews = [] } = useQuery<IReview[], Error>({
  //   queryKey: ['reviews'],
  //   queryFn: fetchReviews,
  // });
  // const productId = product?.id;

  // const filteredReviews = Array.isArray(reviews)
  //   ? reviews.filter((review) => review.productId === productId)
  //   : [];

  // const { averageRating, productReviews } =
  //   calculateRatingsPercentage(filteredReviews);
  const itemToAdd: any = {
    ...product,
    quantity: count,
    selectedSize: size,
    selectedfilter: filter,
    selectedShipping: selectedShipping,
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
    localStorage.removeItem('buyNowProduct')
    const existingCartItem = cartItems.find(
      (item: any) =>
        item.id === product?.id &&
        item.selectedSize?.name === itemToAdd.selectedSize?.name &&
        item.selectedfilter?.name === itemToAdd.selectedfilter?.name,
    );
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

      const addedQuantity = existingWishlistItem.quantity + count;

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
        {/* {averageRating > 1 && (
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
        )} */}

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
                ? formatPrice(productDiscPrice.toLocaleString())
                : formatPrice(productDiscPrice)
              : product?.discountPrice > 1000
                ? formatPrice(product?.discountPrice.toLocaleString())
                : formatPrice(product?.discountPrice)}
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

          {isExpanded ? (
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
          )}


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

        <div className="flex items-center gap-4 justify-between mb-2 max-sm:mx-auto">
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

        {product.shippingOptions &&
          <div className="bg-[#EEEEEE]">

            <Collapse
              accordion
              activeKey={activeKey}
              onChange={handleCollapseChange} 
              bordered={false}
              expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus size={18} /> : <AiOutlinePlus size={18} />)}
              expandIconPosition="end"
              className="w-full bg-transparent custom-collapse"
              items={itemsCollapse}
            />
          </div>
        }


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


        <div className="flex items-center justify-center relative mb-2">
          <span className="absolute left-0 w-1/6 border-t border-gray-300 hidden sm:block"></span>
          <p className="text-center px-3 w-full xsm:w-4/6 font-helvetica whitespace-nowrap font-semibold text-sm xs:text-base lg:text-xs xl:text-base">
            Guaranteed Safe Checkout
          </p>
          <span className="absolute right-0 w-1/6 border-t border-gray-300 hidden xsm:block"></span>
        </div>

        <TabyTamra productPrice={productPrice} productDiscPrice={productDiscPrice} product={product} />



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
    </div >
  );
};

export default ProductDetail;
