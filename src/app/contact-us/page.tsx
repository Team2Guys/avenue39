import Address from '@/components/address';
import ContactForm from '@/components/forms/contact-form';
import SideCard from '@/components/side-card/side-card';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { breadcrumbs } from '@/data/data';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Page',
  description: 'Contact description',
  openGraph: {
    title: 'Contact',
    description: 'Contact description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'contact',
  },
};

const Contact = () => {
  return (
    <>
      <TopHero breadcrumbs={breadcrumbs} />
      <Container className="flex flex-wrap md:flex-nowrap items-start md:gap-20 ">
        <div className="w-full md:w-9/12">
          <ContactForm />
        </div>
        <div className="w-full md:w-3/12 mt-10">
          <Address />
        </div>
      </Container>

      <Container className="flex flex-wrap md:flex-nowrap md:gap-10 mt-10 mb-10">
        <div className="w-full md:w-9/12">
          <iframe
            className="w-full h-[734px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.5356481717827!2d55.23300397605263!3d25.117575434919804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f695b15582993%3A0x6bd9e9b7b6605c6!2s23%2022nd%20St%20-%20Al%20Quoz%20-%20Al%20Quoz%20Industrial%20Area%204%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1721975826153!5m2!1sen!2s"
            loading="lazy"
          ></iframe>
        </div>
        <div className="w-full md:w-3/12">
          <h2 className="text-[28px] font-medium mb-5">Your Recently Viewed</h2>
          <SideCard />
        </div>
      </Container>
    </>
  );
};

export default Contact;
