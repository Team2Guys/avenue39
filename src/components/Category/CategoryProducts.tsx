import React from 'react';
import NotFound from '@/app/not-found';
import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import { fetchCategories } from '@/config/fetch';
import { menuData } from '@/data/menu';
import { ICategory } from '@/types/types';

const CategoryProducts = async ({ slug }: { slug: string }) => {
  const name = slug;
  const categories = await fetchCategories();

  const findCategory =categories &&categories?.find((item: any) => generateSlug(item.name) === name);
  if (!findCategory) {
    return <NotFound />;
  }

  const categoryName =name === 'lighting'
      ? 'Lighting'
      : name === 'home-office'
        ? 'homeOffice'
        : name;
  const subcategory = menuData[categoryName] || [];

  const sortProducts = findCategory.products
    .map((prod: any) => {
      const clonedProd = { ...prod, subcategories: [...prod.subcategories] };
      const clonedSubcategories = clonedProd.subcategories
        ? JSON.parse(JSON.stringify(clonedProd.subcategories))
        : [];

      const matchingSubcategories = clonedSubcategories
        ?.map((sub: ICategory) => {
          const foundSubcategory = subcategory?.find(
            (item) => item.title === sub.name,
          );

          if (foundSubcategory) {
            return { id: 0, name: foundSubcategory.title };
          }
          return undefined;
        })
        .filter((item: any) => item !== undefined);

      clonedProd.subcategories = matchingSubcategories;

      return clonedProd;
    })
    .sort((a: any, b: any) => {
      if (!a.subcategories || a.subcategories.length === 0) return 1;
      if (!b.subcategories || b.subcategories.length === 0) return -1;

      const subcategoryA = a.subcategories?.[0]?.name || '';
      const subcategoryB = b.subcategories?.[0]?.name || '';

      const indexA = subcategory.findIndex(
        (item) => item.title === subcategoryA,
      );
      const indexB = subcategory.findIndex(
        (item) => item.title === subcategoryB,
      );

      return indexA - indexB;
    });

  return (
    <Shop
      ProductData={sortProducts}
      isCategory={true}
      categories={categories}
      categoryName={findCategory}
    />
  );
};

export default CategoryProducts;
