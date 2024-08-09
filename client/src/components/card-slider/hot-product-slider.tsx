'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../ui/card';
import { StaticImageData } from 'next/image';
import Container from '../ui/Container';
import HotProductNextArrow from './hot-product-next-arrow';
import HotProductPrevArrow from './hot-product-prev-arrow';
import { IProduct } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';

const settings = {
  arrows: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  speed: 500,
  rows: 2,
  slidesPerRow: 1,
  prevArrow: <HotProductPrevArrow />,
  nextArrow: <HotProductNextArrow />,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 2,
        slidesPerRow: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 1,
        slidesPerRow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 1,
      },
    },
  ],
};

const HotProductSlider: React.FC = () => {
  const {
    data: products = [],
    error: productsError,
    isLoading: isProductsLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  return (
    <section className="mt-5">
      <Container className="slider-container w-full">
        <h2 className="text-xl xs:text-2xl sm:text-3xl mb-4 font-semibold">
          Hot Newest Products
        </h2>
        <Slider {...settings} className="mx-4 xs:mx-0 hot-products mb-2">
          {products.map((card) => (
            <div key={card.id}>
              <Card card={card} />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default HotProductSlider;
