'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import logo from '@icons/logo_nav.png';
import {
  IoCloseOutline,
  IoSearchOutline,
  IoSearchSharp,
} from 'react-icons/io5';
import Container from '../ui/Container';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import CartItems from '../cart/items';
import { Popover } from 'antd';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { ChangeUrlHandler, fetchProducts } from '@/config/fetch';
import RenderStars from '../ui/renderstars';
import { Skeleton } from '../ui/skeleton';
import Wishlist from '../wishlist/wishlist';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { loggedInUserAction } from '@redux/slices/user/userSlice';
import { useAppDispatch } from '@components/Others/HelperRedux';
import { CiUser } from 'react-icons/ci';
import SocialLink from '../social-link';
import { Sheet, SheetContent, SheetOverlay } from '../ui/sheet';
import { HiBars3BottomRight } from "react-icons/hi2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { generateSlug, getAllStock, variationProducts } from '@/config';
import MenuLink from '../menu-link';
import { variationProductImage } from '@/redux/slices/cart';
import { CartItem } from '@/redux/slices/cart/types';
import { ICategory } from '@/types/cat';
import { IProduct } from '@/types/prod';

const Navbar = ({ categories }: { categories: ICategory[] }) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const Navigate = useRouter();
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const drawerInputRef = useRef<HTMLInputElement>(null);
  const userDetails = useSelector(
    (state: State | any) => state.usrSlice.loggedInUser,
  );
  const dispatch = useAppDispatch();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
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
  });
  const [isProductListOpen, setIsProductListOpen] = useState(false);

  const { loggedInUser } = useSelector((state: State) => state.usrSlice);

  const [profilePhoto, setProfilePhoto] = useState<any>([]);
  useEffect(() => {
    if (loggedInUser) {
      setProfilePhoto({
        imageUrl: loggedInUser?.userImageUrl,
        public_id: loggedInUser.userPublicId,
      });
    }
  }, [loggedInUser]);

  const products = useMemo(() => variationProducts({ products: productsData || [] }), [productsData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleNavigation = (product: IProduct) => {
    let url = productUrl(product as CartItem);
    Navigate.push(url);
    setIsProductListOpen(false);
  };

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();
  
    return (products || [])
      .filter((product) => {
        const hasStock = Number(getAllStock(product)) > 0;
        if (!normalizedSearch) return hasStock;
  
        return (
          product.name?.toLowerCase().includes(normalizedSearch) ||
          product.price?.toString().includes(normalizedSearch) ||
          product.discountPrice?.toString().includes(normalizedSearch) ||
          product.colorName?.toLowerCase().includes(normalizedSearch) ||
          product.sizeName?.toLowerCase().includes(normalizedSearch)
        );
      })
      .sort((a, b) => {
        const aName = a.name?.toLowerCase();
        const bName = b.name?.toLowerCase();
  
        const aStarts = aName.startsWith(normalizedSearch);
        const bStarts = bName.startsWith(normalizedSearch);
  
        if (aStarts !== bStarts) return aStarts ? -1 : 1;
  
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  
        return dateB - dateA;
      });
  }, [products, searchText]);

  useEffect(() => {
    if (drawerInputRef.current) {
      setTimeout(() => {
        drawerInputRef.current?.focus();
      }, 50);
    } else {
      setTimeout(() => {
        drawerInputRef.current?.focus();
      }, 50);
    }
  }, []);


  const logoutHhandler = () => {
    try {
      Cookies.remove('user_token', { path: '/' });

      dispatch(loggedInUserAction(null));

      Navigate.push('/login');
      setOpen(false);
    } catch  {
        return ;
    }
  };
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        setIsSheetOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const productUrl = (product: CartItem) => {
    const baseUrl = ChangeUrlHandler(product);
    const params = new URLSearchParams();
  
    if (product.colorName) {
      params.set('filter', generateSlug(product.colorName));
    }
  
    if (product.sizeName) {
      params.set('size', generateSlug(product.sizeName));
    }
  
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  return (
    <div
      className={`bg-white dark:text-black ${isSticky ? 'sticky top-0 !z-[100] shadow-md md:shadow-none border-b md:border-b-0' : 'border-0 border-transparent !z-[100]'}`}
    >
      <Container className="flex items-center justify-between p-2 md:p-4 gap-4 dark:bg-white ">
        <div className="w-3/12 min-w-24">
          <div className="w-fit">
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
        <div className="w-full hidden sm:block max-w-[45%] lg:max-w-[58%] xl:max-w-[43%] 2xl:max-w-[40%] xl:mr-[100px] 2xl:mr-[40px]">
          <div className="bg-whtie">
            <form
              className="relative w-full sm:block hidden bg-white z-[1099]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                name="header-search"
                value={searchText}
                autoComplete='off'
                onChange={handleInputChange}
                onClick={() => setIsProductListOpen(true)}
                className="h-[40px] border focus-visible:outline-none focus-visible:ring-0 block w-full rounded-full custom-input-bg pl-12 z-[199] border-black border-opacity-30 font-extralight"
                placeholder="Search Here..."
              />
              <button
                type="submit"
                className="absolute inset-y-0 left-0 flex items-center z-20 pl-4 cursor-pointer"
                    aria-label='Search'
              >
                <IoSearchOutline
                  className="cursor-pointer font-extralight text-black"
                  size={18}
                 aria-hidden="true"
                />
              </button>

              {isProductListOpen && (
                <>
                  <div className="absolute top-full w-full p-3 bg-white border border-[#afa183] border-opacity-30 rounded-t-2xl mt-2 max-h-[600px] overflow-y-auto custom-scrollbar z-[999]">
                    <div className="flex justify-end mb-2 sticky top-0">
                      <IoCloseOutline
                        size={24}
                        className="cursor-pointer bg-gray-400 rounded-full text-white p-1 "
                        onClick={() => setIsProductListOpen(false)}
                      />
                    </div>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) => {
                        return (

                          <Link key={index} href={
                            productUrl(product)}
                            onClick={() => setIsProductListOpen(false)}
                          >
                            <div
                              className="flex border p-2 my-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 cursor-pointer border-[#afa183] border-opacity-30"
                            >
                              <Image
                                width={100}
                                height={100}
                                src={variationProductImage(product) || product.posterImageUrl}
                                alt={product.name}
                                className="size-20 md:size-24"
                              />
                              <div className="pt-1 flex flex-col gap-2 w-full">
                                <p className="text-17 md:text-21 font-normal capitalize">
                                  {product.name}
                                </p>
                                <div className="flex items-center gap-1 xs:gap-4">
                                  {product.discountPrice > 0 ? (
                                    <>
                                      <p className="text-15 font-semibold text-red-700">
                                      <span className="font-currency font-normal"></span> <span>{product.discountPrice}</span>
                                      </p>
                                      <p className="text-[12px] text-primary-foreground font-bold line-through">
                                      <span className="font-currency font-normal"></span> <span>{product.price}</span>
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-15 font-semibold">
                                      <span className="font-currency font-normal"></span> <span>{product.price}</span>
                                    </p>
                                  )}
                                </div>
                                {(product.colorName || product.sizeName) &&
                                  <div className='flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 w-full pr-5'>
                                    <div className='flex items-center gap-1 text-13 lg:w-6/12'>
                                      <span className='capitalize'>{product.filter?.at(0)?.heading}</span>
                                      <span className='capitalize'>{product.colorName}</span>
                                    </div>

                                    <span className='text-13 text-start lg:w-3/12'>{product.sizeName}</span>

                                    <span className={`text-13 lg:w-3/12 text-end ${Number(getAllStock(product)) <= 0 ? "text-red-500" : ""}`}>{Number(getAllStock(product)) <= 0 ? "Out of Stock" : "In Stock"}</span>
                                  </div>}
                                {!(product.colorName || product.sizeName) && <span className={`text-13 text-end  pr-5  ${Number(getAllStock(product)) <= 0 ? "text-red-500" : ""}`}>{Number(getAllStock(product)) <= 0 ? "Out of Stock" : "In Stock"}</span>
                                }
                                <RenderStars card={product} />
                              </div>
                            </div>

                          </Link>
                        )


                      })
                    ) : (
                      <div>No product is found</div>
                    )}
                  </div>
                  <div
                    onClick={() => setIsProductListOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-0"
                  ></div>
                </>
              )}
            </form>
          </div>
        </div>
        <div className="sm:hidden flex gap-2 items-center">

          <Drawer direction="top">
            <DrawerTrigger asChild>

              <form
                className="relative w-full bg-white z-[199]"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  name="header-search"
                  value={searchText}
                  autoComplete='off'
                  onChange={handleInputChange}
                  onClick={() => setIsProductListOpen(true)}
                  className=" h-[25px] sm:h-[40px] max-sm:placeholder:text-12 border focus-visible:outline-none focus-visible:ring-0 block w-full rounded-full custom-input-bg pl-9 pr-2 z-[199] border-[#afa183] border-opacity-30 font-extralight"
                  placeholder="Search Here..."
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 left-0 flex items-center z-20 pl-3 cursor-pointer"
                >
                  <IoSearchOutline
                    className="cursor-pointer font-extralight text-[#A6A6A6]"
                    size={18}
                  />
                </button>
              </form>
            </DrawerTrigger>
            <DrawerContent className='!z-[200]'>
              <VisuallyHidden>
                <DrawerTitle>Navbar</DrawerTitle>
              </VisuallyHidden>
              <div className="max-w-screen-xs w-full mx-auto m-2 space-y-5 p-2">
                <DrawerClose asChild>
                  <IoCloseOutline
                    size={24}
                    className="cursor-pointer bg-gray-400 rounded-full text-white p-1 absolute top-2 right-2 z-50 shadow-md hover:bg-gray-500 transition duration-300"
                  />
                </DrawerClose>
                <div className="relative rounded-md w-full">
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    className="py-4 px-4 pe-11 border block w-full rounded-full text-sm disabled:opacity-50 "
                    placeholder="Search Here..."
                    ref={(node) => {
                      if (node) {
                        node.focus();
                      }
                    }}
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
                      <div className="pt-1 flex flex-col gap-3">
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
                  <div className=" p-2 max-h-[600px] overflow-y-auto w-full custom-scrollbar ">
                    <div className="flex flex-wrap justify-center gap-2 -m-2">
                      {filteredProducts.map((product: any, index: number) => {

                        return (
                          <DrawerTrigger asChild key={index}>
                            <div
                              onClick={() => handleNavigation(product)}
                              className="flex border p-2 rounded-md flex-col hover:shadow-md items-center transition duration-300 gap-2 w-[48%] mt-2 cursor-pointer bg-white"
                            >
                              <Image
                                width={100}
                                height={100}
                                src={product.posterImageUrl}
                                alt={product.name}
                                className="min-h-[100px] min-w-[130px]"
                              />
                              <div className="flex flex-col gap-2 justify-between h-full">
                                <p className="text-16 text-center font-normal capitalize">
                                  {product.name}
                                </p>

                                <div className="flex justify-center items-center gap-2 xs:gap-4">
                                  <p className={`text-14 xs:text-15 font-semibold  ${product.discountPrice ? "text-red-700" : ""}`}>
                                  <span className="font-currency font-normal"></span> <span>{product.discountPrice ? product.discountPrice : product.price}</span>
                                  </p>
                                  {(product.discountPrice && product.discountPrice > 0) ?

                                    <p className="text-11 xs:text-[12px] text-primary-foreground font-bold line-through ">
                                      <span className="font-currency font-normal"></span> {product.price}
                                    </p> : ''
                                  }

                                </div>
                                {(product.colorName || product.sizeName) &&
                                  <div className='flex items-center justify-center gap-3 flex-wrap'>
                                    <div className='flex items-center gap-1 text-13'>
                                      <span className='capitalize'>{product.filter?.at(0)?.heading}</span>
                                      <span className='capitalize'>{product.colorName}</span>
                                    </div>
                                    <span className='text-13'>{product.sizeName}</span>
                                    {<span className={`text-13  ${Number(getAllStock(product)) <= 0 ? "text-red-500" : ""}`}>{Number(getAllStock(product)) <= 0 ? "Out of Stock" : "In Stock"}</span>
                                    }
                                  </div>}



                                {!(product.colorName || product.sizeName) && <span className={`text-13 text-center ${Number(getAllStock(product)) <= 0 ? "text-red-500" : ""}`}>{Number(getAllStock(product)) <= 0 ? "Out of Stock" : "In Stock"}</span>
                                }
                                <div>
                                  <RenderStars card={product} />
                                </div>
                              </div>
                            </div>
                          </DrawerTrigger>
                        )

                      })}
                    </div>
                  </div>
                )}
                {filteredProducts.length < 1 && (
                  <div>No product is found</div>
                )}
              </div>
            </DrawerContent>
          </Drawer>

        </div>

        <div className="gap-3 lg:gap-3 flex justify-end items-center w-2/12 ps-2">
          {windowWidth > 895 && (
            <div className="hidden md:flex justify-between gap-1 lg:gap-1 items-center relative no-scroll">
              <Wishlist />
              <CartItems />
            </div>
          )}
          <div className="hidden md:flex gap-5 items-center">
            {!userDetails ? (
              <Link
                className="gap-2 flex items-center text-14 font-extralight hover:underline text-black dark:text-black"
                href={'/login'}
              >
                <CiUser size={26} />
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
                      onClick={() => logoutHhandler()}
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
                  <span className="w-auto">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <Image
                        src={
                          profilePhoto && profilePhoto.imageUrl
                            ? profilePhoto.imageUrl
                            : '/images/dummy-avatar.jpg'
                        }
                        width={55}
                        height={55}
                        alt={loggedInUser.name}
                      />
                    </div>
                  </span>
                  <span className="max-w-28 w-auto text-wrap">
                    {userDetails.name}
                  </span>
                </div>
              </Popover>
            )}
          </div>
          <div className="md:hidden">
            <Sheet
              open={isSheetOpen}
            >
              <div onClick={() => setIsSheetOpen(true)}>
                <HiBars3BottomRight size={30} />
              </div>
              <SheetOverlay className='block bg-[#fffc] z-[200]' />
              <SheetContent className="pb-5 bg-white shadow-lg border min-h-[60vh] h-fit z-[200]" ref={sheetRef}>
                <IoCloseOutline
                  onClick={() => setIsSheetOpen(false)}
                  size={24}
                  className="cursor-pointer bg-gray-400 rounded-full text-white p-1 absolute top-2 right-2 shadow-md hover:bg-gray-500 transition duration-300"
                />
                <div className="pt-5 space-y-2">
                  {categories
                    ?.filter((item) => item.name.toLowerCase() !== "sale").map((menu, menuIndex) =>
                      menu.subcategories && menu.subcategories?.length > 0 ? (
                        <Accordion
                          key={menuIndex}
                          type="single"
                          collapsible
                          className="w-full "
                        >
                          <AccordionItem value={`item-${menuIndex}`}>
                            <AccordionTrigger className="font-bold">
                              <div className='w-fit' onClick={() => setIsSheetOpen(false)}>
                                <Link
                                  href={`/${generateSlug(menu.name?.trim()?.toLowerCase() === "home office" ? "office-furniture" : menu.name)}`}
                                  className="hover:underline font-semibold text-15 flex gap-2 items-center">
                                  {menu.name}
                                </Link>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid font-semibold space-y-2 px-4">

                                <MenuLink menudata={menu} onLinkClick={() => setIsSheetOpen(false)} />

                              </div>


                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <div key={menuIndex} onClick={() => setIsSheetOpen(false)}>
                          <Link
                            href={`/${generateSlug(menu.name)}`}
                            key={menuIndex}

                            className="hover:underline font-semibold text-15 py-1 block uppercase w-fit"
                          >
                            {menu.name}
                          </Link>
                        </div>
                      ),
                    )}
                  <div key={'sales'} onClick={() => setIsSheetOpen(false)}>
                    <Link
                      href={'/sale'}

                      className="hover:underline text-red-500 font-semibold text-15 py-1 block uppercase w-fit"
                    >
                      Sale
                    </Link>
                  </div>
                </div>
                <div className="mt-3">
                  <SocialLink iconColor="text-black" onLinkClick={() => setIsSheetOpen(false)} />
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
