import MenuBar from '@/components/nav/menu-bar';
import Navbar from '@/components/nav/nav-bar';
import TopNav from '@/components/nav/top-nav';
import Services from '@/components/services/services';
import { IHome } from '@/types/types';
import React, { Fragment } from 'react';
import SimpleSlider from '@/components/heroslider/slider';

import DiscountCard from '@/components/ui/discount-card';
import { chairProducts, discountProducts } from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import SaleBanner from '@/components/discount-banner/sale-banner';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import banner4 from '@assets/images/banners/banner4.png';
import TimerSlider from '@/components/timer-slider/timer-slider';
import CardsTabes from '@/components/card-tabs/card-slider';

const HomePage = (props: IHome) => {
  return (
    <Fragment>
      <TopNav />
      <Navbar />
      <MenuBar />
      <SimpleSlider />
      <Services />
      <section className="px-4 pb-2 my-4 overflow-x-auto discount-product-wrapper">
        <DiscountCard productItems={discountProducts} />
      </section>
      <SofaBanner />
      <SaleBanner />
      <CardsTabes />
      <Container className="mt-4 flex justify-center">
        <DiscountCard productItems={chairProducts} />
      </Container>
      <section className="h-[400px] md:h-[600px] lg:h-[700] mt-4">
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
              variant={'secondary'}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </section>
      <TimerSlider />
    </Fragment>
  );
};

export default HomePage;
