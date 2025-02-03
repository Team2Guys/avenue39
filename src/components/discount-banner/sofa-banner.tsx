'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Chroma from '@assets/images/banners/Chroma.png';
import Marlin from '@assets/images/banners/Marlin.png';
import rafael from '@assets/images/banners/rafael.png';
import banner2 from '@assets/images/banners/laptop-table.jpg';
import banner3 from '@assets/images/banners/freepik__enhance__60779.webp';
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
    link: '/product/rafael-office-desk',
  },
  {
    id: 3,
    title: 'Chroma Petal Pod Chair',
    product_price: 'AED 4,500',
    image: Chroma,
    link: '/product/the-lisbon-sofa-set',
  },
];

const sliderDataa_sofa = [
  {
    id: 1,
    slides: [
      {
        backgroundImage: banner2.src,
        pro_price: 'AED 6,250',
        subtitle: 'Magia Office Desk',
        link: '/home-office/office-tables/magia-office-desk',
        buttonPosition: 'top',
      },
      {
        backgroundImage: banner3.src,
        pro_price: 'AED 1,950',
        subtitle: 'Calda Side Table',
        link: '/tables/side-tables/calda-side-table',
        buttonPosition: 'bottom',
      },
    ],
  },
  {
    id: 2,
    slides: [
      {
        backgroundImage: banner2.src,
        pro_price: 'AED 799',
        subtitle: 'Moderno Bedside Table',
        link: '/bedroom/bedside-tables/moderno-bedside-table',
        buttonPosition: 'top',
      },
      {
        backgroundImage: banner3.src,
        pro_price: 'AED 3,500',
        subtitle: 'Bergen Sintered Stone Dining Table',
        link: '/dining/dining-table/bergen-sintered-stone-dining-table',
        buttonPosition: 'bottom',
      },
    ],
  },
];

const SofaBanner: React.FC = () => {
  const swiperRef = useRef<any>(null);

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
    <section className="grid grid-cols-1 lg:grid-cols-2  gap-3 relative px-2 md:px-0 mt-3">
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
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
        >
          {sofaData_slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-wrap items-center px-2 pb-4 xs:pb-0  sm:ps-20 md:ps-6 lg:ps-8 3xl:ps-[123px] h-full xs:h-[400px] sm:h-[500px] md:h-[600px]">
                {/* Text Content */}
                <div className="w-full xs:w-1/3 max-xs:text-center max-xs:pt-5">
                  <div>
                    <Link
                      href={slide.link}
                      className="py-1 px-3 block w-fit bg-white text-[14px] md:text-2xl lg:text-sm xl:text-xl 2xl:text-3xl rounded-2xl text-black border border-gray-500 hover:bg-main font-Helveticalight 2xl:whitespace-nowrap mx-auto"
                    >
                      Shop Best Sellers
                    </Link>
                    <h3 className="font-bold text-16 mt-3 text-center">
                      {slide.title}
                    </h3>
                    <p className="text-18 font-bold mt-1 text-black text-center">
                      {slide.product_price}
                    </p>
                  </div>
                </div>
                {/* Image */}
                <div className="w-full xs:w-2/3 relative">
                  <Image
                    src={slide.image}
                    width={900}
                    height={500}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="sofa_slider2">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {sliderDataa_sofa.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="grid grid-cols-1 gap-4 h-[600px]">
                {item.slides.map((slide, index) => (
                  <div
                    key={index}
                    className="w-full h-full rounded-2xl"
                    style={{
                      backgroundImage: `url(${slide.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
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
                            Shop <span className="text-red-600">Sale</span>
                          </Link>
                        )}

                        <h3 className="font-bold text-16 mt-4 text-white">
                          {slide.subtitle}
                        </h3>
                        <p className="text-18 font-bold text-white mt-2">
                          {slide.pro_price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SofaBanner;
