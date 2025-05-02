import { fetchCategories } from '@/config/fetch';
import logoimage from '@assets/icons/whitelogo.png';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const HeroVideo = dynamic(() => import('@/components/Home/hero-video'))
const SofaBanner = dynamic(() => import('@/components/discount-banner/sofa-banner'))
const NewArrival = dynamic(() => import('@/components/newarrival'))
const ColorBanner = dynamic(() => import('@/components/ColorBanner/ColorBanner'))
const AllCategory = dynamic(() => import('@/components/CategoryCard/AllCategory'))
import { ColorBannerData, sofaDataSlides } from '@/data/products';

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
  const categories = await fetchCategories('get-home-products');
  return (
    <>

      <HeroVideo />
      <ColorBanner Bannerclas="Bannerclas" ColorBannerData={ColorBannerData} />
      <SofaBanner sofaDataSlides={sofaDataSlides} />
      <NewArrival />
      <Suspense fallback='loading....'>
        <AllCategory categories={categories} />
      </Suspense>
    </>
  );
}
