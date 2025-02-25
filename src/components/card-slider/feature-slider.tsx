'use client';
import React, { useEffect, useRef, useState } from 'react';
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
  const [isLenght, setIsLenght] = useState<boolean>(false)
  const [width, setWidth] = useState(window.innerWidth)
  const processedProducts = variationProducts({ products: similarProducts });
  const settings = {
    dots: false,
    infinite: isLenght,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: isBestSeller ? 2000 : 2500,
    responsive: [
      {
        breakpoint: 2000,
        settings: { slidesToShow: 5 },
        infinite: processedProducts.length < 5 ? false : true,
      },
      {
        breakpoint: 1500,
        settings: { slidesToShow: 4 },
        infinite: processedProducts.length < 4 ? false : true,
      },
      {
        breakpoint: 1050,
        settings: { slidesToShow: 3 },
        infinite: processedProducts.length < 3 ? false : true,
      },
      {
        breakpoint: 750,
        settings: { slidesToShow: 2 },
        infinite: processedProducts.length < 2 ? false : true,
      },
      {
        breakpoint: 460,
        settings: { slidesToShow: 1 },
        infinite: processedProducts.length < 1 ? false : true,
      },
    ],
  };
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    console.log(width, 'width :');

    if (width > 1500) {
      setIsLenght(processedProducts.length > 5);
    } else if (width > 1050) {
      setIsLenght(processedProducts.length > 4);
    } else if (width > 750) {
      setIsLenght(processedProducts.length > 3);
    } else if (width > 460) {
      setIsLenght(processedProducts.length > 2);
    } else {
      setIsLenght(processedProducts.length > 1);
    }
  }, [processedProducts, width]);

  return (
    <div className="slider-container slick-best-seller relative mx-2 xs:mx-0">
      {similarProducts?.length ? (
        <>
          <div className={`text-end mb-3 px-4 flex  ${title ? 'justify-between' : 'justify-end'}`}>
            {title && (
              <p className="lg:text-3xl text-2xl text-left font-semibold">{isBestSeller ? 'Best Sellers' : 'Similar Products'}</p>
            )}
            {(isLenght) &&
              <div>
                <button className="button absolute -left-4 top-1/2 -translate-y-[50%] z-10" onClick={() => sliderRef.current?.slickPrev()}>
                  <IoIosArrowBack size={30} />
                </button>
                <button className="button absolute -right-4 top-1/2 -translate-y-[50%] z-10" onClick={() => sliderRef.current?.slickNext()}>
                  <IoIosArrowForward size={30} />
                </button>
              </div>
            }
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
