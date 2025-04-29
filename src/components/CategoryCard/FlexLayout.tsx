import React from 'react';
import ProductSkeleton from '../Skaleton/productSkeleton';
const ProductGrid = dynamic(() => import('./ProductGrid'));
import { homeProducts } from '@/data/products';
import dynamic from 'next/dynamic';
import { renderProductSkeletons } from '@/config';
const CategoryWrapper = dynamic(() => import('./CategoryWrapper'));
import { ICategory } from '@/types/cat';
import Container from '../ui/Container';

interface ICatProduct {
  CategoryName: string;
  category: ICategory | undefined;
  redirect: string;
  accessoriesSlider?: boolean;
}

const FlexLayout = async ({
  CategoryName,
  category,
  redirect,
  accessoriesSlider,
}: ICatProduct) => {
  const productImages = homeProducts.find((item) => item.name === redirect)?.products || [];


  const mainProducts = category?.home_product?.[0] || [];
  const midProducts = category?.home_product?.[1] || [];
  const extraProducts = category?.home_product?.[2] || [];

  if (!category?.home_product) {
   return (
      <CategoryWrapper redirect={redirect} CategoryName={CategoryName} CategoryDescription={category?.short_description}>
         <Container className="my-10">
            <div className="px-2 md:px-8 border-2 border-[#707070] rounded-[40px] sm:rounded-[87px]">
               <h2 className="text-center py-8 text-lg font-semibold">No products available.</h2>
            </div>
         </Container>
      </CategoryWrapper>
   );
}


  return (


    <CategoryWrapper redirect={redirect} CategoryName={CategoryName} CategoryDescription={category?.short_description}>

      {


        <div className="grid grid-cols-12 sm:gap-8 mt-6 mb-0 sm:my-8 md:mt-8 md:mb-0">
          <div className="col-span-12 md:col-span-6 xl:col-span-7">
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
              {mainProducts && mainProducts?.length < 1
                ? renderProductSkeletons(3, "h-[210px] xl:h-[496.5px]")
                : (
                  <ProductGrid
                    products={mainProducts}
                    productImages={productImages}
                    isHomepage
                    redirect={redirect}
                    imageHeight="h-[210px] xl:h-[496.5px] w-full"
                  />
                )}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-5">
            {midProducts && midProducts?.length < 1 ? (
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
        className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8'
      >
        {extraProducts && extraProducts?.length < 1
          ? renderProductSkeletons(5, "h-[270px] xl:h-[290px]")
          : (

            <ProductGrid
              products={extraProducts}
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

export default React.memo(FlexLayout);
