'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import FeatureCard from '../feature-card/feature-card';
import { IProduct } from '@/types/types';
import { Navigation, Pagination } from 'swiper/modules';
import CardSkaleton from '../Skaleton/productscard';

const BestSellingSlider: React.FC = () => {
  const {
    data: products = [],
    isLoading: isProductsLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const swiperRef = useRef<any>(null);

  const next = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const previous = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="slider-container">
      {products.length > 0 ? (
        <>
          <div className="text-end mb-3 px-4 flex justify-between">
          <h1 className="lg:text-3xl text-2xl text-left font-semibold flex">Best Sellers</h1>
           <div>
           <button
              className="button"
              onClick={previous}
              style={{ marginRight: '10px' }}
            >
              <IoIosArrowBack size={30} />
            </button>
            <button className="button" onClick={next}>
              <IoIosArrowForward size={30} />
            </button>
           </div>
          </div>

          <Swiper
        
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={false}
            navigation={{
              nextEl: '.button-next',
              prevEl: '.button-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              2000: {
                slidesPerView: 5,
              },
              1500: {
                slidesPerView: 5,
              },
              1290: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 4,
              },
              680: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 2,
              },
              460: {
                slidesPerView: 1.5,
              }
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper "
          >
            {products.map((card) => (
              <SwiperSlide key={card.id} className='mb-8'>
                <FeatureCard
                  isLoading={isProductsLoading}
                  card={card}
                  cardHeight="h-[280px] xsm:h-[220px] sm:h-[240px] md:h-[270px] xl:h-[220px] 2xl:h-[280px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <CardSkaleton/>
      )}
    </div>
  );
};

export default BestSellingSlider;
