import { findCategoryProducts } from '@/config/HelperFunctions';
import { Suspense } from 'react';
import { ICategory } from '@/types/cat';
import dynamic from 'next/dynamic';
const AccessoryProd = dynamic(() => import('./AccessoryProd'));
const GridLayout = dynamic(() => import('./GridLayout'));
const FlexLayout = dynamic(() => import('./FlexLayout'));


const AllCategory = async ({ categories }: { categories: ICategory[] }) => {


  return (
    <Suspense>
      <GridLayout
        category={findCategoryProducts(categories, 'Dining')}
        CategoryName="Shop Your Dining"
        redirect="dining"
        portSpace="px-4 sm:px-8"
      />
      <GridLayout
        category={findCategoryProducts(categories, 'Living')}
        CategoryName="Shop Your Living"
        reverse
        landHeight={'calc(100% - 80px)'}
        portSpace="px-4 sm:px-8"
        sofaHeight={'calc(100% - 60px)'}
        sideTableHeight={'calc(100% - 20px)'}
        redirect="living"
        fill={true}
      />
      <FlexLayout
        category={findCategoryProducts(categories, 'Bedroom')}
        CategoryName="Shop your Bedroom"
        redirect="bedroom"
      />

      <AccessoryProd
        CategoryDescription={findCategoryProducts(categories, 'Bedroom')?.short_description || ''}
        CategoryName="Complement your design with accessories"
        redirect="accessories"
      />


    </Suspense>
  );
};

export default AllCategory;
