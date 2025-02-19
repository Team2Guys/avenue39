'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Chroma from '@assets/images/banners/Chroma.webp';
import Marlin from '@assets/images/banners/Marlin.webp';
import rafael from '@assets/images/banners/rafael.webp';
import Calda from '@assets/images/banners/Calda.webp';
import Magia from '@assets/images/banners/Magia.webp';
import Moderno from '@assets/images/banners/Moderno.webp';
import Bergen from '@assets/images/banners/Bergen.webp';
import Moblie_Calda from '@assets/images/banners/Calda_m.webp';
import Moblie_Magia from '@assets/images/banners/Magia_m.webp';
import Moblie_Moderno from '@assets/images/banners/Moderno_m.webp';
import Moblie_Bergen from '@assets/images/banners/Bergen_m.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
const sofaData_slides = [
  {
    id: 1,
    title: 'Marlin Tub Swivel Chair',
    product_price: 'AED 1,800',
    image: Marlin,
    link: '/chairs/accent-chairs/marlin-tub-swivel-chair',
  },
  {
    id: 2,
    title: 'Rafael Office Desk',
    product_price: 'AED 5,500',
    image: rafael,
    link: '/office-furniture/desks/rafael-office-desk',
  },
  {
    id: 3,
    title: 'Chroma Petal Pod Chair',
    product_price: 'AED 4,500',
    image: Chroma,
    link: '/chairs/accent-chairs/chroma-petal-pod-chair',
  },
];

const sliderDataa_sofa_initial = [
  {
    id: 1,
    slides: [
      {
        backgroundImage: Magia.src,
        mobileImage: Moblie_Magia.src,
        pro_price: 'AED 6,250',
        subtitle: 'Magia Office Desk',
        link: '/office-furniture/desks/magia-office-desk',
        buttonPosition: 'top',
        ImagePosition: 'center',
      },

      {
        backgroundImage: Moderno.src,
        mobileImage: Moblie_Moderno.src,
        pro_price: 'AED 799',
        subtitle: 'Moderno Bedside Table',
        link: '/bedroom/bedside-tables/moderno-bedside-table',
        buttonPosition: 'top',
        ImagePosition: 'center',
      },


    ],
  },
  {
    id: 2,
    slides: [
      {
        backgroundImage: Calda.src,
        mobileImage: Moblie_Calda.src,
        pro_price: '',
        subtitle: 'Shop our exclusive sale now',
        link: '/sale',
        buttonPosition: 'bottom',
        ImagePosition: 'top',
      },
      {
        backgroundImage: Bergen.src,
        mobileImage: Moblie_Bergen.src,
        pro_price: '',
        subtitle: 'Explore our latest luxury pieces now',
        link: '/new-arrivals',
        buttonPosition: 'bottom',
        ImagePosition: 'center',
      },
    ],
  },
];

const SofaBanner: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [sliderDataa_sofa, setSliderDataaSofa] = useState(sliderDataa_sofa_initial);
  const newWidth = window.innerWidth;
  useEffect(() => {
    const handleResize = () => {

      setSliderDataaSofa(prevData =>
        prevData.map(item => ({
          ...item,
          slides: item.slides.map(slide => ({
            ...slide,
            backgroundImage: newWidth < 700 ? slide.mobileImage : slide.backgroundImage,
          })),
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [newWidth]);
  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-3 relative px-2 md:px-0 mt-3 w-full max-w-[20000]">
      <div
        className="sofa_slider1 bg-lightforeground rounded-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          speed={1500}
          pagination={{
            clickable: true,
          }}
          loop={true}
        >
          {sofaData_slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-wrap items-center justify-center px-2 pb-4 xs:pb-0 sm:ps-20 md:ps-6 lg:ps-8 3xl:ps-[123px] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] max-w-screen-2xl mx-auto">
                <div className="w-full lg:w-1/3 text-center lg:text-left max-xs:pt-5">
                  <div>
                    <Link
                      href={slide.link}
                      className="py-1 px-3 block w-fit bg-white text-[14px] md:text-2xl lg:text-sm xl:text-xl 2xl:text-3xl rounded-2xl text-black border border-gray-500 hover:bg-main font-Helveticalight 2xl:whitespace-nowrap mx-auto lg:mx-0"
                    >
                      Shop Best Sellers
                    </Link>
                    <h3 className="font-bold text-lg mt-3 text-center lg:text-left">
                      {slide.title}
                    </h3>
                    <p className="text-lg font-bold mt-1 text-black text-center lg:text-left">
                      {slide.product_price}
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-2/3 relative flex justify-center">
                  <Link href={slide.link}>
                    <Image
                      src={slide.image}
                      width={900}
                      height={500}
                      alt={slide.title}
                      className="max-w-[900px] w-full h-auto object-cover"
                    />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="sofa_slider2">
        {sliderDataa_sofa.map((item, index) => (
          <Swiper
            key={index}
            className={`${index === 1 && 'mt-5'}`}
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: index ? 2333 : 3000,
              disableOnInteraction: true,
            }}
            dir={`${index === 1 && 'rtl'}`}
            pagination={{ clickable: true }}
            loop={true}
            speed={1500}
          >    {item.slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={`h-44 xsm:h-[200px] xs:h-[290px]`}>
                <Link href={slide.link}
                  className="w-full h-full rounded-2xl block"
                  style={{
                    backgroundImage: `url(${slide.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: newWidth < 700 ? 'center' : slide.ImagePosition,
                  }}
                >
                  <div className="flex justify-center items-center bg-[#0000004d] w-full h-full rounded-2xl">
                    <div className="text-center">
                      {slide.buttonPosition === 'top' && (
                        <Link
                          href={slide.link}
                          className="bg-white py-1 px-3 text-base md:text-3xl rounded-2xl text-black hover:bg-main font-Helveticalight"
                        >
                          Shop
                        </Link>
                      )}
                      {slide.buttonPosition === 'bottom' && (
                        <Link
                          href={slide.link}
                          className="bg-white py-1 px-3 text-base md:text-3xl rounded-2xl text-black hover:bg-main font-Helveticalight"
                        >
                          Shop <span className="text-red-600">{item.id === 2 && index === 1 ? 'New Arrivals' : 'Sale'}</span>
                        </Link>
                      )}

                      <h3 className="font-bold text-16 mt-4 text-white">
                        {slide.subtitle}
                      </h3>
                      <p className="text-18 font-bold text-white mt-2">
                        {item.id === 1 && slide.pro_price}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}

          </Swiper>
        ))}
      </div>
    </section>
  );
};

export default SofaBanner;
