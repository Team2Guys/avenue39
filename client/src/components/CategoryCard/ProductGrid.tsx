import React from 'react';
import { IProduct } from '@/types/types';
import { IProductsImage } from '@/types/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

interface ProductGridProps {
  products: IProduct[]; // Array of products to render
  CardComponent: React.FC<any>; // The Card component to render each product
  imageHeight: string; // The height of the image
  slider?: boolean; // Whether
  isHomepage?: boolean;
  isLandscape?: boolean;
  calculateHeight?: string;
  portSpace?: string
  productImages: IProductsImage[];
  redirect?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, productImages, CardComponent, imageHeight, slider, isHomepage, calculateHeight, portSpace, isLandscape, redirect }) => {
  console.log(products, 'products Floki')
  return (
    <>
      {!slider ? products.map((product, index) => (
        <CardComponent
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
      )) : (
        <Swiper
          className="mySwiper card-slider-home w-full"
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination]}
        >
          {products.map((product) => (
            <SwiperSlide className="w-full">
              <CardComponent
                key={product.id}
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
