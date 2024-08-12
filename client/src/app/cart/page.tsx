import FeatureSlider from '@/components/card-slider/feature-slider';
import CartOrder from '@/components/cart-order/cart-order';
import CartItems from '@/components/cart/items';
import Coupan from '@/components/coupan-code';
import Services from '@/components/services/services';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { features, products } from '@/data';
import { cartbredcrumbs } from '@/data/data';
import Link from 'next/link';
import React from 'react';

const Cart = () => {
  return (
    <>
      <TopHero breadcrumbs={cartbredcrumbs} />
      <Container className="mt-10 flex flex-wrap md:flex-nowrap gap-0 md:gap-10">
        <div className="w-full md:w-7/12 space-y-4">
          <CartItems isCartPage={true} />
          <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-between items-center">
            <div className="">{/* <Coupan /> */}</div>
            <div className="">
              <Link
                href="/"
                className="bg-[#F6F6F6] px-6 flex justify-center items-center text-[#666666] h-[60px]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-5/12">
          <CartOrder />
        </div>
      </Container>
      <Container className="mt-10 mb-20">
        <p className="text-[51px] font-medium text-center">Similar Products</p>
        <FeatureSlider />
      </Container>
      <Services />
    </>
  );
};

export default Cart;
