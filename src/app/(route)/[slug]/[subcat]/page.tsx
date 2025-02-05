import SubCategoryProducts from '@/components/SubCategory/SubCategoryProducts';
import {subCategory } from '@/config/metaHanlder';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

interface SlugPageProps {
  params: Promise<{
    slug: string;
    subcat:string
  }>;
}


export async function generateMetadata({params}: SlugPageProps): Promise<Metadata> {
const urls = await params
    const  { slug, subcat } = urls
  const categorylist:any = [slug, subcat]
  let metaObject: any;

  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;
    metaObject = await subCategory(categorylist, fullUrl);

  return metaObject;
}

const Subcat: React.FC<SlugPageProps> = async ({ params }) => {
    const urls = await params
    const  { slug, subcat } = urls
  const categorylist:any = [slug, subcat]
 return <SubCategoryProducts mainslug={slug} slug={categorylist} />

}


export default Subcat;
