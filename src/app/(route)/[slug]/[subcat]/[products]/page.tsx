import SingleProduct from '@/components/Product/SingleProduct';
import { generateSlug } from '@/config';
import { productsFindHandler } from '@/config/metaHanlder';
import { re_Calling_products } from '@/data/Re_call_prod';

import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';

interface SlugPageProps {
  params: Promise<{
    slug: string;
    subcat: string,
    products: string
  }>;
  searchParams: Promise<{ variant?: string; size?: string }>;
}


export async function generateMetadata({ params, searchParams }: SlugPageProps): Promise<Metadata> {
  let metaObject: any;
  const urls = await params;
  let search_params = await searchParams;
  const { slug, subcat, products } = urls
  const categorylist: any = [slug, subcat, products]
  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  metaObject = await productsFindHandler(categorylist, fullUrl, "_", search_params);

  return metaObject;
}

const Products: React.FC<SlugPageProps> = async ({ params, searchParams }) => {
  const { variant, size } = await searchParams;
  const urls = await params;
  const { slug, subcat, products } = urls
  const categorylist: any = [slug, subcat, products]


  const SubCategoriesFinder = re_Calling_products.find((value) => generateSlug(value.mainCategory).trim().toLocaleLowerCase() === slug && generateSlug(value.subCategory).trim().toLocaleLowerCase() == subcat);

  if (SubCategoriesFinder) {
    if (SubCategoriesFinder.redirect_main_cat.trim().toLocaleLowerCase() !== slug && subcat == SubCategoriesFinder.redirectsubCat.trim().toLocaleLowerCase())
      return notFound()
  }



  return <SingleProduct mainslug={slug} subslug={subcat} slug={categorylist} filterParam={variant} sizeParam={size} />

}


export default Products;
