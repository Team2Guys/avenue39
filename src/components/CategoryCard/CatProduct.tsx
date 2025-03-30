import React from 'react';
import Container from '../ui/Container';
import ProductGrid from './ProductGrid';
import { IProduct } from '@/types/types';
import ProductSkeleton from '../Skaleton/productSkeleton';
import Link from 'next/link';
import { homeProducts } from '@/data/products';
interface ICatProduct {
  reverse?: boolean;
  CategoryName: string;
  products: IProduct[];
  landHeight?: string;
  portSpace?: string;
  sofaHeight?: string;
  sideTableHeight?: string;
  redirect?: string;
  CategoryDescription?: string;
}
const CatProduct = ({
  reverse,
  CategoryName,
  products,
  landHeight,
  portSpace,
  sofaHeight,
  sideTableHeight,
  redirect,
  CategoryDescription,
}: ICatProduct) => {
  const productImages = homeProducts.find((item) => item.name === redirect);
  return (
    <Container className="my-10">
      <div className="relative px-2 md:px-8 border-2 border-[#707070] rounded-[40px] sm:rounded-[87px]">
        <Link
          href={`/${redirect}`}
          className="absolute -top-3 xsm:-top-5 left-1/2 transform -translate-x-1/2 rounded-xl border bg-white xs:left-20 xs:transform-none hover:font-bold hover:bg-black text-[#AFA183] hover:text-white"
        >
          <h2 className="px-2 text-13 xsm:text-16 md:text-3xl font-Helveticalight capitalize text-center ">
            {CategoryName}
          </h2>
        </Link>
        <div className=" max-w-screen-xl mx-auto mt-10 text-center font-Helveticalight px-2 sm:px-4 lg:px-0">
          {CategoryDescription ? (
            <p className="text-14 lg:text-[22px]">{CategoryDescription}</p>
          ) : (
            <div className="animate-pulse">
              <div className="h-5 lg:h-6 bg-gray-300 rounded-md w-3/4 mx-auto mb-2"></div>
              <div className="h-5 lg:h-6 bg-gray-300 rounded-md w-2/4 mx-auto"></div>
            </div>
          )}
        </div>
        <div className={`mt-6 mb-0 sm:my-8 md:mt-8 md:mb-0 flex ${reverse ? 'flex-col-reverse' : 'flex-col'}`}>
          <div
            className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8`}
          >
            {products.length < 1 &&
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <ProductSkeleton
                    imageHeight="h-[270px] xl:h-[290px]"
                    key={index}
                  />
                ))}
            <ProductGrid
              products={products.slice(0, 5)}
              productImages={productImages?.products || []}
              imageHeight="h-[270px] xl:h-[290px]"
              isHomepage={true}
              calculateHeight={sofaHeight}
              redirect={redirect}
            />
          </div>
          <div className="grid grid-cols-12 sm:gap-8">
            <div
              className={`col-span-12 md:col-span-6 2xl:col-span-5 ${reverse ? 'order-2' : 'order-1'}`}
            >
              {products.length < 5 && (
                <ProductSkeleton imageHeight="h-[300px] xs:h-[580px] lg:h-[600px] xl:h-[860px]" />
              )}
              <ProductGrid
                products={products.slice(5, 7)}
                productImages={productImages?.products || []}
                slider={true}
                // sliderNumber={1}
                isLandscape={false}
                portSpace={portSpace}
                redirect={redirect}
                imageHeight="h-[300px] xs:h-[580px] lg:h-[600px] xl:h-[860px]"
              />
            </div>
            <div
              className={`col-span-12 md:col-span-6 2xl:col-span-7 ${reverse ? 'order-1' : 'order-2'}`}
            >
              {products.length < 6 && (
                <ProductSkeleton imageHeight="h-[200px] xl:h-[345.15px]" />
              )}
              <ProductGrid
                products={products.slice(7, 9)}
                productImages={productImages?.products || []}
                slider={true}
                // sliderNumber={2}
                isLandscape={true}
                imageHeight="h-[200px] xl:h-[345.15px]"
                calculateHeight={landHeight}
                redirect={redirect}
              />
              <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
                {products.length < 7 &&
                  Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <ProductSkeleton
                        imageHeight="h-[210px] xl:h-[353.64px]"
                        key={index}
                      />
                    ))}
                <ProductGrid
                  products={products.slice(9, 12)}
                  productImages={productImages?.products || []}
                  isHomepage={true}
                  imageHeight="h-[210px] xl:h-[361.64px]"
                  calculateHeight={sideTableHeight || 'calc(100% - 10px)'}
                  redirect={redirect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default CatProduct;
