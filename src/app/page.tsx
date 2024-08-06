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
import TimerSlider from '@/components/timer-slider/timer-slider';
export default function Home() {
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
      <TimerSlider/>
      <Container className="mt-4 flex justify-center">
        <DiscountCard productItems={chairProducts} />
      </Container>
      <HotProductSlider slideritems={cards} />
      <section className="h-[400px] md:h-[600px] mt-4">
        <div
          className="w-full h-full flex justify-center items-center"
          style={{
            backgroundImage: `url(${banner4.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center">
            <p className="text-xs sm:text-14 font-normal text-primary-foreground text-white">
              Get Discount Up to 80%
            </p>
            <h3 className="font-semibold text-xl sm:text-2xl mt-1 text-white">
              White Minimalist Combo Sofa
            </h3>
            <Button
              className="text-black rounded-full px-9 mt-3 font-normal"
              variant={'link'}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </section>
      <Testimonial testimonialitems={testimonialcards} />
    </Fragment>
  );
}
