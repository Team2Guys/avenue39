"use client"
import React from 'react';
import { IProduct } from '@/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Card from '../ui/card';


interface ProductGridProps {
  products: IProduct[]; // Array of products to render
  // CardComponent: React.FC<any>; // The Card component to render each product
  imageHeight: string; // The height of the image
  slider?: boolean; // Whether
  isHomepage?: boolean;
  isLandscape?: boolean;
  calculateHeight?: string;
  portSpace?: string;
  productImages: any[];
  redirect?: string;
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
          modules={[Autoplay ,Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
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
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ProductGrid;
