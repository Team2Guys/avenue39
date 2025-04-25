'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import logo from '@icons/logo_nav.png';
import {
  IoCloseOutline,
} from 'react-icons/io5';
import Container from '../ui/Container';
import CartItems from '../cart/items';
import { Popover } from 'antd';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { ChangeUrlHandler, fetchProducts } from '@/config/fetch';
// import RenderStars from '../ui/renderstars';
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
import { CartItem } from '@/redux/slices/cart/types';
import { ICategory } from '@/types/cat';
import { IProduct } from '@/types/prod';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';
const MoblieSearch = dynamic(() => import('./MoblieSearch'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-6 rounded-full"></Skeleton>,
});

const DasktopSearch = dynamic(() => import('./DasktopSearch'), {
  ssr: false,
  loading: () => <Skeleton className="w-full max-w-[45%] lg:max-w-[58%] xl:max-w-[43%] 2xl:max-w-[40%] h-10 rounded-full"></Skeleton>,
});

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
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [products, setProducts] = useState<CartItem[]>([]);
  const { loggedInUser } = useSelector((state: State) => state.usrSlice);
  const [profilePhoto, setProfilePhoto] = useState<any>([]);
  const [isPending, startTransition] = useTransition();
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

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
    queryFn: () => fetchProducts('getHeaderProducts'),
    enabled: isProductListOpen,
  });

  useEffect(() => {
    if (productsData) {
      startTransition(() => {
        const transformed = variationProducts({ products: productsData });
        setProducts(transformed);
      });
    }
  }, [productsData]);


  useEffect(() => {
    if (loggedInUser) {
      setProfilePhoto({
        imageUrl: loggedInUser?.userImageUrl,
        public_id: loggedInUser.userPublicId,
      });
    }
  }, [loggedInUser]);


  const handleNavigation = (product: IProduct) => {
    let url = productUrl(product as CartItem);
    Navigate.push(url);
    setIsProductListOpen(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300); // adjust delay if needed

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    if (!isProductListOpen) {
      setFilteredProducts([]);
      return;
    }

    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    const result = (products || [])
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
        const aName = a.name?.toLowerCase() || '';
        const bName = b.name?.toLowerCase() || '';

        const aStarts = aName.startsWith(normalizedSearch);
        const bStarts = bName.startsWith(normalizedSearch);

        if (aStarts !== bStarts) return aStarts ? -1 : 1;

        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      });

    setFilteredProducts(result);
  }, [isProductListOpen, products, debouncedSearch]);

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
    } catch {
      return;
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
                width={180}
                height={180}
                src={logo}
                alt="Logo"
                loading='eager'
                className='w-full max-h-6'
              />
            </Link>
          </div>
        </div>
        {windowWidth < 640 ? (
          <MoblieSearch error={error} filteredProducts={filteredProducts} handleNavigation={handleNavigation} isLoading={isLoading} isPending={isPending} searchText={searchText} setIsProductListOpen={setIsProductListOpen} setSearchText={setSearchText} />
        ) : (
          <DasktopSearch isProductListOpen={isProductListOpen} productUrl={productUrl} filteredProducts={filteredProducts} setSearchText={setSearchText} handleNavigation={handleNavigation} isLoading={isLoading} isPending={isPending} searchText={searchText} setIsProductListOpen={setIsProductListOpen} />
        )}
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
