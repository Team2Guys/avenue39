'use client';

import React, { useMemo } from 'react';
import { IProduct } from '@/types/prod';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import dynamic from 'next/dynamic';
const Card = dynamic(() => import('../ui/card'), { ssr: false })

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
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  productImages,
  imageHeight,
  slider = false,
  isHomepage = false,
  calculateHeight,
  portSpace,
  isLandscape = false,
  redirect,
  accessoriesSlider = false,
}) => {

  const breakpoints = useMemo(() => {
    if (!accessoriesSlider) return undefined;
    return {
      280: { slidesPerView: 1 },
      480: { slidesPerView: 2 },
      640: { slidesPerView: 3 },
      980: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    };
  }, [accessoriesSlider]);

  if (!slider) {
    return (
      <>
        {products.length > 0 && products.map((product) => (
          <Card
            key={product.id}
            card={product}
            category
            isLoading={false}
            slider={false}
            cardImageHeight={imageHeight}
            isHomepage={isHomepage}
            isLandscape={isLandscape}
            calculateHeight={calculateHeight}
            portSpace={portSpace}
            productImages={productImages}
            redirect={redirect}
            cardLayout="grid"
          />
        ))}
      </>
    );
  }

  return (
    <Swiper
      className={`mySwiper card-slider-home w-full ${accessoriesSlider ? 'accessories-Slider mb-2' : ''}`}
      pagination={{ dynamicBullets: true, clickable: true }}
      slidesPerView={accessoriesSlider ? 5 : 1}
      loop
      modules={[Pagination]}
      speed={1500}
      breakpoints={breakpoints}
    >
      {products.length > 0 && products.map((product) => (
        <SwiperSlide className={`w-full ${accessoriesSlider ? 'sm:px-4' : ''}`} key={product.id}>
          <Card
            card={product}
            category
            isLoading={false}
            slider
            accessoriesSlider={accessoriesSlider}
            cardImageHeight={imageHeight}
            isHomepage={isHomepage}
            isLandscape={isLandscape}
            calculateHeight={calculateHeight}
            portSpace={portSpace}
            productImages={productImages}
            redirect={redirect}
            cardLayout="grid"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// Custom comparison for memo
function areEqual(prevProps: ProductGridProps, nextProps: ProductGridProps) {
  return (
    prevProps.products === nextProps.products &&
    prevProps.imageHeight === nextProps.imageHeight &&
    prevProps.slider === nextProps.slider &&
    prevProps.accessoriesSlider === nextProps.accessoriesSlider
  );
}

export default React.memo(ProductGrid, areEqual);
