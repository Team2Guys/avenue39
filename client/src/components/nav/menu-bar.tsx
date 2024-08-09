'use client';
import React, { useState, useEffect, useRef } from 'react';
import Container from '../ui/Container';
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Image, { StaticImageData } from 'next/image';
import MenuLink from '../menu-link';
import icon3 from '@icons/3.png';
import icon2 from '@icons/2.png';
import icon5 from '@icons/5.png';
import megamenu from '@icons/megamenu.png';

interface MenuItem {
  title: string;
  icon: string | StaticImageData;
  link: string;
}

interface MenuData {
  [key: string]: MenuItem[];
}

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuData: MenuData = {
    bedroom: [
      { link: '/', title: 'Bedroom Set 1', icon: icon3 },
      { link: '/', title: 'Bedroom Set 2', icon: icon2 },
      { link: '/', title: 'Bedroom Set 1', icon: icon3 },
      { link: '/', title: 'Bedroom Set 2', icon: icon2 },
      { link: '/', title: 'Bedroom Set 1', icon: icon3 },
      { link: '/', title: 'Bedroom Set 2', icon: icon2 },
      { link: '/', title: 'Bedroom Set 1', icon: icon3 },
    ],
    megaSale: [
      { link: '/', title: 'Sale Item 1', icon: icon5 },
      { link: '/', title: 'Bedroom Set 1', icon: icon3 },
      { link: '/', title: 'Bedroom Set 2', icon: icon2 },
    ],
  };
  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-white text-black dark:text-black shadow-md mb-1 pt-3 pb-2 hidden md:block sticky top-0 z-50">
        <Container className="flex gap-10 items-center justify-between ">
          <Link
            className="font-semibold text-19 uppercase hover:underline"
            href={'/'}
          >
            DINING
          </Link>
          <div
            className="font-semibold text-19 uppercase hover:underline flex gap-2 items-center cursor-pointer"
            onClick={() => handleMenuClick('bedroom')}
          >
            BEDROOM <MdOutlineKeyboardArrowDown size={25} />
          </div>
          <Link
            className="font-semibold text-19 uppercase hover:underline"
            href={'/'}
          >
            BEDROOM
          </Link>
          <Link
            className="font-semibold text-19 uppercase hover:underline"
            href={'/'}
          >
            BEDROOM
          </Link>
          <Link
            className="font-semibold text-19 uppercase hover:underline"
            href={'/'}
          >
            DINING
          </Link>
          <Link
            className="font-semibold text-19 uppercase hover:underline"
            href={'/'}
          >
            DINING
          </Link>
          <button
            className="font-semibold text-19 uppercase hover:underline text-red-600"
            onClick={() => handleMenuClick('megaSale')}
          >
            Mega Sale
          </button>
        </Container>
      </div>

      {activeMenu && (
        <div
          ref={menuRef}
          className="w-full bg-white shadow-lg p-10 z-50 sticky top-[49px] text-black dark:text-black"
        >
          <Container className="flex gap-4">
            <div className="w-8/12 space-y-4">
              <p className="text-19 font-bold w-96 text-black dark:text-black">
                {activeMenu === 'bedroom'
                  ? 'Our Living Room Signature Style Premium Furniture'
                  : 'Our Bedroom Collection'}
              </p>
              <div className="border-b-4 w-14 border-red-600" />
              <div className="grid grid-cols-3 space-y-3 text-black dark:text-black">
                <MenuLink menudata={menuData[activeMenu]} />
              </div>
            </div>
            {activeMenu === 'bedroom' && (
              <div className="w-full md:w-4/12">
                <Image
                  className="object-contain"
                  width={500}
                  height={500}
                  src={megamenu}
                  alt="menu"
                />
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  );
};

export default MenuBar;
