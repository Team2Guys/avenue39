'use client';
import { INav, IProduct } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import logo from '@icons/logo.png';
import { IoSearchSharp } from 'react-icons/io5';
import Container from '../ui/Container';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { HiOutlineBars3BottomRight } from 'react-icons/hi2';
import SocialLink from '../social-link';
import { IoIosSearch } from 'react-icons/io';
import CartItems from '../cart/items';
import { Avatar, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/config';
import RenderStars from '../ui/renderstars';
import { Skeleton } from '../ui/skeleton';
import { BiHeart } from 'react-icons/bi';
import Wishlist from '../wishlist/wishlist';

const Navbar = (props: INav) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const Navigate = useRouter();
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const userDetails = useSelector(
    (state: State) => state.usrSlice.loggedInUser,
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const {
    data: productsData,
    error,
    isLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: isDrawerOpen, // Fetch only when the drawer is open
  });

  const products = productsData || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleNavigation = (name: string) => {
    Navigate.push(`/product/${generateSlug(name)}`);
  };

  const filteredProducts = products.filter((product: IProduct) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  return (
    <div className={`bg-white dark:text-black ${isSticky ? 'sticky top-0 z-50' : ''}`}>
      <Container className="flex items-center justify-between p-2 md:p-4 gap-4 dark:bg-white">
        <div className="w-3/12 min-w-32">
         <div className='w-fit'>
         <Link className="relative" href={'/'}>
            <Image
              className="object-contain"
              width={180}
              height={180}
              src={logo}
              alt="Logo"
            />
          </Link>
         </div>
        </div>
        <div className="w-6/12">
          <form
            className="relative rounded-md hidden md:block"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="header-search"
              value={searchText}
              onChange={handleInputChange}
              className="px-4 h-12 xl:h-[64px] border block w-full text-sm disabled:opacity-50"
              placeholder="Search Here..."
            />
            <Drawer onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <button
                  type="submit"
                  className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer"
                >
                  <IoSearchSharp className="cursor-pointer" size={30} />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="max-w-screen-lg w-full mx-auto mt-10 space-y-5 p-2">
                  <div className="relative rounded-md w-full">
                    <input
                      type="text"
                      name="searchHeader"
                      value={searchText}
                      onChange={handleInputChange}
                      className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50"
                      placeholder="Search Here..."
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer"
                    >
                      <IoSearchSharp className="cursor-pointer" size={30} />
                    </button>
                  </div>
                  {isLoading && (
                    <div className="border p-2">
                      <div className="flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2 items-center">
                        <Skeleton className="w-[100px] h-[100px]"></Skeleton>
                        <div className='pt-1 flex flex-col gap-3'>
                          <Skeleton className="w-32 h-6 rounded-none"></Skeleton>
                          <Skeleton className="w-32 h-4 rounded-none"></Skeleton>
                          <Skeleton className="w-32 h-4 rounded-none"></Skeleton>
                        </div>
                      </div>
                    </div>
                  )}
                  {error && <div>Error fetching products: {error.message}</div>}
                  {!isLoading && !error && filteredProducts.length > 0 && (
                    <div className="border p-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                      {filteredProducts.map((product: IProduct) => (
                        <DrawerTrigger asChild key={product.id}>
                          <div
                            onClick={() => handleNavigation(product.name)}
                            className="flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2 cursor-pointer"
                          >
                            <Image
                              width={100}
                              height={100}
                              src={product.posterImageUrl}
                              alt={product.name}
                              className="min-h-[100px] min-w-[100px]"
                            />
                            <div className="pt-1 flex flex-col gap-2">
                              <p className="text-21 font-normal capitalize">
                                {product.name}
                              </p>
                              <div className="flex items-center gap-4">
                                <p className="text-15 font-semibold">
                                  AED <span>{product.price}</span>
                                </p>
                                <p className="text-[12px] text-primary-foreground font-bold line-through">
                                  AED <span>{product.discountPrice}</span>
                                </p>
                              </div>
                              <div>
                                <RenderStars card={product} />
                              </div>
                            </div>
                          </div>
                        </DrawerTrigger>
                      ))}
                    </div>
                  )}
                  {filteredProducts.length < 1 && (
                    <div>No product is found</div>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </form>
        </div>
        <div className="gap-2 flex justify-end items-center w-3/12 space-x-8">

          <div className="hidden md:flex justify-between gap-5 items-center">
          <Wishlist/>
            <CartItems />
          </div>
          <div className="hidden md:flex gap-5 items-center">
            {!userDetails ? (
              <Link
                className="gap-2 flex items-center text-14 font-semibold hover:underline text-black dark:text-black"
                href={'/login'}
              >
                <FaRegUser size={25} />
                <span>Login/Register</span>
              </Link>
            ) : (
              <Popover
                content={
                  <div className="flex flex-col gap-2 w-auto px-5 ">
                    <Link
                      className="text-black hover:text-primary"
                      href="/profile"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      className="text-black hover:text-primary"
                      href="/order-history"
                      onClick={() => setOpen(false)}
                    >
                      Order History
                    </Link>
                    <Link
                      className="text-black hover:text-primary"
                      href="/login"
                      onClick={() => setOpen(false)}
                    >
                      Logout
                    </Link>
                  </div>
                }
                title=""
                placement="bottomRight"
                trigger="click"
                open={open}
                onOpenChange={setOpen}
              >
                <div className="flex gap-2 items-center whitespace-nowrap cursor-pointer">
                  <Avatar icon={<UserOutlined />} />
                  <span>{userDetails.name}</span>
                </div>
              </Popover>
            )}
          </div>
          <div className="md:hidden flex gap-2 items-center">
            <form onSubmit={(e) => e.preventDefault()}>
              <Drawer onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                  <button
                    type="submit"
                    className="cursor-pointer block md:hidden"
                  >
                    <IoSearchSharp className="cursor-pointer" size={30} />
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="max-w-screen-lg w-full mx-auto mt-10 space-y-5 p-2">
                    <div className="relative rounded-md w-full">
                      <input
                        type="text"
                        value={searchText}
                        onChange={handleInputChange}
                        className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50"
                        placeholder="Search Here..."
                      />
                      <button
                        type="submit"
                        className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer"
                      >
                        <IoSearchSharp className="cursor-pointer" size={30} />
                      </button>
                    </div>
                    {isLoading && (
                    <div className="border p-2">
                      <div className="flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2 items-center">
                        <Skeleton className="w-[100px] h-[100px]"></Skeleton>
                        <div className='pt-1 flex flex-col gap-3'>
                          <Skeleton className="w-40 h-6 rounded-none"></Skeleton>
                          <Skeleton className="w-40 h-4 rounded-none"></Skeleton>
                          <Skeleton className="w-40 h-4 rounded-none"></Skeleton>
                        </div>
                      </div>
                    </div>
                  )}
                    {error && (
                      <div>Error fetching products: {error.message}</div>
                    )}
                    {!isLoading && !error && filteredProducts.length > 0 && (
                      <div className="border p-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                        {filteredProducts.map((product: IProduct) => (
                          <DrawerTrigger asChild key={product.id}>
                            <div
                              onClick={() => handleNavigation(product.name)}
                              className="flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2 cursor-pointer"
                            >
                              <Image
                                width={100}
                                height={100}
                                src={product.posterImageUrl}
                                alt={product.name}
                                className="min-h-[100px] min-w-[100px]"
                              />
                              <div className="flex flex-col gap-2">
                                <p className="text-21 font-normal capitalize">
                                  {product.name}
                                </p>
                                <div className="flex items-center gap-4">
                                  <p className="text-15 font-semibold">
                                    Dhs. <span>{product.price}</span>.00
                                  </p>
                                  <p className="text-[12px] text-primary-foreground font-bold line-through">
                                    <span>{product.discountPrice}</span>.00
                                  </p>
                                </div>
                                <div>
                                  <RenderStars card={product} />
                                </div>
                              </div>
                            </div>
                          </DrawerTrigger>
                        ))}
                      </div>
                    )}
                    {filteredProducts.length < 1 && (
                      <div>No product is found</div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
