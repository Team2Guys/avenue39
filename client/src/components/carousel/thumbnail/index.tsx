//@ts-nocheck
'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {
  FreeMode,
  Navigation,
  Thumbs,
  Swiper as SwiperType,
} from 'swiper/modules';
import Image from 'next/image';
import { BsArrowUp } from 'react-icons/bs';
import { FaRegSquareCaretDown } from 'react-icons/fa6';
import { FaSortDown } from 'react-icons/fa';

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
}

interface ThumbProps {
  thumbs: IMAGE_INTERFACE[];
  isZoom?: Boolean;
}

const Thumbnail: React.FC<ThumbProps> = ({ thumbs, isZoom }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null); // Ensure correct type

  const handleMouseEnter = (imageUrl: string) => {
    setHoveredImage(imageUrl);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const scrollToSlide = (direction: 'up' | 'down') => {
    if (swiperRef.current) {
      if (direction === 'up') {
        swiperRef.current.slidePrev();
      } else if (direction === 'down') {
        swiperRef.current.slideNext();
      }
    }
  };

  return (
    <div className="relative">
      <div className="w-full flex gap-4 max-h-[600px]">
        <div className="w-1/5 flex-shrink-0 relative">
          <Swiper
            onSwiper={(swiper) => {
              setThumbsSwiper(swiper);
              swiperRef.current = swiper;
            }}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-full column-swipper swiper-container product-swiper"
          >
            {thumbs.map((thumb, index) => (
              <SwiperSlide
                key={index}
                className="column-swiper-slider swiper-slide py-2 pe-2"
              >
                <Image
                  className="rounded-lg shadow-lg"
                  src={thumb.imageUrl || '/default-image.jpg'}
                  width={300}
                  height={300}
                  alt={thumb.name || 'Thumbnail'}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className=" absolute  -bottom-5 right-1/3  z-10 cursor-pointer bg-[#F6F6F6] px-3 py-2"
            onClick={() => scrollToSlide('up')}
          >
            <FaSortDown className=" text-black font-" />
          </div>
        </div>

        <div className="w-4/5 flex-grow relative px-2">
          <Swiper
            style={
              {
                '--swiper-navigation-color': '#ffffff',
                '--swiper-pagination-color': '#ffffff',
              } as React.CSSProperties
            }
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-full swiper-container"
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {thumbs.map((thumb, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`relative w-full h-full ${isZoom ? 'cursor-zoom-in' : ''}`}
                >
                  <Image
                    onMouseEnter={() => handleMouseEnter(thumb.imageUrl || '')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="rounded-lg shadow h-full w-full border-2 border-gray-100 max-h-[600px]"
                    src={thumb.imageUrl || '/default-image.jpg'}
                    width={550}
                    height={550}
                    alt={thumb.name || 'Main Image'}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {hoveredImage && isZoom && (
        <div className="absolute -right-5 top-1 hidden md:block z-40">
          <div
            className="magnified-image fixed left-50 z-50 rounded-2xl"
            style={{
              backgroundImage: `url(${hoveredImage})`,
              backgroundPosition: backgroundPosition,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '200%',
              width: '600px',
              height: '600px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
