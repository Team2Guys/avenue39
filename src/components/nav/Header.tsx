import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const TopNav = dynamic(() => import('./top-nav'), { ssr: false });
const MenuBar = dynamic(() => import('./menu-bar'), { ssr: false });
const BottomBar = dynamic(() => import('./bottom-bar'), { ssr: false });
const Navbar = dynamic(() => import('./nav-bar'), { ssr: false });

import { fetchCategories } from '@/config/fetch';
import { ICategory } from '@/types/cat';
import { useQuery } from '@tanstack/react-query';
import { menuData } from '@/data/menu';


const Header = () => {
  const [sortedCategories, setSortedCategories] = useState<ICategory[]>([]);
  const { data: categories = [] } = useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories('getHeaderCategories'),
  });
  useEffect(() => {
    if (categories.length > 0) {
      const customSortedCategories: ICategory[] = [];
      const categoriesNotInMenuData: ICategory[] = [];
      Object.keys(menuData).forEach((categoryKey) => {
        const categoryItems = menuData[categoryKey];
        const matchingCategories = categories.filter((category: ICategory) =>
          categoryItems.some((item) => item.categoryId === category.id),
        );
        customSortedCategories.push(...matchingCategories);
      });
      const remainingCategories = categories.filter(
        (category: ICategory) =>
          !customSortedCategories.some(
            (sortedCategory) => sortedCategory.id === category.id,
          ),
      );
      categoriesNotInMenuData.push(...remainingCategories);
      const newArrivalsCategory = categoriesNotInMenuData.find(
        (category) => category.name.toLowerCase() === 'new arrivals',
      );
      const otherCategories = categoriesNotInMenuData.filter(
        (category) => category.name.toLowerCase() !== 'new arrivals',
      );
      const finalSortedCategories = [
        ...customSortedCategories,
        ...otherCategories,
        ...(newArrivalsCategory ? [newArrivalsCategory] : []),
      ];

      setSortedCategories(finalSortedCategories);
    }
  }, [categories]);

  return (
    <>
      <TopNav />
      <Navbar categories={sortedCategories} />
      <MenuBar categories={sortedCategories} />
      <BottomBar />
    </>
  );
};

export default Header;
