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
import { ICategory} from '@/types/cat';
import SubCategoriesRow from './subcategories-row';
import { variationProducts } from '@/config';
import { CartSize } from '@/redux/slices/cart/types';
import { IProduct } from '@/types/prod';

interface ProductPageProps {
  layout: string;
  Setlayout: React.Dispatch<React.SetStateAction<string>>;
  fullUrl?: string;
  category?: ICategory[] | undefined;
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
  const [showProd, setshowProd] = useState<string>('All');
  const [desc, setDesc] = useState<any>();

  const pathname = usePathname();
  const handleSortChange = (sort: string) => setSortOption(sort);
  const handleshowResult = (showProd: string) => setshowProd(showProd);
const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640);


  useEffect(() => {
    const description = SubcategoryName?.description || info?.description || "";
    setDesc(description);
  }, [info, SubcategoryName]);
  
  useEffect(() => {
    console.log(isMobile)
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const productsToFilter = pathname === '/sale' ? AllProduct : ProductData;


  const processedProducts = variationProducts({ products: productsToFilter });

  let filteredSortedCards = processedProducts?.filter((card) => {
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
      let totalStockA = Number(sizeStockA?.stock) || Number(filterStockA?.stock) || a.stock || 0;

      const sizeStockB = b?.sizes?.find((size: CartSize) => size.name === b.sizeName);
      const filterStockB = b?.filter?.[0]?.additionalInformation?.find((size: CartSize) => size.name === b.colorName);
      let totalStockB = Number(sizeStockB?.stock) || Number(filterStockB?.stock) || b.stock || 0;

      totalStockA = Math.max(0, totalStockA);
      totalStockB = Math.max(0, totalStockB);

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


    })


  
    const Arraylenght = !isNaN(Number(showProd)) ? Number(showProd) : filteredSortedCards?.length;
    const filteredCards = [...filteredSortedCards]?.slice(0, Arraylenght);
  return (
    <>
      {
        <TopHero
          breadcrumbs={productsbredcrumbs}
          categoryName={mainslug ? mainslug : SubcategoryName?.name}
          subCategoryName={SubcategoryName?.name || undefined}
        />

      }
      <Container className="my-5 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full">
          {pathname === '/new-arrivals' ? (
            <div className="flex flex-col items-center">
              {newArrivals.map((item, index) => (
                <div key={index} className="text-center">
                  <h1 className="text-[35px] xs:text-[45px] font-Helveticalight font-bold capitalize tracking-widest">{item.title.toLowerCase()}</h1>
                  <Container>
                    <p className='font-Helveticalight text-base xs:text-18' dangerouslySetInnerHTML={{ __html: item.description }}></p>
                  </Container>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h1 className={`text-[35px] xs:text-[45px] font-Helveticalight font-bold capitalize ${info?.name?.toLowerCase() === 'living' ? 'tracking-widest' :'tracking-[1px]'}`}>
                {SubcategoryName?.name ? SubcategoryName?.name.toLowerCase() : info?.name.toLowerCase()}
              </h1>
              <Container>
                <p className={`text-justify font-Helveticalight text-base xs:text-18 ${pathname === '/sale' && 'hidden'}`} dangerouslySetInnerHTML={{ __html: desc }}></p>
                  {/* {isMobile ? description.split(" ").slice(0, 33).join(" ") + "." : description} */}
              </Container>
            </div>
          )}
          <div className="sm:mt-4 mt-10 flex items-center justify-between gap-4 py-2 px-2 flex-col md:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
              <div className="block whitespace-nowrap text-12 sm:text-base">
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
                </div>

                <div className="block whitespace-nowrap text-12 sm:text-base">
                  {/* Showing {filteredCards.length > 0 ? filteredCards.length : 0} results */}
                  <Select onValueChange={handleshowResult}>
                    <SelectTrigger>
                      <SelectValue placeholder="Show All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem disabled={!(filteredSortedCards.length >= 10) ? true : false} value="10">Show 10 products</SelectItem>
                        <SelectItem disabled={!(filteredSortedCards.length >= 20) ? true : false} value="20">Show 20 products</SelectItem>
                        <SelectItem disabled={!(filteredSortedCards.length >= 30) ? true : false} value="30">Show 30 products</SelectItem>
                        <SelectItem disabled={!(filteredSortedCards.length > 0) ? true : false} value='All'>Show All</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center gap-2'>
                  <MdWindow
                    className="cursor-pointer text-3xl"
                    onClick={() => Setlayout('grid')}
                  />
                  <ImList
                    className="cursor-pointer text-2xl"
                    onClick={() => Setlayout('list')}
                  />

                </div>
              </div>


            </div>
            <SubCategoriesRow category={info} />
          </div>

          <div
            className={`grid gap-4 md:gap-8 mt-4 ${layout === 'grid'
              ? 'grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5'
              : 'grid-cols-1'
              }`}
          >
            {filteredCards.length > 0 ? (
              filteredCards.map((card, index) => (
                <div key={index} className="flex">
                  <Card
                    card={card}
                    isLoading={false}
                    SubcategoryName={SubcategoryName}
                    mainCatgory={mainslug}
                    cardImageHeight="h-[300px] xsm:h-[220px] sm:h-[400px] md:h-[350px] xl:h-[220px] 2xl:h-[280px] w-full"
                    cardLayout={layout}
                  />
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
