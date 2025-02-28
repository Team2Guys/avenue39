import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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
    speed: 200,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: thumbs.length > 1,
    responsive: [
      {
        breakpoint: 895,
        settings: {
          slidesToShow: 5,
          centerMode: true,
          vertical: false,
          infinite: thumbs.length > 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 3,
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
    <div className="w-full md:w-3/12 lg:w-1/5 relative product-slider-wrapper">
      <div
        id="prevArrow" onClick={() => slickRef.current?.slickPrev()}
        className="slick-prev-arrow custom-slick-prev-arrow !flex !justify-center !items-center cursor-pointer absolute -top-8 left-1/2 -translate-x-[50%]"
      >
        <IoIosArrowUp className="text-black text-21 xs:text-[30px]" />
      </div>
      <div
        id="nextArrow" onClick={() => slickRef.current?.slickNext()}
        className="slick-next-arrow custom-slick-next-arrow !flex !justify-center !items-center cursor-pointer absolute -bottom-[30px] left-1/2 -translate-x-[50%]"
      >
        <IoIosArrowDown className="text-black text-21 xs:text-[30px]" />
      </div>
      
      <Slider
        ref={slickRef}
        {...settings}
        className={`product-slider custom-Slick ${!isZoom && 'isZoom'} md:!h-[640px] overflow-hidden`}
      >
        {thumbs.map((thumb, index) => (
          <div
            key={index}
            className="column-swiper-slider swiper-slide xsm:mx-0 mx-2"
          >
            <Image
              className={`rounded-lg shadow-md aspect-square ${isZoom ? 'size-20 xs:size-24 md:h-[120px] 2xl:h-[160px] md:w-[120px] 2xl:w-[160px]' : 'size-20 xs:size-24 sm:h-[100px] sm:w-[130px]'}`}
              src={thumb.imageUrl || '/default-image.jpg'}
              width={150}
              height={150}
              onClick={() => {
                console.log(thumb);
              }}
              alt={thumb.altText || 'Thumbnail'}
              priority={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomThumbnailSlickSlider;
