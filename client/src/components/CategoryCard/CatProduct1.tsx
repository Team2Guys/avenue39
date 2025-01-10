
import React from 'react';
import Container from '../ui/Container';
import Card from '../ui/card';
import Multicard from './multicard';
import ProductGrid from './ProductGrid';
import { IProduct } from '@/types/types';
import { Skeleton } from '../ui/skeleton';
interface ICatProduct {
  reverse?: boolean;
  CategoryName: string;
  products:IProduct[];
}

const CatProduct1 = ({ reverse, CategoryName,products }: ICatProduct) => {
  return (
    <Container className="my-10">
    <div className='relative p-2 md:p-4 border-2 border-[#707070] rounded-[87px]'>
    <div className="absolute -top-7 xs:-top-5 left-1/2 transform -translate-x-1/2 rounded-xl border bg-white xs:left-20 xs:transform-none">
        <p className="px-2 md:text-3xl font-Helveticalight capitalize text-center">
            {CategoryName}
        </p>
        </div>    
      <div className={`my-10 `}>
  
        <div className={`grid grid-cols-12 sm:gap-8 ${reverse ? "hidden" : " block"}`}>
        <div className={`col-span-12 md:col-span-6 xl:col-span-7 `}>
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
            {products.length < 1 && Array(3).fill(null).map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <Skeleton className="h-[210px] xl:h-[496.5px] w-full rounded-[35px]" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-28 h-5 mx-auto" />
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Skeleton className="w-28 h-8 mx-auto rounded-full" />
                  <Skeleton className="w-28 h-8 mx-auto rounded-full" />
                </div>
              </div>
            ))}
              <ProductGrid products={products.slice(0, 3)} CardComponent={Card} imageHeight="h-[210px] xl:h-[496.5px] w-full" />
            </div>
          </div>
          <div className={`col-span-12 md:col-span-6 xl:col-span-5`}>
          {products.length < 1 && (
              <div className="flex flex-col gap-3">
                <Skeleton className="h-[210px] xl:h-[496.5px] w-full rounded-[35px]" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-28 h-5 mx-auto" />
                <div className="flex justify-center gap-2 mb-2">
                  <Skeleton className="w-28 h-8 rounded-full" />
                  <Skeleton className="w-28 h-8 rounded-full" />
                </div>
              </div>
            )}
              <ProductGrid products={products.slice(26, 27)} CardComponent={Multicard} imageHeight="h-[210px] xl:h-[496.5px] w-full" />
          </div>
        </div>
        <div className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8`}>
        {products.length < 1 && Array(5).fill(null).map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <Skeleton className="h-[270px] xl:h-[290px] w-full rounded-[35px]" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-28 h-5 mx-auto" />
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Skeleton className="w-28 h-8 mx-auto rounded-full" />
                  <Skeleton className="w-28 h-8 mx-auto rounded-full" />
                </div>
              </div>
            ))}
          <ProductGrid products={products.slice(0, 5)} CardComponent={Card} imageHeight="h-[270px] xl:h-[290px]" />
        </div>
      </div>
    </div>
  </Container>
  );
};
export default CatProduct1;
