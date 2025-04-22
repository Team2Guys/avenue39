// components/AllCategorySections/LivingSection.tsx
import React from 'react';
const CatProduct = dynamic(() => import('../CatProduct'));
import { IProduct } from '@/types/prod';
import { filterByCategoryAndTitle } from '@/config/HelperFunctions';
import { Living } from '@/data/data';
import { generateSlug } from '@/config';
import dynamic from 'next/dynamic';

export default function LivingSection({ products }: { products: IProduct[] }) {
  const livingProducts = filterByCategoryAndTitle(products, Living);

  const description =
    products.flatMap(p => p.categories || []).find(cat =>
      generateSlug(cat.name) === generateSlug('Living')
    )?.short_description || '';

  return (
    <CatProduct
      products={livingProducts}
      CategoryDescription={description}
      CategoryName="Shop Your Living"
      reverse
      landHeight={'calc(100% - 80px)'}
      portSpace="px-4 sm:px-8"
      sofaHeight={'calc(100% - 60px)'}
      sideTableHeight={'calc(100% - 20px)'}
      redirect="living"
    />
  );
}
