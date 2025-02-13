'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IProduct } from '@/types/types';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import CardSkaleton from '../Skaleton/productscard';
import Card from '../ui/card';
import { CartItem } from '@/redux/slices/cart/types';

interface FeatureProps {
  similarProducts?: IProduct[];
  title?: boolean;
}

const FeatureSlider: React.FC<FeatureProps> = ({ similarProducts, title }) => {
  const [filterProducts, setFilterProducts] = useState<CartItem[]>([])
  // console.log(similarProducts, "similarProducts")
  useEffect(() => {
    const processedProducts = similarProducts?.flatMap((prod) => {
      if ((!prod.sizes || prod.sizes.length === 0) && (!prod.filter || prod.filter.length === 0)) {
        return [prod];
      }

      if (!prod.productImages || prod.productImages.length === 0) {
        return [];
      }

      const uniqueVariations = new Map();

      prod.productImages
        .filter((img) => img.index)
        .forEach((img) => {
          const sizeMatch = prod.sizes?.find(
            (size) => size.name?.toLowerCase() === img.size?.toLowerCase()
          );
          const filterMatch = prod.filter?.[0]?.additionalInformation?.find(
            (filterItem) => filterItem.name?.toLowerCase() === img.color?.toLowerCase()
          );

          const hoverImageMatch = prod.productImages.find(
            (hoverImg) => hoverImg.index === img.index && hoverImg.imageUrl !== img.imageUrl
          );

          const variationKey = img.index;

          if (!uniqueVariations.has(variationKey)) {
            uniqueVariations.set(variationKey, {
              ...prod,
              name: prod.name,
              displayName: `${prod.name} - ${img.size?.toLowerCase() === img.color?.toLowerCase()
                ? img.size
                : `${img.size ? img.size : ''} ${img.color ? `(${img.color})` : ''}`
                }`,
              sizeName: img.size,
              colorName: img.color,
              price: sizeMatch
                ? Number(sizeMatch.price)
                : filterMatch
                  ? Number(filterMatch.price)
                  : Number(prod.price),
              discountPrice: sizeMatch
                ? Number(sizeMatch.discountPrice)
                : filterMatch
                  ? Number(filterMatch.discountPrice || 0)
                  : Number(prod.discountPrice),
              posterImageUrl: img.imageUrl,
              hoverImageUrl: hoverImageMatch ? hoverImageMatch.imageUrl : prod.hoverImageUrl,
              stock: sizeMatch?.stock ?? prod.stock,
            });
          }
        });

      return Array.from(uniqueVariations.values());
    });

    if (processedProducts && processedProducts.length > 0) {
      // const filteredProducts = processedProducts.filter((card: CartItem) => {
      //   const sizeStock = card?.sizes?.find((size) => size.name === card.sizeName)?.stock;
      //   const filterStock = card?.filter?.[0]?.additionalInformation?.find((size) => size.name === card.colorName)?.stock;
      //   const totalStock = Number(sizeStock) || Number(filterStock) || card.stock;

      //   return totalStock > 0;
      // });

      setFilterProducts(processedProducts);
    }
  }, [similarProducts]);

  const swiperRef = useRef<any>(null);

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
  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };
  return (
    <div
      className="slider-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {similarProducts?.length ? (
        <>
          <div
            className={`text-end mb-3 px-4 flex ${title ? 'justify-between' : 'justify-end'}`}
          >
            {title && (
              <p className="lg:text-3xl text-2xl text-left font-semibold ">
                Similar Products
              </p>
            )}
            <div>
              <button
                className="button"
                onClick={previous}
                style={{ marginRight: '10px' }}
              >
                <IoIosArrowBack size={30} />
              </button>
              <button className="button" onClick={next}>
                <IoIosArrowForward size={30} />
              </button>
            </div>
          </div>
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={30}
            loop={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.button-next',
              prevEl: '.button-prev',
            }}
            breakpoints={{
              2000: {
                slidesPerView: 5,
              },
              1500: {
                slidesPerView: 5,
              },
              1290: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 4,
              },
              680: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 2,
              },
              460: {
                slidesPerView: 1.5,
              },
            }}
            modules={[Navigation, Autoplay, Pagination]}
            className="mySwiper"
          >
            {filterProducts && filterProducts.map((card: IProduct, index) => (
              <SwiperSlide className="mb-10" key={index}>
                <Card
                  card={card}
                  isLoading={false}
                  cardImageHeight="h-[280px] xsm:h-[220px] sm:h-[240px] md:h-[270px] xl:h-[220px] 2xl:h-[280px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <CardSkaleton />
      )}
    </div>
  );
};

export default FeatureSlider;
