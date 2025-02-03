'use client';
import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import MenuLink from '../menu-link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generateSlug } from '@/config';
import Link from 'next/link';
import { State } from '@/redux/store';
import { useSelector } from 'react-redux';
import { ICategory } from '@/types/types';
import { staticHeaderCategories } from '@/data/menu';

const MenuBar = ({ categories }: { categories?: ICategory[] }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [hoveringMenu, setHoveringMenu] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId: string | null = searchParams.get('id');
  const [isActiveMenu, setisActiveMenu] = useState<string | null>(null);
  const userDetails = useSelector(
    (state: State) => state.usrSlice.loggedInUser,
  );
  useEffect(() => {
    const pathSplit = pathname.split('/');
    const name = pathSplit.splice(pathSplit.length - 1);
    if (categoryId) {
      const activeMenu = categories?.find(
        (item) => item.id === Number(categoryId),
      );
      setisActiveMenu(activeMenu?.name.replace('-', ' ').toLowerCase() || null);
      console.log(pathname, 'pathname', name, activeMenu, categories);
    } else {
      setisActiveMenu(name.toString().replace('-', ' '));
      console.log(pathname, 'pathname', name);
    }
  }, [pathname, categories, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (!hoveringMenu) {
      setActiveMenu(null);
    }
  };
  return (
    <div
      className={`${isSticky ? `sticky ${userDetails ? 'top-20' : 'top-16'} z-20` : 'relative md:pb-12'}`}
    >
      <div
        className={`bg-white shadow-md mb-1 pt-3 hidden md:block z-20 ${
          isSticky ? '' : 'absolute w-full top-0'
        }`}
      >
        <Container className="flex flex-wrap items-center justify-between">
          {categories && categories?.length < 1 ? (
            staticHeaderCategories.map((item, index) => (
              <Link
                href={`/${generateSlug(item)}`}
                key={index}
                className={`menu-item text-13 lg:text-15 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap ${item === 'Sale' ? 'text-red-500' : 'text-black'}`}
              >
                {item}
              </Link>
            ))
          ) : (
            <>
              {categories?.map((item) => (
                <div className="relative" key={item.id}>
                  <Link
                    href={`/${generateSlug(item.name)}`}
                    className={`relative menu-item text-13 lg:text-15 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap text-black dark:text-black flex flex-row gap-2 items-center cursor-pointer ${isActiveMenu === item.name.toLowerCase() ? 'linkactive' : 'link-underline'}`}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.name}
                  </Link>

                  {activeMenu &&
                    activeMenu === item.name &&
                    item.subcategories &&
                    item.subcategories.length > 0 && (
                      <div
                        className={`megamenu-container w-[200px] bg-white shadow-lg px-10 py-4 z-20  absolute top-[28px]  rounded-b-xl`}
                        onMouseEnter={() => setHoveringMenu(true)}
                        onMouseLeave={() => {
                          setHoveringMenu(false);
                          setActiveMenu(null);
                        }}
                      >
                        <div className="flex gap-4">
                          <div className="w-full space-y-4">
                            <div className="grid grid-cols-1 space-y-2">
                              <MenuLink
                                menudata={item}
                                onLinkClick={() => setActiveMenu(null)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              ))}
              <Link
                href="/accessories"
                className={`menu-item text-13 lg:text-15 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap text-red-600 dark:text-red-600 flex flex-row gap-2 items-center cursor-pointer ${pathname === '/products' ? 'linkactive' : 'link-underline'}`}
              >
                sale
              </Link>
            </>
          )}
        </Container>
      </div>

      {/* {activeMenu &&
        !loading &&
        activeMenu !== 'tvCabinets' &&
        activeMenu !== 'clearance' && (
          <div
            className="megamenu-container w-fit bg-white shadow-lg p-10 z-50 absolute top-[40px]"
          onMouseEnter={() => setHoveringMenu(true)}
          onMouseLeave={() => {
            setHoveringMenu(false);
            setActiveMenu(null);
          }}
          >
            <Container className="flex gap-4">
              <div className="w-full space-y-4">
                <p className="text-19 font-bold w-96">
                  {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
                </p>
                <div className="border-b-4 w-14 border-main" />
                <div className="grid grid-cols-1 space-y-2">
                  <MenuLink
                    menudata={menuData[activeMenu]}
                    onLinkClick={() => {
                      setActiveMenu(null)

                    }}
                    loading={loading}
                    pathname={pathname}
                  />
                </div>
              </div>
              {(activeMenu === 'bedroom' || activeMenu === 'megaSale') && (
                <div className="w-full md:w-4/12">
                  <Image
                    className="object-contain p-2"
                    width={500}
                    height={500}
                    src={megamenu}
                    alt="menu"
                  />
                </div>
              )}
            </Container>
          </div>
        )} */}
    </div>
  );
};

export default MenuBar;
