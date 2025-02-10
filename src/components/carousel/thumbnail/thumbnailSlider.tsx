import React, { useRef } from 'react';
import Slider from 'react-slick';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import Image from 'next/image';

const CustomThumbnailSlickSlider = ({
  thumbs,
  isZoom,
  onSlideChange,
}: {
  thumbs: { imageUrl: string; altText: string }[];
  isZoom: boolean;
  /* eslint-disable */
  onSlideChange: (index: number) => void;
  /* eslint-enable */
}) => {
  const slickRef = useRef<Slider | null>(null);
  const settings = {
    infinite: thumbs.length > 1,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: thumbs.length > 1,
    nextArrow: (
      <div
        id="nextArrow"
        className="slick-next-arrow !flex !justify-center !items-center"
      >
        <FaSortDown size={25} className="text-black " />
      </div>
    ),
    prevArrow: (
      <div
        id="prevArrow"
        className="slick-prev-arrow !flex !justify-center !items-center"
      >
        <FaSortUp size={25} className="text-black " />
      </div>
    ),
    responsive: [
      {
        breakpoint: 895,
        settings: {
          slidesToShow: 4,
          centerMode: true,
          vertical: false,
          infinite: thumbs.length > 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          vertical: false,
          infinite: thumbs.length > 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          vertical: false,
          infinite: thumbs.length > 1,
        },
      },
    ],
    beforeChange: (_: number, next: number) => {
      console.log('beforeChange', next);
      onSlideChange(next);
    },
  };

  return (
    <div className="w-full md:w-3/12 lg:w-1/5 h-fit max-h-[300px]">
      <Slider
        ref={slickRef}
        {...settings}
        className="product-slider custom-Slick"
      >
        {thumbs.map((thumb, index) => (
          <div
            key={index}
            className="column-swiper-slider swiper-slide xsm:mx-0 mx-2"
          >
            <Image
              className={`rounded-lg shadow-md aspect-square ${isZoom ? 'size-28 md:h-[120px] 2xl:h-[160px] md:w-[120px] 2xl:w-[160px]' : 'size-28 xs:h-[130px] w-[130px]'}`}
              src={thumb.imageUrl || '/default-image.jpg'}
              width={150}
              height={150}
              onClick={() => {
                console.log(thumb);
              }}
              alt={thumb.altText || 'Thumbnail'}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomThumbnailSlickSlider;
