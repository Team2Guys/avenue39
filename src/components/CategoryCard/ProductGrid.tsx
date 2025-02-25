"use client"
import React from 'react';
import { IProduct } from '@/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Card from '../ui/card';


interface ProductGridProps {
  products: IProduct[];
  imageHeight: string;
  slider?: boolean;
  isHomepage?: boolean;
  isLandscape?: boolean;
  calculateHeight?: string;
  portSpace?: string;
  productImages: any[];
  redirect?: string;
  accessoriesSlider?: boolean;
  // sliderNumber?: number
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  productImages,
  imageHeight,
  slider,
  isHomepage,
  calculateHeight,
  portSpace,
  isLandscape,
  redirect,
  accessoriesSlider
  // sliderNumber
}) => {

  const breakpoints = accessoriesSlider
    ? {
      280: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      980: {
        slidesPerView: 4,
      },
      1280: {
        slidesPerView: 5,
      },
    }
    : undefined;

  return (
    <>
      {!slider ? (
        products.map((product, index) => (
          <Card
            key={index}
            card={product}
            category={true}
            isLoading={false}
            slider={slider}
            cardImageHeight={imageHeight}
            isHomepage={isHomepage}
            isLandscape={isLandscape}
            calculateHeight={calculateHeight}
            portSpace={portSpace}
            productImages={productImages}
            redirect={redirect}
            cardLayout='grid'
          />
        ))
      ) : (
        <Swiper
          className={`mySwiper card-slider-home w-full ${accessoriesSlider && 'accessories-Slider mb-2'}`}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          slidesPerView={accessoriesSlider ? 5 : 1}
          loop={true}
          modules={[Pagination]}
          // autoplay={{
          //   delay: sliderNumber === 1 ? 2700 : 2050,
          //   disableOnInteraction: false,
          // }}
          speed={1500}
          breakpoints={breakpoints}
        >
          {products.map((product) => (
            <SwiperSlide className={`w-full ${accessoriesSlider && 'sm:px-4'}`} key={product.id}>
              <Card
                card={product}
                category={true}
                isLoading={false}
                slider={slider}
                accessoriesSlider={accessoriesSlider}
                cardImageHeight={imageHeight}
                isHomepage={isHomepage}
                isLandscape={isLandscape}
                calculateHeight={calculateHeight}
                portSpace={portSpace}
                productImages={productImages}
                redirect={redirect}
                cardLayout='grid'
              />
            </SwiperSlide>
          ))}
        </Swiper >
      )}
    </>
  );
};

export default ProductGrid;
