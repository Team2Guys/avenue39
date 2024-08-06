import React from 'react';
import Container from '../ui/Container';
import { Button } from '../ui/button';
import Image from 'next/image';
import Salebanner from '@assets/images/banners/Sale-banner.png';

const SaleBanner: React.FC = () => {
  return (
    <section className="bg-lightbackground mt-4 ">
      <Container className="flex flex-wrap-reverse justify-center md:justify-between gap-4 md:gap-0 items-center">
        <div className='flex items-center justify-center md:justify-start gap-4 w-full md:w-1/2 mb-6 md:mb-0'>
            <h3 className='text-red-500 text-7xl'>40%</h3>
          <div>
            <p className='text-primary-foreground'>Discount</p>
            <h4 className='text-2xl'>Florence TV Cabinet</h4>
            <Button className="mt-2 px-9 rounded-full" variant={'default'}>
              Buy Now
            </Button>
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <Image src={Salebanner} alt="sale banner" className="w-full h-full" />
        </div>
      </Container>
    </section>
  );
};

export default SaleBanner;
