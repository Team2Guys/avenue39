import SubCategoryProducts from '@/components/SubCategory/SubCategoryProducts';
import { generateSlug } from '@/config';

import { subCategory } from '@/config/metaHanlder';
import { re_Calling_products, redirects } from '@/data/Re_call_prod';

import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound, permanentRedirect, RedirectType } from 'next/navigation';

import React from 'react';

interface SlugPageProps {
  params: Promise<{
    slug: string;
    subcat: string
  }>;
}


export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const urls = await params
  const { slug, subcat } = urls
  const categorylist: any = [slug, subcat]
  let metaObject: any;


  let url = `${slug}/${subcat}`

  const isRedirect = redirects.find((value) => value.url == url)
  if (isRedirect) {
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
  const { slug, subcat } = urls
  const categorylist: any = [slug, subcat]

  const SubCategoriesFinder = re_Calling_products.find((value) => generateSlug(value.mainCategory).trim().toLocaleLowerCase() === slug && generateSlug(value.subCategory).trim().toLocaleLowerCase() == subcat);
console.log(SubCategoriesFinder, "SubCategoriesFinder", categorylist)
  if (SubCategoriesFinder) {
    if (SubCategoriesFinder.redirect_main_cat.trim().toLocaleLowerCase() !== slug && subcat == SubCategoriesFinder.redirectsubCat.trim().toLocaleLowerCase())
      return notFound()
  }

  return <SubCategoryProducts mainslug={slug} slug={categorylist} />

}


export default Subcat;
