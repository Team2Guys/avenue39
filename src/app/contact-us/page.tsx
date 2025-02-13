import Address from '@/components/address';
import ContactForm from '@/components/forms/contact-form';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { breadcrumbs } from '@/data/data';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch Today | Avenue39',
  description: 'Reach out to Avenue39 today! Whether you have questions, need support, or want to collaborate, we’re here to help. Get in touch now!',
  openGraph: {
    title: 'Contact Us - Get in Touch Today | Avenue39',
    description: 'Reach out to Avenue39 today! Whether you have questions, need support, or want to collaborate, we’re here to help. Get in touch now!',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: '/contact-us',
  },
};

const Contact = () => {
  return (
    <>
      <TopHero breadcrumbs={breadcrumbs} />
      <h1 className='text-center text-[40px] font-bold mt-10'>Contact Us</h1>
      <Container>
        <p className='w-full text-center text-18 xs:text-20 md:w-3/4 mx-auto'>While Avenue39 is an online destination for timeless furniture, we understand the importance of experiencing the quality and comfort firsthand. That’s why we invite you to visit our sister company Two Guys Home Furnishings, where you can explore and feel handpicked pieces featured on our website.</p>
      </Container>
      <Container className="flex flex-wrap md:flex-nowrap items-start md:gap-20 ">
        <div className="w-full md:w-9/12">
          <ContactForm />
        </div>
        <div className="w-full md:w-3/12 mt-10">
          <Address />
        </div>
      </Container>

      <Container className="mt-10 mb-10">
        <iframe
          className="w-full h-[334px] md:h-[734px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.5356481717827!2d55.23300397605263!3d25.117575434919804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f695b15582993%3A0x6bd9e9b7b6605c6!2s23%2022nd%20St%20-%20Al%20Quoz%20-%20Al%20Quoz%20Industrial%20Area%204%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1721975826153!5m2!1sen!2s"
          loading="lazy"
        ></iframe>

      </Container>
    </>
  );
};

export default Contact;
