import React from 'react';
import TextIcon from '../text-icon';
import Container from '../ui/Container';
import { IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';
import { P14 } from '@/styles/typo';
import SocialLink from '../social-link';
import Link from 'next/link';

const TopNav = () => {
  return (
    <div className="bg-black text-secondary p-2 hidden md:block ">
      <Container className="flex  w-full justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <TextIcon
            link="tel:+001-234-567-890"
            Title="+001-234-567-890"
            Icon={<IoPhonePortraitOutline className="text-[18px] lg:text-xl" />}
          />
          <TextIcon
            link="mailto:Your.shopmail@gmail.com"
            Title="Your.shopmail@gmail.com"
            Icon={<IoMailOutline className="text-[18px]  lg:text-xl" />}
          />
        </div>
        <P14 className="hidden md:block">
          Get Up To 50% off In your first Offer
        </P14>
        <div className=' '>
        <div className='flex  gap-4 '>
        <SocialLink socialSize="text-[30px]" className='mr' />
        <div className='h-5 border'/>
        <Link
              className="text-14 font-semibold hover:underline text-white dark:text-white"
              href={'/about'}
            >
              About us
            </Link>
            <Link
              className="text-14 font-semibold hover:underline text-white dark:text-white"
              href={'/contact'}
            >
              Contact Us
            </Link>
        </div>   </div>
      </Container>
    </div>
  );
};

export default TopNav;
