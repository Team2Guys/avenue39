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
  AllProduct,
}: {
  categories?: ICategory[];
  ProductData: IProduct[];
  AllProduct: IProduct[];
  isCategory?: boolean;
  findCategory?: string;
  categoryName: ICategory;
}) => {
  const [layout, Setlayout] = useState<string>('grid');
  console.log(ProductData,"ProductData")
  return (
    <>
      <ProductPage
        layout={layout}
        Setlayout={Setlayout}
        category={categories}
        AllProduct={AllProduct}
        ProductData={ProductData}
        isCategory={isCategory}
        findCategory={findCategory}
        categoryName={categoryName}
      />
    </>
  );
};

export default Shop;
