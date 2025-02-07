'use client';
import React from 'react';
import Container from '../ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { SaleBannerData } from '@/data/data';

const NewArrival = () => {
  return (
    <section className="bg-lightbackground mt-6 mb-8 rounded-2xl">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={false}

        className="w-full"
      >
        {SaleBannerData.map((item, index) => (
          <SwiperSlide key={index}>
            <Container className="flex flex-wrap-reverse justify-center md:justify-between gap-4 md:gap-0 items-center">
              <div className="flex items-center justify-center md:justify-start w-full md:w-1/2 pb-7 md:pb-0">
                <div className="text-center md:text-start sm:space-y-3">
                  <Link
                    href={item.link}
                    target="_blank"
                    className="border border-[#707070] text-[#707070] font-thin font-Helveticalight px-2 py-1 rounded-2xl hover:bg-main hover:text-white transition text-base sm:text-2xl lg:text-3xl bg-white"
                  >
                    {item.title}
                  </Link>
                  <div className="my-2 text-center">
                    <h3 className="font-extrabold text-xs sm:text-base lg:text-lg pt-2 lg:pt-4">
                      {item.productName}
                    </h3>
                    <p className="font-extrabold text-sm sm:text-lg lg:text-xl">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-full">
                <Link href={item.link}>
                  <Image
                    src={item.imageSrc}
                    alt={item.productName}
                    className="w-full h-full object-contain md:h-[400px]"
                    height={600}
                    width={600}
                  />
                </Link>
              </div>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrival;
