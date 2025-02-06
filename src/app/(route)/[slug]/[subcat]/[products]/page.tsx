import SingleProduct from '@/components/Product/SingleProduct';
import { productsFindHandler } from '@/config/metaHanlder';

import { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

interface SlugPageProps {
  params: Promise<{
    slug: string;
    subcat: string,
    products: string
  }>;
}


export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  let metaObject: any;
  const urls = await params;
  const { slug, subcat, products } = urls
  const categorylist: any = [slug, subcat, products]
  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  metaObject = await productsFindHandler(categorylist, fullUrl);

  return metaObject;
}

const Products: React.FC<SlugPageProps> = async ({ params }) => {
  const urls = await params;
  const { slug, subcat, products } = urls
  const categorylist: any = [slug, subcat, products]


  return <SingleProduct mainslug={slug} subslug={subcat} slug={categorylist} />

}


export default Products;
