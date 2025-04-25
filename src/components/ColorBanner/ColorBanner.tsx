'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContainerFluid from '../ui/ContainerFluid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const ColorBanner = ({ Bannerclas, ColorBannerData }: any) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isWide, setIsWide] = useState<number>(250);


  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 770);

      if (width > 2000) {
        setIsWide(270);
      } else if (width > 1720) {
        setIsWide(1720 - width * 0.7 - 60);
      } else if (width >= 1024) {
        setIsWide(width - width * 0.7 - 60);
      } else if (width > 500) {
        setIsWide(width - width * 0.5 - 48);
      } else {
        setIsWide(width - 10);
      }
    };

    updateSizes();
    const handleResize = () => {
      clearTimeout((handleResize as any)._timer);
      (handleResize as any)._timer = setTimeout(updateSizes, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);


  return (
    <ContainerFluid
      className={`mx-auto py-3 xs:py-5 md:pt-10 md:pb-6 w-full bg-white sofa_swiper ${Bannerclas && isMobile ? 'main_container' : ''
        }`}
    >
       <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        speed={1500}
        pagination={{ clickable: true }}
        loop={false}
        className={`custom-swiper ${Bannerclas && isMobile ? Bannerclas : ''}`}
      >
        {ColorBannerData.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full py-10 sm:py-0">
              <div className="flex flex-col justify-center items-center lg:w-[30%] w-full pb-2 text-center mx-auto">
                <div style={{ width: isWide ? `${isWide}px` : '250px' }}>
                     <h2 className="text-2xl pb-1 uppercase font-semibold font-Helveticalight">
                      {slide.Heading}
                    </h2>
                    <p className="text-18 font-extralight h-32 xsm:h-28 xs:h-[170px] sm:h-32 font-Helveticalight">
                      {slide.Description}
                    </p>
                  <div className="w-fit lg:h-full xl:mt-20 md:mt-10 mt-6 px-2 mx-auto">
                    <Image
                      src={slide.imageUrl2}
                      className="w-full h-16 md:h-20"
                      alt="Left Image"
                      width={1200}
                      height={1200}
                      quality={75}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[70%]">
                <Link href={slide.link} className="block w-full h-full">
                  <Image
                    src={slide.imageUrl}
                    alt="Right Image"
                    className="w-full"
                    width={1100}
                    height={450}
                    quality={70}
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </Link>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </ContainerFluid>
  );
};

export default ColorBanner;
