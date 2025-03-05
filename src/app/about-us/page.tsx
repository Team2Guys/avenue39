import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { aboutbreadcrumbs } from '@/data/data';
import Image from 'next/image';
import React from 'react';
import aboutimage from '@assets/images/AboutImage.png';
import Mission from '@/components/mission';
import { data } from '@/data';
import gold from '@icons/gold.png';
import crosshair from '@icons/Icon-crosshair.png';
import parkingSensors from '@icons/parking-sensors.png';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Luxury Furniture & Timeless Design Experts',
  description: 'Discover our story and passion for high-end furniture and timeless craftsmanship. Learn more about our commitment to quality, design, and customer satisfaction.',
  openGraph: {
    title: 'About',
    description: 'About description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: '/about-us',
  },
};
const About = () => {
  return (
    <>
      <TopHero breadcrumbs={aboutbreadcrumbs} />
      <h1 className="text-center text-[40px] font-bold mt-10">About Us</h1>
      <Container className="flex flex-wrap md:flex-nowrap items-center md:gap-10 mt-4">
        <div className="w-full md:w-7/12">
          <h2 className="text-[35px]">AVENUE39 - OUR STORY</h2>
          <div className="text-14 space-y-4">
            {data.paragraphs.map((paragraph, index) => (
              <p
                className="my-3"
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
          <div className="text-14 space-y-4">
            {data.paragraphs2.map((paragraphs2, index) => (
              <h3 className="my-3 text-20 italic text-red-600" key={index}>
                {paragraphs2}
              </h3>
            ))}
          </div>
          <div className="text-14 space-y-4">
            {data.paragraphs3.map((paragraphs3, index) => (
              <p
                className="my-3 "
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraphs3 }}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-5/12 mt-5 md:mt-0">
          <Image
            className="h-full w-full"
            width={500}
            height={500}
            src={aboutimage}
            alt="about"
          />
        </div>
      </Container>
      <div className="bg-lightbackground mt-8">
        <Container className="grid grid-cols-2 md:flex md:justify-between  py-20">
          <Mission
            icon={gold}
            title={'Our Value'}
            description={
              'Every week, millions of savvy customers enjoy the fun and exciting shopping experience of Poundland in hundreds of stores nationwide.'
            }
          />
          <Mission
            icon={crosshair}
            title={'Mission'}
            description={
              "Our mission to keep commerce human is the guiding principle behind the tangible ways we're working to make a positive impact on our community, our environment and the global economy."
            }
          />
          <Mission
            icon={parkingSensors}
            title={'Our Vision'}
            description={
              'From Amazing TOP BRANDS and daily ESSENTIAL items, to fantastic NEW lines and stunning WOW deals, we hope our quality and variety gives you irresistible value each visit!'
            }
          />
        </Container>
      </div>
    </>
  );
};

export default About;
