import NotFound from '@/app/not-found';
import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import { fetchProducts, fetchSubCategories } from '@/config/fetch';
import { IProduct } from '@/types/types';
import React from 'react';
import Product from '../Product/product';
import { re_Calling_products } from '@/data/Re_call_prod';

const SubCategoryProducts = async ({ slug }: { slug: string[] }) => {
  let subcategoryName = slug[1];
  let category = slug[0];
  let newCategory: string | undefined;
  let newsubCat: string | undefined;

  const subCategories = await fetchSubCategories();

  const SubCategoriesFinder = re_Calling_products.find(
    (value) =>
      generateSlug(value.mainCategory).trim().toLocaleLowerCase() ===
      category &&
      generateSlug(value.subCategory).trim().toLocaleLowerCase() ==
      subcategoryName,
  );

  if (SubCategoriesFinder) {
    newsubCat = generateSlug(
      SubCategoriesFinder.redirectsubCat.trim().toLocaleLowerCase(),
    );
    newCategory = generateSlug(
      SubCategoriesFinder.redirect_main_cat.trim().toLocaleLowerCase(),
    );
  }


  console.log(newCategory, 'newCategory', newsubCat);

  const findSubCategory: any = subCategories?.find((item: any) => {
    const isNameMatch = generateSlug(item.name) === subcategoryName;
    const belongsToCategory = item.categories.some(
      (value: any) =>
        generateSlug(value.name).trim().toLocaleLowerCase() === category,
    );
    return isNameMatch && belongsToCategory;
  });

  const find_Redirected: any = subCategories?.find((item: any) => {
    const isNameMatch = generateSlug(item.name) === subcategoryName;
    const belongsToCategory = item.categories.some((value: any) => generateSlug(value.name).trim().toLocaleLowerCase() === category);
    return isNameMatch && belongsToCategory;
  });

  if (!findSubCategory) {
    let products = await fetchProducts();
    const findProduct = products.find(
      (item: IProduct) => generateSlug(item.name) === subcategoryName,
    );

    if (!findProduct) {
      return <NotFound />;
    }

    const similarProducts: IProduct[] = products.filter((prod: IProduct) => {
      const hasMatchingCategory =
        prod?.categories &&
        prod?.categories.some(
          (prodCategory) =>
            prodCategory?.name.trim().toLocaleLowerCase() === category,
        );
      return hasMatchingCategory && prod.id !== findProduct.id;
    });

    return (
      <Product
        params={findProduct}
        products={products}
        similarProducts={similarProducts}
        reviews={[]}
        product={findProduct}
      />
    );
  }
  return (
    <Shop ProductData={
      find_Redirected ? find_Redirected.products : findSubCategory.products
    }
      categories={findSubCategory.categories}
      isCategory={false}
      categoryName={findSubCategory}
    />
  );
};

export default SubCategoryProducts;
