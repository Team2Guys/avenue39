import React, { Suspense } from 'react';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import NewArrival from '@/components/newarrival';
import ColorBanner from '@/components/ColorBanner/ColorBanner';
import { fetchProducts } from '@/config/fetch';
import logoimage from '@assets/icons/whitelogo.png';
const HeroVideo = dynamic(() => import('@/components/Home/hero-video'),)
const AllCategory = dynamic(() => import('@/components/CategoryCard/AllCategory'),)


import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.avenue39.com"),
  title: 'Stylish Bedroom, Dining, and Living Room Furniture | Avenue39',
  description: 'Shop bedroom, dining, and living room furniture along with newly arrived modern chairs, tables, office furniture, lighting, and accessories. ',
  openGraph: {
    title: 'Stylish Bedroom, Dining, and Living Room Furniture | Avenue39',
    description: 'Shop bedroom, dining, and living room furniture along with newly arrived modern chairs, tables, office furniture, lighting, and accessories. ',
    url: 'https://www.avenue39.com',
    images: [
      {
        url: logoimage.src,
        alt: 'Avenue39',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.avenue39.com',
  },
};

export default async function Home() {
  const products = await fetchProducts();
  return (
    <>
      <HeroVideo />
      <ColorBanner Bannerclas="Bannerclas" />
      <SofaBanner />
      <NewArrival />
      <Suspense fallback='loading'>
        <AllCategory products={products} />
      </Suspense>
    </>
  );
}
