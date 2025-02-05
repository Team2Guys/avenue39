'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  const [isActiveMenu, setisActiveMenu] = useState<string | null>(null);
  const userDetails = useSelector(
    (state: State) => state.usrSlice.loggedInUser,
  );

  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId: string | null = searchParams.get('id');

  // Close menu if click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const pathSplit = pathname.split('/');
    const name = pathSplit.splice(pathSplit.length - 1);
    if (categoryId) {
      const activeMenu = categories?.find(
        (item) => item.id === Number(categoryId),
      );
      setisActiveMenu(activeMenu?.name.replace('-', ' ').toLowerCase() || null);
    } else {
      setisActiveMenu(name.toString().replace('-', ' '));
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
    if (activeMenu === menu) {
      return; // Prevent opening dropdown if the same menu is hovered
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (!hoveringMenu) {
      setActiveMenu(null);
    }
  };

  const handleClickMenu = (menu: string) => {
    if (activeMenu === menu) {
      setActiveMenu(null); // Toggle dropdown if the same menu is clicked
    } else {
      setActiveMenu(menu);
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
                className={`menu-item text-13 lg:text-15 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap ${
                  item === 'Sale' ? 'text-red-500' : 'text-black'
                }`}
              >
                {item}
              </Link>
            ))
          ) : (
            <>
              {categories
                ?.filter((item) => item.name.toLowerCase() !== 'sale')
                .map((item) => (
                  <div
                    className="relative"
                    key={item.id}
                    ref={menuRef}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${generateSlug(item.name)}`}
                      className={`relative menu-item text-13 lg:text-15 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap text-black dark:text-black flex flex-row gap-2 items-center cursor-pointer ${
                        isActiveMenu === item.name.toLowerCase() ? 'linkactive' : 'link-underline'
                      }`}
                      onClick={() => handleClickMenu(item.name)}
                    >
                      {item.name}
                    </Link>

                    {activeMenu &&
                      activeMenu === item.name &&
                      item.subcategories &&
                      item.subcategories.length > 0 && (
                        <div
                          className={`megamenu-container w-[200px] bg-white shadow-lg px-10 py-4 z-20 absolute top-[28px] rounded-b-xl`}
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
                href="/sale"
                onClick={() => setActiveMenu(null)}
                className={`menu-item text-13 lg:text-15 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap text-red-600 dark:text-red-600 flex flex-row gap-2 items-center cursor-pointer ${
                  isActiveMenu === 'sale' ? 'linkactive' : 'link-underline'
                }`}
              >
                sale
              </Link>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default MenuBar;
