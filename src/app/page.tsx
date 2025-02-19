import React from 'react';
import { testimonialcards } from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import Testimonial from '@/components/testimonial/testimonial';
import HeroVideo from '@/components/Home/hero-video';
import AllCategory from '@/components/CategoryCard/AllCategory';
import NewArrival from '@/components/newarrival';
import ColorBanner from '@/components/ColorBanner/ColorBanner';
import { fetchProducts } from '@/config/fetch';
import { Suspense } from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stylish Bedroom, Dining, and Living Room Furniture | Avenue39',
  description: 'Shop bedroom, dining, and living room furniture along with newly arrived modern chairs, tables, office furniture, lighting, and accessories. ',
  openGraph: {
    title: 'Stylish Bedroom, Dining, and Living Room Furniture | Avenue39',
    description: 'Shop bedroom, dining, and living room furniture along with newly arrived modern chairs, tables, office furniture, lighting, and accessories. ',
    url: '/',
    images: [
      {
        url: 'Avenue39',
        alt: 'Avenue39',
      },
    ],
  },
  alternates: {
    canonical: '/',
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
      {/* <Catalogue /> */}
      {testimonialcards && testimonialcards.length > 50 && (
        <Testimonial testimonialitems={testimonialcards} />
      )}
    </>
  );
}
