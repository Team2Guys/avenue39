import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';



function SampleNextArrow(props:any) {
  const { className, onClick } = props;
  return (
    <div
      className={`slick-next-arrow custom-slick-next-arrow !flex !justify-center !items-center cursor-pointer absolute !top-auto !-bottom-[30px] !left-1/2 !-translate-x-[50%] ${className}`}
      onClick={onClick}> <IoIosArrowDown className="text-black text-21 xs:text-[30px]" /> </div>
  );
}

function SamplePrevArrow(props:any) {
  const { className, onClick } = props;
  return (
    <div
      className={`slick-prev-arrow custom-slick-prev-arrow !flex !justify-center !items-center cursor-pointer absolute !-top-6 !left-1/2 !-translate-x-[50%] ${className}`}
      onClick={onClick}> <IoIosArrowUp className="text-black text-21 xs:text-[30px]" /></div>
  );
}


const CustomThumbnailSlickSlider = ({
  thumbs,
  isZoom,
  // onSlideChange,
  setActiveSlickSlide,
  activeSlickSlide
}: {
  thumbs: { imageUrl: string; altText: string }[];
  isZoom: boolean;
  activeSlickSlide: number,
  /* eslint-disable */
  setActiveSlickSlide: (index: number) => void;
  /* eslint-enable */
}) => {
  const slickRef = useRef<Slider | null>(null);
  const settings = {
    infinite: false,
    // centerMode: true,
    // centerPadding: '0',
    slidesToShow: 5,
    speed: 200,
    // focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: thumbs.length > 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 895,
        settings: {
          slidesToShow: 5,
          // centerMode: true,
          vertical: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 3,
          // centerMode: true,
          vertical: false,
        },
      },
    ],

  };

  return (
    <div className="w-full md:w-3/12 lg:w-1/5 relative product-slider-wrapper">
      
      
      <Slider
        ref={slickRef}
        {...settings}
        className={`product-slider custom-Slick overflow-hidden ${!isZoom && 'isZoom'}`}
      >
        {thumbs.map((thumb, index) => (
          <div
            key={index}
            className="column-swiper-slider swiper-slide xsm:mx-0 mx-2 "
            onClick={() => setActiveSlickSlide(index)}
          >
            <Image
              className={`rounded-lg shadow-md aspect-square ${(activeSlickSlide === index) && 'border border-main custom-box-shadow'} ${isZoom ? 'size-20 xs:size-24 md:size-[120px]' : 'size-20 xs:size-24 sm:size-[120px]'}`}
              src={thumb.imageUrl || '/default-image.jpg'}
              width={150}
              height={150}
        
              alt={thumb.altText || 'Thumbnail'}
              priority={true}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomThumbnailSlickSlider;
