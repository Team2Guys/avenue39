import React, { Suspense } from 'react';
import {
  fetchProducts,
  //  fetchReviews
} from '@/config/fetch';
import { generateSlug } from '@/config';
import NotFound from '@/app/not-found';
import { IProduct } from '@/types/types';
import Product from '@/components/Product/product';
import { ProductDetailSkeleton } from '../product-detail/skelton';

const SingleProduct = async ({ slug }: { slug: string[] }) => {
  const categoryName = slug[0];
  // const subcategoryName = slug[1];
  const productName = slug[2];
  // const [products, reviews] = await Promise.all([fetchProducts(),
  //    fetchReviews()
  //   ]);
  const products = await fetchProducts();

  const findProduct = products.find(
    (item: IProduct) => generateSlug(item.name) === productName,
  );
  // const findCategory = findProduct.categories.find((item: ICategory) => generateSlug(item.name) === categoryName);
  // const findSubCategory = findCategory?.subcategories?.find((item: ICategory) => generateSlug(item.name) === subcategoryName);

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

  console.log(similarProducts[0], 'similarProducts');
  console.log(categoryName, 'categoryName');
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <Product
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
