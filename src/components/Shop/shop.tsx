'use client';
import ProductPage from '@/components/product-page/product';
import React, {useState } from 'react';
import { ICategory, IProduct } from '@/types/types';

const Shop = ({
  categories,
  ProductData,
  isCategory,
  findCategory,
  categoryName,
}: {
  categories?: ICategory[];
  ProductData: IProduct[];
  isCategory?: boolean;
  findCategory?: string;
  categoryName: ICategory;
}) => {
  const [layout, Setlayout] = useState<string>('grid');
  return (
    <>
      <ProductPage
        layout={layout}
        Setlayout={Setlayout}
        category={categories}
        ProductData={ProductData}
        isCategory={isCategory}
        findCategory={findCategory}
        categoryName={categoryName}
      />
    </>
  );
};

export default Shop;
