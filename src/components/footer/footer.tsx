import React, { useState } from 'react';
import Container from '../ui/Container';
import Image from 'next/image';
import logo from '@icons/logo.png';
import { Button } from '../ui/button';
import SocialLink from '../social-link';
import Link from 'next/link';
import axios from 'axios';
import showToast from '../Toaster/Toaster';
import { menuData } from '@/data/menu';
import { generateSlug } from '@/config';
import { MdOutlineEmail, MdOutlinePhone, MdOutlineWhatsapp } from 'react-icons/md';
import { WhatsAppInfo } from '@/data/data';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNewsLetter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      showToast('warn', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletters/add-email`,
        {
          email,
        },
      );
      console.log(response);
      if (response.status === 201) {
        showToast('success', response.data.message);
        setEmail('');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        showToast(
          'error',
          error.response?.data?.message ||
            'Failed to subscribe. Please try again.',
        );
      } else {
        showToast('error', 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-16 border-t border-[#EEEEEE] bg-[#D5D5D5]   dark:text-black font-helvetica">
      <div className="container w-full sm:w-1/2 flex flex-col items-center mx-auto md:mb-[110px]">
        <Image src={logo} alt="logo" className="w-40" />

        <div className=" text-center">
          <p className="mt-6 tracking-wide font-helvetica text-13 lg:text-15 text-[#686868] max-sm:text-center">
          Avenue39 is more than just a furniture store; it's a philosophy that blends contemporary design with timeless aesthetics. We understand the importance of creating a harmonious environment that reflects your unique personality and taste. Each piece in our collection is thoughtfully selected to offer a perfect fusion of form and function.
          </p>
          <div className='w-1/3 m-auto'>
          <form className="mt-6 max-md:mb-5" onSubmit={handleNewsLetter}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your mail address"
                className="bg-white text-black w-full ps-3 py-5 rounded-2xl text-xs"
                value={email}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Button
                variant={'secondary'}
                className="text-white bg-black hover:bg-slate-700 absolute top-2 right-3 rounded-2xl px-2 font-extralight text-xs p-2"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Submit'}
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* <Container className="grid grid-cols-5 sm:gap-x-4 md:gap-x-5 lg:gap-x-8 gap-y-8 px-4 mx-auto  items-center justify-between bg-green-300"> */}
      <Container className="flex flex-wrap justify-between gap-10 ">
        <div className=" px-2">
          <h5 className="font-extralight  font-helvetica sm:text-lg xl:text-xl text=[#121A25]">
            Shop by Rooms
          </h5>
          <ul className=" leading-8 xl:leading-[38px] tracking-wide font-helvetica text-13 lg:text-15  mt-6 capitalize text-[#686868]">
            {Object.keys(menuData)
              .filter((menu) =>
                ['dining', 'living', 'bedroom', 'homeOffice'].includes(menu),
              )
              .map((menu) => (
                <li key={menu}>
                  <Link
                    href={
                      menu === 'SALE'
                        ? '/sale'
                        : `/${generateSlug(menu === 'homeOffice' ? 'office-furniture' : menu  || '')}`
                    }
                    className="hover:underline capitalize"
                  >
                    {menu === 'SALE' ? (
                      <p className="text leading-8 text-red-500 dark:text-red-500 tracking-wide font-helvetica text-13 lg:text-15 capitalize">
                        Sale
                      </p>
                    ) : (
                      menu.replace(/([A-Z])/g, ' $1')
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="  px-2">
          <h5 className="font-extralight font-helvetica sm:text-lg xl:text-xl text=[#121A25]">
            Shop by Item
          </h5>
          <ul className=" leading-8 xl:leading-[38px] tracking-wide font-helvetica text-13 lg:text-15  mt-6 capitalize text-[#686868]">
            {Object.keys(menuData)
              .filter((menu) =>
                ['chairs', 'tables', 'Lighting', 'Accessories'].includes(menu),
              )
              .map((menu) => (
                <li key={menu}>
                  <Link
                    href={
                      menu === 'SALE'
                        ? '/products'
                        : `/${generateSlug(menu || '')}`
                    }
                    className="hover:underline capitalize"
                  >
                    {menu === 'SALE' ? (
                      <p className="text leading-8 text-red-500 dark:text-red-500 tracking-wide font-helvetica text-13 lg:text-15 capitalize">
                        Sale
                      </p>
                    ) : (
                      menu.replace(/([A-Z])/g, ' $1')
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="  px-2">
          <h5 className="font-extralight font-helvetica sm:text-lg xl:text-xl text=[#121A25]">
            Terms & Policies
          </h5>
          <ul className=" leading-8 xl:leading-[38px] tracking-wide font-helvetica text-13 lg:text-15  mt-6 text-[#686868]">
            <li>
              <Link href="/terms-and-conditions" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:underline">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:underline">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className=" ">
          <h5 className="font-extralight font-helvetica sm:text-lg xl:text-xl text=[#121A25]">
            Quick Links
          </h5>
          <ul className="leading-8 xl:leading-[38px] tracking-wide font-helvetica text-13 lg:text-15 mt-6 capitalize text-[#686868]">
            <li>
              <Link href="/profile" target="_self" className="hover:underline">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/about-us" target="_self" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/cart" target="_self" className="hover:underline">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link
                href="/order-history"
                target="_self"
                className="hover:underline"
              >
                Order History
              </Link>
            </li>
          </ul>
        </div>
        <div className=" flex flex-col md:items-center">
          <h5 className="font-extralight font-helvetica w-full sm:text-lg xl:text-xl text=[#121A25]">
            Get in Touch
          </h5>
          <div className="mt-6 w-full flex max-w-56  text-[#686868]">
            <Link href="tel:+971505974495" target="_blank" rel="noreferrer">
              <div className=" w-full rounded-sm">
                <div className="flex items-center gap-2 py-2 ">
                  <p className="text-left text-13 lg:text-15 font-extralight leading-normal flex items-center gap-2">
                  <MdOutlinePhone size={23} />
                    {WhatsAppInfo.number}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-56  text-[#686868]">
            <Link  href={`https://wa.me/${WhatsAppInfo.number.replaceAll(' ', '')}`} target="_blank" rel="noreferrer">
              <div className=" w-full  rounded-sm">
                <div className="flex items-center gap-2 py-2">
                  <MdOutlineWhatsapp size={23} />
                  <p className="text-left text-13 lg:text-15 font-extralight leading-normal flex justify-between items-center gap-2">


                    {WhatsAppInfo.number}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-2  text-[#686868]">
            <div className=" w-full max-w-56 rounded-sm ">
              <Link
              className='flex gap-2 items-center'
                href="mailto:cs@avenue39.com"
                rel="noreferrer"
                target="_blank"
              >
      
               <MdOutlineEmail size={22} />
                cs@avenue39.com
              </Link>
            </div>
          </div>
          <div className="pt-5 text-black">
            <SocialLink socialSize="md:text-[25px]" iconColor={'text-black'} />
          </div>
        </div>
      </Container>
      <div className="bg-main mt-10 py-3 px-4">
        <Container className="flex flex-wrap justify-center sm:justify-between items-center gap-x-8 gap-y-4 pb-10 md:pb-0 ">
          <p className="text-white text-17 font-extralight text-center md:w-full font-Helveticaligh">
            Copyright © 2024 avenue39 All rights reserved.
          </p>
        </Container>
      </div>
    </section>
  );
};

export default Footer;
