// components/AllCategorySections/BedroomSection.tsx
import React from 'react';
const CatProduct = dynamic(() => import('../CatProduct1'));
import { IProduct } from '@/types/prod';
import { filterByCategoryAndTitle } from '@/config/HelperFunctions';
import { Bedroom } from '@/data/data';
import { generateSlug } from '@/config';
import dynamic from 'next/dynamic';

export default function BedroomSection({ products }: { products: IProduct[] }) {
  const bedroomProducts = filterByCategoryAndTitle(products, Bedroom);

  const description =
    products.flatMap(p => p.categories || []).find(cat =>
      generateSlug(cat.name) === generateSlug('Bedroom')
    )?.short_description || '';

  return (
    <CatProduct
      products={bedroomProducts}
      CategoryDescription={description}
      CategoryName="Shop your Bedroom"
      redirect="bedroom"
    />
  );
}
