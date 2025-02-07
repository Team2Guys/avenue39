import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { generateSlug } from '@/config';
import { ICategory } from '@/types/types';
import { menuData } from '@/data/menu';
import { re_Calling_products } from '@/data/Re_call_prod';
import { TrimUrlHandler } from '@/config/fetch';
import { SheetClose } from './ui/sheet';

interface MenuLinkProps {
  menudata: ICategory;
  onLinkClick?: () => void;
  loading?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({ menudata, onLinkClick }) => {
  const [subCategory, setSubCategory] = useState<ICategory[] | undefined>([]);
  useEffect(() => {
    const categoryName =
      menudata.name.toLowerCase() === 'lighting'
        ? 'Lighting'
        : menudata.name.toLowerCase() === 'home office'
          ? 'homeOffice'
          : menudata.name.toLowerCase();
    const menuItems = menuData[categoryName];
    const sortedSubcategories = menudata.subcategories?.sort((a, b) => {
      const indexA = menuItems.findIndex(
        (item) => item.title.toLowerCase() === a.name.toLowerCase(),
      );
      const indexB = menuItems.findIndex(
        (item) => item.title.toLowerCase() === b.name.toLowerCase(),
      );
      if (indexA === -1 && indexB === -1) {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      }
      if (indexA === -1) return -1;
      if (indexB === -1) return 1;
      return indexA - indexB;
    });
    setSubCategory(sortedSubcategories);
  }, [menudata]);

  const routinghandler = (mainCategory: string, subCategory: string) => {
    const routedCat = re_Calling_products.find((value) =>
        TrimUrlHandler(value.mainCategory) === TrimUrlHandler(mainCategory) &&
        TrimUrlHandler(subCategory) == TrimUrlHandler(value.subCategory),
    );
    let routedMainCategory;
    let routedSubCategory;
    if (routedCat) {
      routedMainCategory = routedCat.redirect_main_cat;
      routedSubCategory = routedCat.redirectsubCat;
    }
    return `/${generateSlug(routedMainCategory || mainCategory)}/${generateSlug(routedSubCategory || subCategory)}`;
  };

  return (
    <>
      {subCategory?.map((item, index) => (
        <SheetClose asChild key={index}>

       
        <Link
          href={
            item.name === 'Accessories'
              ? '/accessories'
              : routinghandler((menudata.custom_url || menudata.name),( item.custom_url || item.name))
          }
          className={`flex gap-1 items-center`}
          key={index}
          onClick={onLinkClick}
        >
          {item.name}
        </Link>
        </SheetClose>
      ))}
    </>
  );
};

export default MenuLink;
