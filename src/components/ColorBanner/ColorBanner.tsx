'use client';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { ColorBannerData } from '@/data/products';
import Image from 'next/image';
const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), { ssr: false });
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import ContainerFluid from '../ui/ContainerFluid';


const ColorBanner = ({ Bannerclas }: any) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [renderedSlides, setRenderedSlides] = useState(1);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRenderedSlides(ColorBannerData.length);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

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
        watchSlidesProgress={true}
        className={`custom-swiper ${Bannerclas && isMobile ? Bannerclas : ''}`}
      >
        {ColorBannerData.slice(0, renderedSlides).map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full">
              {/* Left Section */}
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

                  {/* Left Small Image */}
                  <div className="w-fit lg:h-full xl:mt-20 md:mt-10 mt-6 px-2 mx-auto">
                    <Image
                      src={slide.imageUrl2}
                      className="w-full h-16 md:h-20"
                      alt="Left Image"
                      width={400}
                      height={100}
                      quality={60}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Right Main Image */}
              <div className="lg:w-[70%] w-full">
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
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                    sizes="(max-width: 786px) 100vw, 1100px"
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
