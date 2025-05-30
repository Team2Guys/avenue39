import React, { useEffect, useState } from 'react';
import TopNav from './top-nav';
import MenuBar from './menu-bar';
import BottomBar from './bottom-bar';
import { fetchCategories } from '@/config/fetch';
import { ICategory } from '@/types/cat';
import { useQuery } from '@tanstack/react-query';
import { menuData } from '@/data/menu';
import Navbar from './nav-bar';

const Header = () => {
  const [sortedCategories, setSortedCategories] = useState<ICategory[]>([]);
  const { data: categoriesData  = [] } = useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories('getHeaderCategories'),
  });
  useEffect(() => {
    if (!Array.isArray(categoriesData)) return;

    const customSortedCategories: ICategory[] = [];
    const categoriesNotInMenuData: ICategory[] = [];

    Object.keys(menuData).forEach((categoryKey) => {
      const categoryItems = menuData[categoryKey];
      const matchingCategories = categoriesData.filter((category: ICategory) =>
        categoryItems.some((item) => item.categoryId === category.id),
      );
      customSortedCategories.push(...matchingCategories);
    });

    const remainingCategories = categoriesData.filter(
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
  }, [categoriesData]);

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
