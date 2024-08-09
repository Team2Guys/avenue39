'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface Image {
  imageUrl: string;
}

interface CustomPagingProps {
  images: Image[];
}

const CustomPaging: React.FC<CustomPagingProps> = ({ images }) => {
  const settings = {
    customPaging: (i: number) => {
      const image = images[i];
      return (
        <a className="bg-orange-600">
          <Image
            src={image.imageUrl}
            alt={`Thumbnail ${i + 1}`}
            // style={{ width: '50px', height: '30px', objectFit: 'cover' }}
            width={1000}
            height={1000}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="h-80 w-44">
      <Slider {...settings} className="bg-red-300">
        {images.map((img, index) => (
          <div key={index} className="bg-violet-600">
            <Image
              src={img.imageUrl}
              alt={`Image ${index + 1}`}
              //   style={{ width: '100%', height: 'auto' }}
              height={500}
              width={500}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomPaging;
