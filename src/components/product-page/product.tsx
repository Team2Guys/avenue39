'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { newArrivals, productsbredcrumbs } from '@/data/data';
import { ImList } from 'react-icons/im';
import { MdWindow } from 'react-icons/md';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Card from '@/components/ui/card';
import LandscapeCard from '@/components/ui/landscape-card';
import { ICategory, IProduct } from '@/types/types';
import SubCategoriesRow from './subcategories-row';
interface ProductPageProps {
  layout: string;
  Setlayout: React.Dispatch<React.SetStateAction<string>>;
  fullUrl?: string;
  category: ICategory[] | undefined;
  ProductData: IProduct[];
  isCategory: boolean | undefined;
  findCategory?: string;
  categoryName?: ICategory;
  AllProduct: IProduct[];
}

const ProductPage = ({
  layout,
  Setlayout,
  ProductData,
  categoryName,
  AllProduct,
}: ProductPageProps) => {

  const [sortOption, setSortOption] = useState<string>('default');
  const pathname = usePathname();
  const handleSortChange = (sort: string) => setSortOption(sort);

  const productsToFilter = pathname === '/sale' ? AllProduct : ProductData;

  const filteredCards = productsToFilter
    .filter((card) => {
      if (pathname === '/products') {
        return card.discountPrice > 0 && card.stock > 0;
      }
      if (pathname === '/sale') {
        return card.discountPrice > 0; // Show only discounted products
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'name': {
          return a.name.trim().localeCompare(b.name.trim());
        }
        case 'max': {
          const priceA = a.discountPrice > 0 ? a.discountPrice : a.price;
          const priceB = b.discountPrice > 0 ? b.discountPrice : b.price;
          return priceB - priceA;
        }
        case 'min': {
          const minPriceA = a.discountPrice > 0 ? a.discountPrice : a.price;
          const minPriceB = b.discountPrice > 0 ? b.discountPrice : b.price;
          return minPriceA - minPriceB;
        }
        default:
          return 0;
      }
    });
  console.log(filteredCards,"filteredCardsfilteredCards")
  return (
    <>
      {
        <TopHero
          breadcrumbs={productsbredcrumbs}
          categoryName={categoryName?.name}
          subCategorName={''}
        />
      }
      <Container className="my-5 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full">
        {pathname === '/sale' ? null : pathname === '/new-arrivals' ? (
          <div className="flex flex-col items-center">
            {newArrivals.map((item, index) => (
              <div key={index} className="text-center">
                <h1 className="text-[45px] font-helvetica font-bold">{item.title}</h1>
                <Container>
                  <p>{item.description}</p>
                </Container>
              </div>
            ))}
          </div>
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-[45px] font-helvetica font-bold">
                {categoryName?.name}
              </h1>
              <Container>
                <p className="text-center">{categoryName?.description} </p>
              </Container>
            </div>
          )}
          <div className="sm:mt-4 mt-10 flex items-center justify-between gap-4 py-2 px-2 flex-col md:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <Select onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by: Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="max">Price Max</SelectItem>
                      <SelectItem value="min">Price Min</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <MdWindow
                  className="cursor-pointer text-3xl"
                  onClick={() => Setlayout('grid')}
                />
                <ImList
                  className="cursor-pointer text-2xl"
                  onClick={() => Setlayout('list')}
                />
              </div>

              <p className="block whitespace-nowrap ">
                Showing {filteredCards.length > 0 ? filteredCards.length : 0}{' '}
                results
              </p>
            </div>
            <SubCategoriesRow />
          </div>
  

          <div
            className={`grid gap-4 md:gap-8 mt-4 ${layout === 'grid' ? 'grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 ' : 'grid-cols-1'}`}
          >
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <div key={card.id} className="flex">
                  {layout === 'grid' ? (
                    <Card
                      card={card}
                      isLoading={false}
                      cardImageHeight="h-[300px] xsm:h-[220px] sm:h-[400px] md:h-[350px] xl:h-[220px] 2xl:h-[280px] w-full"
                    />
                  ) : (
                    <LandscapeCard card={card} isLoading={false} />
                  )}
                </div>
              ))
            ) : (
              <p>No Product Found</p>
            )}
          </div>
          {/* )} */}
        </div>
      </Container>
    </>
  );
};

export default ProductPage;
