'use client'
import { IProduct } from '@/types/prod';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import dynamic from 'next/dynamic';
import CardSkeleton from '../cardSkelton';
const Card = dynamic(() => import('../ui/card'), {
  ssr: false,
  loading: () => <CardSkeleton />,
})

interface ProductGridProps {
  products: IProduct[];
  imageHeight: string;
  slider?: boolean;
  isHomepage?: boolean;
  isLandscape?: boolean;
  calculateHeight?: string;
  portSpace?: string;
  redirect?: string;
  accessoriesSlider?: boolean;
  fill?: boolean
}

const ProductGrid = ({
  products,
  imageHeight,
  slider,
  isHomepage,
  calculateHeight,
  portSpace,
  isLandscape,
  redirect,
  accessoriesSlider,
  fill
}: ProductGridProps) => {

  const breakpoints = accessoriesSlider? {
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
            redirect={redirect}
            cardLayout="grid"
          />
        ))}
      </>
    );
  }

  return (
    <>
    <Swiper
      className={`mySwiper card-slider-home w-full ${accessoriesSlider ? 'accessories-Slider mb-2' : ''}`}
      pagination={{ dynamicBullets: true, clickable: true }}
      slidesPerView={accessoriesSlider ? 5 : 1}
      loop
      scrollbar={{ draggable: true }}
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
            redirect={redirect}
            cardLayout="grid"
            fill={fill}
          />
        </SwiperSlide>
      ))}


    </Swiper>
    </>
  );
};

export default ProductGrid;
