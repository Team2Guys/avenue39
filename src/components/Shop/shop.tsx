'use client';
import ProductPage from '@/components/product-page/product';
import React, { useState } from 'react';
import { ICategory, IProduct } from '@/types/types';

const Shop = ({
  categories,
  ProductData,
  isCategory,
  findCategory,
  SubcategoryName,
  AllProduct,
  mainslug,
  info,
}: {
  categories?: ICategory[];
  ProductData: IProduct[];
  AllProduct?: IProduct[];
  isCategory?: boolean;
  findCategory?: string;
  SubcategoryName?: ICategory;
  mainslug?: string;
  info?: ICategory;
}) => {
  const [layout, Setlayout] = useState<string>('grid');
  return (
    <>
      <ProductPage
        layout={layout}
        Setlayout={Setlayout}
        category={categories}
        AllProduct={AllProduct || []}
        ProductData={ProductData}
        isCategory={isCategory}
        findCategory={findCategory}
        mainslug={mainslug}
        info={info}
        SubcategoryName={SubcategoryName}
      />
    </>
  );
};

export default Shop;
