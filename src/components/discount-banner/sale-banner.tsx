'use client';
import React from 'react';
import Container from '../ui/Container';
import Image from 'next/image';
import Salebanner from '@assets/images/banners/dsffsdf.webp';
import Link from 'next/link';

const SaleBanner: React.FC = () => {
  return (
    <section className="bg-lightbackground mt-4">
      <Container className="flex flex-wrap-reverse justify-center md:justify-between gap-4 md:gap-0 items-center ">
        <div className="flex items-center justify-center md:justify-start gap-3 w-full md:w-1/2 pb-6 md:pb-0">
          <div className="text-center md:text-start space-y-3">
            <p className="text-xs sm:text-14 font-normal text-black">Living</p>
            <h3 className="font-semibold text-xl sm:text-2xl mt-1">
              Torino Coffee Table
            </h3>
            <div className="lg:pt-2">
              <Link
                href="/product/torino-coffee-table"
                className="bg-black py-2 px-6 rounded-full text-white hover:bg-main"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full">
          <Image
            src={Salebanner}
            alt="Torino Coffee Table"
            className="w-full h-full"
          />
        </div>
      </Container>
    </section>
  );
};

export default SaleBanner;
