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
  Pagination,
} from 'swiper/modules';
import { Skeleton } from '@/components/ui/skeleton';
import SideBySideMagnifier from '../SideBySideMagnifier';
import CustomThumbnailSlickSlider from './thumbnailSlider';
import Image from 'next/image';
import ImageZoomDialog from '../MobileZoom';

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
  altText?: string;
}

interface ThumbProps {
  thumbs: IMAGE_INTERFACE[];
  isZoom?: Boolean;
  swiperGap?: String;
  isLoading: boolean;
  activeIndex?: Number;
}

const Thumbnail: React.FC<ThumbProps> = ({
  thumbs,
  isZoom,
  swiperGap,
  isLoading,
  altText,
  activeIndex,
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperImageRef = useRef<SwiperType | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  // const [imageZome, setImageZome] = useState<number>(1.5);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const preloadImages = (images: string[]) => {
    return Promise.all(
      images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      }),
    );
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (windowWidth < 895) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [windowWidth])
  useEffect(() => {
    handleSlideChange(Number(activeIndex));
  }, [activeIndex]);

  useEffect(() => {
    preloadImages(thumbs.map((thumb) => thumb.imageUrl || '')).then(() => {
      setImagesLoaded(true);
    });
  }, [thumbs]);

  const handleSlideChange = (index: number) => {
    if (swiperImageRef.current) {
      swiperImageRef.current.slideTo(index);
    }
  };

  if (!imagesLoaded) {
    return <Skeleton className="h-[90px] w-full" />;
  }

  return (
      <div className="relative w-full pt-8">
        <div
          className={`w-full flex flex-col-reverse md:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 ${swiperGap}`}
        >
          <CustomThumbnailSlickSlider
            thumbs={thumbs}
            isZoom={isZoom}
            onSlideChange={handleSlideChange}
          />
          <div
            className={`w-full md:w-9/12 2xl:w-4/5 md:flex-grow relative`}
          >
            {isLoading ? (
              <Skeleton className="h-[90px] w-full" />
            ) : (
              <>
              <Swiper
                loop={false}
                spaceBetween={10}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="h-full swiper-container product-img mb-8 md:mb-0"
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{
                  el: '.custom-swiper-pagination', 
                  type: 'bullets',  
                  clickable: true,  
                  dynamicBullets: true, 
                }}
                onSwiper={(swiper) => {
                  swiperImageRef.current = swiper;
                }}
              >
                {thumbs.map((thumb, index) => (
                  <SwiperSlide key={index} className='border-2 border-gray-100 shadow rounded-lg md:max-h-[640px]'>
                    {isMobile ?
                      <ImageZoomDialog imageUrl={thumb.imageUrl} allImage={thumbs} />
                      : <SideBySideMagnifier
                        imageSrc={thumb.imageUrl}
                        largeImageSrc={thumb.imageUrl}
                        altText={altText || 'Main Image'}
                        zoomScale={1.5}
                        inPlace={true}
                        alignTop={true}
                      />}

                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="custom-swiper-pagination"></div>
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default Thumbnail;
