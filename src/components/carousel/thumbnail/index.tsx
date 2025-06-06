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
import { Skeleton } from '@/components/ui/skeleton';
import SideBySideMagnifier from '../SideBySideMagnifier';
import CustomThumbnailSlickSlider from './thumbnailSlider';
import ImageZoomDialog from '../MobileZoom';
interface IMAGE_INTERFACE {
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
  altText?: string;
}

const Thumbnail: React.FC<ThumbProps> = ({
  thumbs,
  isZoom,
  swiperGap,
  isLoading,
  altText,
  // activeIndex,
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperImageRef = useRef<SwiperType | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlickSlide, setActiveSlickSlide] = useState(0);

  // const preloadImages = (images: string[]) => {
  //   console.log(images,'images')
  //   return Promise.all(
  //     images.map((src) => {
  //       return new Promise<void>((resolve, reject) => {
  //         const img = new Image();
  //         img.src = src;
  //         img.onload = () => resolve();
  //         img.onerror = () => reject();
  //       });
  //     })
  //   );
  // };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 895) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    const index = activeSlickSlide !== undefined ? Number(activeSlickSlide) : 0;
    setCurrentSlide(index);
    handleSlideChange(index);
  }, [activeSlickSlide]);

  // useEffect(() => {
  //   if (thumbs.length > 0) {
  //     preloadImages(thumbs.map((thumb) => thumb.imageUrl)).then(() => {
  //       setImagesLoaded(true);
  //     }).catch((err) => {
  //       console.error('One or more images failed to preload:', err);
  //     });
  //   }
  // }, [thumbs]);

  const handleSlideChange = (index: number) => {
    if (swiperImageRef.current) {
      swiperImageRef.current.slideTo(index);
      setActiveSlickSlide(index)
    }
  };

  // if (!imagesLoaded) {
  //   return <Skeleton className="w-full mt-8" style={{ height: 'calc(100% - 150px)' }} />;
  // }


  return (
    <div className="relative w-full pt-8">
      <div
        className={`w-full flex flex-col-reverse md:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 md:max-h-[640px] ${swiperGap}`}
      >
        <CustomThumbnailSlickSlider
          thumbs={thumbs}
          isZoom={isZoom}
          onSlideChange={handleSlideChange}
          activeSlickSlide={activeSlickSlide}
          setActiveSlickSlide={setActiveSlickSlide}
        />
        <div className='flex flex-col w-full md:w-10/12 2xl:w-4/5'>


          <div
            className={`w-full md:w-12/12 2xl:w-5/5 md:flex-grow relative border-2 border-gray-100 shadow rounded-lg md:!max-h-[640px]`}
          >
            {isLoading ? (
              <Skeleton className="h-[90px] w-full" />
            ) : (
              <>
                <Swiper
                  loop={false}
                  spaceBetween={10}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="h-full swiper-container product-img w-full"
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onSwiper={(swiper) => {
                    swiperImageRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                >
                  {thumbs.map((thumb, index) => (
                    <SwiperSlide key={index}>
                      {isMobile ? (
                        <ImageZoomDialog imageUrl={thumb.imageUrl} allImage={thumbs} />
                      ) : (
                        <SideBySideMagnifier
                          imageSrc={thumb.imageUrl}
                          largeImageSrc={thumb.imageUrl}
                          altText={altText || 'Main Image'}
                          zoomScale={1.5}
                          inPlace={true}
                          alignTop={true}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

              </>
            )}
          </div>
          <div className="flex mt-3 w-full justify-center">
            {thumbs.map((_, index) => (
              <div
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-2 2xl:w-3 h-2 2xl:h-3 rounded-full mx-1 cursor-pointer ${currentSlide === index
                  ? 'bg-gray-800'
                  : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;