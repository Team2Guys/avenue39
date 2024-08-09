'use client';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FeatureCard from '../feature-card/feature-card';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Feature } from '@/types/types';

interface FeatureSliderProps {
  features: Feature[];
}

const settings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024, // Tablets and small desktops
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // Tablets
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480, // Mobile devices
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const FeatureSlider: React.FC<FeatureSliderProps> = ({ features }) => {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="slider-container">
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
      <Slider
        ref={(slider) => {
          sliderRef.current = slider;
        }}
        {...settings}
      >
        {features.map((feature, index) => (
          <div key={index}>
            <FeatureCard
              image={feature.image}
              title={feature.title}
              rating={feature.rating}
              currentPrice={feature.currentPrice}
              originalPrice={feature.originalPrice}
              discount={feature.discount}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeatureSlider;
