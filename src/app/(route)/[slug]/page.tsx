import NotFound from '@/app/not-found';
import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import { fetchCategories, fetchProducts } from '@/config/fetch';
import { Meta_handler } from '@/config/metaHanlder';
import { menuData } from '@/data/menu';
import { ICategory } from '@/types/types';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}


export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  let metaObject: any;

  const headersList = await headers();
  const domain =
    headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;
  metaObject = await Meta_handler(slug, fullUrl);


  return metaObject;
}

const SlugPage: React.FC<SlugPageProps> = async ({ params }) => {
  const { slug } = await params;

  const categories = await fetchCategories();
  const AllProduct = await fetchProducts();

  const findCategory = categories && categories?.find((item: ICategory) => generateSlug(item.name) === slug);
  if (!findCategory) {
    return <NotFound />;
  }

  const categoryName = slug === 'lighting' ? 'Lighting' : slug === 'home-office' ? 'homeOffice' : slug;
  const subcategory = menuData[categoryName] || [];

  const sortProducts = findCategory.products
    .map((prod: any) => {
      const clonedProd = { ...prod, subcategories: [...prod.subcategories] };
      const clonedSubcategories = clonedProd.subcategories
        ? JSON.parse(JSON.stringify(clonedProd.subcategories))
        : [];

      const matchingSubcategories = clonedSubcategories
        ?.map((sub: ICategory) => {
          const foundSubcategory = subcategory?.find((item) => item.title === sub.name,
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

      const indexA = subcategory.findIndex((item) => item.title === subcategoryA);
      const indexB = subcategory.findIndex((item) => item.title === subcategoryB);

      return indexA - indexB;
    });
  return <Shop
    ProductData={sortProducts}
    AllProduct={AllProduct}
    isCategory={true}
    mainslug={slug}
    categories={categories}
    info={findCategory}
    // SubcategoryName={findCategory}
  />
}

export default SlugPage;
