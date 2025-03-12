import React from 'react';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import HeroVideo from '@/components/Home/hero-video';
import AllCategory from '@/components/CategoryCard/AllCategory';
import NewArrival from '@/components/newarrival';
import ColorBanner from '@/components/ColorBanner/ColorBanner';
import { fetchProducts } from '@/config/fetch';
import { Suspense } from 'react'
import logoimage from '@assets/icons/whitelogo.png';


import { Metadata } from 'next';

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
      <Suspense >
        <HeroVideo />
        <ColorBanner Bannerclas="Bannerclas" />
        <SofaBanner />
        <NewArrival />
      </Suspense>
      <AllCategory products={products} />
    
    </>
  );
}
