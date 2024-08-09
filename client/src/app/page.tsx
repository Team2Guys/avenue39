'use client';
import Services from '@/components/services/services';
import React, { Fragment } from 'react';
import SimpleSlider from '@/components/heroslider/slider';
import DiscountCard from '@/components/ui/discount-card';
import {
  cards,
  chairProducts,
  discountProducts,
  testimonialcards,
} from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import SaleBanner from '@/components/discount-banner/sale-banner';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import banner4 from '@assets/images/banners/banner4.png';
import HotProductSlider from '@/components/card-slider/hot-product-slider';
import Testimonial from '@/components/testimonial/testimonial';
import CardsTabes from '@/components/card-tabs/card-slider';
import TimerSlider from '@/components/timer-slider/TimerSlider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const handleBuyNowClick = () => {
    router.push('/checkout');
  };
  return (
    <Fragment>
      <SimpleSlider />
      <Services />
      <section className="px-4 pb-2 my-4 overflow-x-auto discount-product-wrapper custom-scroll">
        <DiscountCard productItems={discountProducts} />
      </section>
      <SofaBanner />
      <SaleBanner />
      <CardsTabes />
      <TimerSlider />
      <Container className="mt-4 flex justify-center">
        <DiscountCard productItems={chairProducts} />
      </Container>
      <HotProductSlider />
      <section className="h-[400px] md:h-[600px] mt-4">
        <div
          className="w-full h-full flex justify-center items-center"
          style={{
            backgroundImage: `url(${banner4.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        >
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-14 lg:text-lg font-normal text-primary-foreground text-white">
              Get Discount Up to 80%
            </p>
            <h3 className="font-semibold lg:text-4xl sm:text-2xl mt-1 text-white">
              White Minimalist Combo Sofa
            </h3>
            <div className="lg:pt-3">
              <Link
                href="/products"
                className=" bg-white text-black font-semibold text-base py-2 px-8 rounded-2xl hover:bg-black hover:text-white "
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Testimonial testimonialitems={testimonialcards} />
    </Fragment>
  );
}
