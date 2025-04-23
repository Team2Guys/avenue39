import React from 'react';
import { fetchProducts } from '@/config/fetch';
import logoimage from '@assets/icons/whitelogo.png';
const HeroVideo = dynamic(() => import('@/components/Home/hero-video'))
// const AllCategory = dynamic(() => import('@/components/CategoryCard/AllCategory'))
const SofaBanner = dynamic(() => import('@/components/discount-banner/sofa-banner'))
const NewArrival = dynamic(() => import('@/components/newarrival'))
const ColorBanner = dynamic(() => import('@/components/ColorBanner/ColorBanner'))


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
  console.log(products)
  return (
    <>
      <HeroVideo />
      <ColorBanner Bannerclas="Bannerclas" />
      <SofaBanner />
      <NewArrival />
      {/* <Suspense fallback='loading....'>
        <AllCategory products={products} />
      </Suspense> */}
    </>
  );
}
