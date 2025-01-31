
import React from 'react';
import Container from '../ui/Container';
import Card from '../ui/card';
import ProductGrid from './ProductGrid';
import { IProduct } from '@/types/types';
import ProductSkeleton from '../Skaleton/productSkeleton';
import Link from 'next/link';
import { homeProducts } from '@/data/products';
interface ICatProduct {
  reverse?: boolean;
  CategoryName: string;
  products:IProduct[];
  redirect: string;
}

const CatProduct1 = ({ reverse, CategoryName,products,redirect }: ICatProduct) => {
  const productImages = homeProducts.find((item) => item.name === redirect);
  return (
    <Container className="my-10">
    <div className='relative px-2 md:px-6 border-2 border-[#707070] rounded-[40px] sm:rounded-[87px]'>
    <Link href={`/products/${redirect}`} className="absolute -top-7 xs:-top-5 left-1/2 transform -translate-x-1/2 min-w-[180px] rounded-xl border bg-white xs:left-20 xs:transform-none hover:hover:font-bold">
        <p className="px-2 md:text-3xl font-Helveticalight capitalize text-center">
            {CategoryName}
        </p>
        </Link>    
      <div className={`mt-6 sm:mt-12 `}>
  
        <div className={`grid grid-cols-12 sm:gap-8 ${reverse ? "hidden" : " block"}`}>
        <div className={`col-span-12 md:col-span-6 xl:col-span-7 `}>
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
            {products.length < 1 && Array(3).fill(null).map((_, index) => (
              <ProductSkeleton imageHeight="h-[210px] xl:h-[496.5px]" key={index} />
            ))}
              <ProductGrid products={products.slice(6, 9)} productImages={productImages?.products || []}  CardComponent={Card} isHomepage={true} imageHeight="h-[210px] xl:h-[496.5px] w-full" />
            </div>
          </div>
          <div className={`col-span-12 md:col-span-6 xl:col-span-5`}>
          {products.length < 1 && (
             <ProductSkeleton imageHeight="h-[210px] xl:h-[496.5px]" />
            )}
              <ProductGrid products={products.slice(5, 6)} productImages={productImages?.products || []} CardComponent={Card} slider={true} imageHeight="h-[210px] xl:h-[496.5px] w-full" portSpace={'px-10'} />
          </div>
        </div>
        <div className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8`}>
        {products.length < 1 && Array(5).fill(null).map((_, index) => (
              <ProductSkeleton imageHeight="h-[270px] xl:h-[290px]" key={index} />
            ))}
          <ProductGrid products={products.slice(0, 5)} productImages={productImages?.products || []} CardComponent={Card} isHomepage={true} imageHeight="h-[270px] xl:h-[290px]" />
        </div>
      </div>
    </div>
  </Container>
  );
};
export default CatProduct1;
