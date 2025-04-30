'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContainerFluid from '../ui/ContainerFluid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Images
import Chroma from '@assets/images/banners/Chroma.webp';
import Marlin from '@assets/images/banners/Marlin.avif';
import rafael from '@assets/images/banners/Rafael.avif';
import chair from '@assets/images/banners/chair.webp';
import Magia from '@assets/images/banners/Magia.webp';
import Moderno from '@assets/images/banners/Moderno.webp';
import sofa from '@assets/images/banners/sofa.webp';
import MobileMagia from '@assets/images/banners/Magia_m.avif';
import MobileModerno from '@assets/images/banners/Moderno_m.webp';

const sofaDataSlides = [
  {
    id: 1,
    title: 'Marlin Tub Swivel Chair',
    product_price: '1,800',
    image: Marlin,
    link: '/chairs/accent-chairs/marlin-tub-swivel-chair',
  },
  {
    id: 2,
    title: 'Rafael Office Desk',
    product_price: '5,500',
    image: rafael,
    link: '/office-furniture/desks/rafael-office-desk',
  },
  {
    id: 3,
    title: 'Chroma Petal Pod Chair',
    product_price: '4,500',
    image: Chroma,
    link: '/chairs/accent-chairs/chroma-petal-pod-chair',
  },
];

const initialSofaSlides = [
  {
    id: 1,
    slides: [
      {
        backgroundImage: Magia.src,
        mobileImage: MobileMagia.src,
        subtitle: 'Explore our latest luxury pieces now',
        subPara: 'High-Quality Materials',
        link: '/new-arrivals',
        buttonPosition: 'top',
        ImagePosition: 'center',
      },
      {
        backgroundImage: Moderno.src,
        mobileImage: MobileModerno.src,
        subtitle: 'Explore our latest luxury pieces now',
        subPara: 'High-Quality Materials',
        link: '/new-arrivals',
        buttonPosition: 'top',
        ImagePosition: 'center',
      },
    ],
  },
  {
    id: 2,
    slides: [
      {
        backgroundImage: chair.src,
        mobileImage: chair.src,
        subtitle: 'Shop our exclusive sale now',
        subPara: 'Up to 70% discount',
        link: '/sale',
        buttonPosition: 'bottom',
        ImagePosition: 'top',
      },
      {
        backgroundImage: sofa.src,
        mobileImage: sofa.src,
        subtitle: 'Shop our exclusive sale now',
        subPara: 'Up to 70% discount',
        link: '/sale',
        buttonPosition: 'bottom',
        ImagePosition: 'center',
      },
    ],
  },
];

const SofaBanner: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();

    const resizeListener = () => {
      clearTimeout((resizeListener as any)._timer);
      (resizeListener as any)._timer = setTimeout(updateWidth, 100);
    };

    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const isMobile = windowWidth < 700;

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
          {sofaDataSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
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

                <div className="w-full lg:w-[70%] relative flex justify-center xl:h-[400px] 2xl:h-[500px]">
                  <Link href={slide.link}>
                    <Image
                      src={slide.image}
                      width={900}
                      height={500}
                      alt={slide.title}
                      className="max-w-[700px] xl:max-w-[900px] w-full h-full"
                      loading='lazy'
                    />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Banners */}
      <div className="sofa_slider2">
        {initialSofaSlides.map((item, i) => (
          <Swiper
            key={i}
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            dir={i === 1 ? 'rtl' : 'ltr'}
            pagination={{ clickable: true }}
            loop
            speed={1500}
            className={i === 1 ? 'mt-5' : ''}
          >
            {item.slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <Link
                  href={slide.link}
                  className="h-40 xsm:h-[200px] xs:h-[290px] block rounded-2xl sofa-slider"
                  style={{
                    backgroundImage: `url(${isMobile ? slide.mobileImage : slide.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: isMobile ? 'center' : slide.ImagePosition,
                  }}
                >
                  <div className="flex justify-center items-center bg-[#0000004d] w-full h-full rounded-2xl">
                    <div className="text-center">
                      <h3 className="bg-white py-1 px-3 text-base md:text-3xl rounded-2xl text-black hover:bg-main font-Helveticalight">
                        Shop <span className="text-red-600">{slide.buttonPosition === 'top' ? 'New Arrivals' : 'Sale'}</span>
                      </h3>
                      <h3 className="font-bold text-16 mt-4 text-white">{slide.subtitle}</h3>
                      <p className="text-14 font-bold text-white mt-2">{slide.subPara}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ))}
      </div>
    </ContainerFluid>
  );
};

export default SofaBanner;
