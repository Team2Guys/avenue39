import { generateSlug } from '@/config';
import { MenuItem } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { menuData } from '@/data/menu';

const SubCategoriesRow = ({ category }: any) => {
  const path = usePathname();
  const [subCategory, setSubCategory] = useState<MenuItem[]>([]);
  const [Category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const categoryKey = path?.replace('/', '');
    const categoryName = categoryKey === 'lighting' ? 'Lighting' : categoryKey === 'office-furniture' ? 'homeOffice' : categoryKey;
    setCategory(categoryKey);
    const subcategory = menuData[categoryName] || [];
    setSubCategory(subcategory);
  }, [path]);


  console.log(category?.subcategories, "custom_url")
  return (
    subCategory.length > 0 && (
      <div
        className={`relative ps-2 sm:ps-8 pe-8 ${subCategory.length === 2
            ? 'w-full md:w-6/12 lg:4/12 xl:2/12'
            : subCategory.length === 4
              ? 'w-full sm:w-6/12'
              : 'w-full sm:w-8/12'
          }`}
      >
        <button
          className="absolute -left-4 sm:left-0 top-1/2 transform -translate-y-1/2 z-10"
          id="swiper-prev"
        >
          <MdOutlineKeyboardArrowLeft size={30} />
        </button>
        <button
          className="absolute -right-4 sm:right-0 top-1/2 transform -translate-y-1/2 z-10"
          id="swiper-next"
        >
          <MdOutlineKeyboardArrowRight size={30} />
        </button>

        <Swiper
          spaceBetween={10}
          modules={[Navigation]}
          navigation={{
            prevEl: '#swiper-prev',
            nextEl: '#swiper-next',
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: {
              slidesPerView: (category && category?.subcategories?.length > 4) || subCategory.length > 4 ? 4 : (category && category?.subcategories?.length) || subCategory.length,
            },
            1024: {
              slidesPerView: (category && category?.subcategories?.length > 6) || subCategory.length > 6 ? 6 : (category && category?.subcategories?.length) || subCategory.length,
            },
          }}
        >
          {(category?.subcategories || subCategory).map((category: any, index: any) => (
            <SwiperSlide key={index}>
              <Link
                href={`/${category?.name === "TV Stands" || category?.name === "Bedside Tables" 
                    ? "bedroom"
                    : category?.name === "Armchairs" || category?.name === "Accent Chairs"
                      ? "chairs"
                      : category?.name === "Side Tables" || category?.name === "Coffee Tables"
                        ? "tables"
                        : category?.name === "Sofa Beds" || category?.name === "Sofas"
                          ? "living"
                          : category?.name === "Table Lamps"
                            ? "lighting"
                            : category?.name === "Dining Chairs" || category?.name === "Dining Tables" || category?.name === "Office Tables" && Category !== "office-furniture"
                            ? "dining" : Category
                  }/${generateSlug((category?.custom_url || category?.name) || category.title)}`}
                key={category.categoryId}
                className="w-full text-center whitespace-nowrap bg-[#afa183] rounded-lg py-2 px-2 text-white block"
              >
                <span>{category?.name || category.title}</span>
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default SubCategoriesRow;
