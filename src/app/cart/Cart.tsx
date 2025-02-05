'use client';
import FeatureSlider from '@/components/card-slider/feature-slider';
import CartOrder from '@/components/cart-order/cart-order';
import CartItems from '@/components/cart/items';
import Services from '@/components/services/services';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { cartbredcrumbs } from '@/data/data';
import { State } from '@/redux/store';
import { IProduct } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import { IoBagOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const Cart = ({ similarProducts }: { similarProducts: IProduct[] }) => {
  const cartItems = useSelector((state: State) => state.cart.items);
  return (
    <>
      <TopHero breadcrumbs={cartbredcrumbs} />
      
      <Container className="mt-10 flex flex-wrap md:flex-nowrap gap-0 md:gap-10">
        {(cartItems && cartItems.length > 0 )? (
          <>
            <div className="w-full md:w-7/12 space-y-4">
              <CartItems isCartPage={true} />
              <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-between items-center">
                <div className="">
                  <Link
                    href="/new-arrivals"
                    className="bg-main px-6 flex justify-center items-center rounded-2xl text-white h-[60px] hover:border-[#666666] border border-[#F6F6F6] font-helvetica"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-5/12">
              <CartOrder />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-96">
            <div className="flex flex-col gap-4 items-center">
              <IoBagOutline size={100} className="text-black" />
              <p className="font-medium text-2xl font-helvetica">
                No Items In Cart
              </p>
              <div className="">
                <Link
                  href="/new-arrivals"
                  className="bg-main px-6 flex justify-center items-center rounded-2xl text-white h-[60px] hover:border-[#666666] border border-[#F6F6F6] font-helvetica"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>


      <Container className="my-10">
        <p className="text-xl  md:text-[40px] font-Helveticalight text-center">
          Similar Products
        </p>
        <FeatureSlider similarProducts={similarProducts} title={false} />
      </Container>
      <Services />
    </>
  );
};

export default Cart;
