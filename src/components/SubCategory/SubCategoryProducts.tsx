import NotFound from '@/app/not-found';
import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import { fetchCategories, fetchProducts, fetchSubCategories } from '@/config/fetch';
import { ICategory, IProduct, Sizes } from '@/types/types';
import React from 'react';
import Product from '../Product/product';
import { re_Calling_products } from '@/data/Re_call_prod';

const SubCategoryProducts = async ({ slug, mainslug, filterParam, sizeParam }: { slug: string[], mainslug: string, filterParam?: string, sizeParam?: string }) => {
  let subcategoryName = slug[1];
  let category = slug[0];
  let newCategory: string | undefined;
  let newsubCat: string | undefined;

  const [AllProduct, subCategories, categories] = await Promise.all([fetchProducts(), fetchSubCategories(), fetchCategories()]);
  
  const findCategory = categories.find((cat: ICategory) => generateSlug(cat.custom_url || cat.name) === category);
  const SubCategoriesFinder = re_Calling_products.find((value) => generateSlug(value.mainCategory).trim().toLocaleLowerCase() === category && generateSlug(value.subCategory).trim().toLocaleLowerCase() == subcategoryName,
  );

  if (SubCategoriesFinder) {
    newsubCat = generateSlug(SubCategoriesFinder.redirectsubCat.trim().toLocaleLowerCase());
    newCategory = generateSlug(SubCategoriesFinder.redirect_main_cat.trim().toLocaleLowerCase());
  }

  const findSubCategory: any = subCategories?.find((item: any) => {
    const isNameMatch = generateSlug(item.custom_url || item.name) === (newsubCat ? newsubCat : subcategoryName);
    const belongsToCategory = item.categories.some((value: any) => generateSlug(value.custom_url || value.name).trim().toLocaleLowerCase() === (newCategory ? newCategory : category));
    return isNameMatch && belongsToCategory;
  });

  
  if (!findSubCategory) {
    const findProduct = AllProduct.find((item: IProduct) => generateSlug(item.custom_url || item.name) === subcategoryName);
    if (!findProduct) {
      return <NotFound />;
    }

    const similarProducts: IProduct[] = AllProduct.filter((prod: IProduct) => {
      const hasMatchingCategory =
        prod?.categories &&
        prod?.categories.some(
          (prodCategory) =>
            prodCategory?.name.trim().toLocaleLowerCase() === category,
        );
      return hasMatchingCategory && prod.id !== findProduct.id;
    });

    const uniqueSizes = [
      ...new Map(
        findProduct?.sizes?.map((size: Sizes) => [size?.name, size])
      ).values()
    ];

    return (
      <Product
        params={findProduct}
        products={AllProduct}
        similarProducts={similarProducts}
        reviews={[]}
        product={findProduct}
        filterParam={filterParam}
        sizeParam={sizeParam}
        uniqueSizes={uniqueSizes}
      />
    );
  }
  return (
    <Shop ProductData={findSubCategory.products}
      categories={findSubCategory.categories}
      AllProduct={AllProduct}
      isCategory={false}
      mainslug={mainslug}
      SubcategoryName={findSubCategory}
      info={findCategory}
    />
  );
};

export default SubCategoryProducts;
