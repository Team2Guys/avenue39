import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import { fetchCategories, fetchProducts } from '@/config/fetch';
import { Meta_handler } from '@/config/metaHanlder';
import { menuData } from '@/data/menu';
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
      slug === 'office-furniture' || slug === 'home-office' ? 'homeOffice' :
        slug;

  const subcategory = menuData[categoryName] || [];
  const sortProducts = allProducts.filter((product: any) => {
    let hasSubCate = product.subcategories?.some((productSubcategory: any) =>
      findCategory.subcategories.some((findSubcategory: any) =>
        productSubcategory.name.trim().toLocaleLowerCase() === findSubcategory.name.trim().toLocaleLowerCase()
      )
    );
    let hasMainCategory: any;
    if (!hasSubCate) {
      hasMainCategory = product.categories.some((category: ICategory) => generateSlug(category.custom_url || category.name) == slug)
    }
    return hasSubCate ? hasSubCate : hasMainCategory
  }

  )
    .sort((a: any, b: any) => {
      const isAChair = a.name?.toLowerCase().includes('dining chair');
      const isBChair = b.name?.toLowerCase().includes('dining chair');
      const isATable = a.name?.toLowerCase().includes('dining table');
      const isBTable = b.name?.toLowerCase().includes('dining table');
      const isAAccessory = a.categories?.some((category: any) => category.name.toLowerCase() === 'accessories');
      const isBAccessory = b.categories?.some((category: any) => category.name.toLowerCase() === 'accessories');

      // If the slug is "new-arrivals", perform custom sorting
      if (slug === 'new-arrivals') {
        // Dining Tables come first
        if (isATable && !isBTable) return -1;
        if (!isATable && isBTable) return 1;

        // Dining Chairs come after Dining Tables
        if (isAChair && !isBChair) return -1;
        if (!isAChair && isBChair) return 1;

        // All other products (excluding accessories) come after Dining Chairs
        const isAOthers = !isAChair && !isATable && !isAAccessory;
        const isBOthers = !isBChair && !isBTable && !isBAccessory;
        if (isAOthers && !isBOthers) return -1; // A comes before B if A is an "other" product
        if (!isAOthers && isBOthers) return 1;  // B comes before A if B is an "other" product

        // Accessories go to the end
        if (isAAccessory && !isBAccessory) return 1;
        if (!isAAccessory && isBAccessory) return -1;

        // For products that aren't in any special categories, sort by subcategory
        const indexA = subcategory.findIndex(item => item.title === a.subcategories?.[0]?.name);
        const indexB = subcategory.findIndex(item => item.title === b.subcategories?.[0]?.name);

        return indexA - indexB;
      }

      // Default sorting (if slug is not "new-arrivals")
      const indexA = subcategory.findIndex(item => item.title === a.subcategories?.[0]?.name);
      const indexB = subcategory.findIndex(item => item.title === b.subcategories?.[0]?.name);

      return indexA - indexB;
    });
  return (
    <Shop
      ProductData={sortProducts}
      AllProduct={allProducts}
      isCategory
      mainslug={slug}
      info={findCategory}
    />
  );
};

export default SlugPage;
