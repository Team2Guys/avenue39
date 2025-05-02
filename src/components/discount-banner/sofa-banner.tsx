'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContainerFluid from '../ui/ContainerFluid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { SofaBannerProps } from '@/types/interfaces';
import dynamic from 'next/dynamic';
const BannerSwiper = dynamic(() => import('./BannerSwiper'),{ssr: false})

const SofaBanner = ({sofaDataSlides}: SofaBannerProps) => {


  return (
    <ContainerFluid className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-3 px-2 md:px-0 mt-3">
      {/* Left Swiper */}
      <div className="sofa_slider1 bg-lightforeground rounded-2xl">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          speed={1500}
          pagination={{ clickable: true }}
          loop
        >
          {sofaDataSlides.map((slide: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex flex-wrap items-center justify-center px-2 pb-4 sm:ps-20 md:ps-6 lg:ps-8 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] py-5 md:py-0">
                <div className="w-full lg:w-[30%] text-center lg:text-left max-xs:pt-5">
                  <Link
                    href={slide.link}
                    className="py-1 px-3 block w-fit bg-white text-[14px] md:text-2xl lg:text-sm xl:text-xl 2xl:text-3xl rounded-2xl text-black border border-gray-500 hover:bg-main font-Helveticalight 2xl:whitespace-nowrap mx-auto lg:mx-0"
                  >
                    Shop Best Sellers
                  </Link>
                  <p className="font-bold text-lg mt-3">{slide.title}</p>
                  <p className="text-lg font-bold text-black mt-1"><span className="font-currency font-bold"></span> {slide.product_price}</p>
                </div>

                <div className="w-full lg:w-[70%] relative flex justify-center h-72 xs:h-[400px] 2xl:h-[500px]">
                  <Link href={slide.link} className='lg:w-full xl:w-fit'>
                    <Image
                      src={slide.image}
                      width={500}
                      height={500}
                      alt={slide.title}
                      className="w-full h-full"
                      loading='lazy'
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Banners */}
      <BannerSwiper />

    </ContainerFluid>
  );
};

export default SofaBanner;
