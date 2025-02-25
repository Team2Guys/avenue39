
import React from 'react';
import CatProduct from './CatProduct';
import { IProduct } from '@/types/types';
import CatProduct1 from './CatProduct1';
import { Accessories, Bedroom, Dining, Living } from '@/data/data';
import { generateSlug } from '@/config';

const AllCategory = ({ products }: { products: IProduct[] }) => {
  const filterByCategoryAndTitle = (products: IProduct[], titles: string[]) => {
    const titleIndexMap = new Map(titles.map((title, index) => [title, index]));

  

    const filteredProducts = products.filter((prod) => {
      return titleIndexMap.has(prod.name);
    });
    return filteredProducts.sort((a, b) => {
      const aIndex = titleIndexMap.get(a.name);
      const bIndex = titleIndexMap.get(b.name);
      if (aIndex !== undefined && bIndex !== undefined) {
        return aIndex - bIndex;
      }
      return 0;
    });
  };

  const filterAccessories = (products: IProduct[], titles: string[]) => {
    const titleIndexMap = new Map(titles.map((title, index) => [title, index]));
    const matchingProducts = products.filter((prod) =>
        titleIndexMap.has(prod.name) && prod.categories?.some((cat) => cat.name.toLowerCase() === 'accessories')
    );
    const nonMatchingProducts = products.filter((prod) =>
        !titleIndexMap.has(prod.name) && prod.categories?.some((cat) => cat.name.toLowerCase() === 'accessories')
    );
    const sortedMatchingProducts = matchingProducts.sort((a, b) => {
        const aIndex = titleIndexMap.get(a.name);
        const bIndex = titleIndexMap.get(b.name);
        return aIndex !== undefined && bIndex !== undefined ? aIndex - bIndex : 0;
    });
    return [...sortedMatchingProducts, ...nonMatchingProducts];
};



  const getCategoryDescription = (categoryName: string) => {
    const matchedCategory = products.flatMap((product) => product.categories || []).find((category) =>generateSlug(category.name) === generateSlug(categoryName));
    return matchedCategory?.short_description || '';
  };

  
    return (
    <div className="pt-1">
      <CatProduct
        products={filterByCategoryAndTitle(products, Dining)}
        CategoryDescription={getCategoryDescription('Dining')}
        CategoryName="Shop Your Dining"
        redirect="dining"
      />
      <CatProduct
        products={filterByCategoryAndTitle(products, Living)}
        CategoryDescription={getCategoryDescription('Living')}
        CategoryName="Shop Your Living"
        reverse
        landHeight={'calc(100% - 80px)'}
        portSpace="px-8"
        sofaHeight={'calc(100% - 60px)'}
        sideTableHeight={'calc(100% - 20px)'}
        redirect="living"
      />
      <CatProduct1
        products={filterByCategoryAndTitle(products, Bedroom)}
        CategoryDescription={getCategoryDescription('Bedroom')}
        CategoryName="Shop your Bedroom"
        redirect="bedroom"
      />
      <CatProduct1
        products={filterAccessories(products, Accessories)}
        CategoryDescription={getCategoryDescription('Accessories')}
        CategoryName="Complement your design with accessories"
        reverse
        redirect="accessories"
        accessoriesSlider={true}
      />
    </div>
  );
};

export default AllCategory;
