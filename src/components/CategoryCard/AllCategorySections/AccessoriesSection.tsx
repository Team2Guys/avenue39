// components/AllCategorySections/AccessoriesSection.tsx
import React from 'react';
const CatProduct = dynamic(() => import('../CatProduct1'));
import { IProduct } from '@/types/prod';
import { filterAccessories } from '@/config/HelperFunctions';
import { Accessories } from '@/data/data';
import { generateSlug } from '@/config';
import dynamic from 'next/dynamic';

export default function AccessoriesSection({ products }: { products: IProduct[] }) {
  const accessoryProducts = filterAccessories(products, Accessories);

  const description =
    products.flatMap(p => p.categories || []).find(cat =>
      generateSlug(cat.name) === generateSlug('Accessories')
    )?.short_description || '';

  return (
    <CatProduct
      products={accessoryProducts}
      CategoryDescription={description}
      CategoryName="Complement your design with accessories"
      reverse
      redirect="accessories"
      accessoriesSlider={true}
    />
  );
}
