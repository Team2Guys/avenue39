import { INav } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegHeart, FaRegUser, FaShoppingCart, FaUser } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';
import logo from '@icons/logo.png';
import { IoBagOutline, IoSearchSharp } from 'react-icons/io5';
import Container from '../ui/Container';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { HiOutlineBars3BottomRight } from 'react-icons/hi2';
import StarRating from '../ui/star';
import SocialLink from '../social-link';
import { Button } from '../ui/button';
import { IoIosClose } from 'react-icons/io';
import productImg from '@images/products/imageeee.png';
import CartItems from '../cart/items';
import { State } from '@/redux/store';
import { useSelector } from 'react-redux';
import { totalProductsInCart } from '@/redux/slices/cart';
import { TotalProducts } from '@/config/index';

const Navbar = (props: INav) => {
  return (
    <div className="bg-white dark:text-black">
      <Container className="flex items-center justify-between p-2 md:p-4 gap-4  dark:bg-white   ">
        <div className="w-4/12 md:w-2/12">
          <Link href={'/'}>
            <Image
              className=""
              width={250}
              height={250}
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="w-0/12 md:w-4/12 lg:w-5/12 ">
          <div className="relative rounded-md hidden md:block">
            <input
              type="text"
              className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50 "
              placeholder="Search Here..."
            />
            <Drawer>
              <DrawerTrigger asChild>
                <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer">
                  <IoSearchSharp className="cursor-pointer" size={30} />
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <div className="max-w-screen-lg w-full mx-auto mt-10 space-y-5 p-2">
                  <div className="relative rounded-md w-full">
                    <input
                      type="text"
                      className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50 "
                      placeholder="Search Here..."
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer">
                      <IoSearchSharp className="cursor-pointer" size={30} />
                    </div>
                  </div>
                  <div className="border p-2 max-h-[600px] overflow-y-auto custom-scrollbar ">
                    <div className="flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2">
                      <Image
                        width={100}
                        height={100}
                        src={'/assets/search.png'}
                        alt="search"
                      />
                      <div className="pt-1">
                        <p className="text-21 font-normal">
                          Sparta Coffee Table
                        </p>
                        <div className="flex items-center gap-4">
                          <p className="text-15 font-semibold">
                            Dhs. <span>150</span>.00
                          </p>
                          <p className="text-[12px] text-primary-foreground font-bold line-through">
                            <span>150</span>.00
                          </p>
                        </div>
                        <StarRating defaultValue={5} disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className=" md:w-2/12 lg:w-1/12 hidden md:flex justify-center">
          <CartItems />
        </div>
        <div className="w-5/12 md:w-5/12 lg:w-3/12 gap-2 flex justify-end items-center ">
          <Drawer>
            <DrawerTrigger asChild>
              <IoSearchSharp
                className="cursor-pointer block md:hidden "
                size={30}
              />
            </DrawerTrigger>
            <DrawerContent>
              <div className="max-w-screen-lg w-full mx-auto mt-10 space-y-5 p-2">
                <div className="relative rounded-md w-full">
                  <input
                    type="text"
                    className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50 "
                    placeholder="Search Here..."
                  />
                  <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer">
                    <IoSearchSharp className="cursor-pointer" size={30} />
                  </div>
                </div>
                <div className="border p-2 max-h-[600px] overflow-y-auto custom-scrollbar ">
                  <div className="flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2">
                    <Image
                      width={100}
                      height={100}
                      src={'/assets/search.png'}
                      alt="search"
                    />
                    <div className="pt-1">
                      <p className="text-21 font-normal">Sparta Coffee Table</p>
                      <div className="flex items-center gap-4">
                        <p className="text-15 font-semibold">
                          Dhs. <span>150</span>.00
                        </p>
                        <p className="text-[12px] text-primary-foreground font-bold line-through">
                          <span>150</span>.00
                        </p>
                      </div>
                      <StarRating defaultValue={5} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <div className="hidden md:flex gap-10 items-center">
            <Link
              className="gap-2 flex items-center text-14 font-semibold hover:underline text-black dark:text-black"
              href={'/login'}
            >
              <FaRegUser size={25} />
              <span>Login/Register</span>
            </Link>
            <Link
              className="text-14 font-semibold hover:underline text-black dark:text-black"
              href={'/about'}
            >
              About us
            </Link>
            <Link
              className="text-14 font-semibold hover:underline text-black dark:text-black"
              href={'/contact'}
            >
              Contact Us
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <HiOutlineBars3BottomRight
                  className="p-2 bg-black text-white rounded-lg"
                  size={40}
                />
              </SheetTrigger>
              <SheetOverlay className="bg-black opacity-80 z-[51]" />
              <SheetContent className="pb-5 z-[52]">
                <SheetClose className="absolute left-4 top-4 rounded-sm opacity-100 ring-offset-background transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 bg-black text-white focus:ring-ring focus:ring-offset-2">
                  <IoIosClose size={25} />
                </SheetClose>
                <div className="grid mt-10 space-y-2">
                  <Link
                    className="text-16 font-semibold hover:underline"
                    href={'/about'}
                  >
                    About us
                  </Link>
                  <Link
                    className="text-16 font-semibold hover:underline"
                    href={'/contact'}
                  >
                    Contact Us
                  </Link>
                  <Link
                    className="gap-2 flex items-center text-16 font-semibold hover:underline"
                    href={'/login'}
                  >
                    Login/Register
                  </Link>
                  <SocialLink
                    className={'gap-2 pt-2'}
                    linkClass="p-2 border rounded-md"
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
