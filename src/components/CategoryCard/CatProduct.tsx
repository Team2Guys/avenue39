import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Container from '../ui/Container';
import ProductSkeleton from '../Skaleton/productSkeleton';
import Link from 'next/link';
import { homeProducts } from '@/data/products';
import { IProduct } from '@/types/prod';

const ProductGrid = dynamic(() => import('./ProductGrid'));

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
  
    const categoryImages = useMemo(() => {
      return homeProducts.find((item) => item.name === redirect)?.products || [];
    }, [redirect]);

  if (!products || products.length === 0) {
    return (
      <Container className="my-10">
        <div className="px-2 md:px-8 border-2 border-[#707070] rounded-[40px] sm:rounded-[87px]">
          <h2 className="text-center py-8 text-lg font-semibold">No products available.</h2>
        </div>
      </Container>
    );
  }

  const mainProducts = products.slice(0, 5);
  const midProducts = products.slice(5, 7);
  const landscapeProducts = products.slice(7, 9);
  const extraProducts = products.slice(9, 12);

  const showSkeleton = (fromIndex: number) => products.length <= fromIndex;

  return (
    <Container className="my-10">
      <div className="relative px-2 md:px-8 border-2 border-[#707070] rounded-[40px] sm:rounded-[87px]">
        <Link
          href={`/${redirect}`}
          className="absolute -top-3 xsm:-top-5 left-1/2 transform -translate-x-1/2 rounded-xl border bg-main xs:left-20 xs:transform-none hover:font-bold hover:bg-black text-white hover:text-white"
        >
          <h2 className="px-2 text-13 xsm:text-16 md:text-3xl font-Helveticalight capitalize text-center text-shadow">
            {CategoryName}
          </h2>
        </Link>

        <div className="max-w-screen-xl mx-auto mt-10 text-center font-Helveticalight px-2 sm:px-4 lg:px-0">
          {CategoryDescription ? (
            <p className="text-14 lg:text-[22px]">{CategoryDescription}</p>
          ) : (
            <div className="animate-pulse">
              <div className="h-5 lg:h-6 bg-gray-300 rounded-md w-3/4 mx-auto mb-2" />
              <div className="h-5 lg:h-6 bg-gray-300 rounded-md w-2/4 mx-auto" />
            </div>
          )}
        </div>

        <div className={`mt-6 mb-0 sm:my-8 md:mt-8 md:mb-0 flex ${reverse ? 'flex-col-reverse' : 'flex-col'}`}>
          {/* Main product grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8">
            {products.length < 1 &&
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <ProductSkeleton imageHeight="h-[270px] xl:h-[290px]" key={index} />
                ))}
            <ProductGrid
              products={mainProducts}
              productImages={categoryImages}
              imageHeight="h-[270px] xl:h-[290px]"
              isHomepage
              calculateHeight={sofaHeight}
              redirect={redirect}
            />
          </div>

          {/* Side + mid sections */}
          <div className="grid grid-cols-12 sm:gap-8">
            <div className={`col-span-12 md:col-span-6 2xl:col-span-5 ${reverse ? 'order-2' : 'order-1'}`}>
              {showSkeleton(5) && (
                <ProductSkeleton imageHeight="h-[300px] xs:h-[580px] lg:h-[600px] xl:h-[860px]" />
              )}
              <ProductGrid
                products={midProducts}
                productImages={categoryImages}
                slider
                isLandscape={false}
                portSpace={portSpace}
                redirect={redirect}
                imageHeight="h-[300px] xs:h-[580px] lg:h-[600px] xl:h-[860px]"
              />
            </div>

            <div className={`col-span-12 md:col-span-6 2xl:col-span-7 ${reverse ? 'order-1' : 'order-2'}`}>
              {showSkeleton(6) && (
                <ProductSkeleton imageHeight="h-[200px] xl:h-[345.15px]" />
              )}
              <ProductGrid
                products={landscapeProducts}
                productImages={categoryImages}
                slider
                isLandscape
                imageHeight="h-[200px] xl:h-[345.15px]"
                calculateHeight={landHeight}
                redirect={redirect}
              />

              <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
                {showSkeleton(7) &&
                  Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <ProductSkeleton
                        imageHeight="h-[210px] xl:h-[353.64px]"
                        key={index}
                      />
                    ))}
                <ProductGrid
                  products={extraProducts}
                  productImages={categoryImages}
                  isHomepage
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
