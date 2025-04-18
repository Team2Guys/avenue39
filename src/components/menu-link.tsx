'use client';
import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { generateSlug } from '@/config';
import { ICategory } from '@/types/cat';
import { menuData } from '@/data/menu';
import { re_Calling_products } from '@/data/Re_call_prod';
import { TrimUrlHandler } from '@/config/fetch';

interface MenuLinkProps {
  menudata: ICategory;
  onLinkClick?: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({ menudata, onLinkClick }) => {
  // 🔁 Memoized subcategory sorting
  const subCategory = useMemo(() => {
    if (!menudata?.subcategories) return [];

    const normalizedCategoryName = (() => {
      const name = menudata.name.toLowerCase();
      if (name === 'lighting') return 'Lighting';
      if (name === 'home office') return 'homeOffice';
      return name;
    })();

    const menuItems = menuData[normalizedCategoryName] || [];

    return [...menudata.subcategories].sort((a, b) => {
      const indexA = menuItems.findIndex((item) => item.title.toLowerCase() === a.name.toLowerCase());
      const indexB = menuItems.findIndex((item) => item.title.toLowerCase() === b.name.toLowerCase());

      if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
      if (indexA === -1) return -1;
      if (indexB === -1) return 1;
      return indexA - indexB;
    });
  }, [menudata]);

  // 🔁 Memoized routing function
  const routingHandler = useCallback((mainCategory: string, subCategory: string) => {
    const routed = re_Calling_products.find(
      (value) =>
        TrimUrlHandler(value.mainCategory) === TrimUrlHandler(mainCategory) &&
        TrimUrlHandler(value.subCategory) === TrimUrlHandler(subCategory),
    );

    const routedMainCategory = routed?.redirect_main_cat || mainCategory;
    const routedSubCategory = routed?.redirectsubCat || subCategory;

    return `/${generateSlug(routedMainCategory)}/${generateSlug(routedSubCategory)}`;
  }, []);

  return (
    <>
      {subCategory.map((item, index) => {
        if (item.name === 'TV Stands') return null;

        const url =
          item.name === 'Accessories'
            ? '/accessories'
            : routingHandler(menudata.custom_url || menudata.name, item.custom_url || item.name);

        return (
          <Link
            href={url}
            className="flex gap-1 items-center link-underline w-fit"
            key={index}
            onClick={onLinkClick}
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );
};

export default React.memo(MenuLink);
