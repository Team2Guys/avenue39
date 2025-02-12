'use client';
import { ColorBannerData } from '@/data/products';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
interface IPROPS {
  Bannerclas?:any

}

const ColorBanner: React.FC<IPROPS> = ({Bannerclas}) => {
  const [isWide, setIsWide] = useState<number>(window.innerWidth);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
const isMobile = windowWidth < 770 ? true:false
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth > 1720) {
      const newWidth = 1720 - windowWidth * 0.7;
      setIsWide(newWidth - 60);
    } else {
      if (windowWidth >= 1024) {
        const newWidth = windowWidth - windowWidth * 0.7;
        setIsWide(newWidth - 60);
      } else if (windowWidth > 500) {
        const newWidth = windowWidth - windowWidth * 0.5;
        setIsWide(newWidth - 48);
      } else {
        setIsWide(windowWidth - 10);
      }
    }
  }, [windowWidth]);

console.log(windowWidth, "windowWidth")

  return (
    <section className={` py-3 xs:py-5 md:pt-10 md:pb-6 w-full bg-white sofa_swiper ${Bannerclas && isMobile ? "main_container" : ''}`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        speed={1500}
        pagination={{
          clickable: true,
        }}
        loop={false}
        className={`custom-swiper ${Bannerclas && isMobile ? Bannerclas : ''}`}
      >
        {ColorBannerData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full ">
              <div className="flex flex-col justify-center items-center lg:w-[30%] w-full pb-2 text-center mx-auto">
                <div style={{ width: `${isWide}px` }}>
                  <div className="font-Helveticalight">
                    <h1 className="text-2xl pb-1 uppercase font-semibold">
                      {slide.Heading}
                    </h1>
                    <p className="text-18 font-extralight h-28 xs:h-[170px] sm:h-32">
                      {slide.Description}
                    </p>
                  </div>
                  <div className="w-fit lg:h-full xl:mt-20 md:mt-10 mt-6 px-2 mx-auto">
                    <Image
                      src={slide.imageUrl2}
                      className="w-full h-16 md:h-20"
                      alt="Left Image"
                      width={1200}
                      height={1200}
                      quality={100}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-[70%] w-full h-full">
                <Link href={slide.link} className='block h-full w-full'>
                  <Image
                    src={slide.imageUrl}
                    className="w-full h-full"
                    alt="Right Image"
                    width={1200}
                    height={1200}
                    quality={100}
                  />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ColorBanner;
