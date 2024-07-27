import CartOrder from '@/components/cart-order/cart-order';
import Coupan from '@/components/coupan-code';
import OrderPlace from '@/components/order-place/order-place';
import Services from '@/components/services/services';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { products } from '@/data';
import { cartbredcrumbs } from '@/data/data';
import Link from 'next/link';
import React from 'react';

const Cart = () => {
  return (
    <>
      <TopHero breadcrumbs={cartbredcrumbs} />
      <Container className="mt-10 flex flex-wrap md:flex-nowrap gap-0 md:gap-10">
        <div className="w-full md:w-7/12 space-y-4">
          {products.map((product) => (
            <OrderPlace key={product.id} product={product} />
          ))}
          <div className='flex flex-wrap justify-between'>
            <div className='w-full md:w-6/12'>
            <Coupan />
            </div>
            <div className='w-full md:w-3/12 mt-4 md:mt-0'>
            <Link href="/" className='bg-[#F6F6F6] px-6 flex justify-center items-center text-[#666666] h-[73px]'>Continue Shopping</Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-5/12">
        <CartOrder/>
        </div>

      </Container>
      <Services />
    </>
  );
};

export default Cart;
