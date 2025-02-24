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
  // sliderNumber
}) => {
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
          className="mySwiper card-slider-home w-full"
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          loop={true}
          modules={[Pagination]}
          // autoplay={{
          //   delay: sliderNumber === 1 ? 2700 : 2050,
          //   disableOnInteraction: false,
          // }}
          speed={1500}
        >
          {products.map((product) => (
            <SwiperSlide className="w-full" key={product.id}>
              <Card
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
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ProductGrid;
