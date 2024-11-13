'use client';
import React, { useState } from 'react';
import Thumbnail from '../carousel/thumbnail';
// import { products } from '@/data/products';
import { IProduct, IProductDetail, IReview } from '@/types/types';
import { MdLocalFireDepartment, MdStar, MdStarBorder } from 'react-icons/md';
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { Button } from '../ui/button';
import { FiShoppingCart } from 'react-icons/fi';
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

import { IoBagOutline } from 'react-icons/io5';
import Link from 'next/link';
import { BsWhatsapp } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/redux/store';
import {
  addItem,
  selectTotalPrice,
  updateItemQuantity,
} from '@/redux/slices/cart';
import { Dispatch } from 'redux';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
// import paymenticons from '@icons/payment-icons.png';
import { openDrawer } from '@/redux/slices/drawer';
import { CartItem } from '@/redux/slices/cart/types';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchReviews } from '@/config/fetch';
import { QRCode } from 'antd';
import QRScanner from '../QR-reader/QR';
import { calculateRatingsPercentage, renderStars } from '@/config';
import Loader from '../Loader/Loader';
import { TbCube3dSphere } from 'react-icons/tb';
import Product3D from '../3DView/Product3D';
import ARExperience from '../ARModelViewer';
import { paymentIcons } from '@/data/products';


const ProductDetail = ({
  params,
  isZoom,
  gap,
  swiperGap,
  detailsWidth,
}: {
  params: IProductDetail;
  isZoom?: Boolean;
  gap?: String;
  swiperGap?: String;
  detailsWidth?: String;
}) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const cartItems = useSelector((state: State) => state.cart.items);

  const [count, setCount] = useState(1);
  const dispatch = useDispatch<Dispatch>();
  const slug = String(params.name);
  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  console.log(slug, 'slug');
  const product = products.find((product) => product.name === slug);
  const Navigate = useRouter();

  const {
    data: reviews = [],
    error: reviewError,
    isLoading: reviewLoading,
  } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });
  const productId = product?.id;
  // const filteredReviews = reviews.filter(
  //   (review) => review.productId === productId,
  // );
  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];
  const { averageRating, productReviews } =
    calculateRatingsPercentage(filteredReviews);
  if (!product) {
    return <Loader />;
  }

  const onDecrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  const onIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const itemToAdd: CartItem = {
    ...product,
    quantity: count,
  };

  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };

  const handleBuyNow = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(addItem(itemToAdd));
    Navigate.push('/checkout');
  };
  const handle3D = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`flex flex-col md:flex-row w-full justify-between overflow-hidden ${gap} my-6 relative`}
    >
      <div className="flex-grow  w-full md:w-1/2">
        <Thumbnail
          thumbs={product?.productImages}
          isZoom={isZoom}
          swiperGap={swiperGap}
          HoverImage={setHoveredImage}
          isLoading={isLoading}
        />
      </div>

      <div className={`${detailsWidth} flex flex-col gap-2 pt-2`}>
        <div className="flex gap-2">
          <div className="bg-[#00AEEF] p-2 rounded-sm text-white text-xs">
            New
          </div>
          <div className="bg-[#EE1C25] p-2 rounded-sm text-white text-xs">
            -50%
          </div>
          <div className="bg-[#56B400] p-2 rounded-sm text-white text-xs">
            IN STOCK
          </div>
        </div>
        <ProductName>{product?.name}</ProductName>

        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            {averageRating > 1 && (
              <>
                <span className="flex items-center">
                  {' '}
                  {renderStars({ star: averageRating })}
                </span>
                <span className="text-[#999999] text-11 font-medium text-nowrap">
                  {productReviews.length} reviews
                </span>
              </>
            )}
          </div>
          <h3 className="text-red-500 flex items-center font-medium text-sm">
            <MdLocalFireDepartment className="text-lg mr-1" /> 12 sold in last
            19 hours
          </h3>
        </div>
        {product?.discountPrice > 0 ? (
          <ProductPrice className="flex items-center gap-2">
            AED {product?.discountPrice}
            <NormalText className="font-normal text-base text-slate-400 line-through">
              AED{product?.price}
            </NormalText>
          </ProductPrice>
        ) : (
          <ProductPrice className="flex items-center gap-2">
            AED {product?.price}
          </ProductPrice>
        )}
        <div className="flex gap-3 font-semibold">
          <span>AVAILABLE:</span>
          <span className="text-[#56B400]">PRE-ORDER ONLY WHATSAPP</span>
        </div>
        <p className=" text-lightdark text-14 tracking-wide leading-6">
          {product?.description}
        </p>

        <NormalText className="">Hurry Up! Sale ends in:</NormalText>
        <span className="flex gap-2 mb-3">
          {['25 Days', '25 HOUR', '25 MIN', '25 SEC'].map((time, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] p-2 rounded-md w-14 text-center font-normal text-13 text-lightdark"
            >
              {time}
            </div>
          ))}
        </span>

        {/* <NormalText className="mb-2">
          Hurry Up! Only <span className="text-red-600">12</span> left in stock:
        </NormalText> */}
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
            <button onClick={onIncrement} className="px-2 text-gray-600">
              <HiPlusSm size={20} />
            </button>
          </div>

          <Link
            href="https://wa.me/971505974495"
            target='_blank'
            rel='noreferrer'
            className="w-fit ps-5 pe-10 h-12 text-white bg-[#64B161] rounded-full flex justify-center items-center gap-2 hover:bg-[#56B400]"
          >
            <BsWhatsapp size={35} />
            <span className="font-light text-sm">PRE-ORDER ONLY</span>
          </Link>
        </div>

        <Button
          className="bg-primary text-white flex gap-3 justify-center sm:w-1/2 items-center lg:w-full h-12 rounded-2xl mb-3 font-light"
          onClick={(e) => handleBuyNow(e)}
        >
          <IoBagOutline size={20} /> BUY IT NOW
        </Button>

        <div className="flex gap-2 mb-4">
          <Button
            variant={'outline'}
            className="text-primary w-1/2 h-12 rounded-2xl flex gap-3"
            onClick={(e) => handleAddToCard(e)}
          >
            Add to cart
          </Button>

          {/* <Dialog>

          <DialogTrigger asChild>
          <Button className="bg-warning w-1/2 text-white flex gap-3 h-12 rounded-2xl">
            TRY AT HOME
          </Button>
                </DialogTrigger>
      
                <DialogOverlay className="bg-white/80" />
                <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-gray shadow-sm gap-0 pb-0">
                  <DialogHeader>
                    <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                   SCAN QR
                    </DialogTitle>
                  </DialogHeader>
                 SCAN qr
                </DialogContent>
          </Dialog> */}

            <div className='w-2/4'>

                  <ARExperience ImageUrl={"/3dmodel/carpet.glb"}/>
            </div>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-warning w-1/2 text-white flex gap-3 h-12 rounded-2xl">
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
                  hoveredImage
                    ? hoveredImage
                    : product?.productImages[0].imageUrl
                      ? product?.productImages[0].imageUrl
                      : 'not found'
                }
                url={slug}
              />
            </DialogContent>
          </Dialog> */}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-[#afa183] text-white flex gap-3 justify-center sm:w-1/2 items-center lg:w-full h-12 rounded-2xl mb-3 font-light"
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
        </Dialog>
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
              Pay 4 interest-free payments of AED{' '}
              {Math.round(product?.price / 4)}{' '}
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
                    <Image src={tabbyLogo} alt="logo" />
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
              {Math.round(product?.price / 4)}.{' '}
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
                      <Image src={tamaraLogo} alt="logo" className="mx-auto" />
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
        <div className="flex justify-between space-x-4">
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
