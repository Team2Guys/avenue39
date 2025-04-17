import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import { fetchCategories, fetchProducts } from '@/config/fetch';
import { Meta_handler } from '@/config/metaHanlder';
import { menuData } from '@/data/menu';
import { Product, Subcategory } from '@/data/new_Arrival';
import { ICategory } from '@/types/cat';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
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
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';
  const fullUrl = `${protocol}://${domain}${pathname}`;
  metaObject = await Meta_handler(slug, fullUrl);
  return metaObject;
}

const SlugPage = async ({ params }: SlugPageProps) => {
  const { slug } = await params;

  const [categories, allProducts] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);

  const findCategory = categories.find((item: ICategory) =>
    generateSlug(item.custom_url || item.name) === slug
  );

  if (!findCategory && slug !== 'new-arrivals') {
    return notFound();
  }

  const categoryName =
    slug === 'lighting' ? 'Lighting' :
    slug === 'office-furniture' ? 'homeOffice' :
    slug;

  const subcategoryList = menuData[categoryName] || [];
  let filteredProducts = [];

  if (slug === 'new-arrivals') {
    const productSet = new Set(Product.map(generateSlug));
    const subcategorySet = new Set(Subcategory.map(generateSlug));
    const categorySet = new Set(categories.map(generateSlug));

    filteredProducts = allProducts
      .filter((product: any) => productSet.has(generateSlug(product.name)))
      .map((product: any) => {
        const subcategoryMatch = product.subcategories.filter((sub: any) =>
          subcategorySet.has(generateSlug(sub.name)) &&
          sub.categories?.some((cat: any) =>
            categorySet.has(generateSlug(cat.name))
          )
        );

        return { ...product, subcategory: subcategoryMatch };
      })
      .filter((p: any) => p.subcategory?.length);
  } else {
    filteredProducts = allProducts
      .filter((product: any) => {
        const subMatch = product.subcategories?.some((psub: any) =>
          findCategory?.subcategories?.some(
            (fsub: any) =>
              psub.name.trim().toLowerCase() === fsub.name.trim().toLowerCase()
          )
        );

        const catMatch = product.categories?.some(
          (cat: any) => generateSlug(cat.custom_url || cat.name) === slug
        );

        return subMatch || catMatch;
      })
      .sort((a: any, b: any) => {
        const aSub = a.subcategories?.[0]?.name || '';
        const bSub = b.subcategories?.[0]?.name || '';

        const indexA = subcategoryList.findIndex((item) => item.title === aSub);
        const indexB = subcategoryList.findIndex((item) => item.title === bSub);

        return indexA - indexB;
      });
  }

  return (
    <Shop
      ProductData={filteredProducts}
      AllProduct={allProducts}
      isCategory
      mainslug={slug}
      info={findCategory}
    />
  );
};

export default SlugPage;
