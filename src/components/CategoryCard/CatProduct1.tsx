import React from 'react';
import Container from '../ui/Container';
import { IProduct } from '@/types/prod';
import ProductSkeleton from '../Skaleton/productSkeleton';
const ProductGrid = dynamic(() => import('./ProductGrid'));
import Link from 'next/link';
import { homeProducts } from '@/data/products';
import dynamic from 'next/dynamic';

interface ICatProduct {
  reverse?: boolean;
  CategoryName: string;
  products: IProduct[];
  redirect: string;
  CategoryDescription?: string;
  accessoriesSlider?: boolean;
}

const CatProduct1 = ({
  reverse,
  CategoryName,
  products,
  redirect,
  CategoryDescription,
  accessoriesSlider = false,
}: ICatProduct) => {
  const productImages = homeProducts.find((item) => item.name === redirect)?.products || [];

  const shouldShowAccessoriesSlider = accessoriesSlider && products.length > 0;

  const mainProducts = products.slice(0, 5);
  const midProducts = products.slice(5, 7);
  const extraProducts = products.slice(7, 10);

  const findproduct = shouldShowAccessoriesSlider ? products : mainProducts;

  const renderSkeletons = (count: number, height: string) =>
    Array(count).fill(null).map((_, index) => (
      <ProductSkeleton key={index} imageHeight={height} />
    ));

  return (
    <Container className="my-10">
      <div className="relative px-2 md:px-8 border-2 border-[#707070] rounded-[40px] sm:rounded-[87px]">
        <Link
          href={`/${redirect}`}
          className="absolute -top-3 xsm:-top-5 left-1/2 transform -translate-x-1/2 rounded-xl border bg-main xs:left-20 xs:transform-none hover:font-bold hover:bg-black text-white hover:text-white"
        >
          <p className="px-2 text-13 xsm:text-16 md:text-3xl font-Helveticalight capitalize text-center">
            {CategoryName}
          </p>
        </Link>

        {/* Description */}
        <div className="max-w-screen-xl mx-auto mt-10 text-center font-Helveticalight px-2 sm:px-4 lg:px-0">
          {CategoryDescription ? (
            <p className="text-14 lg:text-[22px] mt-6 sm:mb-8">{CategoryDescription}</p>
          ) : (
            <div className="animate-pulse">
              <div className="h-5 lg:h-6 bg-gray-300 rounded-md w-3/4 mx-auto mb-2"></div>
              <div className="h-5 lg:h-6 bg-gray-300 rounded-md w-2/4 mx-auto"></div>
            </div>
          )}
        </div>
          {/* Top Section */}
          {!reverse && (
            <div className="grid grid-cols-12 sm:gap-8">
              <div className="col-span-12 md:col-span-6 xl:col-span-7">
                <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
                  {products.length < 1
                    ? renderSkeletons(3, "h-[210px] xl:h-[496.5px]")
                    : (
                      <ProductGrid
                        products={extraProducts}
                        productImages={productImages}
                        isHomepage
                        redirect={redirect}
                        imageHeight="h-[210px] xl:h-[496.5px] w-full"
                      />
                    )}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 xl:col-span-5">
                {products.length < 1 ? (
                  <ProductSkeleton imageHeight="h-[310px] xl:h-[496.5px]" />
                ) : (
                  <ProductGrid
                    products={midProducts}
                    productImages={productImages}
                    slider
                    redirect={redirect}
                    imageHeight="h-[310px] xl:h-[496.5px] w-full"
                    portSpace="px-10"
                    calculateHeight="calc(100% - 40px)"
                  />
                )}
              </div>
            </div>
          )}

          {/* Bottom Section */}
          <div
            className={`grid ${
              shouldShowAccessoriesSlider
                ? 'grid-cols-1'
                : 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8'
            }`}
          >
            {products.length < 1
              ? renderSkeletons(5, "h-[270px] xl:h-[290px]")
              : (
                <ProductGrid
                  products={findproduct}
                  productImages={productImages}
                  isHomepage
                  redirect={redirect}
                  imageHeight="h-[270px] xl:h-[290px]"
                  accessoriesSlider={accessoriesSlider}
                  slider={redirect === 'accessories'}
                />
              )}
          </div>
      </div>
    </Container>
  );
};

export default React.memo(CatProduct1);
