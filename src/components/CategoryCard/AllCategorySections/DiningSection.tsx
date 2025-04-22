// components/AllCategorySections/DiningSection.tsx
import React from 'react';
const CatProduct = dynamic(() => import('../CatProduct'));
import { IProduct } from '@/types/prod';
import { filterByCategoryAndTitle } from '@/config/HelperFunctions';
import { Dining } from '@/data/data';
import { generateSlug } from '@/config';
import dynamic from 'next/dynamic';

export default function DiningSection({ products }: { products: IProduct[] }) {
  const diningProducts = filterByCategoryAndTitle(products, Dining);

  const description =
    products.flatMap(p => p.categories || []).find(cat =>
      generateSlug(cat.name) === generateSlug('Dining')
    )?.short_description || '';

  return (
    <CatProduct
      products={diningProducts}
      CategoryDescription={description}
      CategoryName="Shop Your Dining"
      redirect="dining"
    />
  );
}
