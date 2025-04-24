'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContainerFluid from '../ui/ContainerFluid';

const ColorBanner = ({ Bannerclas, ColorBannerData }: any) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isWide, setIsWide] = useState<number>(250);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slide = ColorBannerData[currentSlide];

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50 && currentSlide < ColorBannerData.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (distance < -50 && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <ContainerFluid
      className={`mx-auto py-3 xs:py-5 md:pt-10 md:pb-6 w-full bg-white sofa_swiper ${Bannerclas && isMobile ? 'main_container' : ''
        }`}
    >
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full transition-opacity duration-1000 ease-in-out pointer-events-none">
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
                  priority
                  loading="eager"
                  fetchPriority="high"
                  placeholder="blur"
                  blurDataURL="/placeholder.jpg"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-[70%]">
            <Link href={slide.link} className="block w-full h-full">
              <Image
                src={slide.imageUrl}
                alt="Right Image"
                className="w-full"
                width={1100}
                height={450}
                quality={70}
                priority
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 786px) 100vw, 1100px"
              />
            </Link>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {ColorBannerData.map((_: any, i: number) => (
            <button
              key={i}
              className={`h-2 w-2 rounded-full ${i === currentSlide ? 'bg-black' : 'bg-gray-300'}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </ContainerFluid>
  );
};

export default ColorBanner;
