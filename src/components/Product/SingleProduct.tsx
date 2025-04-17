import React, { Suspense } from 'react';
import {
  fetchProducts,
} from '@/config/fetch';
import { generateSlug } from '@/config';
import NotFound from '@/app/not-found';
import { IProduct, Sizes } from '@/types/prod';
import Product from '@/components/Product/product';
import { ProductDetailSkeleton } from '../product-detail/skelton';

const SingleProduct = async ({ slug ,subslug,mainslug, sizeParam , filterParam}: { slug: string[],mainslug:string ,subslug:string , filterParam?: string , sizeParam?: string}) => {
  const categoryName = slug[0];
  const subcat = slug[1];
  const productName = slug[2];
  const products = await fetchProducts();

  const findProduct = products.find((item: IProduct) =>{
    const hasMatchingCategory =item?.categories &&item?.categories.some((prodCategory) =>(prodCategory.custom_url || generateSlug(prodCategory.name)).trim().toLocaleLowerCase() === categoryName,
  );
  const subCategory =item?.subcategories &&item?.subcategories.some((prodCategory) =>(prodCategory.custom_url || generateSlug(prodCategory.name)).trim().toLocaleLowerCase() === subcat,
);
    
    return (  generateSlug(item.custom_url || item.name) === productName) && (hasMatchingCategory && subCategory)
  }
   

);

  if (!findProduct) {
    return <NotFound />;
  }

  const similarProducts: IProduct[] = products.filter((prod: IProduct) => {
    const hasMatchingCategory =prod?.categories &&prod?.categories.some((prodCategory) =>(prodCategory.custom_url || prodCategory.name).trim().toLocaleLowerCase() === categoryName,
      );
    return hasMatchingCategory && prod.id !== findProduct.id;
  });

  const uniqueSizes = [
    ...new Map(
      findProduct?.sizes?.map((size: Sizes) => [size?.name, size])
    ).values()
  ];

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
        filterParam={filterParam}
        sizeParam={sizeParam}
        uniqueSizes={uniqueSizes}
      />
    </Suspense>
  );
};

export default SingleProduct;
