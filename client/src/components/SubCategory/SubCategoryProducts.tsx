import NotFound from '@/app/not-found';
import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import {fetchProducts, fetchSubCategories } from '@/config/fetch';
import { IProduct } from '@/types/types';
import React from 'react'
import ProductBanner from '../discount-banner/product-banner';
import Product from '../Product/product';

const SubCategoryProducts = async ({ slug }: { slug: string[] }) => {
  const subcategoryName = slug[1];
  const category = slug[0];

  const subCategories = await fetchSubCategories()
  const findSubCategory: any = subCategories?.find((item: any) => {
    const isNameMatch = generateSlug(item.name) === subcategoryName;
    const belongsToCategory = item.categories.some((value: any) => generateSlug(value.name).trim().toLocaleLowerCase() === category
    );

    return isNameMatch && belongsToCategory;
  });
  if (!findSubCategory) {
    let products = await fetchProducts()
    const findProduct = products.find((item: IProduct) => generateSlug(item.name) === subcategoryName);

    if (!findProduct) {
      return <NotFound />
    }

    console.log(findProduct, "findProduct")
    const similarProducts: IProduct[] = products?.filter((prod: IProduct) => {
      const hasMatchingCategory = prod?.categories && prod?.categories.some((prodCategory) => (prodCategory?.name.trim().toLocaleLowerCase() === category));
      return hasMatchingCategory && prod.id !== findProduct.id;
    });
    return (
      <Product params={findProduct} products={products} similarProducts={similarProducts} reviews={[]} product={findProduct} />
    )

  }


  return (

    <Shop
      productBanner={<ProductBanner
         subCategoriesName={findSubCategory.name} />}
      ProductData={findSubCategory.products}
      categories={findSubCategory.categories}
      isCategory={false}
      categoryName={findSubCategory}
    />
  )
}

export default SubCategoryProducts