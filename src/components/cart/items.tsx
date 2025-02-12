'use client';
import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store';
import {
  removeItem,
  selectTotalPrice,
  updateItemQuantity,
  variationProductImage,
} from '@cartSlice/index';
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import CustomButtom from '../ui/custom-button';
import Counter from '../counter';
import { IoBagOutline } from 'react-icons/io5';
import { TfiClose } from 'react-icons/tfi';
import { generateSlug, TotalProducts } from '@/config';
import { closeDrawer, openDrawer } from '@/redux/slices/drawer';
import { FaTrash } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import Link from 'next/link';
import { GiShoppingCart } from 'react-icons/gi';
import { CartItem } from '@/redux/slices/cart/types';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
import { ChangeUrlHandler } from '@/config/fetch';

interface ICartItems {
  isCartPage?: boolean;
  isCheckoutPage?: boolean;
  isMoblie?: boolean;
}
const CartItems = ({ isCartPage, isCheckoutPage, isMoblie }: ICartItems) => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );
  const userDetails = useSelector(
    (state: State) => state.usrSlice.loggedInUser,
  );
  const drawerState = useSelector((state: State) => state.drawer);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const path = usePathname();
  const removeProductFromCart = (item: CartItem) => {
    dispatch(removeItem(item));
  };
  const updateProductQuantity = (item: CartItem) => {
    const variationQuantity =
      item.selectedSize?.stock || item.selectedfilter?.stock || item.stock;

    if (item.quantity > 0) {
      if (item.quantity > variationQuantity) {
        toast.error("Insufficient stock. Please reduce quantity.");
      } else {
        dispatch(updateItemQuantity({
          id: item.id,
          quantity: item.quantity,
          selectedSize: item.selectedSize || undefined,
          selectedfilter: item.selectedfilter || undefined
        }));
      }
    }
  };
  console.log(cartItems,'cartItems')
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };
  const handleOpenDrawer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!drawerState) {
      dispatch(openDrawer());
      timeoutRef.current = setTimeout(() => {
        dispatch(closeDrawer());
      }, 8000);
    } else {
      dispatch(closeDrawer());
    }
  };
  const handleEnterDrawer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  const handleLeaveDrawer = () => {
    timeoutRef.current = setTimeout(() => {
      dispatch(closeDrawer());
    }, 8000);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        dispatch(closeDrawer());
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dispatch]);
  return (
    <React.Fragment>
      {!isCartPage ? (
        <div ref={drawerRef}>
          <div>
            <div
              className={`xl:w-12 w-12 h-10 rounded-3xl relative flex justify-center items-center  cursor-pointer ${path === '/cart' ? 'text-white bg-main' : 'text-black  border-black'}`}
              onClick={handleOpenDrawer}
            >
              <GiShoppingCart size={27} style={{ transform: 'scaleX(-1)' }} />
              {(cartItems && cartItems.length > 0) && (
                <div className="w-4 h-4 rounded-full bg-black text-white flex justify-center items-center absolute top-2 right-2 text-10">
                  <TotalProducts />
                </div>
              )}
            </div>
          </div>
          <div
            className={`w-72 xsm:w-80 z-[200] border absolute ${isMoblie ? 'bottom-[55px] -right-[70px] xs:-right-[135px] h-[300px] p-3' : 'top-[60px] h-[500px] p-5'} ${!isMoblie && (userDetails ? '-right-[140px] xl:-right-[135px]' : '-right-[30px]')} border-[#0000002e] rounded-md flex flex-col bg-white ${drawerState ? 'block' : 'hidden'}`}
            onMouseEnter={handleEnterDrawer}
            onMouseLeave={handleLeaveDrawer}
          >
            {isMoblie && (
              <div
                className={`absolute -bottom-[3px] right-[23%] xsm:right-[21%] xs:right-1/2 transform rotate-180 xs:translate-x-8`}
                style={{ zIndex: 1005 }}
              >
                <div className="w-0 h-0 border-l-[20px] border-l-transparent rounded-t-md border-r-[20px] border-r-[#0000002e] border-b-[20px] border-b-transparent transform -rotate-45 relative">
                  <span className="w-0 h-0 border-l-[13px] border-l-transparent border-r-[19px] border-r-white border-b-[20px] border-b-transparent transform rotate-0 absolute top-[2px] -left-[13px] -translate-y-[1px] rounded-t-md"></span>
                </div>
              </div>
            )}
            <div className={`space-y-0 flex flex-row items-center justify-between border-b-2 ${isMoblie ? 'pb-3' : 'pb-4'}  relative `}>
              {!isMoblie && (
                <div
                  className={`absolute -top-[23px] z-[200] ${userDetails ? 'right-1/2' : 'right-[20px]'}`}
                  style={{ zIndex: 1005 }}
                >
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent rounded-t-md border-r-[20px] border-r-[#0000002e] border-b-[20px] border-b-transparent transform -rotate-45 relative">
                    <span className="w-0 h-0 border-l-[13px] border-l-transparent border-r-[19px] border-r-white border-b-[20px] border-b-transparent transform rotate-0 absolute top-[2px] -left-[13px] -translate-y-[1px] rounded-t-md"></span>
                  </div>
                </div>
              )}

              <h3 className="font-medium md:text-xl uppercase flex items-center gap-2">
                <GiShoppingCart size={25} /> My Cart{' '}
                {totalPrice !== 0 && (
                  <span>
                    (<TotalProducts />)
                  </span>
                )}
              </h3>
              <span onClick={handleCloseDrawer} className="cursor-pointer">
                <TfiClose size={20} />
              </span>
            </div>
            {totalPrice === 0 ? (
              <div className="flex justify-center items-center w-full h-52">
                <div className="flex flex-col gap-4 items-center">
                  <IoBagOutline size={50} className="text-black" />
                  <p className="font-medium text-2xl">No Items In Cart</p>
                  <div className="">
                    <Link
                      href="/new-arrivals"
                      className="bg-main px-6 flex justify-center items-center rounded-2xl text-white hover:border-[#666666] border border-[#F6F6F6] h-[40px]"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Fragment>
                <div className="flex-1 overflow-x-auto custom-scroll">
                  <ul className="space-y-4">
                    {cartItems && cartItems.map((item: CartItem,index) => (
                      <li
                        key={index}
                        className="relative flex items-center bg-slate-50 border-dotted gap-3 p-4 w-full rounded-md font-helvetica"
                      >
                        <div className="w-[70px] h-[70px] font-helvetica">
                          <Image
                            src={variationProductImage(item)}
                            alt={item.posterImageAltText || item.name}
                            width={80}
                            height={80}
                            className="rounded-md w-full min-w-[70px] h-full"
                          />
                        </div>
                        <div className="grow">
                          <ProductName className="text-start !text-[16px]">
                            {item.name}
                          </ProductName>
                          <div className="flex justify-between flex-wrap gap-2 font-helvetica mb-1">
                            <span> Qty: {item.quantity.toLocaleString()}</span>
                            {(item.selectedfilter || item.selectedSize) ?
                              <ProductPrice className="flex gap-2 flex-wrap !text-[13px] text-nowrap">
                                <span>
                                  AED{' '}
                                  {(
                                    (Number(item.selectedSize?.price) || (Number(item.selectedfilter?.price) === 0) && item.discountPrice ? item.discountPrice : item.price) * item.quantity
                                  ).toLocaleString()}
                                </span>
                              </ProductPrice>
                              : (item.discountPrice !== item.price) && item.discountPrice > 0 ? (
                                <ProductPrice className="flex gap-2 flex-wrap !text-[13px] text-nowrap">
                                  <span>
                                    AED{' '}
                                    {(
                                      item?.discountPrice * item.quantity
                                    ).toLocaleString()}
                                  </span>
                                  <NormalText className="text-slate-400 line-through w-[70px] text-end text-nowrap !text-[13px]">
                                    AED{' '}
                                    {(
                                      item?.price * item.quantity
                                    ).toLocaleString()}
                                  </NormalText>
                                </ProductPrice>
                              ) : (
                                <ProductPrice className="flex gap-2 flex-wrap !text-[13px] text-nowrap">
                                  <span>
                                    AED{' '}
                                    {(
                                      item?.price * item.quantity
                                    ).toLocaleString()}
                                  </span>
                                  {/* <NormalText className="text-slate-400 line-through w-20 text-end text-nowrap !text-[15px]">
                            </NormalText> */}
                                </ProductPrice>
                              )}
                          </div>
                          {(item.selectedfilter || item.selectedSize) &&
                            <div className='flex flex-nowrap items-center justify-between gap-2'>
                              <div className='flex items-center gap-1 text-13'>
                                <span className='capitalize'>{item.filter?.at(0)?.heading}</span>
                                <span className='capitalize'>{item.selectedfilter?.name}</span>
                              </div>
                              <span className='text-13'>{item.selectedSize?.name}</span>
                            </div>}
                          <div
                            className="absolute top-2 right-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeProductFromCart(item);
                            }}
                          >
                            <RxCross2 />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`border-t-2 ${isMoblie ? 'py-2' : 'py-4'}`}>
                  <div className="flex flex-col gap-2 w-full">
                    <NormalText className="text-slate-400 flex justify-between">
                      Total
                      <ProductPrice className={`flex gap-2 ${isMoblie ? 'mb-0' : 'mb-4'}`}>
                        AED {totalPrice.toLocaleString()}
                      </ProductPrice>
                    </NormalText>
                    {isMoblie ? <div className="flex gap-2">
                      <Link href="/cart" className="flex gap-4 items-center w-full">
                        <CustomButtom
                          variant="light"
                          onClick={handleCloseDrawer}
                          className="border-[#EBEBEB] border rounded-2xl"
                        >
                          VIEW CART
                        </CustomButtom>
                      </Link>
                      <Link
                        href="/checkout"
                        className="flex gap-4 items-center rounded-2xl w-full"
                      >
                        <CustomButtom
                          variant="dark"
                          className="hover:text-white border-black border rounded-2xl"
                          onClick={handleCloseDrawer}
                        >
                          Check out
                        </CustomButtom>
                      </Link>
                    </div> : <div className="flex flex-col gap-2">
                      <Link href="/cart" className="flex gap-4 items-center">
                        <CustomButtom
                          variant="light"
                          onClick={handleCloseDrawer}
                          className="border-[#EBEBEB] border rounded-2xl"
                        >
                          VIEW CART
                        </CustomButtom>
                      </Link>
                      <Link
                        href="/checkout"
                        className="flex gap-4 items-center rounded-2xl"
                      >
                        <CustomButtom
                          variant="dark"
                          className="hover:text-white border-black border rounded-2xl"
                          onClick={handleCloseDrawer}
                        >
                          Check out
                        </CustomButtom>
                      </Link>
                    </div>}

                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      ) : (
        <div>
          {cartItems.map((item: any,index) => (
            <div
              className="shadow rounded-md w-full p-2 mt-3 flex flex-wrap md:flex-nowrap justify-between items-center bg-white "
              key={index}
            >
              <div className="flex items-center gap-4 w-full">
                <Link href={ChangeUrlHandler(item as any)}>
                  <div className="w-24 h-24">
                    <Image
                      width={isCheckoutPage ? 50 : 100}
                      height={isCheckoutPage ? 50 : 100}
                      src={variationProductImage(item)}
                      alt={item.posterImageAltText || item.name}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                </Link>
                <div className="w-full">
                  <div className='flex flex-col gap-1'>
                    <Link href={ChangeUrlHandler(item as any)}>
                      <span className="text-16 xl:text-18">{item.name}</span>
                    </Link>
                    {(item.selectedfilter || item.selectedSize) &&
                      <>
                        <div className='flex items-center gap-1 text-13'>
                          <span className='capitalize'>{item.filter?.at(0)?.heading}</span>
                          <span className='capitalize'>{item.selectedfilter?.name}</span>
                        </div>
                        <span className='text-13'>{item.selectedSize?.name}</span>
                      </>
                    }
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap lg:hidden justify-between items-center gap-2 md:gap-3 pr-4">
                    {(item.selectedfilter || item.selectedSize) ?
                      <ProductPrice className="flex gap-2 flex-wrap !text-[13px] text-nowrap">
                        <span>
                          AED{' '}
                          {(
                            (Number(item.selectedSize?.price) || (Number(item.selectedfilter?.price) === 0) && item.discountPrice ? item.discountPrice : item.price) * item.quantity
                          ).toLocaleString()}
                        </span>
                      </ProductPrice> :
                      (item.discountPrice !== item.price) && item.discountPrice > 0 ? (
                        <>
                          <p className="text-16 xs:text-18 font-bold text-nowrap">
                            AED <span>{item?.discountPrice * item.quantity}</span>
                          </p>
                          <p className="text-14 font-normal text-nowrap line-through text-[#A5A5A5] w-16">
                            AED <span>{item?.price * item.quantity}</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-16 xs:text-18 font-bold text-nowrap">
                            AED <span>{item?.price * item.quantity}</span>
                          </p>
                          <p className="text-[18px] font-bold w-16"></p>
                        </>
                      )}
                    {!isCheckoutPage && (
                      <div className="flex items-center gap-4">
                        <Link href={ChangeUrlHandler(item as any)}>
                          <MdModeEdit className="cursor-pointer" size={20} />
                        </Link>
                        <FaTrash
                          className="cursor-pointer"
                          size={15}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProductFromCart(item);
                          }}
                        />
                      </div>
                    )}
                    {!isCheckoutPage && (
                      <Counter
                        count={item.quantity}
                        stock={item.stock}
                        onIncrement={() => {
                          const updatedItem = { ...item, quantity: item.quantity + 1 };
                          updateProductQuantity(updatedItem);
                        }}
                        onDecrement={() => {
                          const updatedItem = { ...item, quantity: item.quantity - 1 };
                          updateProductQuantity(updatedItem);
                        }}
                      />


                    )}
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-between gap-2 xl:gap-6 pr-4 w-full">
                <div className="hidden lg:block">
                  {!isCheckoutPage && (
                    <Counter
                      count={item.quantity}
                      stock={item.stock}
                      onIncrement={() => {
                        const updatedItem = { ...item, quantity: item.quantity + 1 };
                        updateProductQuantity(updatedItem);
                      }}
                      onDecrement={() => {
                        const updatedItem = { ...item, quantity: item.quantity - 1 };
                        updateProductQuantity(updatedItem);
                      }}
                    />


                  )}
                </div>
                <div className="w-52 xl:w-64 flex gap-2 xl:gap-4 items-center justify-between">
                  {(item.selectedfilter || item.selectedSize) ?
                    <ProductPrice className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap w-full text-end">
                      <span>
                        AED{' '}
                        {(
                          (Number(item.selectedSize?.price) || (Number(item.selectedfilter?.price) === 0) && item.discountPrice ? item.discountPrice : item.price) * item.quantity
                        ).toLocaleString()}
                      </span>
                    </ProductPrice>
                    : (item.discountPrice !== item.price) && item.discountPrice > 0 ? (
                      <>
                        <p className="text-12 xl:text-14 text-nowrap font-normal text-end w-16 line-through text-[#A5A5A5]">
                          AED{' '}
                          <span>
                            {(item?.price * item.quantity).toLocaleString()}
                          </span>
                        </p>
                        <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap">
                          AED{' '}
                          <span>
                            {(
                              item?.discountPrice * item.quantity
                            ).toLocaleString()}
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap w-full text-end">
                          AED{' '}
                          <span>
                            {(item?.price * item.quantity).toLocaleString()}
                          </span>
                        </p>
                      </>
                    )}
                  <div>
                    {!isCheckoutPage && (
                      <div className="flex items-center gap-2">
                        {/* <Link href={`/product/${generateSlug(item.name)}`}>
          <MdModeEdit className="cursor-pointer" size={20} />
        </Link> */}
                        <FaTrash
                          className="cursor-pointer"
                          size={15}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProductFromCart(item);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
export default CartItems;
