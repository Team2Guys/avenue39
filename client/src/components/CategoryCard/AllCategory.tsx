import React from 'react';
import CatProduct from './CatProduct';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import { IProduct } from '@/types/types';
import CatProduct1 from './CatProduct1';
import { generateSlug } from '@/config';
import { Accessories, Bedroom, Dining, Living } from '@/data/data';

const AllCategory = () => {
  const { data: products = [] } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const filterByCategoryAndTitle = (
    products: IProduct[],
    categoryName: string,
    titles: string[]
  ) => {
    const filteredProducts = products.filter(
      (product) =>
        product.categories?.some(
          (category) =>
            generateSlug(category.name.toLowerCase()) ===
            generateSlug(categoryName.toLowerCase())
        ) && titles.includes(product.name)
    );
    return filteredProducts.sort(
      (a, b) => titles.indexOf(a.name) - titles.indexOf(b.name)
    );
  };

  return (
    <div className='pt-1'>
      <CatProduct products={filterByCategoryAndTitle(products, 'Dining', Dining)} CategoryName='Shop Your Dining' />
      <CatProduct products={filterByCategoryAndTitle(products, 'Living', Living)} CategoryName='Shop Your Living'  reverse />
      <CatProduct1 products={filterByCategoryAndTitle(products, 'Bedroom', Bedroom)} CategoryName='Shop your Bedroom' />
      <CatProduct1 products={filterByCategoryAndTitle(products, 'Accessories', Accessories)} CategoryName='Complement your design with accessories' reverse
      />
    </div>
  );
};

export default AllCategory;
