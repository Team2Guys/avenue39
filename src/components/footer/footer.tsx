import React from 'react';
import Container from '../ui/Container';
// import Image from 'next/image';
// import logo from '@icons/logo.png';
// import { Button } from '../ui/button';
import Link from 'next/link';
// import axios from 'axios';
// import showToast from '../Toaster/Toaster';
import { menuData } from '@/data/menu';
import { generateSlug } from '@/config';
import { MdOutlineEmail, MdOutlinePhone, MdOutlineWhatsapp } from 'react-icons/md';
import { footerItems, WhatsAppInfo } from '@/data/data';
import { FaMapMarkerAlt } from 'react-icons/fa';
import SocialLink from '../social-link';
import Image from 'next/image';

const Footer: React.FC = () => {

  //Newsletter APi  

  // const [email, setEmail] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handleNewsLetter = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!email) {
  //     showToast('warn', 'Please enter a valid email address');
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletters/add-email`,
  //       {
  //         email,
  //       },
  //     );
  //     console.log(response);
  //     if (response.status === 201) {
  //       showToast('success', response.data.message);
  //       setEmail('');
  //     }
  //   } catch (error: any) {
  //     if (axios.isAxiosError(error)) {
  //       showToast(
  //         'error',
  //         error.response?.data?.message ||
  //         'Failed to subscribe. Please try again.',
  //       );
  //     } else {
  //       showToast('error', 'An error occurred. Please try again.');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
<section className="pt-10 border-t border-gray-200 bg-gray-300 text-black font-helvetica">

      {/* Newsletter Section start */}

      {/* <div className="container w-full sm:w-1/2 flex flex-col items-center mx-auto md:mb-[110px]">
        <Image src={logo} alt="logo" className="w-40" />

        <div className=" text-center">
          <p className="mt-6 tracking-wide font-helvetica text-13 lg:text-15 text-[#686868] max-sm:text-center">
          Thoughtfully selected to balance beauty and function.

          </p>
          <div className='max-w-1/3 m-auto'>
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
      </div> */}
      {/* Newsletter Section end */}

        <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
        {footerItems.map((item, index) => (
  <div key={index} className="relative w-full h-[200px] xsm:h-[260px] sm:h-[220px] md:h-[240px] rounded-3xl group">
    <div className={`${item.bgClass} bg-cover bg-no-repeat bg-center h-full w-full rounded-3xl`}>
      <p className="group-hover:opacity-0 absolute bottom-1 left-1/2 transform -translate-x-1/2 text-center text-white font-semibold text-20 xl:text-[26px] w-full">
        {item.text}
      </p>
    </div>
    <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center text-black text-14 lg:text-16 xl:text-xl opacity-0 group-hover:opacity-100 transition duration-300 rounded-3xl text-center space-y-2 px-2">
      {item.showImage && item.imageSrc ? (
        index === 2 ? (
          <Link target="_blank" href={'https://maps.app.goo.gl/4wnLULFAwHMdfBQ99'}>
            <Image width={80} height={80} src={item.imageSrc} alt={item.text} />
          </Link>
        ) : (
          <div>
            <Image width={80} height={80} src={item.imageSrc} alt={item.text} />
          </div>
        )
      ) : null}
      {item.overlayText.map((line, idx) => (
        <div className='leading-4 lg:leading-6' key={idx} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
    </div>
  </div>
))}

    </Container>
      <Container className="flex flex-wrap justify-between gap-10 pt-10 ">
        <div className=" px-2">
          <h3 className="font-extralight  font-helvetica sm:text-lg xl:text-xl text=[#121A25]">
            Shop by Rooms
          </h3>
          <ul className=" leading-8 xl:leading-[38px] tracking-wide font-helvetica text-13 lg:text-15 mt-6 capitalize text-[#686868]">
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
                        : `/${generateSlug(menu === 'homeOffice' ? 'office-furniture' : menu || '')}`
                    }
                    className="hover:underline  hover:font-semibold  capitalize"
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
          <h3 className="font-extralight font-helvetica sm:text-lg xl:text-xl text=[#121A25]">
            Shop by Item
          </h3>
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
                    className="hover:underline  hover:font-semibold  capitalize"
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
          <h3 className="font-extralight font-helvetica sm:text-lg xl:text-xl text=[#121A25]">
            Terms & Policies
          </h3>
          <ul className=" leading-8 xl:leading-[38px] tracking-wide font-helvetica text-13 lg:text-15  mt-6 text-[#686868]">
            <li>
              <Link href="/terms-and-conditions" className="hover:underline  hover:font-semibold">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:underline  hover:font-semibold">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline  hover:font-semibold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:underline  hover:font-semibold">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="min-w-[108px] ">
          <h3 className="font-extralight font-helvetica sm:text-lg xl:text-xl text=[#121A25]">
            Quick Links
          </h3>
          <ul className="leading-8 xl:leading-[38px] tracking-wide font-helvetica text-13 lg:text-15 mt-6 capitalize text-[#686868]">
            <li>
              <Link href="/profile" target="_self" className="hover:underline  hover:font-semibold ">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/about-us" target="_self" className="hover:underline  hover:font-semibold ">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" target="_self" className="hover:underline  hover:font-semibold ">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/order-history"
                target="_self"
                className="hover:underline hover:font-semibold "
              >
                Order History
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:items-center items-center xs:items-start text-center xs:text-start w-full xs:w-fit lg:pr-14">
          <div className='flex flex-col md:items-center w-fit'>
          <h3 className="font-extralight font-helvetica w-full sm:text-lg xl:text-xl text=[#121A25]">
            Get in Touch
          </h3>
          <div className="mt-6 xs:w-full flex max-w-56  text-[#686868]">
            <Link href="tel:+971505974495" target="_blank" rel="noreferrer">
              <div className=" w-full rounded-sm">
                <div className="flex items-center gap-2 py-2 ">
                  <p className="text-left text-13 lg:text-15 font-extralight leading-normal flex items-center gap-2  hover:font-semibold ">
                    <MdOutlinePhone size={23} />
                    {WhatsAppInfo.number}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="xs:w-full max-w-56  text-[#686868]">
            <Link href={`https://wa.me/${WhatsAppInfo.number.replaceAll(' ', '')}`} target="_blank" rel="noreferrer">
              <div className=" w-full  rounded-sm">
                <div className="flex items-center gap-2 py-2">
                  <MdOutlineWhatsapp size={23} />
                  <p className="text-left text-13 lg:text-15 font-extralight leading-normal flex justify-between items-center gap-2  hover:font-semibold ">


                    {WhatsAppInfo.number}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-2  text-[#686868]">
            <div className="xs:w-full text-start flex justify-start">
              <Link
                className='flex gap-2 justify-start pr-5 items-center hover:font-semibold'
                href="mailto:cs@avenue39.com"
                rel="noreferrer"
                target="_blank"
              >

                <MdOutlineEmail size={22}  />
                cs@avenue39.com
              </Link>
            </div>
          </div>
         
            <div className="xs:w-full max-w-full mt-2 py-2 text-[#686868]">
              <Link
                className='flex gap-2  text-14 hover:font-semibold'
                href="https://maps.app.goo.gl/v5g7KWR9C3RQL8vh7"
                rel="noreferrer"
                target="_blank"
              >
                <FaMapMarkerAlt size={22} />
                23 22nd St - Al Quoz <br/> Industrial Area 4 - Dubai
              </Link>
            </div>

          </div>
        </div>
      </Container>
      <div className="bg-main mb-7 md:mb-0 mt-10 py-3 px-4">
        <Container className="flex md:grid grid-cols-3 flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center gap-x-8 md:gap-x-0 lg:gap-x-8 gap-y-4 pb-10 md:pb-0 ">
          <p className='hidden md:block'></p>
          <p className="text-white text-17 md:text-13 lg:text-14 xl:text-17 font-extralight text-center md:w-full font-Helveticaligh opacity-95">
            Copyright © 2025 avenue39 All rights reserved.
          </p>
          <div className=" text-black text-center w-fit ms-auto">
            <SocialLink socialSize="md:text-[25px]" iconColor={'text-white'} />
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Footer;
