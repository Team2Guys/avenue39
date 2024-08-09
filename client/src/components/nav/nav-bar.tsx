import { INav } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import logo from '@icons/logo.png';
import { IoSearchSharp } from 'react-icons/io5';
import Container from '../ui/Container';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { HiOutlineBars3BottomRight } from 'react-icons/hi2';
import StarRating from '../ui/star';
import SocialLink from '../social-link';
import { IoIosClose } from 'react-icons/io';
import CartItems from '../cart/items';
import { Avatar, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Navbar = (props: INav) => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <div className="bg-white dark:text-black">
      <Container className="flex items-center justify-between p-2 md:p-4 gap-4  dark:bg-white   ">
        <div className="w-3/12">
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
        <div className="w-6/12">
          <div className="relative rounded-md hidden md:block">
            <input
              type="text"
              className="py-4 px-4 pe-11 border block w-full  text-sm disabled:opacity-50 "
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
        <div className="  gap-2 flex justify-end items-center w-3/12 space-x-8 ">
          <div className=" hidden md:flex justify-center">
            <CartItems />
          </div>
          <div className="hidden md:flex gap-5 items-center">
            <Link
              className="gap-2 flex items-center text-14 font-semibold hover:underline text-black dark:text-black"
              href={'/login'}
            >
              <FaRegUser size={25} />
              <span>Login/Register</span>
            </Link>
            {/* <Popover
              content={
                <>
                  <div className="flex flex-col gap-2 w-auto px-5 ">
                    <Link className='text-black hover:text-primary' href="/profile" onClick={hide}>
                      Profile
                    </Link>
                    <Link className='text-black hover:text-primary' href="/order-history" onClick={hide}>
                      Order History
                    </Link>
                    <Link className='text-black hover:text-primary' href="/login" onClick={hide}>
                      Logout
                    </Link>
                  </div>
                </>
              }
              title=""
              placement='bottomRight'
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <div className="flex gap-2 items-center whitespace-nowrap cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <span>M.Ahmad</span>
              </div>
            </Popover> */}
          </div>

          <div className="md:hidden flex gap-2 items-center">
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
