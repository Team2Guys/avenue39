'use client';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '@/types/prod';
import { fetchProducts } from '@/config/fetch';
import { generateSlug } from '@/config';
import React from 'react';
import CardSkaleton from '../Skaleton/productscard';
interface DiscountCardProps {
  productItems: Array<{
    id: number;
    imageUrl: string | StaticImageData;
    title: string;
  }>;
}

const DiscountCard: React.FC<DiscountCardProps> = () => {
  const { data: products = [], isLoading } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const categoryOrder = [
    'LIVING',
    'DINING',
    'HOME OFFICE',
    'BEDROOM',
    'CHAIRS',
    'TABLES',
    'LIGHTING',
    'ACCESSORIES',
    'NEW ARRIVALS',
  ];

  if (isLoading) return <CardSkaleton />;

  const categorizedProducts = categoryOrder.map((category) => {
    const categoryProducts = products.filter((product) =>
      //@ts-expect-error
      product.categories.some((cat) => cat.name === category),
    );
    return {
      category,
      products: categoryProducts,
    };
  });

  const displayedProductIds = new Set<number>();

  return (
    <div className="py-5 px-2">
      <Swiper
        slidesPerView={1.3}
        spaceBetween={20}
        scrollbar={{
          enabled: true,
          draggable: true,
          hide: false,
        }}
        breakpoints={{
          1336: {
            slidesPerView: 5,
          },
          1216: {
            slidesPerView: 4.5,
          },
          1068: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3.5,
          },
          652: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 2.5,
          },
          383: {
            slidesPerView: 2,
          },
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {categorizedProducts.map((categoryItem) => {
          const { category, products } = categoryItem;
          let displayedForCategory = false;

          return (
            <React.Fragment key={category}>
              {products.map((product) => {
                if (
                  displayedProductIds.has(product.id) ||
                  displayedForCategory
                ) {
                  return null;
                }

                displayedProductIds.add(product.id);
                displayedForCategory = true;

                return (
                  <SwiperSlide className="mb-5" key={product.id}>
                    <Link href={`/product/${generateSlug(product.name)}`}>
                      <div
                        className="relative w-full"
                        style={{ height: '320px' }}
                      >
                        <Image
                          src={product.productImages[0]?.imageUrl || ''}
                          alt={
                            product.productImages[0]?.altText || product.name
                          }
                          className="rounded-xl object-cover w-full h-full"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="text-14 sm:text-16 lg:text-[18px] truncate font-bold mt-3 pb-1">
                        {product.name}
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </React.Fragment>
          );
        })}

        {/* {products
          .filter(
            (product) =>
              !categoryOrder.some((category) =>
                product?.categories?.some((cat) => cat.name === category),
              ) && !displayedProductIds.has(product.id),
          )
          .map((item) => {
            if (displayedProductIds.has(item.id)) return null;
            displayedProductIds.add(item.id);

            return (
              <SwiperSlide className="mb-5" key={item.id}>
                <Link href={`/product/${generateSlug(item.name)}`}>
                  <div className="relative w-full">
                    <Image
                      src={item.productImages[0]?.imageUrl || ''}
                      alt={item.productImages[0]?.altText || 'product image'}
                      className="rounded-xl object-cover w-full h-full"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="text-14 sm:text-16 lg:text-[20px] font-bold mt-3 pb-1">
                    Extra 20% off Clearance*
                  </div>
                </Link>
              </SwiperSlide>
            );
          })} */}
      </Swiper>
    </div>
  );
};

export default DiscountCard;
