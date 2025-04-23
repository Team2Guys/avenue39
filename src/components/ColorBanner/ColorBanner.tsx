'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ColorBannerData } from '@/data/products';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import ContainerFluid from '../ui/ContainerFluid';

interface IPROPS {
  Bannerclas?: any;
}

const ColorBanner: React.FC<IPROPS> = ({ Bannerclas }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // SSR-safe mount
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    const handleResize = () => {
      clearTimeout((handleResize as any)._timer);
      (handleResize as any)._timer = setTimeout(updateWidth, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 770;

  const isWide = useMemo(() => {
    if (windowWidth > 2000) return 270;
    if (windowWidth > 1720) return 1720 - windowWidth * 0.7 - 60;
    if (windowWidth >= 1024) return windowWidth - windowWidth * 0.7 - 60;
    if (windowWidth > 500) return windowWidth - windowWidth * 0.5 - 48;
    return windowWidth - 10;
  }, [windowWidth]);

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (windowWidth < 400) {
      const timer = setTimeout(() => setShowImage(true), 2000);
      return () => clearTimeout(timer);
    }
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
        {ColorBannerData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-center justify-center w-full mt-2 lg:mt-0">
              <div className="flex flex-col justify-center items-center lg:w-[30%] w-full pb-2 text-center mx-auto">
                <div style={{ width: isWide ? `${isWide}px` : '250px' }}>
                  <div className="font-Helveticalight">
                    <h2 className="text-2xl pb-1 uppercase font-semibold">
                      {slide.Heading}
                    </h2>
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
                      quality={75}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[70%]">
                <Link href={slide.link} className="block w-full h-full">
                  {showImage ? (
                    <Image
                      src={slide.imageUrl}
                      alt="Right Image"
                      layout="responsive"
                      width={400}
                      height={160}
                      quality={70}
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                    />
                  ) : (
                    <div className="animate-pulse bg-gray-300 w-full" style={{ aspectRatio: '400 / 160' }} />
                  )}
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
