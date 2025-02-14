import SubCategoryProducts from '@/components/SubCategory/SubCategoryProducts';

import {subCategory } from '@/config/metaHanlder';
import { redirects } from '@/data/Re_call_prod';

import { Metadata } from 'next';
import { headers } from 'next/headers';
import { permanentRedirect, RedirectType } from 'next/navigation';

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

  
  let url =  `${slug}/${subcat}`

  const isRedirect = redirects.find((value)=>value.url ==url)
  if(isRedirect){
    console.log(isRedirect, "isredirect", url, `/${isRedirect.redirect}`)
return permanentRedirect(`/${isRedirect.redirect}`, "replace" as RedirectType)

  }

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
