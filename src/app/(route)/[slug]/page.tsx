import NotFound from '@/app/not-found';
import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import { fetchCategories, fetchProducts } from '@/config/fetch';
import { Meta_handler } from '@/config/metaHanlder';
import { menuData } from '@/data/menu';
import { Product, Subcategory } from '@/data/new_Arrival';
import { ICategory } from '@/types/cat';
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
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
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
  const findCategory = categories && categories?.find((item: ICategory) => generateSlug(item.custom_url || item.name) === slug);
  if (!findCategory) {
    return <NotFound />;
  }
  const categoryName = slug === 'lighting' ? 'Lighting' : slug === 'office-furniture' ? 'homeOffice' : slug;
  const subcategory = menuData[categoryName] || [];
  let sortProducts;
  if (slug === "new-arrivals") {
    const ProductSet = new Set(Product.map(generateSlug));
    const SubcategorySet = new Set(Subcategory.map(generateSlug));
    const CategorySet = new Set(categories.map(generateSlug));
    const filterProds = AllProduct.map((prods: any) => {
      const productSlug = generateSlug(prods.name);
      if (!ProductSet.has(productSlug)) {
        return null;
      }

      const filteredSubcategories = prods.subcategories.filter((subcat: any) =>
        SubcategorySet.has(generateSlug(subcat.name)) &&
        subcat.categories.some((value: any) => CategorySet.has(generateSlug(value.name)))
      );

      return {
        ...prods,
        subcategory: filteredSubcategories
      };
    }).filter(Boolean);
    sortProducts = filterProds
  } else {
    sortProducts = AllProduct.filter((product: any) => {
      let hasSubCate = product.subcategories.some((productSubcategory: any) =>
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
        if (!a.subcategories || a.subcategories.length === 0) return 1;
        if (!b.subcategories || b.subcategories.length === 0) return -1;

        const subcategoryA = a.subcategories?.[0]?.name || '';
        const subcategoryB = b.subcategories?.[0]?.name || '';

        const indexA = subcategory.findIndex((item) => item.title === subcategoryA);
        const indexB = subcategory.findIndex((item) => item.title === subcategoryB);

        return indexA - indexB;
      });
  }

  return <Shop
    ProductData={sortProducts}
    AllProduct={AllProduct}
    isCategory={true}
    mainslug={slug}
    categories={categories}
    info={findCategory}
  />
}

export default SlugPage;
