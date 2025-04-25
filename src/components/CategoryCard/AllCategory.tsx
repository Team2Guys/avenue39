const CatProduct = dynamic(() => import('./CatProduct'));
const CatProduct1 = dynamic(() => import('./CatProduct1'));
import { Accessories, Bedroom, Dining, Living } from '@/data/data';
import dynamic from 'next/dynamic';
import { IProduct } from '@/types/prod';
import { filterAccessories, filterByCategoryAndTitle, getCategoryDescription } from '@/config/HelperFunctions';
import { Suspense } from 'react';

const AllCategory = ({ products }: { products: IProduct[] }) => {

  return (
    <Suspense>
      <CatProduct
        products={filterByCategoryAndTitle(products, Dining)}
        CategoryDescription={getCategoryDescription('Dining', products)}
        CategoryName="Shop Your Dining"
        redirect="dining"
        portSpace="px-4 sm:px-8"
      />
      <CatProduct
        products={filterByCategoryAndTitle(products, Living)}
        CategoryDescription={getCategoryDescription('Living',products)}
        CategoryName="Shop Your Living"
        reverse
        landHeight={'calc(100% - 80px)'}
        portSpace="px-4 sm:px-8"
        sofaHeight={'calc(100% - 60px)'}
        sideTableHeight={'calc(100% - 20px)'}
        redirect="living"
        fill={true}
      />
      <CatProduct1
        products={filterByCategoryAndTitle(products, Bedroom)}
        CategoryDescription={getCategoryDescription('Bedroom',products)}
        CategoryName="Shop your Bedroom"
        redirect="bedroom"
      />
      <CatProduct1
        products={filterAccessories(products, Accessories)}
        CategoryDescription={getCategoryDescription('Accessories',products)}
        CategoryName="Complement your design with accessories"
        reverse
        redirect="accessories"
        accessoriesSlider={false}
      />
    </Suspense>
  );
};

export default AllCategory;
