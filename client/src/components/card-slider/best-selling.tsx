'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import NoProduct from '../ui/no-product';
import FeatureCard from '../feature-card/feature-card';
import { IProduct } from '@/types/types';
import { Navigation, Pagination } from 'swiper/modules';
import CardSkaleton from '../Skaleton/productscard';

const BestSellingSlider: React.FC = () => {
  const {
    data: products = [],
    error: productsError,
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
          <div className="text-end mb-3 px-4">
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
                slidesPerView: 4,
              },
              1500: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 1.5,
              },
              680: {
                slidesPerView: 2,
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
                  cardHeight="w-full h-[350px]"
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
