'use client'
import React, { useEffect, useState } from 'react';
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
import { CartSize } from '@/redux/slices/cart/types';

interface ProductPageProps {
  layout: string;
  Setlayout: React.Dispatch<React.SetStateAction<string>>;
  fullUrl?: string;
  category: ICategory[] | undefined;
  ProductData: IProduct[];
  isCategory: boolean | undefined;
  findCategory?: string;
  SubcategoryName?: ICategory;
  AllProduct: IProduct[];
  mainslug?: string;
  info?: ICategory;
}

const ProductPage = ({
  layout,
  Setlayout,
  ProductData,
  SubcategoryName,
  AllProduct,
  mainslug,
  info,
}: ProductPageProps) => {

  const [sortOption, setSortOption] = useState<string>('default');
  

  const pathname = usePathname();
  const handleSortChange = (sort: string) => setSortOption(sort);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640);
  const description = SubcategoryName?.description || info?.description || "";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const productsToFilter = pathname === '/sale' ? AllProduct : ProductData;

  const processedProducts = productsToFilter.flatMap((prod) => {
    if ((!prod.sizes || prod.sizes.length === 0) && (!prod.filter || prod.filter.length === 0)) {
      return [prod]; 
    }
  
    if (!prod.productImages || prod.productImages.length === 0) {
    return [];
  }

  const uniqueVariations = new Map();

  prod.productImages
    .filter((img) => img.index)
    .forEach((img) => {
      const sizeMatch = prod.sizes?.find(
        (size) => size.name.toLowerCase() === img.size?.toLowerCase()
      );
      const filterMatch = prod.filter?.[0]?.additionalInformation?.find(
        (filterItem) => filterItem.name.toLowerCase() === img.color?.toLowerCase()
      );
      const hoverImageMatch = prod.productImages.find(
        (hoverImg) => hoverImg.index === img.index && hoverImg.imageUrl !== img.imageUrl
      );

      const variationKey = img.index;

      if (!uniqueVariations.has(variationKey)) {
        uniqueVariations.set(variationKey, {
          ...prod,
          name: `${prod.name}`,
          displayName: `${prod.name} - ${
            img.size?.toLowerCase() === img.color?.toLowerCase()
              ? img.size
              : `${img.size ? img.size : ''} ${img.color ? `(${img.color})` : ''}`
          }`,
          sizeName:img.size ,
          colorName:img.color,
          price: sizeMatch
            ? Number(sizeMatch.price)
            : filterMatch
            ? Number(filterMatch.price)
            : prod.price, 
          discountPrice: sizeMatch
            ? Number(sizeMatch.discountPrice)
            : filterMatch
            ? Number(filterMatch.discountPrice || 0)
            : prod.discountPrice,
          posterImageUrl: img.imageUrl,
          hoverImageUrl: hoverImageMatch ? hoverImageMatch.imageUrl : prod.hoverImageUrl,
          stock: sizeMatch ? sizeMatch.stock : prod.stock,
        });
      }
    });

  return Array.from(uniqueVariations.values());
});
  

const filteredCards = processedProducts
  .filter((card) => {
    if (pathname === '/products') {
      return card.discountPrice > 0 && card.stock > 0;
    }
    if (pathname === '/sale') {
      return card.discountPrice > 0;
    }
    return true;
  })
  .sort((a, b) => {
    const sizeStockA = a?.sizes?.find((size: CartSize) => size.name === a.sizeName);
    const filterStockA = a?.filter?.[0]?.additionalInformation?.find((size: CartSize) => size.name === a.colorName);
    const totalStockA = Number(sizeStockA?.stock) || Number(filterStockA?.stock) || a.stock;

    const sizeStockB = b?.sizes?.find((size: CartSize) => size.name === b.sizeName);
    const filterStockB = b?.filter?.[0]?.additionalInformation?.find((size: CartSize) => size.name === b.colorName);
    const totalStockB = Number(sizeStockB?.stock) || Number(filterStockB?.stock) || b.stock;

    if (totalStockA === 0 && totalStockB > 0) return 1; 
    if (totalStockA > 0 && totalStockB === 0) return -1; 

    switch (sortOption) {
      case 'name':
        return a.name.trim().localeCompare(b.name.trim());
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


  return (
    <>
      {
        <TopHero
          breadcrumbs={productsbredcrumbs}
          categoryName={mainslug ? mainslug : SubcategoryName?.name}
          subCategorName={SubcategoryName?.name || undefined}
        />

      }
      <Container className="my-5 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full">
          {pathname === '/new-arrivals' ? (
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
                {SubcategoryName?.name ? SubcategoryName?.name : info?.name}
              </h1>
              <Container>
              <p className={`text-center sm:text-base text-sm ${pathname === '/sale' && 'hidden'}`}>
              {isMobile ? description.split(" ").slice(0, 33).join(" ") + "." : description}
              </p>
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
                      <SelectItem value="name">A - Z</SelectItem>
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

              <p className="block whitespace-nowrap text-12 sm:text-base">
                Showing {filteredCards.length > 0 ? filteredCards.length : 0} results
              </p>
            </div>
            <SubCategoriesRow category={info} />
          </div>

          <div
            className={`grid gap-4 md:gap-8 mt-4 ${
              layout === 'grid'
                ? 'grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5'
                : 'grid-cols-1'
            }`}
          >
            {filteredCards.length > 0 ? (
              filteredCards.map((card,index) => (
                <div key={index} className="flex">
                  {layout === 'grid' ? (
                    <Card
                      card={card}
                      isLoading={false}
                      SubcategoryName={SubcategoryName}
                      mainCatgory={mainslug}
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
        </div>
      </Container>
    </>
  );
};

export default ProductPage;
