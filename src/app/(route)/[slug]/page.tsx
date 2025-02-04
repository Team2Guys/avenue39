import CategoryProducts from '@/components/Category/CategoryProducts';
import { Meta_handler } from '@/config/metaHanlder';
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
 return  <CategoryProducts slug={slug}/>
}

export default SlugPage;
