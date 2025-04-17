
import React, { useCallback, useMemo } from 'react';
const CatProduct =  dynamic(() => import('./CatProduct'));
const CatProduct1 =  dynamic(() => import('./CatProduct1'));
import { Accessories, Bedroom, Dining, Living } from '@/data/data';
import { generateSlug } from '@/config';
import dynamic from 'next/dynamic';
import { IProduct } from '@/types/prod';
import { filterAccessories, filterByCategoryAndTitle } from '@/config/HelperFunctions';

const AllCategory = ({ products }: { products: IProduct[] }) => {

  const diningProducts = useMemo(() => filterByCategoryAndTitle(products, Dining), [products]);
  const livingProducts = useMemo(() => filterByCategoryAndTitle(products, Living), [products]);
  const bedroomProducts = useMemo(() => filterByCategoryAndTitle(products, Bedroom), [products]);
  const accessoryProducts = useMemo(() => filterAccessories(products, Accessories), [products]);


  const getCategoryDescription = useCallback((categoryName: string) => {
    const matchedCategory = products.flatMap((product) => product.categories || [])
      .find((category) => generateSlug(category.name) === generateSlug(categoryName));
    return matchedCategory?.short_description || '';
  }, [products]);


  return (
    <div className="pt-1">
      <CatProduct
        products={diningProducts}
        CategoryDescription={getCategoryDescription('Dining')}
        CategoryName="Shop Your Dining"
        redirect="dining"
      />
      <CatProduct
        products={livingProducts}
        CategoryDescription={getCategoryDescription('Living')}
        CategoryName="Shop Your Living"
        reverse
        landHeight={'calc(100% - 80px)'}
        portSpace="px-4 sm:px-8"
        sofaHeight={'calc(100% - 60px)'}
        sideTableHeight={'calc(100% - 20px)'}
        redirect="living"
      />
      <CatProduct1
        products={bedroomProducts}
        CategoryDescription={getCategoryDescription('Bedroom')}
        CategoryName="Shop your Bedroom"
        redirect="bedroom"
      />
      <CatProduct1
        products={accessoryProducts}
        CategoryDescription={getCategoryDescription('Accessories')}
        CategoryName="Complement your design with accessories"
        reverse
        redirect="accessories"
        accessoriesSlider={true}
      />
    </div>
  );
};

export default AllCategory;
