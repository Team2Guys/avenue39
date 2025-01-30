import React from 'react'
import NotFound from '@/app/not-found';
import Shop from '@/components/Shop/shop';
import ProductBanner from '@/components/discount-banner/product-banner';
import { generateSlug } from '@/config';
import { fetchCategories, fetchProducts } from '@/config/fetch'
import { menuData } from '@/data/menu';
import { ICategory } from '@/types/types';

const CategoryProducts = async ({ slug }: { slug: string[]  }) => {
   const name = slug[0];
   const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()])
   const findCategory = categories.find((item) => generateSlug(item.name) === name);
   if (!findCategory) {
      return <NotFound />
   }
   const categoryName = name === 'lighting' ? 'Lighting' : name === 'home-office' ? 'homeOffice' : name;
   const subcategory = menuData[categoryName] || []

   const sortProducts = [...products].map((prod) => {
      const clonedProd = { ...prod, subcategories: [...prod.subcategories] };
      const clonedSubcategories = clonedProd.subcategories ? JSON.parse(JSON.stringify(clonedProd.subcategories)) : [];

      const matchingSubcategories = clonedSubcategories?.map((sub: ICategory) => {
         const foundSubcategory = subcategory?.find((item) => item.title === sub.name);

         if (foundSubcategory) {
            return { id: 0, name: foundSubcategory.title };
         }
         return undefined;
      }).filter((item: any) => item !== undefined);

      clonedProd.subcategories = matchingSubcategories;

      return clonedProd;
   }).sort((a, b) => {
      if (!a.subcategories || a.subcategories.length === 0) return 1;
      if (!b.subcategories || b.subcategories.length === 0) return -1;

      const subcategoryA = a.subcategories?.[0]?.name || '';
      const subcategoryB = b.subcategories?.[0]?.name || '';

      const indexA = subcategory.findIndex((item) => item.title === subcategoryA);
      const indexB = subcategory.findIndex((item) => item.title === subcategoryB);

      return indexA - indexB;
   });

   return (
      <Shop productBanner={<ProductBanner />} ProductData={sortProducts} isCategory={true} categories={categories} />
   )
}

export default CategoryProducts