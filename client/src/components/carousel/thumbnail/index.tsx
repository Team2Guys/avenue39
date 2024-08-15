//@ts-nocheck
'use client';

import React, { useState, useRef, useEffect } from 'react';
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
import { FaSortDown } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust the path as necessary
import { CiZoomIn } from 'react-icons/ci';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
}

interface ThumbProps {
  thumbs: IMAGE_INTERFACE[];
  isZoom?: Boolean;
  swiperGap?: String;
}

const Thumbnail: React.FC<ThumbProps> = ({ thumbs, isZoom, swiperGap }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [imageThumbsSwiper, setImageThumbsSwiper] = useState<SwiperType | null>(
    null,
  );
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');
  const [loading, setLoading] = useState(true);
  const [zoomEnabled, setZoomEnabled] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperImageRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate a loading time
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (imageUrl: string, e: React.MouseEvent) => {
    if (zoomEnabled) {
      setHoveredImage(imageUrl);
      setCursorVisible(true);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoomEnabled) {
      const { top, left, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setBackgroundPosition(`${x}% ${y}%`);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
    setCursorVisible(false);
  };

  const handleClick = (imageUrl: string, e: React.MouseEvent) => {
    setZoomEnabled((prev) => !prev);
    setCursorPosition({ x: e.clientX, y: e.clientY });
    if (!zoomEnabled) {
      setHoveredImage(imageUrl);
      setCursorVisible(true);
    }
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
  const HoverImgToSlide = (direction: 'up' | 'down') => {
    if (swiperImageRef.current) {
      if (direction === 'up') {
        swiperImageRef.current.slidePrev();
      } else if (direction === 'down') {
        swiperImageRef.current.slideNext();
      }
    }
  };

  return (
    <div>
      <div className="relative w-full">
        <div className={`w-full flex ${swiperGap} max-h-[750px]`}>
          <div className="max-w-1/5 md:flex-shrink-0 relative h-fit">
            {loading ? (
              <div className="flex flex-col space-y-4 pb-2">
                <Skeleton className="h-36 w-36" />
                <Skeleton className="h-36 w-36" />
                <Skeleton className="h-36 w-36" />
                <Skeleton className="h-36 w-36" />
              </div>
            ) : (
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
                className="max-h-full column-swipper swiper-container product-swiper w-fit mx-0"
              >
                {thumbs.map((thumb, index) => (
                  <SwiperSlide
                    key={index}
                    className="column-swiper-slider swiper-slide"
                  >
                    <Image
                      className="rounded-lg shadow-md"
                      src={thumb.imageUrl || '/default-image.jpg'}
                      width={150}
                      height={150}
                      alt={thumb.name || 'Thumbnail'}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div
              className="absolute -bottom-5 right-1/3 z-10 cursor-pointer bg-[#F6F6F6] w-12 h-12 flex justify-center items-center"
              onClick={() => scrollToSlide('up')}
            >
              <FaSortDown
                size={25}
                className="text-black flex items-center mb-2"
              />
            </div>
          </div>

          <div className="w-4/5 md:flex-grow relative border-2 border-gray-100 shadow">
            {loading ? (
              <Skeleton className="h-[700px] w-full" />
            ) : (
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
                className="h-full swiper-container product-img"
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                onSwiper={(swiper) => {
                  setImageThumbsSwiper(swiper);
                  swiperImageRef.current = swiper;
                }}
              >
                {thumbs.map((thumb, index) => (
                  <SwiperSlide key={index}>
                    <div className={`w-full h-full rounded-lg`}>
                      <Image
                        className={`rounded-lg h-full w-full max-h-[690px] pointer-events-none md:pointer-events-auto  ${zoomEnabled ? 'cursor-none' : ''} ${isZoom? 'cursor-default': ''} ${!zoomEnabled && isZoom ? 'cursor-zoom-in': ''}`}
                        src={thumb.imageUrl || '/default-image.jpg'}
                        width={550}
                        height={550}
                        alt={thumb.name || 'Main Image'}
                        onClick={(e) => isZoom? handleClick(thumb.imageUrl || '', e) : ''}
                        onMouseEnter={(e) =>
                          handleMouseEnter(thumb.imageUrl || '', e)
                        }
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {zoomEnabled && (
                  <div className="relative w-full h-8 my-2">
                    <div className="flex gap-2 items-center justify-end absolute top-0 right-2">
                      <span
                        className="w-8 h-8 flex justify-center items-center cursor-pointer bg-[#F6F6F6] shadow"
                        onClick={() => HoverImgToSlide('up')}
                      >
                        <IoIosArrowBack size={20} />
                      </span>
                      <span
                        className="w-8 h-8 flex justify-center items-center cursor-pointer bg-[#F6F6F6] shadow"
                        onClick={() => HoverImgToSlide('down')}
                      >
                        <IoIosArrowForward size={20} />
                      </span>
                    </div>
                  </div>
                )}
              </Swiper>
            )}
          </div>
        </div>

        {/* Hover Zoom Feature */}
        {cursorVisible && zoomEnabled && (
          <div className="absolute -right-1/2 translate-x-[40%] top-1 hidden md:flex pt-24 z-40 h-[90vh] w-3/4 bg-white/70">
            <div
              className="magnified-image absolute left-50 top-50 z-50"
              style={{
                backgroundImage: `url(${hoveredImage})`,
                backgroundPosition: backgroundPosition,
                border: '1px solid #707070',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '300%',
                width: '500px',
                height: '500px',
              }}
            />
          </div>
        )}

        {/* Custom Cursor */}
        {cursorVisible && zoomEnabled && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: 'translate(-50%, -50%)',
              width: '150px',
              height: '150px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid #707070',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CiZoomIn size={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
