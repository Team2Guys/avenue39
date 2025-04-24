'use client';
import React, { useState, useEffect, useRef } from 'react';
import Container from '../ui/Container';
import MenuLink from '../menu-link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generateSlug } from '@/config';
import Link from 'next/link';
import { State } from '@/redux/store';
import { useSelector } from 'react-redux';
import { ICategory } from '@/types/cat';
import { staticHeaderCategories } from '@/data/menu';

const MenuBar = ({ categories }: { categories?: ICategory[] }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [hoveringMenu, setHoveringMenu] = useState<boolean>(false);
  const [isActiveMenu, setisActiveMenu] = useState<string | null>(null);
  const userDetails = useSelector((state: State) => state.usrSlice.loggedInUser,);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const pathSplit = pathname.split('/').filter((value)=>value);
    const [category] = pathSplit
      setisActiveMenu(category?.replace('-', ' ').toLowerCase() || null);
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
      return; 
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
      setActiveMenu(null); 
    } else {
      setActiveMenu(menu);
    }
  };
  
  return (
    <div
      className={`${isSticky ? `sticky z-40 ${userDetails ? 'top-20' : 'top-16'} ` : 'relative md:pb-12 z-40 '}`}
      style={{zIndex: 40}}
    >
      <div
        className={`bg-white shadow-md mb-1 pt-3 hidden md:block z-10 ${
          isSticky ? '' : 'absolute w-full top-0'
        }`}
      >
        <Container className="flex flex-wrap items-center justify-between">
          {categories && categories?.length < 1 ? (
            staticHeaderCategories.map((item, index) => (
              <Link
                href={`/${generateSlug(item == "Home Office"  ? "office-furniture" : item )}`}
                key={index}
                className={`menu-item text-13 lg:text-15 pb-2 tracking-wide font-helvetica uppercase whitespace-nowrap ${
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
                .map((item:ICategory) => (
                  <div
                    className="relative"
                    key={item.id}
                    ref={menuRef}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${generateSlug(item.custom_url || item.name)}`}
                      className={`relative menu-item text-13 lg:text-15 pb-2 tracking-wide uppercase whitespace-nowrap text-black dark:text-black flex flex-row gap-2 items-center cursor-pointer ${
                        isActiveMenu === (item?.custom_url?.toLowerCase() || item.name.toLowerCase()) ? 'linkactive' : 'link-underline'
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
                className={`menu-item text-13 lg:text-15 pb-2 tracking-wide font-helvetica uppercase whitespace-nowrap text-red-600 dark:text-red-600 flex flex-row gap-2 items-center cursor-pointer ${
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
