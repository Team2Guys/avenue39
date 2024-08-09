'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../ui/card';
import { IProduct } from '@/types/types';
import CustomNextArrow from './custom-next-arrow';
import CustomPrevArrow from './custom-prev-arrow';

interface SliderProps {
  cards: IProduct[];
  isModel?: boolean;
}

const SliderComponent: React.FC<SliderProps> = ({ cards, isModel }) => {
  console.log(cards.length, 'length');

  let cardFlag = cards.length >= 0 ? 3 : 3;

  console.log(cardFlag, 'carFlag');

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: cardFlag,
    slidesToScroll: cardFlag,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
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
  return (
    <Slider {...sliderSettings}>
      {cards.map((card) => (
        <div key={card.id}>
          <Card card={card} isModel={isModel} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
