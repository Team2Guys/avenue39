import React from 'react';
import SocialLink from './social-link';
import Link from 'next/link';
import Image from 'next/image';
import location from '../../public/assets/images/location.png';

const Address = () => {
  return (
    <>
      <Image width={30} height={30} className="hidden md:block" src={location} alt='location'/>
      <div className="mt-2">
        <p className="text-[33px] flex items-center font-base gap-2 md:gap-0">
          <span className="block md:hidden">
        <Image width={30} height={30}  src={location} alt='location'/>
          </span>{' '}
          Address
        </p>
        <p className="text-[19px] text-[#666666] font-medium">
          23 22nd St - Al Quoz Industrial Area 4 - Dubai–{' '}
          <Link
            target="_blank"
            href={
              'https://www.google.com/maps/place/23+22nd+St+-+Al+Quoz+-+Al+Quoz+Industrial+Area+4+-+Dubai+-+United+Arab+Emirates/@25.1175706,55.2355789,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f695b15582993:0x6bd9e9b7b6605c6!8m2!3d25.1175706!4d55.2355789!16s%2Fg%2F11csl2pb0x?entry=ttu'
            }
            className="text-red-600"
          >
            Map
          </Link>
        </p>
      </div>
      <div className="mt-5">
        <p className="text-[33px] font-base">Contact Info</p>
        <ul>
          <li>
            <Link
              href="mailto:cs@avenue39.com"
              target="_blank"
              className="text-[19px] text-[#666666] font-medium"
            >
              Email :<span>cs@avenue39.com</span>
            </Link>
          </li>
          <li>
            <Link
              href="https://wa.me/+971505974495"
              target="_blank"
              className="text-[19px] text-[#666666] font-medium"
            >
              WhatsApp :<span>+971 50 597 4495</span>
            </Link>
          </li>
          <li>
            <Link
              href="tel:+971 50 597 4495"
              target="_blank"
              className="text-[19px] text-[#666666] font-medium"
            >
              Phone :<span>+971 50 597 4495</span>
            </Link>
          </li>
        </ul>
        <SocialLink className="mt-4 md:-mx-1" iconColor='text-black' />
      </div>
    </>
  );
};

export default Address;
