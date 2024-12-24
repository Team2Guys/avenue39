'use client';

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store';
import {
  removeItem,
  selectTotalPrice,
  updateItemQuantity,
} from '@cartSlice/index';
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import CustomButtom from '../ui/custom-button';
import Counter from '../counter';
import { IoBagOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { TfiClose } from 'react-icons/tfi';
import { generateSlug, TotalProducts } from '@/config';
import { closeDrawer, openDrawer } from '@/redux/slices/drawer';
import { FaTrash } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import Link from 'next/link';

interface ICartItems {
  isCartPage?: boolean;
  isCheckoutPage?: boolean;
}

const CartItems = ({ isCartPage, isCheckoutPage }: ICartItems) => {
  const navigate = useRouter();
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );
  const userDetails = useSelector(
      (state: State) => state.usrSlice.loggedInUser,
    );
  const drawerState = useSelector((state: State) => state.drawer);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const removeProductFromCart = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();  // Stop event bubbling
    dispatch(removeItem(id));  // Remove product from the cart
  };
  

  const updateProductQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

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
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
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
              className={`xl:w-14 w-12 h-10 rounded-3xl relative flex justify-center items-center  cursor-pointer ${cartItems.length > 0 ? 'text-white bg-main' : 'text-black  border-black'}`}
              onClick={handleOpenDrawer}
            >
              <IoBagOutline size={25} />
              {cartItems.length > 0 && (
                <div className="w-4 h-4 rounded-full bg-black text-white flex justify-center items-center absolute top-2 right-2 text-10">
                  <TotalProducts />
                </div>
              )}
            </div>
          </div>
          <div className={`w-72 xsm:w-80 z-[52] border absolute top-[65px] ${userDetails ? '-right-[140px] xl:-right-[135px]' : '-right-[30px]'}  -right-[135px] h-[500px] border-[#0000002e] rounded-md py-5 px-5 pe-0 flex flex-col bg-white ${drawerState ? 'block' : 'hidden'}`} onMouseEnter={handleEnterDrawer} onMouseLeave={handleLeaveDrawer}>
            <div className="space-y-0 flex flex-row items-center justify-between border-b-2 pb-6 relative pe-6">
              <div className={`absolute -top-[23px] ${userDetails ? 'right-1/2' : 'right-[40px]'}`}>
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-[#0000002e] border-b-[20px] border-b-transparent transform -rotate-45 relative">
                  <span className='w-0 h-0 border-l-[13px] border-l-transparent border-r-[19px] border-r-white border-b-[20px] border-b-transparent transform rotate-0 absolute top-[2px] -left-[13px] -translate-y-[1px]'></span>
                </div>
              </div>

              <h3 className="font-medium text-3xl">
                My Cart (<TotalProducts />)
              </h3>
              <span
                onClick={handleCloseDrawer}
                className='cursor-pointer'
              >
                <TfiClose size={25} />
              </span>
            </div>

            <div className="flex-1 overflow-auto mr-6 scrollbar-hidden">
              <ul className="space-y-4">
                {cartItems.map((item: any) => (
                  <li
                    key={item.id}
                    className="relative flex items-center bg-slate-50 border-dotted gap-3 p-4 w-full rounded-md"
                  >
                    <div className="w-[70px] h-[70px]">
                      <Image
                        src={item.posterImageUrl}
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
                      <div className="flex justify-between flex-wrap gap-2">
                        <span> Qty: {item.quantity}</span>
                        {item?.discountPrice > 0 ? (
                          <ProductPrice className="flex gap-2 flex-wrap mb-4 !text-[15px] text-nowrap">
                            <span>
                              AED {item?.discountPrice * item.quantity}
                            </span>
                            <NormalText className="text-slate-400 line-through w-[70px] text-end text-nowrap !text-[15px]">
                              AED {item?.price * item.quantity}
                            </NormalText>
                          </ProductPrice>
                        ) : (
                          <ProductPrice className="flex gap-2 flex-wrap mb-4 !text-[15px] text-nowrap">
                            <span>AED {item?.price * item.quantity}</span>
                            {/* <NormalText className="text-slate-400 line-through w-20 text-end text-nowrap !text-[15px]">

                            </NormalText> */}
                          </ProductPrice>
                        )}
                      </div>
                      <div
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={(e) => removeProductFromCart(item.id, e)}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t-2 py-4 mr-6">
              <div className="flex flex-col gap-2 w-full">
                <NormalText className="text-slate-400 flex justify-between">
                  Subtotal
                  <ProductPrice className="flex gap-2 mb-4">
                    AED {totalPrice}
                  </ProductPrice>
                </NormalText>
                <div className="flex flex-col gap-2">
                  <Link href='/cart'
                    className="flex gap-4 items-center"
                  >
                    <CustomButtom variant="light" onClick={handleCloseDrawer} className='border-[#EBEBEB] border'>VIEW CART</CustomButtom>
                  </Link>
                  <Link href='/checkout'
                    className="flex gap-4 items-center"
                  >
                    <CustomButtom
                      variant="dark"
                      className="hover:text-white border-black border"
                      onClick={handleCloseDrawer}
                    >
                      Check out
                    </CustomButtom>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div
              className="shadow rounded-md w-full p-2 mt-3 flex flex-wrap md:flex-nowrap justify-between items-center bg-white "
              key={item.id}
            >
              <div className="flex items-center gap-4 w-full">
                <Link href={`/product/${generateSlug(item.name)}`}>
                  <div className="w-24 h-24">
                    <Image
                      width={isCheckoutPage ? 50 : 100}
                      height={isCheckoutPage ? 50 : 100}
                      src={item.posterImageUrl}

                      alt={item.posterImageAltText || item.name}
                      className='rounded-md object-cover w-full h-full'

                    />
                  </div>
                </Link>
                <div className="w-full">
                  <Link href={`/product/${generateSlug(item.name)}`}>
                    <span className="text-16 xl:text-18">{item.name}</span>
                  </Link>
                  <div className="flex flex-wrap md:flex-nowrap lg:hidden justify-between items-center gap-2 md:gap-3 pr-4">
                    {item.discountPrice > 0 ? (
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
                        <Link href={`/product/${generateSlug(item.name)}`}>
                          <MdModeEdit className="cursor-pointer" size={20} />
                        </Link>
                        <FaTrash
                          className="cursor-pointer"
                          size={15}
                          onClick={(e) => removeProductFromCart(item.id, e)}
                        />
                      </div>
                    )}
                    {!isCheckoutPage && (
                      <Counter
                        count={item.quantity}
                        stock={item.stock}
                        onIncrement={() =>
                          updateProductQuantity(item.id, item.quantity + 1)
                        }
                        onDecrement={() =>
                          updateProductQuantity(item.id, item.quantity - 1)
                        }
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
                      onIncrement={() =>
                        updateProductQuantity(item.id, item.quantity + 1)
                      }
                      onDecrement={() =>
                        updateProductQuantity(item.id, item.quantity - 1)
                      }
                    />
                  )}
                </div>
                <div className="w-52 xl:w-64 flex gap-2 xl:gap-4 items-center justify-between">
                  {item.discountPrice > 0 ? (
                    <>
                      <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap">
                        AED <span>{item?.discountPrice * item.quantity}</span>
                      </p>
                      <p className="text-12 xl:text-14 text-nowrap font-normal text-end w-16 line-through text-[#A5A5A5]">
                        AED <span>{item?.price * item.quantity}</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap">
                        AED <span>{item?.price * item.quantity}</span>
                      </p>
                      <p className="w-16"></p>
                    </>
                  )}
                  {!isCheckoutPage && (
                    <div className="flex items-center gap-2">
                      <Link href={`/product/${generateSlug(item.name)}`}>
                        <MdModeEdit className="cursor-pointer" size={20} />
                      </Link>
                      <FaTrash
                        className="cursor-pointer"
                        size={15}
                        onClick={(e) => removeProductFromCart(item.id, e)}
                      />
                    </div>
                  )}
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
