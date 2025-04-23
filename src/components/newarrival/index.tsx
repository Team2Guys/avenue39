'use client';

import React from 'react';
import Container from '../ui/Container';
import ContainerFluid from '../ui/ContainerFluid';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { SaleBannerData } from '@/data/data';

const NewArrival = () => {
  return (
    <ContainerFluid className="bg-lightbackground mt-6 mb-8 rounded-2xl">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        speed={1500}
        loop={false}
        className="w-full"
      >
        {SaleBannerData.map((item, index) => (
          <SwiperSlide key={index}>
            <Container className="flex flex-wrap-reverse justify-center md:justify-between items-center gap-4 md:gap-0">
              {/* Left (Text & Link) */}
              <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start pb-7 md:pb-0">
                <div className="text-center md:text-left space-y-2 sm:space-y-3">
                  <Link
                    href={item.link}
                    className="inline-block border border-[#707070] text-[#707070] font-Helveticalight px-3 py-1 rounded-2xl bg-white hover:bg-main hover:text-white transition text-base sm:text-2xl lg:text-3xl"
                  >
                    {item.title}
                  </Link>
                  <div className="pt-2 lg:pt-4">
                    <h3 className="font-extrabold text-xs sm:text-base lg:text-lg">
                      {item.productName}
                    </h3>
                    <p className="font-extrabold text-sm sm:text-lg lg:text-xl">
                    <span className="font-currency font-bold"></span> {item.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right (Image) */}
              <div className="w-full md:w-1/2 h-full">
                <Link href={item.link}>
                  <Image
                    src={item.imageSrc}
                    alt={item.productName || 'Product Image'}
                    className="mx-auto md:mx-0 h-[200px] sm:h-[300px] object-contain md:h-[400px]"
                    width={600}
                    height={600}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                  />
                </Link>
              </div>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </ContainerFluid>
  );
};

export default NewArrival;
