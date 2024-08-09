import React from 'react';
import TextIcon from '../text-icon';
import Container from '../ui/Container';
import { IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';
import { P14 } from '@/styles/typo';
import SocialLink from '../social-link';

const TopNav = () => {
  return (
    <div className="bg-black text-secondary p-2 hidden md:block ">
      <Container className="flex flex-wrap lg:flex-nowrap justify-center md:justify-between items-center gap-4">
        <div className="flex items-center gap-4 md:w-4/12">
          <TextIcon
            link="tel:+001-234-567-890"
            Title="+001-234-567-890"
            Icon=<IoPhonePortraitOutline className="text-[18px] lg:text-xl" />
          />
          <TextIcon
            link="mailto:Your.shopmail@gmail.com"
            Title="Your.shopmail@gmail.com"
            Icon=<IoMailOutline className="text-[18px]  lg:text-xl" />
          />
        </div>
        <P14 className="hidden md:block md:w-4/12">
          Get Up To 50% off In your first Offer
        </P14>
        <SocialLink socialSize="text-[30px]" />
      </Container>
    </div>
  );
};

export default TopNav;
