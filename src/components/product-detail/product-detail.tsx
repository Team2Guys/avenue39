'use client';
import React, { useEffect, useState } from 'react';
import Thumbnail from '../carousel/thumbnail';
import { CiShoppingCart } from 'react-icons/ci';
import { IProduct, IReview, ProductImage } from '@/types/types';
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { Button } from '../ui/button';
// import QRScanner from '../QR-reader/QR';
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
// import paymenticons from '@icons/payment-icons.png';
import { openDrawer } from '@/redux/slices/drawer';
import { CartItem, CartSize } from '@/redux/slices/cart/types';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/config/fetch';
import { calculateRatingsPercentage, renderStars } from '@/config';
// import { TbCube3dSphere } from 'react-icons/tb';
// import Product3D from '../3DView/Product3D';
// import ARExperience from '../ARModelViewer';
import { paymentIcons } from '@/data/products';
import { ProductDetailSkeleton } from './skelton';
import { State } from '@/redux/store';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';
import { toast } from 'react-toastify';

const ProductDetail = ({
  params,
  isZoom,
  gap,
  swiperGap,
  detailsWidth,
  products,
}: {
  params: IProduct;
  isZoom?: Boolean;
  gap?: String;
  swiperGap?: String;
  detailsWidth?: String;
  products?: IProduct[];
}) => {
  const truncateText = (text: any, limit: any) => {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  };

  const [count, setCount] = useState(1);
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State | any) => state.cart.items);
  const slug = String(params.name);
  const [timeLeft, setTimeLeft] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [size, setSize] = useState<CartSize | null>(null);
  const [filter, setFilter] = useState<CartSize | null>(null);
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscPrice, setProductDiscPrice] = useState(0);
  const [productImage, setProductImage] = useState<ProductImage[]>([]);
  const [availableSizes, setAvailableSizes] = useState<any>([]);

  const product = products?.find((product) => product.name === slug);

  const handleColorClick = (index: any, item: CartSize) => {
    setActiveIndex(index);
    setSelectedSize(null);
    setSize(null)
    setFilter(item)
  };

  const handleSizeClick = (index: any, size: CartSize) => {
    setSelectedSize(index);
    setSize(size)
  };

  useEffect(() => {
    if (!product) return;

    const activeColor = activeIndex !== null ? product.filter?.[0]?.additionalInformation?.[activeIndex]?.name : null;

    if (activeColor) {
      const sizesForColor = product.sizes?.filter(size =>
        product.productImages.some(img => img.color === activeColor && img.size === size.name)
      );

      setAvailableSizes(sizesForColor);

      const filteredImages = product.productImages.filter(
        (img) => img.color === activeColor &&
          (selectedSize === null || (sizesForColor && img.size === sizesForColor[selectedSize]?.name))
      );

      setProductImage(filteredImages);

      const filterPrice = activeIndex !== null ? product.filter?.[0]?.additionalInformation?.[activeIndex]?.price || 0 : 0;
      const sizePrice = selectedSize !== null && sizesForColor ? sizesForColor[selectedSize]?.price || 0 : 0;
      const finalPrice = Number(sizePrice) > 0 ? sizePrice : filterPrice;
      setProductPrice(Number(finalPrice));

      const filterDiscPrice = activeIndex !== null ? product.filter?.[0]?.additionalInformation?.[activeIndex]?.discountPrice || 0 : 0;
      const sizeDiscPrice = selectedSize !== null && sizesForColor ? sizesForColor[selectedSize]?.discountPrice || 0 : 0;
      const finalDiscPrice = Number(sizeDiscPrice) > 0 ? sizeDiscPrice : filterDiscPrice;
      setProductDiscPrice(Number(finalDiscPrice));
    } else {
      setAvailableSizes([]);
      setProductImage([]);
    }
  }, [activeIndex, selectedSize, product]);

  function formatPrice(price: any) {
    if (!price) return 0;
    return price > 1000 ? price.toLocaleString('en-US') : price;
  }
  const Navigate = useRouter();
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

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  const onDecrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  const onIncrement = () => {
    const variationQuantity = itemToAdd.selectedSize?.stock || itemToAdd.selectedfilter?.stock || product.stock;
    if (count < variationQuantity) {
      setCount((prevCount) => prevCount + 1);
    } else {
      toast.error(`Only ${variationQuantity} items in stock!`);
    }
  };
  const itemToAdd: CartItem = {
    ...product,
    quantity: count,
    selectedSize: size,
    selectedfilter: filter
  };
  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const existingCartItem = cartItems.find(
      (item: any) =>
        item.id === product?.id &&
        item.selectedSize?.name === itemToAdd.selectedSize?.name &&
        item.selectedfilter?.name === itemToAdd.selectedfilter?.name
    );
    const currentQuantity = existingCartItem?.quantity || 0;
    const newQuantity = currentQuantity + count;
    const variationQuantity =
      itemToAdd.selectedSize?.stock ||
      itemToAdd.selectedfilter?.stock ||
      product.stock;
    if (product?.stock && newQuantity > product.stock) {
      toast.error(`Only ${product.stock} items are in stock. You cannot add more than that.`);
      return;
    } else if (newQuantity > variationQuantity) {
      toast.error(`Only ${variationQuantity} items are in stock for selected variation. You cannot add more than that in Cart.`);
      return;
    }
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };


  const handleBuyNow = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const existingCartItem = cartItems.find(
      (item: any) =>
        item.id === product?.id &&
        item.selectedSize?.name === itemToAdd.selectedSize?.name &&
        item.selectedfilter?.name === itemToAdd.selectedfilter?.name
    );
    const currentQuantity = existingCartItem?.quantity || 0;
    const newQuantity = currentQuantity + count;
    const variationQuantity =
      itemToAdd.selectedSize?.stock ||
      itemToAdd.selectedfilter?.stock ||
      product.stock;
    if (product?.stock && newQuantity > product.stock) {
      toast.error(`Only ${product.stock} items are in stock. You cannot add more than that.`);
      return;
    } else if (newQuantity > variationQuantity) {
      toast.error(`Only ${variationQuantity} items are in stock for selected variation. You cannot add more than that in Cart.`);
      return;
    }
    dispatch(addItem(itemToAdd));
    Navigate.push('/checkout');
  };
  // const handle3D = (e: React.MouseEvent<HTMLElement>) => {
  //   e.stopPropagation();
  // };

  return (
    <div
      className={`flex flex-col md:flex-row w-full justify-between font-Helveticalight overflow-hidden ${gap} my-6 relative`}
    >
      <div className="flex-grow  md:w-1/2 lg:w-7/12 2xl:w-[55%] w-full no-select">
        <Thumbnail
          thumbs={productImage.length > 0 ? productImage : product.productImages}
          isZoom={isZoom}
          swiperGap={swiperGap}
          // HoverImage={setHoveredImage}
          isLoading={false}
          activeIndex={0}
        />
      </div>
      <div className='hidden 2xl:block 2xl:w-[1%]'></div>
      <div className={`${detailsWidth} flex flex-col gap-2 pt-2 2xl:w-[39%]`}>
        <div className="flex gap-2">
          {product.stock > 0 ? (
            <div className="bg-[#56B400] p-2 rounded-sm text-white text-xs font-Helveticalight">
              IN STOCK { }
            </div>
          ) : (
            <div className="bg-[#EE1C25] p-2 rounded-sm text-white text-xs font-Helveticalight">
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
          ) :
            (
              product.discountPrice > 0 && (
                <div className="bg-[#EE1C25] p-2 rounded-sm text-white text-xs font-helvetica">
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) * 100,
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
                <div className="bg-[#00AEEF] p-2 rounded-sm text-white text-xs font-Helveticalight">
                  New
                </div>
              ) : null;
            })()}
        </div>
        <ProductName>{product?.name}</ProductName>
        {averageRating > 1 && (
          <>
            <div className="flex gap-2 items-center font-Helveticalight">
              <span className="flex items-center">
                {renderStars({ star: averageRating })}
              </span>
              <span className="text-[#999999] text-11 font-medium text-nowrap">
                {productReviews.length} reviews
              </span>
            </div>
          </>
        )}



        {(product?.discountPrice > 0 || productDiscPrice > 0) ? (
          <ProductPrice className="flex items-center gap-2">
            AED{' '}
            {productDiscPrice > 0
              ? (productDiscPrice > 1000
                ? productDiscPrice.toLocaleString()
                : formatPrice(productDiscPrice))
              : (product?.discountPrice > 1000
                ? product?.discountPrice.toLocaleString()
                : product?.discountPrice)}

            <NormalText className="font-normal text-base text-slate-400 line-through">
              AED{' '}
              {productPrice > 0
                ? formatPrice(productPrice)
                : `AED ${formatPrice(product?.price)}`}
            </NormalText>
          </ProductPrice>
        ) : (
          <ProductPrice className="flex items-center gap-2">
            AED{' '}
            {productPrice > 0
              ? formatPrice(productPrice)
              : formatPrice(product?.price)}
          </ProductPrice>
        )}


        {/* <div className="flex gap-3 font-semibold">
          <span>AVAILABLE:</span>
          {product.stock > 0 ? (
            <span className="text-[#56B400]">In Stock</span>
          ) : (
            <span className="text-[#EE1C25]">Out Of Stock</span>
          )}
        </div> */}
        <p className="text-lightdark text-14 tracking-wide leading-6 font-helvetica">
          {
            // isExpanded
            //   ? product?.description
            //   :
            truncateText(product?.description, 120)
          }
        </p>

        <div>
          {product?.filter &&
            product?.filter.length > 0 &&
            product?.filter[0]?.additionalInformation && (
              <div className="p-4">
                <h2 className="font-semibold text-[16px] font-sans Capitalize">
                  {product?.filter[0]?.heading}{' '}
                  <span className="capitalize">
                    {
                      activeIndex !== null ? product?.filter[0]?.additionalInformation[activeIndex]?.name : ''
                    }
                  </span>
                </h2>
                <div className="flex space-x-4 mt-2">
                  {product?.filter?.[0]?.additionalInformation.map((item, index) => {
                    const image = product.productImages.find(
                      (img) => img.color === item.name
                    );
                    if (!image) return null;

                    return (
                      <div
                        key={index}
                        onClick={() => handleColorClick(index, item)}
                        className={`cursor-pointer border rounded-lg p-1 flex items-center justify-center transition ${activeIndex === index ? 'border-black font-bold shadow-md' : 'hover:shadow-lg'}`}
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

          {product?.sizes && product?.sizes.length > 0 && (
            <div className="p-4">
              {availableSizes.length > 0 && (
                <h2 className="font-semibold text-[16px] font-sans capitalize">Size:</h2>
              )}
              <div className="flex space-x-4">
                {availableSizes.map((size: { name: string, price: string }, index: number) => {
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
                  )
                })}
              </div>
            </div>
          )}



        </div>

        {product.sale_counter &&
          Object.values(timeLeft).some((value) => value > 0) && (
            <>
              <NormalText className="">Hurry Up! Sale ends in:</NormalText>
              <div className="flex gap-2 mb-3 mt-2">
                {Object.entries(timeLeft).map(([label, value], index) => (
                  <div
                    key={index}
                    className="bg-[#F5F5F5] p-2 rounded-md w-14 text-center font-normal text-14 text-lightdark flex flex-col"
                  >
                    <span>{value}</span>
                    <span className="text-10">{label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </>
          )}

        {/* <NormalText className="mb-2">
          Hurry Up! Only <span className="text-red-600">12</span> left in stock:
        </NormalText> */}
        {product.stock == 0 ? (
          <>
            <Link
              href="https://wa.me/971505974495"
              target="_blank"
              rel="noreferrer"
              className=" ps-5 pe-10 h-12 w-full mt-5 mb-5 text-white bg-[#64B161] rounded-2xl flex justify-center items-center gap-2 hover:bg-[#56B400]"
            >
              <BsWhatsapp size={25} />
              <span className="font-light text-sm">PRE-ORDER ONLY</span>
            </Link>
          </>
        ) : (
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

            <Button
              className="bg-primary text-white flex gap-3 justify-center w-full sm:w-1/2 items-center md:w-full h-12 rounded-2xl mb-3 font-light "
              onClick={(e: any) => handleBuyNow(e)}
            >
              <CiShoppingCart size={20} /> BUY IT NOW
            </Button>

            <div className="flex gap-2 mb-4 w-full sm:w-1/2  md:w-full">
              <Button
                variant={'outline'}
                className="text-primary w-full h-12 rounded-2xl flex gap-3 uppercase"
                onClick={(e: any) => handleAddToCard(e)}
              >
                Add to cart
              </Button>
              {/* 
              <div className="w-full mx-auto md:w-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-warning w-full text-white flex gap-3 h-12 rounded-2xl">
                      TRY AT HOME
                    </Button>
                  </DialogTrigger>

                  <DialogOverlay className="bg-white/80" />
                  <DialogContent className="sm:max-w-[80%] lg:max-w-[30%] bg-white px-0 pt-0 sm:rounded-none border border-gray shadow-sm gap-0 pb-0">
                    <DialogHeader className="flex items-start px-5 pt-0 py-5 border-b-2">
                      <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
                        SCAN QR
                      </DialogTitle>
                    </DialogHeader>
                    <QRScanner
                      hoveredImage={
                        product?.productImages[0].imageUrl
                          ? product?.productImages[0].imageUrl
                          : 'not found'
                      }
                      url={slug}
                    />
                  </DialogContent>
                </Dialog>
              </div> */}
            </div>
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#afa183] text-white flex gap-3 justify-center w-full sm:w-1/2 items-center lg:w-full h-12 rounded-2xl mb-3 font-light  md:w-full"
                  onClick={(e) => handle3D(e)}
                >
                  <TbCube3dSphere size={20} /> View 3D
                </Button>
              </DialogTrigger>

              <DialogOverlay className="bg-white/80" />
              <DialogContent className="sm:max-w-[80%] lg:max-w-[50%] bg-white px-0 pt-0 sm:rounded-none border border-gray shadow-sm gap-0 pb-0">
                <DialogHeader className="flex items-start px-5 pt-0 py-5 border-b-2">
                  <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
                    3D View
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full h-[600px]">
                  <Product3D modelUrl="/3dmodel/model.glb" />
                </div>
              </DialogContent>
            </Dialog> */}
          </>
        )}

        <div className="flex items-center justify-center relative mb-2">
          <span className="absolute left-0 w-1/6 border-t border-gray-300"></span>
          <p className="text-center px-3 w-4/6 whitespace-nowrap font-semibold text-sm xs:text-base lg:text-xs xl:text-base">
            Guaranteed Safe Checkout
          </p>
          <span className="absolute right-0 w-1/6 border-t border-gray-300"></span>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="relative w-1/2 border-4 border-[#00FFBC] p-4 rounded-lg shadow">
            <span className="absolute -top-3 left-2 bg-[#00FFBC] text-primary px-2 py-1 rounded-lg text-xs font-extrabold">
              tabby
            </span>
            <p className="text-12">
              Pay 4 interest-free payments of AED{' '} { }
              {productPrice > 0 || productDiscPrice > 0 ? productDiscPrice > 0 ? productDiscPrice / 4 : productPrice / 4 : (
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
                    <DialogTitle className="text-xl xs:text-xl sm:text-2xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                      Easy Monthly Installments
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-4 ps-5 xs:ps-10 md:ps-20 pe-4 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                    <Image src={tabbyLogo} alt="tabby logo" />
                    <h2 className="text-2xl xs:text-3xl  font-bold mt-8 leading-10 xs:leading-tight">
                      <span className="rounded-full bg-[#3BFFC1] px-4 py-0 text-nowrap">
                        Shop now,
                      </span>
                      <br />
                      <span className="text-[#3BFFC1] text-outline-border text-4xl  tracking-wider">
                        pay over time.
                      </span>
                    </h2>
                    <ul className='mt-5 font-bold text-lg sm:text-xl md:text-2xl list-["–"] list-inside leading-normal md:leading-normal'>
                      {tabbyfeature.map((item) => (
                        <li key={item.id}>{item.para}</li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <h3 className="font-bold text-2xl sm:text-4xl">
                        How it works
                      </h3>
                      <ul className="font-medium text-base xs:text-lg md:text-xl mt-8 md:leading-relaxed">
                        {tabbyhowitwork.map((item) => (
                          <li className="flex items-center gap-2" key={item.id}>
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
          </div>
          <div className="relative w-1/2 border-4 border-[#D47C84] p-4 rounded-lg shadow">
            <span className="absolute -top-3 left-2 bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300 text-primary font-extrabold px-2 py-1 rounded-lg text-xs">
              tamara
            </span>
            <p className="text-12">
              Pay 4 interest-free payments of AED{' '}
              {productPrice > 0 || productDiscPrice > 0 ? productDiscPrice > 0 ? productDiscPrice / 4 : productPrice / 4 : (
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
                                <p className="text-md font-light mt-2">
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
      </div>
    </div>
  );
};

export default ProductDetail;
