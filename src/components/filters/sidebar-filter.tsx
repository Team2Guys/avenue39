import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import CategoryFilter from './category-filter';
import { saleitems } from '@/data';
import { Slider, SliderPrimitive } from '@/components/ui/slider';
import Salecard from '../ui/sale-card';
import Image, { StaticImageData } from 'next/image';
import { IProductCategories } from '@/types/types';
import Link from 'next/link';

/* eslint-disable */
interface SidebarFilterProps {
  onCategoryChange: (
    category: string,
    isChecked: boolean,
    isSubCategory: boolean,
  ) => void;
  onPriceChange: (range: [number, number]) => void;
  sideBanner: StaticImageData;
  category: any;
  sideBannerProduct?: string;
}
/* eslint-enable */
const SidebarFilter = ({
  onCategoryChange,
  onPriceChange,
  sideBanner,
  sideBannerProduct,
  category,
}: SidebarFilterProps) => {
  const [range, setRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<IProductCategories[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleValueChange = ([start, end]: [number, number]) => {
    setRange([start, end]);
    onPriceChange([start, end]);
  };

  const handleCategoryChange = (
    name: string,
    isChecked: boolean,
    isSubCategory = false,
  ) => {
    onCategoryChange(name.toUpperCase(), isChecked, isSubCategory);

    if (!isSubCategory) {
      setSelectedCategories((prev) => {
        if (isChecked) {
          return [...prev, name];
        } else {
          return prev.filter((cat) => cat.toUpperCase() !== name);
        }
      });
    } else {
      setSelectedCategories((prev) => {
        const updatedCategories = [...prev];
        const categoryIndex = updatedCategories.findIndex(
          (cat) => cat.toUpperCase() === name,
        );
        if (isChecked && categoryIndex === -1) {
          updatedCategories.push(name.toUpperCase());
        } else if (!isChecked && categoryIndex !== -1) {
          updatedCategories.splice(categoryIndex, 1);
        }
        return updatedCategories;
      });
    }
  };

  useEffect(() => {
    if (category && category.length > 0) {
      setSelectedCategories([]);
      const categoryId = searchParams.get('id');
      const currentCategory = pathname
        .split('/')
        .pop()
        ?.toUpperCase()
        ?.replace('-', ' ');
      if (currentCategory) {
        if (categoryId) {
          const categoryMatch = category.find(
            (cat: any) => cat.id.toString() === categoryId,
          );

          if (categoryMatch) {
            setSelectedCategories((prev) => {
              if (!prev.includes(categoryMatch.name)) {
                return [...prev, categoryMatch.name];
              }
              return prev;
            });
            const subcategoryMatch = categoryMatch.subcategories?.find(
              (subcat: any) => subcat.name.toUpperCase() === currentCategory,
            );
            if (subcategoryMatch) {
              setSelectedCategories((prev) => {
                if (
                  !prev.includes(`SUB_${subcategoryMatch.name.toUpperCase()}`)
                ) {
                  return [
                    ...prev,
                    `SUB_${subcategoryMatch.name.toUpperCase()}`,
                  ];
                }
                return prev;
              });
            }
          }
        } else {
          const mainCategoryMatch = category.find(
            (cat: any) => cat.name.toUpperCase() === currentCategory,
          );

          if (mainCategoryMatch) {
            setSelectedCategories((prev) => {
              if (!prev.includes(mainCategoryMatch.name)) {
                return [...prev, mainCategoryMatch.name];
              }
              return prev;
            });
          } else {
            category.forEach((cat: any) => {
              const subCategoryMatch = cat.subcategories?.find(
                (subcat: any) => subcat.name.toUpperCase() === currentCategory,
              );

              if (subCategoryMatch) {
                setSelectedCategories((prev) => {
                  const updatedCategories = [...prev];
                  if (!updatedCategories.includes(cat.name)) {
                    updatedCategories.push(cat.name.toUpperCase());
                  }
                  if (!updatedCategories.includes(subCategoryMatch.name)) {
                    updatedCategories.push(subCategoryMatch.name.toUpperCase());
                  }
                  return updatedCategories;
                });
              }
            });
          }
        }
      }
    }
  }, [pathname, category, searchParams]);

  useEffect(() => {
    if (selectedCategories.length > 0 && category.length > 0) {
      const selectedSubcategories = selectedCategories.flatMap((catName) => {
        const categoryObj = category.find((cat: any) => cat.name === catName);
        return categoryObj ? categoryObj.subcategories : [];
      });
      const uniqueSubcategories = selectedSubcategories.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name),
      );

      setSubcategories(uniqueSubcategories);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategories, category]);

  return (
    <div>
      <div className="w-full">
        <h3 className="py-5 text-xl font-medium">Filter</h3>
        <div className="border-t-2 py-6">
          <CategoryFilter
            items={category}
            onCategoryChange={handleCategoryChange}
            selectedCategories={selectedCategories}
            isSubcategory={false}
          />
        </div>
        {subcategories.length > 0 && (
          <div className="border-t-2 py-6">
            <CategoryFilter
              items={subcategories}
              onCategoryChange={handleCategoryChange}
              selectedCategories={selectedCategories}
              isSubcategory={true}
            />
          </div>
        )}
        <div className="border-t-2 py-6">
          <h4 className="text-xl font-medium mb-5">Prices</h4>
          <div>
            <Slider
              defaultValue={[0, 10000]}
              max={10000}
              step={10}
              onValueChange={handleValueChange}
            >
              <SliderPrimitive.Thumb />
              <SliderPrimitive.Thumb />
            </Slider>
            <div className="flex justify-between mt-2">
              {range.map((item, index) => (
                <span className="text-14 font-medium" key={index}>
                  AED {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-2xl font-semibold mb-5">Pay Your Way</h4>
          <div className="flex justify-center flex-wrap xs:flex-nowrap gap-2 xs:gap-4 px-1 xs:px-2">
            {saleitems.map((item) => (
              <Salecard key={item.id} cards={item} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href={
                sideBannerProduct
                  ? `/product/${sideBannerProduct}`
                  : '/products'
              }
            >
              <Image src={sideBanner} alt="sale banner" className="mx-auto" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
