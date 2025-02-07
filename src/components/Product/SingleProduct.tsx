import React, { Suspense } from 'react';
import {
  fetchProducts,
} from '@/config/fetch';
import { generateSlug } from '@/config';
import NotFound from '@/app/not-found';
import { IProduct } from '@/types/types';
import Product from '@/components/Product/product';
import { ProductDetailSkeleton } from '../product-detail/skelton';

const SingleProduct = async ({ slug ,subslug,mainslug}: { slug: string[],mainslug:string ,subslug:string }) => {
  const categoryName = slug[0];
  const productName = slug[2];
  const products = await fetchProducts();

  const findProduct = products.find((item: IProduct) => generateSlug(item.custom_url || item.name) === productName);
  if (!findProduct) {
    return <NotFound />;
  }

  const similarProducts: IProduct[] = products.filter((prod: IProduct) => {
    const hasMatchingCategory =
      prod?.categories &&
      prod?.categories.some(
        (prodCategory) =>
          prodCategory.name.trim().toLocaleLowerCase() === categoryName,
      );
    return hasMatchingCategory && prod.id !== findProduct.id;
  });

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <Product
        mainslug={mainslug}
        subslug={subslug}
        params={findProduct}
        products={products}
        similarProducts={similarProducts}
        reviews={[]}
        product={findProduct}
      />
    </Suspense>
  );
};

export default SingleProduct;
