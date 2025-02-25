'use client';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IProduct } from '@/types/types';
import CardSkaleton from '../Skaleton/productscard';
import Card from '../ui/card';
import { variationProducts } from '@/config';

interface FeatureProps {
  similarProducts: IProduct[];
  title?: boolean;
  isBestSeller?: boolean;
}

const FeatureSlider: React.FC<FeatureProps> = ({ similarProducts, title, isBestSeller }) => {
  const sliderRef = useRef<Slider>(null);

  const processedProducts = variationProducts({products: similarProducts});

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: isBestSeller ? 2000 : 2500,
    responsive: [
      {
        breakpoint: 2000,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1500,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1050,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 750,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 460,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="slider-container slick-best-seller relative">
      {similarProducts?.length ? (
        <>
          <div className={`text-end mb-3 px-4 flex  ${title ? 'justify-between' : 'justify-end'}`}>
            {title && (
              <p className="lg:text-3xl text-2xl text-left font-semibold">{isBestSeller ? 'Best Sellers' : 'Similar Products'}</p>
            )}
            <div>
              <button className="button absolute -left-4 top-1/2 -translate-y-[50%] z-10" onClick={() => sliderRef.current?.slickPrev()}>
                <IoIosArrowBack size={30} />
              </button>
              <button className="button absolute -right-4 top-1/2 -translate-y-[50%] z-10" onClick={() => sliderRef.current?.slickNext()}>
                <IoIosArrowForward size={30} />
              </button>
            </div>
          </div>
          <Slider ref={sliderRef} {...settings}>
            {processedProducts && processedProducts.map((card: IProduct, index: number) => (
              <div key={index} className="px-1 sm:px-4">
                <Card
                  card={card}
                  isLoading={false}
                  cardLayout='grid'
                />
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <CardSkaleton />
      )}
    </div>
  );
};

export default FeatureSlider;
