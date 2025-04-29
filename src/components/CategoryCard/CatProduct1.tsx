import React from 'react';
import { IProduct } from '@/types/prod';
import ProductSkeleton from '../Skaleton/productSkeleton';
const ProductGrid = dynamic(() => import('./ProductGrid'));
import { homeProducts } from '@/data/products';
import dynamic from 'next/dynamic';
import { renderProductSkeletons } from '@/config';
import CategoryWrapper from './CategoryWrapper';

interface ICatProduct {
  CategoryName: string;
  products: IProduct[];
  redirect: string;
  CategoryDescription?: string;
  accessoriesSlider?: boolean;
}

const CatProduct1 = async ({
  CategoryName,
  products,
  redirect,
  CategoryDescription,
  accessoriesSlider,
}: ICatProduct) => {
  const productImages = homeProducts.find((item) => item.name === redirect)?.products || [];


  const mainProducts = products.slice(0, 5);
  const midProducts = products.slice(5, 7);
  const extraProducts = products.slice(7, 10);

 mainProducts;


  return (


    <CategoryWrapper redirect={redirect} CategoryName={CategoryName} CategoryDescription={CategoryDescription}>

      {


        <div className="grid grid-cols-12 sm:gap-8">
          <div className="col-span-12 md:col-span-6 xl:col-span-7">
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
              {products.length < 1
                ? renderProductSkeletons(3, "h-[210px] xl:h-[496.5px]")
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
                isHomepage
                redirect={redirect}
                imageHeight="h-[310px] xl:h-[496.5px] w-full"
                portSpace="px-10"
                calculateHeight="calc(100% - 40px)"
              />
            )}

          </div>
        </div>
      }

      {/* Bottom Section */}
      <div
        className={`grid 
          : 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8'
          `}
      >
        {products.length < 1
          ? renderProductSkeletons(5, "h-[270px] xl:h-[290px]")
          : (

            <ProductGrid
              products={mainProducts}
              productImages={productImages}
              isHomepage
              redirect={redirect}
              imageHeight="h-[270px] xl:h-[290px]"
              accessoriesSlider={accessoriesSlider}
              slider={redirect === 'accessories'}
            />

          )}


      </div>
    </CategoryWrapper>

  );
};

export default React.memo(CatProduct1);
