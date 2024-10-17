import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { productsbredcrumbs } from '@/data/data';
import { ImList } from 'react-icons/im';
import { MdWindow } from 'react-icons/md';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Card from '@/components/ui/card';
import LandscapeCard from '@/components/ui/landscape-card';
import Services from '@/components/services/services';
import TopSelling from '@/components/top-selling/top-selling';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BsFilterLeft } from 'react-icons/bs';
import SidebarFilter from '@/components/filters/sidebar-filter';
import { ReactNode, useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import { IoIosClose } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '@/types/types';
import { fetchProducts } from '@/config/fetch';
import CardSkaleton from '../Skaleton/productscard';

interface ProductPageProps {
  sideBanner: StaticImageData;
  productBanner: ReactNode;
  layout: string;
  Setlayout: (layout: string) => void;
  fullUrl?:string
}

const ProductPage = ({
  sideBanner,
  productBanner,
  layout,
  Setlayout,
  fullUrl
}: ProductPageProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    [],
  );
console.log(fullUrl, "fullUrl"
)

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCategory(data); // Set fetched data
        setLoading(false); // Set loading to false when data is ready
      } catch (error: any) {
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchMenuData();
  }, []);

  const { data: products = [], isLoading } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleCategoryChange = (
    categoryOrSubCategory: string,
    isChecked: boolean,
    isSubCategory: boolean = false,
  ) => {
    if (isSubCategory) {
      setSelectedSubCategories((prev) =>
        isChecked
          ? [...prev, categoryOrSubCategory]
          : prev.filter((subCat) => subCat !== categoryOrSubCategory),
      );
    } else {
      setSelectedCategories((prev) =>
        isChecked
          ? [...prev, categoryOrSubCategory]
          : prev.filter((cat) => cat !== categoryOrSubCategory),
      );
    }
  };

  const handlePriceChange = ([start, end]: [number, number]) => {
    setPriceRange([start, end]);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
  };

  const filteredCards = products
  .filter((card) => {
    if (selectedSubCategories.length > 0) {
      return card.subcategories && card.subcategories.some(subCategory => selectedSubCategories.includes(subCategory.name));
    } else if (selectedCategories.length > 0) {
      return card.categories && card.categories.some(category => selectedCategories.includes(category.name));
    }
    return true;
  })
  .filter(card => card.price >= priceRange[0] && card.price <= priceRange[1])
  .sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'max') {
      return b.price - a.price;
    } else if (sortOption === 'min') {
      return a.price - b.price;
    }
    return 0;
  });



  return (
    <>
      <TopHero breadcrumbs={productsbredcrumbs} />
      <Container className="my-5 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full md:w-2/6 lg:w-[392px] hidden md:block">
          <SidebarFilter
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            sideBanner={sideBanner}
            category={category}
          />
        </div>
        <div className="w-full md:w-4/6 lg:w-9/12">
          {productBanner}
          <div className="mt-4">
            <div className="flex items-center justify-between gap-4 px-2">
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <div className="flex gap-1 items-center">
                      <span>Filter</span>
                      <BsFilterLeft size={25} />
                    </div>
                  </SheetTrigger>
                  <SheetOverlay className="bg-black opacity-80 z-[51]" />
                  <SheetContent className="pb-5 pt-10 w-4/5 overflow-y-auto z-[52]">
                    <SheetClose className="absolute left-4 top-4 rounded-sm opacity-100 ring-offset-background transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 bg-black text-white focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-[1]">
                      <IoIosClose size={25} />
                    </SheetClose>
                    <div className="relative">
                      <SidebarFilter
                        onCategoryChange={handleCategoryChange}
                        onPriceChange={handlePriceChange}
                        sideBanner={sideBanner}
                        category={category}
                      />
                    </div>
                    <div className="h-16 w-4/5 sm:max-w-sm border-t-2 fixed bottom-0 right-0 bg-white flex items-center justify-center gap-4 transition-all">
                      <Button variant={'ghost'} className="underline">
                        Cancel
                      </Button>
                      <SheetTrigger asChild>
                        <Button variant={'default'} className="text-white">
                          Apply
                        </Button>
                      </SheetTrigger>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <p className="md:text-16 text-primary-foreground hidden md:block">
                Showing {filteredCards.length} results
              </p>
              <div className="flex items-center gap-2">
                <MdWindow
                  size={25}
                  className="cursor-pointer"
                  onClick={() => Setlayout('grid')}
                />
                <ImList
                  size={20}
                  className="cursor-pointer"
                  onClick={() => Setlayout('list')}
                />
                <Select onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by: Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort Options</SelectLabel>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      {/* <SelectItem value="review">Rating</SelectItem> */}
                      <SelectItem value="max">Price Max</SelectItem>
                      <SelectItem value="min">Price Min</SelectItem>
                      <SelectSeparator />
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {
              filteredCards.length > 0 ? <div
              className={`grid gap-4 md:gap-8 mt-4 ${
                layout === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {!isLoading
                ? filteredCards.map((card) => (
                    <div key={card.id}>
                      {layout === 'grid' ? (
                        <Card
                          className="lg:w-[384.24px]"
                          skeletonHeight="h-[380px] xs:h-[488px] sm:h-[380px] 2xl:h-[488px]"
                          card={card}
                          isLoading={false}
                          category={true}
                        />
                      ) : (
                        <LandscapeCard card={card} isLoading={false} />
                      )}
                    </div>
                  ))
                : [...Array(6)].map((_, index) => (
                    <span key={index} className="">
                      <Card
                        className="lg:w-[384.24px]"
                        skeletonHeight="h-[380px] xs:h-[488px] sm:h-[380px] 2xl:h-[488px]"
                        isLoading={isLoading}
                      />
                    </span>
                  ))}
            </div> : 
               <CardSkaleton />
           
            }
          
        </div>
      </Container>
      <div className="my-14 px-2 sm:px-4 md:px-0 relative">
        {/* <div className="bg-lightbackground absolute top-0 right-0 w-1/2 h-full -z-[1] rounded-s-xl hidden md:block"></div> */}
        <Container>
          <TopSelling />
        </Container>
      </div>
      <Services />
    </>
  );
};

export default ProductPage;
