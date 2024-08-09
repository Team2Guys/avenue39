'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store';
import {
  addItem,
  removeItem,
  selectTotalPrice,
  updateItemQuantity,
} from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import CustomButtom from '../ui/custom-button';
import Counter from '../counter';
import { IoBagOutline, IoCloseSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { TfiClose } from 'react-icons/tfi';
import { TotalProducts } from '@/config';
import { closeDrawer, openDrawer } from '@/redux/slices/drawer';

interface ICartItems {
  isCartPage?: boolean;
  isCheckoutPage?: boolean;
}

const CartItems = ({ isCartPage, isCheckoutPage }: ICartItems) => {
  const navigate = useRouter();
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );
  const drawerState = useSelector((state: State) => state.drawer);

  const removeProductFromCart = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  const updateProductQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(closeDrawer());
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [drawerState, dispatch]);

  return (
    <React.Fragment>
      {!isCartPage ? (
        <Sheet open={drawerState}>
          <SheetTrigger asChild>
            <div
              className="bg-red-500 lg:w-14 w-12 h-10 rounded-3xl relative flex justify-center items-center text-white cursor-pointer"
              onClick={() => navigate.push('/cart')}
            >
              <IoBagOutline size={25} />
              <div className="w-4 h-4 rounded-full bg-black flex justify-center items-center absolute top-2 right-2 text-10">
                <TotalProducts />
              </div>
            </div>
          </SheetTrigger>
          <SheetOverlay
            className="bg-white opacity-80 z-[51]"
            onClick={handleCloseDrawer}
          />
          <SheetContent className="sm:max-w-lg z-[52] border-s border-black py-10 ps-10 pe-0 flex flex-col">
            <SheetHeader className="flex flex-row items-center justify-between border-b-2 py-8 pe-12">
              <SheetTitle className="font-medium text-3xl">
                My Cart (<TotalProducts />)
              </SheetTitle>
              <SheetClose
                className="flex gap-4 items-center"
                onClick={handleCloseDrawer}
              >
                <span className="font-medium text-2xl">Close</span>
                <TfiClose size={25} />
              </SheetClose>
            </SheetHeader>

            <div className="flex-1 overflow-auto mr-6 scrollbar-hidden">
              <ul className="space-y-4">
                {cartItems.map((item: any) => (
                  <li
                    key={item.id}
                    className="relative flex items-center bg-slate-50 border-dotted gap-3 p-4 w-full rounded-md"
                  >
                    {/* <Image
                      src={item.image.src}
                      alt={item.name}
                      width={80}
                      height={80}
                    /> */}

                    <div>
                      <ProductName>{item.name}</ProductName>
                      <div className="flex justify-between">
                        <span> Qty {item.quantity}</span>
                        <ProductPrice className="flex gap-2 mb-4">
                          Dhs {item?.discount * item.quantity}
                          <NormalText className="text-slate-400 line-through">
                            {item?.price * item.quantity}
                          </NormalText>
                        </ProductPrice>
                      </div>
                      <div
                        className="absolute top-0 right-0 cursor-pointer"
                        onClick={() => removeProductFromCart(item.id)}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t-2 py-4 mr-6">
              <div className="flex flex-col gap-2 w-full">
                <NormalText className="text-slate-400 flex justify-between">
                  Subtotal
                  <ProductPrice className="flex gap-2 mb-4">
                    Dhs {totalPrice}
                  </ProductPrice>
                </NormalText>
                <div className="flex flex-col gap-2">
                  <SheetClose
                    className="flex gap-4 items-center"
                    onClick={() => navigate.push('/cart')}
                  >
                    <CustomButtom variant="light">VIEW CART</CustomButtom>
                  </SheetClose>
                  <SheetClose
                    className="flex gap-4 items-center"
                    onClick={() => navigate.push('/checkout')}
                  >
                    <CustomButtom variant="dark">Check out</CustomButtom>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div
              className="shadow rounded-md w-full p-2 mt-3 flex flex-wrap md:flex-nowrap justify-between items-center bg-white "
              key={item.id}
            >
              <div className="flex items-center gap-4">
                <Image
                  width={isCheckoutPage ? 50 : 100}
                  height={isCheckoutPage ? 50 : 100}
                  // src={item.posterImageUrl}
                  src={
                    'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set3.jpg'
                  }
                  alt={item.name}
                />
                <div className="">
                  <p className="text-16 xl:text-18">{item.name}</p>
                  <div className="flex flex-wrap md:flex-nowrap lg:hidden justify-between items-center gap-2 md:gap-6 pr-4">
                    <p className="text-[18px] font-bold">
                      Dhs.<span>{item?.discount * item.quantity}</span>
                    </p>
                    <p className="text-14 font-normal line-through text-[#A5A5A5]">
                      Dhs.<span> {item?.price * item.quantity}</span>
                    </p>
                    <IoCloseSharp
                      className="cursor-pointer"
                      size={20}
                      onClick={() => removeProductFromCart(item.id)}
                    />
                    <div>
                      {!isCheckoutPage && (
                        <Counter
                          count={item.quantity}
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
              </div>

              <div className="hidden lg:block">
                {!isCheckoutPage && (
                  <Counter
                    count={item.quantity}
                    onIncrement={() =>
                      updateProductQuantity(item.id, item.quantity + 1)
                    }
                    onDecrement={() =>
                      updateProductQuantity(item.id, item.quantity - 1)
                    }
                  />
                )}
              </div>
              <div className="hidden lg:flex items-center gap-6 pr-4">
                <p className="text-16 xl:text-[22px] font-bold">
                  AED.<span>{item?.discount * item.quantity}</span>
                </p>
                <p className="text-12 xl:text-16 font-normal line-through text-[#A5A5A5]">
                  AED.<span>{item?.price * item.quantity}</span>
                </p>
                <IoCloseSharp
                  className="cursor-pointer"
                  size={25}
                  onClick={() => removeProductFromCart(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default CartItems;
