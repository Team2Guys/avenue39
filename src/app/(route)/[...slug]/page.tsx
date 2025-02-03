import NotFound from '@/app/not-found';
import CategoryProducts from '@/components/Category/CategoryProducts';
import SingleProduct from '@/components/Product/SingleProduct';
import SubCategoryProducts from '@/components/SubCategory/SubCategoryProducts';
import {
  fetchCategories,
  fetchProducts,
  fetchSubCategories,
} from '@/config/fetch';
import { Meta_handler, productsFindHandler, subCategory } from '@/config/metaHanlder';
import { re_Calling_products } from '@/data/Re_call_prod';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

interface SlugPageProps {
  params: Promise<{
    slug: string[];
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
  if (slug.length === 1) {
    metaObject = await Meta_handler(slug[0], fullUrl);
  } else if (slug.length === 2) {
    metaObject = await subCategory(slug, fullUrl);
  } else if (slug.length === 3) {
    metaObject = await productsFindHandler(slug, fullUrl);
  }

  return metaObject;
}

const SlugPage: React.FC<SlugPageProps> = async ({ params }) => {
  const { slug } = await params;

  if (slug.length === 1) {
    return <CategoryProducts slug={slug} />;
  } else if (slug.length === 2) {
    return <SubCategoryProducts slug={slug} />;
  } else if (slug.length === 3) {
    return <SingleProduct slug={slug} />;
  }
  return <NotFound />;
};

export default SlugPage;
