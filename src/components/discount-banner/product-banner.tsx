'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Navigation, Pagination } from 'swiper/modules';
import banner8 from '@assets/images/banners/banner8.png';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { categories } from '@/data/data';
import Image from 'next/image';
import { generateSlug } from '@/config';

interface ProductBannerProps {
  showArrows?: boolean;
  showFallback?: boolean;
  subCategoriesName?: string;
}

const ProductBanner: React.FC<ProductBannerProps> = ({
  showArrows = true,
  showFallback = true,
  subCategoriesName,
}) => {
  const matchedCategory = categories.find(
    (category: any) =>
      category.maintitle === generateSlug(subCategoriesName || ''),
  );
  const sliderData = matchedCategory?.data;

  const swiperRef = React.useRef<any>(null);

  const next = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const previous = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      {sliderData ? (
        <section className="categorySlider relative md:pb-10">
          <Swiper
            slidesPerView={1}
            loop={true}
            navigation={showArrows}
            pagination={{ clickable: true }}
            ref={swiperRef}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {sliderData?.LeftSideImage?.map((image: any, index: number) => (
              <SwiperSlide key={index} className="">
                <Image
                  src={sliderData?.RightSideImage[index]?.img}
                  className="w-full m-auto object-fill object-bottom h-[140px] xs:h-[180px] sm:h-[250px] md:h-[280px] lg:h-[340px] xl:h-[500px] 2xl:h-[600px]"
                  alt={`Right Image ${index + 1}`}
                  width={600}
                  height={600}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {showArrows && sliderData?.LeftSideImage?.length > 1 && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-12 flex gap-2 z-10">
                <button
                  onClick={previous}
                  aria-label="Previous slide"
                  className="p-2 bg-gray-300 rounded-full"
                >
                  <IoIosArrowBack size={20} />
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-12 flex gap-2 z-10">
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="p-2 bg-gray-300 rounded-full"
                >
                  <IoIosArrowForward size={20} />
                </button>
              </div>
            </>
          )}
        </section>
      ) : (
        showFallback && (
          <div
            className="w-full h-[437px] px-9 py-12 flex items-center rounded-2xl"
            style={{
              backgroundImage: `url(${banner8.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div>
              <p className="text-white text-20 font-light tracking-widest mt-4">
                Get Discount Up to 50%
              </p>
              <h1 className="text-white text-4xl font-normal max-w-sm">
                Lincoln{' '}
                <span className="font-bold">
                  Leather <span className="font-semibold">Chair</span>
                </span>{' '}
                & Footstool
              </h1>
              <p className="text-white text-md font-light mt-4">
                AED 499
                <span className="ms-4 line-through text-sm text-white opacity-65">
                  AED 599
                </span>
              </p>
              <button
                className="my-4 px-4 py-3 text-black bg-white border border-white rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
                onClick={() => console.log('Add to Cart')}
              >
                <HiOutlineShoppingBag />
                <span className="mr-2 text-xs">Add to cart</span>
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProductBanner;
